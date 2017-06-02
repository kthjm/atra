"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = exports.config = {
    div: {
        position: "relative",
        background: "#483758"
    },
    a: function a(_ref) {
        var href = _ref.href,
            target = _ref.target;
        return {
            href: href,
            target: target,
            style: {
                textDecoration: "none",
                color: "inherit"
            }
        };
    },
    span: function span(background) {
        return {
            background: background
        };
    }
};

var result = exports.result = {
    div: {
        style: {
            position: "relative",
            background: "#483758"
        }
    },
    a: {
        href: "chooslr.com",
        target: "_blank",
        style: {
            textDecoration: "none",
            color: "inherit"
        }
    },
    span: {
        style: {
            background: "#000000"
        }
    }
};