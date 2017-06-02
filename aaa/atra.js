"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _powerAssertRecorder = function () { function PowerAssertRecorder() { this.captured = []; } PowerAssertRecorder.prototype._capt = function _capt(value, espath) { this.captured.push({ value: value, espath: espath }); return value; }; PowerAssertRecorder.prototype._expr = function _expr(value, source) { var capturedValues = this.captured; this.captured = []; return { powerAssertContext: { value: value, events: capturedValues }, source: source }; }; return PowerAssertRecorder; }(); // let enzyme = require("enzyme");

// const assert = require("power-assert");


var _powerAssert = require("power-assert");

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _atra = require("../dist/atra.js");

var _atra2 = _interopRequireDefault(_atra);

var _atra_asset = require("./atra_asset.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(beforeEach);
// console.log(describe);
// console.log(it);

var recursiveAsset = function recursiveAsset(input, output) {
    return Object.keys(input).forEach(function (key) {
        var _rec = new _powerAssertRecorder();

        return _typeof(input[key]) == "object" ? recursiveAsset(input[key], output[key]) : (0, _powerAssert2.default)(_rec._expr(_rec._capt(_rec._capt(_rec._capt(input, "arguments/0/left/object")[_rec._capt(key, "arguments/0/left/property")], "arguments/0/left") == _rec._capt(_rec._capt(output, "arguments/0/right/object")[_rec._capt(key, "arguments/0/right/property")], "arguments/0/right"), "arguments/0"), {
            content: "assert(input[key] == output[key])",
            filepath: "test/atra.js",
            line: 18
        }));
    });
};

describe("atra", function () {

    var atra = (0, _atra2.default)(_atra_asset.config);

    it("div", function () {
        var div = atra("div");
        recursiveAsset(div, _atra_asset.result.div);
    });

    it("a", function () {
        var a = atra("a", { href: "kkk.com", target: "_blank" });
        recursiveAsset(a, _atra_asset.result.a);
    });

    it("span", function () {
        var span = atra("span", { style: "#000000" });
        recursiveAsset(span, _atra_asset.result.span);
    });
});

// describe('Array', function () {
//     beforeEach(function () {
//         this.ary = [1, 2, 3];
//     });
//
//     console.log(this);
//
//     describe('#indexOf()', function () {
//         it('should return index when the value is present', function () {
//             var zero = 0, two = 2;
//             assert(this.ary.indexOf(zero) === two);
//         });
//         it('should return -1 when the value is not present', function () {
//             var minusOne = -1, two = 2;
//             assert.ok(this.ary.indexOf(two) === minusOne, 'THIS IS AN ASSERTION MESSAGE');
//         });
//     });
// });

// describe(`atra's test`,()=>{
//
//     let a = atra({
//         div:{
//             display:"inline-block"
//         }
//     });
//
//     it("Is a function?",()=>{
//
//     })
//
// })

// describe('mochaのテスト', function() {
//     it('1 + 1は2になること', function() {
//         assert.equal(1 + 1, 2);
//     });
// });