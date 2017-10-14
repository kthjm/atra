# atra
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/kthjm/atra.svg)](https://travis-ci.org/kthjm/atra)
[![Coverage Status](https://coveralls.io/repos/github/kthjm/atra/badge.svg)](https://coveralls.io/github/kthjm/atra)


## Installation
## Usage
## API
## License
MIT (http://opensource.org/licenses/MIT)

<!--
**atra works for attributes in JSX.**

```sh
npm install --save atra
```
```sh
yarn add atra
```
```javascript
const atra = Atra({
    name: {} | ()=>{}
});
<div {...atra(name,arg)} />
```
`name` is string for key.

`arg` is optional.

if `(!arg && typeof arg !== "number")` return your value as `style`. else return your value as `attribute`.

```javascript
import React from "react";
import Atra from "atra";

/*
props = {
    span: {
        style: "#198237"
    },
    a: {
        href: "hoge.com",
        target: "_blank",
        children: "hoge",
        style: {
            color: "#495834"
        }
    }
};
*/

export default ({span,a}) => (
    <div {...atra("div")}
        <span {...atra("span",span)} />
        <a {...atra("a",a)} />
    </div>
);

const atra = Atra({
    div: {
        margin: 10
    },
    span: (background)=>({
        background: background
    }),
    a: ({href,target,children,style:{color}})=>({
        href: href,
        target: target,
        children: children,
        style: {
            textDecoration: "none",
            color: color
        }
    })
});
``` -->
