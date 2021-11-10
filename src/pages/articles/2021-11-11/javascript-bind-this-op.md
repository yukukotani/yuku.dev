---
title: JavaScript の Bind Operator プロポーザルが復活した
publishDate: 2021-11-11
layout: '../../../layouts/ArticleLayout.astro'
---

10 月 の TC39 Meeting で [Bind-this operator](https://github.com/tc39/proposal-bind-this) が提案された。これは 4 年前から Stage 0 で止まっている [Bind operator](https://github.com/tc39/proposal-bind-operator) の後継にあたる提案で、期待しているので要点をまとめる。

## Bind-this operator とは

この提案は、[`Function.prototype.bind()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) と [`Function.prototype.call()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call) の糖衣構文となる演算子 `::` を追加する。

```js
const fn = (arg) => { ... }
const ns = {
  fn: (arg) => { ... }
}
const createFn = () => {
  return (arg) => { ... }
}

// With bind-this operator
receiver::fn
receiver::fn(arg)
receiver::ns.fn(arg)
receiver::(createFn())

// Without bind-this operator
fn.bind(receiver)
fn.call(receiver, arg)
ns.fn.call(receiver, arg)
createFn().bind(receiver)
```

この演算子は左結合の二項演算子で、MemberExpression (`obj.prop`) や CallExpression (`call()`)、NewExpression (`new Clazz()`) と同等の優先順位を持つ。そのため、以下のように書くことができる。

```js
obj.prop::fn; // -> (obj.prop)::fn
call()::fn; // -> (call())::fn
new Clazz()::fn; // -> (new Clazz())::fn
```

## モチベーション

`.bind` と `.call` はめっちゃ使われている。[Gzemnid](https://github.com/nodejs/Gzemnid) を用いてダウンロード数トップ 1000 の npm パッケージを調査すると、それぞれ 5 番目と 2 番目に多く使われているメソッドらしい。

| Occurrences | Method        |
| ----------: | ------------- |
|   1,016,503 | `.map`        |
|     315,922 | **`.call`**   |
|     271,915 | `console.log` |
|     182,292 | `.slice`      |
|     170,248 | **`.bind`**   |
|     168,872 | `.set`        |
|      70,116 | `.push`       |

Gzemnid は[ざっくりしていて](https://github.com/nodejs/Gzemnid#deception)完璧に信用はできないが、十分に使われていることはわかる。

特に Node や Deno などの JavaScript ランタイムや polyfill 系ライブラリでは、プロトタイプ汚染などを避けるために多用されている。

にもかかわらず、`.bind` と `.call` は自然言語の SVO 的な思考の流れに反していてむずかしい。実際のユースケースで見比べてみるとわかる。

```js
// bluebird@3.5.5/js/release/synchronous_inspection.js
return isPending.call(this._target());
return this._target()::isPending();

// ajv@6.10.0/lib/ajv.js
validate = macro.call(self, schema, parentSchema, it);
validate = self::macro(schema, parentSchema, it);

// typescript@3.5.1/lib/tsc.js
return fn ? fn.bind(obj) : undefined;
return obj?.::fn;
```

また、その他のモチベーション・ユースケースとしては [Extensions と同じように](https://yuku.dev/articles/2021-07-18/javascript-extensions#%E3%83%A2%E3%83%81%E3%83%99%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%A6%E3%83%BC%E3%82%B9%E3%82%B1%E3%83%BC%E3%82%B9)以下が想像できる。

- null をレシーバにできる
- メソッド単位で機能を提供できる
- Pipeline Operator と OOP 風 API の相性が悪い

## 他の提案との関係

### Bind operator

Bind-this operator は 4 年前から議論が止まっている [Bind operator](https://github.com/tc39/proposal-bind-operator) の後継にあたる。Bind operator は Champion が不在のため実質的に凍結状態で、動かしたい場合は[新規に提案を作ることが推奨されている](https://github.com/tc39/proposal-bind-operator/issues/56#issuecomment-698444297)。

今回の提案での大きな変更は、単項演算子としての `::` を除いた点。新旧の提案ではこのように異なる。

```js
// 旧
::receiver.fn(arg);
// 新
receiver::receiver.fn(arg);
// 以下と同等
receiver.fn.bind(rec)(arg);
```

こう見ると、新提案はレシーバ自身が関数を含む場合に二度レシーバを書く手間があるように見えるが、旧提案では this を暗黙的に束縛することになり、近年の ECMAScript の流れとは逆行するため議論を呼んでいた。そのため、新提案ではこれをスコープ外としている。

旧 Bind operator について詳しくは以下を参照してほしい。<br />
[どうなる bind operator proposal](https://qiita.com/shinout/items/f4385acdda42d7c8c4be)

### Extensions

Bind-this operator は [Extensions](https://github.com/tc39/proposal-extensions) の競合にあたる。つまりこれらが同時に仕様に入ることはない。

端的に表現すると、Extensions に比べて Bind-this operator はよりシンプル。`.bind` と `.call` が難しいという問題だけにフォーカスしている。

Extensions は専用の名前空間を新規に作ったりプロパティアクセサの暗黙的呼び出しがあったりと複雑で、Stage 4 到達にはなかなか苦戦しそう。

Extensions について詳しくは以下を参照してほしい。<br />
[JavaScript に拡張メソッドを導入するプロポーザル](https://yuku.dev/articles/2021-07-18/javascript-extensions)

Bind-this operator と Extensions の比較について詳しくは以下を参照してほしい。<br />
[The extensions system and the bind-this operator](https://github.com/tc39/proposal-bind-this/blob/main/extensions-comparison.md)

### Pipe operator

Bind-this operator は [Pipe operator](https://github.com/tc39/proposal-pipeline-operator) と競合するように見えて、実はしない。むしろ共存する前提でシンプルさを保っている。
具体的にはこのように書ける。

```js
// Adapted from chalk@2.4.2/index.js
// Current
build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);

// With only Bind-this
this::build(this._styles ? this._styles.concat(codes) : [codes]);

// With only Pipe
this._styles
  |> (^ ? ^.concat(codes) : [codes])
  |> build.call(this, ^, this._empty, key)

// With Bind-this and Pipe
this._styles
  |> (^ ? ^.concat(codes) : [codes])
  |> this::build(^, this._empty, key);
```

Pipe operator について詳しくは以下を参照してほしい。<br />
[[ECMAScript] Pipe operator 論争まとめ – F# か Hack か両方か](https://www.kabuku.co.jp/developers/pipe-operator-debate)

## 個人的な期待

Extensions の時も思ったがやはり、this をきれいに扱えることは TypeScript と組み合わせることで真価を発揮すると思う。具体的には、このようにシンプルなオブジェクトと関数を OOP-like に扱えることを期待している。

```ts
const getFullName = function (this: { firstName: string, lastName: string }) {
  return `${this.firstName} ${this.lastName}`
}

({ firstName: 'Yuku', lastName: 'Kotani' })::getFullName() // 'Yuku Kotani'
({ firstName: 'Yuku' })::getFullName() // Compile Error
```

`.bind` とか `.call` とかアプリケーションコードで書いたことないよって人が大半だと思うが、実際はこんな便利パターンができうるので、機能を絞って現実的に議論できる提案が出たのは嬉しい。応援したい。
