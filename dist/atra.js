"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (config) {
    return function (name, arg) {
        return alloc.call(config, name, arg);
    };
};

var atraError = function atraError(name, cfg, arg) {
    return !cfg ? "couldn't find \"" + name + "\" in config. set \"" + name + "\"."
    // :(typeof cfg == "object" && arg) ? `"${name}" is not function. so need not arg.`
    : false;
};

function alloc(name, arg) {

    var cfg = this[name];

    var error = atraError(name, cfg, arg);
    if (error) throw new Error(error);

    if (!arg && typeof arg != "number") return { style: retort(cfg) };

    switch (typeof arg === "undefined" ? "undefined" : _typeof(arg)) {

    case "boolean":
        return retort(cfg);

    case "function":
    case "string":
    case "number":
        return retort(cfg, arg);

    case "object":
        return "style" in arg && Object.keys(arg).length == 1 ? { style: retort(cfg, arg.style) } : retort(cfg, arg);

    }
};

var retort = function retort(cfg, arg) {
    return (typeof cfg === "undefined" ? "undefined" : _typeof(cfg)) == "object" ? cfg : cfg(arg);
};
module.exports = exports["default"];