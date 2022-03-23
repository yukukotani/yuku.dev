---
title: Ubie として Twitter 投票をして webpack に $1000 寄付した
publishDate: 2021-07-19
layout: '../../../layouts/ArticleLayout.astro'
ogImage: https://i.gyazo.com/b710c14ce79c33e99c5c2bd7fec67837.png
---

Ubie で、前回の [Babel](https://babeljs.io/) に続いて [webpack](https://webpack.js.org/) に \$1000 の寄付をした。寄付のモチベーションなどは[前回の記事](https://yuku.dev/articles/2021-05-26/donate-to-oss)にまとめたので、そちらを参照してほしい。

今回は寄付のフローと振り返りをまとめる。

![](https://i.gyazo.com/b710c14ce79c33e99c5c2bd7fec67837.png)

## 寄付先の選定

今回は Ubie 社内だけでなく、エコシステム全体を支えている OSS を選出することにした。

そこで、以下のように Twitter で投票をしてもらった。投票してくれた方はありがとうございます。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Ubie で次に寄付する OSS を決めたく、投票お願いします！！！<br>僕のフォロワーに偏って欲しくないので RT してくれると嬉しいです</p>&mdash; コタニ ユウク (@yukukotani) <a href="https://twitter.com/yukukotani/status/1413427987215568902?ref_src=twsrc%5Etfw">2021年7月9日</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

投票の候補は社内で雑に募集した。インフラレイヤまで含め様々な候補が出たが、フォロワーの性質による偏りをできるだけ避けるため、JavaScript エコシステムの OSS に絞った。次回は他の分野の OSS を選出する予定。

![](https://i.gyazo.com/9159e4b4e55dadb48ad3bd8865961526.png)

投票の結果、Prettier と僅差で webpack に決定した。

## 寄付

Babel のときと同じく [Open Collective](https://opencollective.com/ubie-inc) で寄付した。ここは特筆することはない。

ただ、そんな仰々しい感じではないけど、大きめの拠出なので支払い前に社内で予算を確保する必要があった。OSS の重要性は社内で共通認識があるので、全く手間取らなかった。ついでに 1 年分確保したので、向こう 1 年は継続的に寄付をすることが確定している。

## 振り返り

Twitter で投票をとったのはおもしろかったけど、失敗だったと感じる。core-js のように、多くの OSS やサービスが依存しているが直接使われることは少ない OSS は知名度が低く、投票が集まらない。

正直、スタートアップの少ない予算では webpack のような大きい OSS に 1 社で寄付をしても焼け石に水になってしまう。当然みんながやれば力になるし、寄付をすること自体が尊いからいいんだけど、もっとレバレッジの効くところに投資する意識を持ってやっていきたい。
