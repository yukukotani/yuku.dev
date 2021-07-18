---
title: JavaScript に拡張メソッドを導入するプロポーザル
publishDate: 2021-07-18
layout: '../../../layouts/ArticleLayout.astro'
---

この前 zenn に投稿した[型パズル記事](https://zenn.dev/yuku/articles/45bb0d6cf3da85)の文脈で Stage 1 の [Extensions](https://github.com/tc39/proposal-extensions) が気になっていて、[tc39_study](https://web-study.connpass.com/event/213676/) で誰か説明してくれるやろと思ってたけど取り上げられなかったので、内容とステータスを調べてまとめる。

## Extensions とは

※ まだ Stage 1 なので大きく変わる可能性があり、あくまで現段階でのコンセプト。

このプロポーザルでは、拡張メソッドと拡張アクセサを定義するための構文を新たに導入する。

```js
const ::at = function (i) {
  return this[i >= 0 ? i : this.length + i]
}

[1, 2, 3]::at(-1) // 3
```

拡張メソッドは、`::` prefix をつけて定義する。そして、従来のメソッド呼び出しの `.` の代わりに `::` を使うことで、メソッドと同じように呼び出すことができる。この時、`::at` 内の `this` はレシーバ `[1, 2, 3]` に束縛される。

つまり、このコードは大まかに次のコードと同義である。

```js
const $at = function (i) {
  return this[i >= 0 ? i : this.length + i];
};

$at.call([1, 2, 3], -1); // 3
```

拡張アクセサも同様に定義できる。

```js
const ::last = {
  get() { return this[this.length - 1] },
  set(v) { this[this.length - 1] = v },
}

let a = [1, 2, 3]
a::last // 3
a::last = 4
a // [1, 2, 4]
```

また、`obj::ext:name` という構文を用いて、他の名前空間にある関数も拡張メソッドとして扱うことができる。

```js
import * as lo from 'lodash'

[1, 2, -3]
 ::lo:last()
 ::Math:abs() // 3
```

この場合は、`this` を束縛するのではなく、関数の第一引数にレシーバが渡される。

名前空間として渡されたオブジェクトがコンストラクタの場合は、prototype を参照する。

```js
({})::Object:hasOwnProperty('key')

// おおまかに同じ
Object.prototype.hasOwnProperty.call({}, 'key')
```

## モチベーション・ユースケース

lodash のようなライブラリをより直感的に実装できる他、以下がある。

### null をレシーバにできる

こういうことができる。

```js
const ::hasOwnProperty = function (key) {
  return typeof this === 'object' && this.hasOwnProperty(key)
}

let o = { key: 'value' }
o.hasOwnProperty('key') // true
o::hasOwnProperty('key') // true

o = null
o.hasOwnProperty('key') // TypeError: Cannot read property 'hasOwnProperty' of null
o::hasOwnProperty('key') // false
```

### メソッド単位で機能を提供できる

なにか実験的な機能を任意で提供したいときに、以下のように提供することができるようになる。

```js
import CoreApi = 'core-package'
import { experimentalFunction } from 'experimental-addon-package'

CoreApi::experimentalFunction()
```

### Pipeline Operator と OOP 風 API の相性が悪い

Extensions と似た方向性のプロポーザルとして、現在 Stage 1 の [Pipeline Operator](https://github.com/tc39/proposal-pipeline-operator) がある。ここでは詳細を省くが、F# や OCaml にあるようなパイプライン演算子を導入するものだ。

これは関数型のアプローチでは非常に便利だが、JavaScript のビルトインオブジェクトを含む OOP 風の実装とは相性が悪い。例えば、以下のコードは期待通りに動かない。

```js
const at = (a, i) => { ... }

'Hello world'
  .split(' ')
  |> at(0)
  .toUpperCase()
  |> at(-1)
```

パイプライン演算子の優先度が低いからだ。これを意図通りに動かすには、以下のようにカッコでくくったり無駄な関数オブジェクトを生成したりする必要がある。

```js
const at = (a, i) => { ... }

('Hello world'
  .split(' ')
  |> at(0))
  .toUpperCase()
  |> at(-1) // 'o'
```

```js
const at = (a, i) => { ... }

'Hello world'
  |> x => x.split(' ')
  |> at(0)
  |> x => x.toUpperCase()
  |> at(-1) // 'o'
```

これに対して、拡張メソッドは通常のメソッドと同様に、以下のように書ける。

```js
const ::at = (i) => { ... }

'Hello world'
  .split(' ')
  ::at(0)
  .toUpperCase()
  ::at(-1) // 'o'
```

## 状況

2020 年 11 月の TC39 会議で提案され、そのまま Stage 1 に進んだ。ここでは、2 つの懸念が Stage 1 に持ち越された。

1 つは、パイプライン演算子と拡張メソッドで実質的に同じことができてしまい、混乱を招くこと。もう 1 つは、他の名前空間の関数を用いるときに、コンストラクタかどうかによって魔法的な挙動をすることだ。

その後は提案者の HE Shi-Jun 氏が TC39 会議に出席していなく、特に進展がない。

## 所感

TypeScript でこんな感じにかけるとうれしいなーとおもっている。This Parameter を満たす場合のみ補完に出てくれるとさらにうれしい。

```ts
const ::getFullName = function (this: { firstName: string, lastName: string }) {
  return `${this.firstName} ${this.lastName}`
}

({ firstName: 'Yuku', lastName: 'Kotani' })::getFullName() // 'Yuku Kotani'
({ firstName: 'Yuku' })::getFullName() // Compile Error
```
