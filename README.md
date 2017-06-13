## atra
[![Build Status](https://travis-ci.org/kthjm/atra.svg?branch=master)](https://travis-ci.org/kthjm/atra)

**atra works for attributes in JSX.**

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
        children: "hoge"
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
    a: ({href,target,children})=>({
        href: href,
        target: target,
        children: children,
        style: {
            textDecoration: "none",
            color: "inherit"
        }
    })
});
```
