<h1 align="center" style="border-bottom: none;">ConcurrentArray</h1>
<h3 align="center">Run array higher order functions asynchronously with concurrency control</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/@sebowy/concurrent-array"><img alt="npm latest version" src="https://img.shields.io/npm/v/@sebowy/concurrent-array/latest.svg"></a>
  <a href="https://github.com/sebastianowy/concurrent-array/actions?query=workflow%3ATest+branch%3Amain"><img alt="Build states" src="https://github.com/sebastianowy/concurrent-array/workflows/Test/badge.svg"></a>
  <a href="https://github.com/semantic-release/semantic-release"><img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg"></a>
</p>

## Installation

```bash
npm install --save @sebowy/concurrent-array
# or
yarn add @sebowy/concurrent-array
```

## Usage

### Examples

- async sorting

```js
import { ConcurrentArray } from "@sebowy/concurrent-array";

const array = [3, 5, 1, 2, 4];
const asyncArray = new ConcurrentArray(array, {
  maxConcurrency: 10,
});
asyncArray
  .sort((left, right) => new Promise((resolve) => setTimeout(() => resolve(left - right), 1000)), {
    maxConcurrency: 5, // overwrite max concurrency for sort array operation
  })
  .then(console.log);
```

will produce:

```bash
[1, 2, 3, 4, 5]
```

respecting allowed maximum concurrency.

### Learn more

Please refer to [@sebowy/concurrent-queue](https://www.npmjs.com/package/@sebowy/concurrent-queue) and [@sebowy/async-array](https://www.npmjs.com/package/@sebowy/async-array) README files to learn more about possible options and methods.