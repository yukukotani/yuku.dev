---
title: GitHub Flavored Markdown のテーブルの仕様
publishedAt: 2020-11-11 04:56
publishDate: "Tuesday, June 8 2021"
layout: "../../../layouts/BlogPost.astro"
---

GitHub Flavored Markdown のテーブル仕様([原文](https://github.github.com/gfm/#tables-extension-))について簡単にまとめる。

## 言葉の定義

- ヘッダ行: テーブルの１行目。`<tr><th></th></tr>` 相当。
- デリミタ行: テーブルの２行目。セルの文字揃えを決定する。
- データ行: テーブルの３行目以降。`<tr><td></td></tr>` 相当。
- セル: パイプ(`|`)で区切られたそれぞれの中身。

## 仕様

テーブルには最低限、ヘッダ行とデリミタ行が必要。データ行はなくてもよい。

Input:

```markdown
| foo | bar |
| --- | --- |
```

Output:

```html
<table>
  <thead>
    <tr>
      <th>foo</th>
      <th>bar</th>
    </tr>
  </thead>
</table>
```

---

デリミタ行のセルはハイフン(`-`)とコロン(`:`)で構成され、それぞれの列の文字揃えを決定する。ハイフンのみだと指定なし（左揃え）、両端にコロンがつくと中央揃え、始端のみにコロンがつくと左揃え、終端のみにコロンがつくと右揃えになる。

Input:

```markdown
| foo | bar | yaa |
| :-- | :-: | --: |
| bee | poo | nuu |
```

Output:

```html
<table>
  <thead>
    <tr>
      <th align="left">foo</th>
      <th align="center">bar</th>
      <th align="right">yaa</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="left">bee</td>
      <td align="center">poo</td>
      <td align="right">nuu</td>
    </tr>
  </tbody>
</table>
```

---

左右端のパイプはなくてもよいが、あった方がパーサーに優しいのでおすすめ。

Input:

<!-- prettier-ignore -->
```markdown
| foo | bar 
 --- | --- 
 bee | poo |
```

Output:

```html
<table>
  <thead>
    <tr>
      <th>foo</th>
      <th>bar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bee</td>
      <td>poo</td>
    </tr>
  </tbody>
</table>
```

---

セルの中身とパイプの間の空白は詰められる。

Input:

<!-- prettier-ignore -->
```markdown
| foo |   bar           |
| --- |   --- |
|        bee |    poo |
```

Output:

```html
<table>
  <thead>
    <tr>
      <th>foo</th>
      <th>bar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bee</td>
      <td>poo</td>
    </tr>
  </tbody>
</table>
```

---

セルの中身はインライン要素としてパースされる。ブロック要素を含めることはできない。

Input:

```markdown
| **foo** | bar   |
| ------- | ----- |
| bee     | _poo_ |
```

Output:

```html
<table>
  <thead>
    <tr>
      <th><strong>foo</strong></th>
      <th>bar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bee</td>
      <td><em>poo</em></td>
    </tr>
  </tbody>
</table>
```

---

セルの中身にパイプを含めたい場合はエスケープが必要。

Input:

```markdown
| f\|oo | bar       |
| ----- | --------- |
| bee   | p**\|o**o |
```

Output:

```html
<table>
  <thead>
    <tr>
      <th>f|oo</th>
      <th>bar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bee</td>
      <td>p<strong>|o</strong>o</td>
    </tr>
  </tbody>
</table>
```

---

テーブルは別のブロックレベル要素か空行がきたら終わる。

Input:

```markdown
| foo | bar |
| --- | --- |
| bee | poo |

> pyoeee
```

Output:

```html
<table>
  <thead>
    <tr>
      <th>foo</th>
      <th>bar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bee</td>
      <td>poo</td>
    </tr>
  </tbody>
</table>
<blockquote>
  <p>pyoee</p>
</blockquote>
```

Input:

<!-- prettier-ignore -->
```markdown
| foo | bar |
| --- | --- |
| bee | poo |
pyoe

kuoo
```

Output:

```html
<table>
  <thead>
    <tr>
      <th>foo</th>
      <th>bar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bee</td>
      <td>poo</td>
    </tr>
    <tr>
      <td>pyoe</td>
      <td></td>
    </tr>
  </tbody>
</table>
<p>kuoo</p>
```

---

ヘッダ行とデリミタ行の列数は一致する必要がある。

Input:

<!-- prettier-ignore -->
```markdown
| foo | bar |
| --- |
| bee |
```

Output:

<!-- prettier-ignore -->
```html
<p>| foo | bar |
| --- |
| bee |</p>
```

---

データ行はヘッダ行やデリミタ行の列数と一致している必要はなく、ヘッダ行に合わせて切り詰められたりする。

Input:

```markdown
| foo | bar |
| --- | --- | --- |
| bee |
| poo | yaa | nuu |
```

Output:

```html
<table>
  <thead>
    <tr>
      <th>foo</th>
      <th>bar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bee</td>
      <td></td>
    </tr>
    <tr>
      <td>poo</td>
      <td>yaa</td>
    </tr>
  </tbody>
</table>
```

---

データ行がない場合、`<tbody>`は生成されない。

Input:

```markdown
| foo | bar |
| --- | --- |
```

Output:

```html
<table>
  <thead>
    <tr>
      <th>foo</th>
      <th>bar</th>
    </tr>
  </thead>
</table>
```
