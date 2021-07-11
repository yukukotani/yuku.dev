---
title: ISUCON10 予選負けた 悔しい
publishDate: 2020-09-14
layout: "../../../layouts/ArticleLayout.astro"
---

ISUCON10 予選に 1 人参加して負けた。最高ベンチスコアは 1700 弱だった。熱が冷めないうちに書こうと思ったら Static Site Generation やりたくなっちゃってブログ作ったので出来立てホヤホヤでやったことと所感を書く。

## 方針

参考実装の中で一番手に馴染んでいる Node.js を使った。と言ってもまともに経験があるのはフロントエンドアプリケーションやツールチェインの実装で、アプリケーションサーバーの実装経験はほとんどないから雰囲気でやった。

1 人参加だったので VS Code Remote SSH で直接サーバー上のファイルを編集してコミットしていた。

https://github.com/Monchi/isucon10q

たぶん VS Code Remote SSH のせい（僕の使い方が悪いかも）で何度かサーバーが SSH 接続を受け付けない状態になってしまい、運営さんに再起動をしてもらった。手を煩わせてしまって申し訳なかったので原因は調査してみる。

計測は New Relic と netdata を使った。まともにパフォーマンス計測をした経験がなく、スロークエリ分析すらスムーズにできない状態だったので、サクっと導入してグラフィカルに見れるのはすごく助かった。

## やったこと

### 開始まで

準備しなきゃしなきゃと思いつつサボっていて、当日までにやったのは 15 行くらいスクリプト書いただけ。

https://github.com/Monchi/isucon10q/commits/614c09f2c77f849f9c5e2f1e8571937ea8ca5a88

当日は開始が遅れたため、その時間で New Relic 導入の素振りだけできた。

### 12:00-13:00

最初はポータルが不調でベンチマーカーを回せなかったので、マニュアルを読みつつホームディレクトリで `git init` して、Node.js 実装への切り替えたり 各種 config を git に入れてシンボリック貼ったり netdata 入れたりと細かな準備をした。1 時間かける内容ではなかった。

### 13:00-14:00

まだベンチマーカーを回せず方針を建てられなかったので、マニュアルに書いてあった Bot アクセス弾きを実装した。意外と低スコアでも Bot アクセスがあったので多少は効いてそう。ぱっと見でマニュアルの正規表現は最適化できそうだったが、そこまでボトルネックにならないと踏んで後回しにした。これは正解だった。

https://github.com/Monchi/isucon10q/commit/bec351564128d0b42766e1a146ff913ad4275737

この作業中にベンチマーカーが生えたので、New Relic エージェントを導入してベンチマークを回した。スコアは 500 弱だった。

![](https://i.gyazo.com/98167e5410ee827942e388234ee66317.png)

これを見て、どうやら物件検索とイス検索が遅いらしいぞと思い、手をつけ始めた。ここから最後まで New Relic のデフォルトで表示される "Most time consuming" の結果ばかり見てここが圧倒的なボトルネックだと思っていたが、今思い返すと "Slowest average response time" をもっと見るべきだった。

![](https://i.gyazo.com/5d4dd709c0ae8ef242a005b8623984b0.png)

これを見るとなぞって検索に手をいれる判断になったかなと思う。完全に練習不足が祟った。

まずは物件検索にインデックスを貼ろうと思ったが、WHERE 条件がほぼ optional でどう貼ればいいかわからなく、どのクエリが一番使われているか調べた。たぶんアクセスログからシュっと解析するのが定石なんだろうけど、そんなツールは準備していないしやったこともないので、普段使ってる BigQuery と同じノリでログテーブルを作った。

https://github.com/Monchi/isucon10q/commit/36759c2a34ab7bbe29abf40b0cb8cdd36a6de8ca

### 14:00-15:00

ログテーブルを作った状態でベンチマークを回すと、やはり `features` がよく検索されていて、ここの LIKE 検索がクソデカボトルネックだと思い込んでしまった。全然効かなくてコミットにも残ってないけど、1 時間かけて文字列ではなく feature_id を入れるようにするとか色々試した。結局 LIKE 検索を `FIELD_IN_SET` に変えるだけでインデックスも貼れず敗北した。1 人チームでこういうムーブは本当に致命的だと思った。

https://github.com/Monchi/isucon10q/commit/8a97a35c7af2c9f45f949702fe6317ae053a053c

### 15:00-16:00

↑ の解析で `rent` だけ検索率が低いこともわかったので、それを除いてインデックスを雰囲気で貼った。これもあまり効かなかったので何か違うんだと思う。

https://github.com/Monchi/isucon10q/commit/8a97a35c7af2c9f45f949702fe6317ae053a053c

この辺りで物件検索からは逃げて、なぞって検索を見始めた。シンプルな N+1 があったのでサクっと解消。流石にまあまあ効いてスコアは 700 くらいになった記憶。

https://github.com/Monchi/isucon10q/commit/956458a2b3d7ad508e4b706757e779049b0aa8d1

DB がボトルネックだから geo 系の処理を全てアプリケーション側で再実装したという話を終了後に聞いてなるほどなあと思った。

### 16:00-17:00

どうしても New Relic で見ると圧倒的にボトルネック風の物件/イス検索に目が行き再挑戦。クエリ発行は 1 トランザクションで 2 回だけだったが、それぞれがかなり重そうだったので `SQL_CALC_FOUND_ROWS` と `FOUND_ROWS()` を使って COUNT 取得のクエリを軽量化。

https://github.com/Monchi/isucon10q/commit/732f0295bf339cd9d6c92c309ea8afbec85bf54e

`SQL_CALC_FOUND_ROWS` の存在は知らなかったんだけど、ありそうだと思って必死にググったら見つけた。結構効いて 900 くらいまで上がって嬉しかった。

 それでもまだ検索が重いので、ヤケクソで適当にインデックスを貼った。ちょっとだけ効いた。本当にちょっとだけ。

https://github.com/Monchi/isucon10q/commit/e41d388e8c9bc34daa36f6c1ac017afbb491ffcc

### 17:00-18:00

コミットログで空白の 1 時間になっててマジでわからん。確かまた feature をなんとかしようとこねくり回して敗北してた気がする。

BOT アクセスを弾く時に出るエラーを解消したのだけ残ってた。

https://github.com/Monchi/isucon10q/commit/47c1244ff652b6e575947a8d4ac81ad83a799f26

### 18:00-19:00

また検索からは逃げて、手をつけていなかったオススメ物件を触り始めた。イスが入るサイズのドアに絞ってるのは面白かった。最長の辺(奥行きになる辺)は考慮しなくて良さそうだったので OR を減らした。これもちょっと効いた。

https://github.com/Monchi/isucon10q/commit/fadb9b1396a7ace5aa3bd36d0f0bd79b3695d436

OR を UNION にできるぞ！というのは ISUCON9 予選の記事を見てなんとなく知っていたのでやってみたけど、ベンチマークでコケたのでリバート。理由はよくわかっていない。

https://github.com/Monchi/isucon10q/commit/67e3a4da827124be578a0bc29b6268d90fd80fb1
https://github.com/Monchi/isucon10q/commit/ebf9e6d1f5888d325fb6ce156a97465f27e8ee86

### 19:00-20:00

やっぱり feature をなんとかせんといかんだろ！と思い立ち、1 時間かけてデータ抽出とか色々して `estate_feature` テーブルに切り出した。

https://github.com/Monchi/isucon10q/commit/32439634f0ff00a0f95bcac2f744dc26907c2ecf

これがマジで全然効かなくて辛かった。時間もないしスコアもあがらんしで焦り始めた。

### 20:00-21:00

 アプリケーション改善は完全に諦め、インフラに手をつけ始めた。まずはアプリサーバーを 3 台に分散した。これも全然効かなくてマジでビビった。

https://github.com/Monchi/isucon10q/commit/703e0c02aa8ebd6eb420631a0bc3d91bda0f2b2d
https://github.com/Monchi/isucon10q/commit/bdfa4378622d81424d21be485167afa9de0014f8

MySQL の max connection あげたり InnoDB buffer いじったりと小手先やってみたけど効かず。

https://github.com/Monchi/isucon10q/commit/bf0e3ce52b53b3f7985c4faf83a1aad8fa145e3d

諦めムードで New Relic 削除。思ったより効いて 1200 くらいまで上がり、希望を持ち始めた。

https://github.com/Monchi/isucon10q/commit/b07737a58c0ef31bc2bbabd6023c6f483c90b1e7

DB サーバー 1、アプリサーバー 2 の構成にした。残り 10 分の滑り込みだったけど一気に跳ねて 1700 弱に上がった。

https://github.com/Monchi/isucon10q/commit/9ccfe918bdf06d7dd7fcf4e49306a73afdb355b2

最後の足掻きで雰囲気インデックス貼ってフィニッシュ。

https://github.com/Monchi/isucon10q/commit/0fc5e448bf71cfe3a3084a8f7d5a5c60c193026e

## 所感

実は ISUCON8 も参戦していて、その時はチームで寝坊するくらい適当にやってしまっていた。今回は大学の後輩になった [takonomura](https://twitter.com/takonomura) の影響もちょっとあり、ちゃんと起きてちゃんと取り組んだしそれなりに惜しかったのでマジで悔しい。takonomura は本戦に行くようなので応援する。

反省としては、DB 周りの知識不足をかなり感じた。なんとなくアンチパターンは知っているんだけど、どれがどのくらい影響あるのか優先度付けができなかった。そして、そのセンスや勘所が養われていないのに計測の準備をまともにしていなかった。結果、あまりボトルネックではない `feature` に無限に時間溶かしたし、`EXPLAIN` すらまともに使えずインデックスを張ってもベンチマークスコアで雰囲気を察するしかなかった。

インフラ周りも経験が圧倒的に不足していた。DB がボトルネックなのはわかっても、テーブルごとに DB 分けるのとかは完全に盲点だった。現代だと DB を含むインフラ・ミドルウェアはマネージドサービスを使うことが多く、ここら辺の勘所を鍛えるには ISUCON のための練習が必要だなと思った。

また、今回はフルタイムワーカーになったため学生枠ではなく一般枠で参加した。学生枠なら通ってたな、などと死ぬほどダサいことが頭をよぎるが、思い返せば業務ではパフォーマンスとちゃんと向き合わず、ソフトウェア設計の方面に取り組むことばかりだった。まあ事業のフェーズ的にパフォーマンスに重きをおく時ではないが、せっかくトラフィックが得られる環境に居るんだからそれを生かして勉強したいし、胸を張ってパフォーマンスチューニングに専念できるよう事業も成長させたい。学業もそれなりに生きそうな分野なので大学生も頑張りたい。

問題はそこまでボリュームがないのに密度が異常に高くて楽しかった。運営さんありがとうございました。ISUCON11 はマジで本戦優勝まで目指して 1 年精進する！