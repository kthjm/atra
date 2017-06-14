# atra
[![npm version](https://img.shields.io/npm/v/atra.svg)](https://www.npmjs.com/package/atra)
[![Build Status](https://travis-ci.org/kthjm/atra.svg?branch=master)](https://travis-ci.org/kthjm/atra)
[![Coverage Status](https://coveralls.io/repos/github/kthjm/atra/badge.svg?branch=master)](https://coveralls.io/github/kthjm/atra?branch=master)
[![Code Climate](https://codeclimate.com/github/kthjm/atra/badges/gpa.svg)](https://codeclimate.com/github/kthjm/atra)

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
```
