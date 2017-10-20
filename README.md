# atra
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/kthjm/atra.svg)](https://travis-ci.org/kthjm/atra)
[![Coverage Status](https://coveralls.io/repos/github/kthjm/atra/badge.svg)](https://coveralls.io/github/kthjm/atra)

Deal with attribute separately by immutable / mutable in Component.

## Installation
```shell
yarn add atra
```
## Usage
```js
import React from 'react'
import Atra from 'atra'

export default (props) => (
  <div {...atra(`div`, { className: props.foo ? "hoge" : "" })}>
    <span {...atra(`span1`)} />
    <span {...atra(`span2`, {
      style: {
        transition: props.bar && "1s",
        opacity: props.bar ? 1 : 0
      }
    })} />
  </div>
)

const atra = Atra({
  div: {
    id: "semantic",
    style: {
      position: "relative"
    }
  },
  span1: {
    className: "fuga",
    style: {
      color: "#483738"
    }
  },
  span2: {
    style: {
      color: "#482716",
      opacity: 0.5 // <= ignore
    }
  }
})
```

## API
#### `Atra({ [name]: immutable })`
#### `atra(name[, mutable])`

`immutable`, `mutable` is used as attribute object.

## License
MIT (http://opensource.org/licenses/MIT)
