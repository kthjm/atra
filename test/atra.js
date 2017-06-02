import assert from "assert";
import Atra from "../src/atra.js";
import assets from "./atra_assets.js";

describe("atra",() => {

    const atra = Atra(
        (Object.entries(assets))
        .map(([key,{config}])=>({[key]:config}))
        .reduce((pre,cur)=>(Object.assign(pre,cur)))
    );

    (Object.keys(assets)).forEach((key)=>{
        it(key,()=>{
            let {arg,out} = assets[key];
            switch(typeof out){
            case "object": return assert.deepStrictEqual(atra(key,arg),out);
            case "string": return assert.throws(
                ()=>(atra(key,arg)),
                (err)=>{
                    if(err instanceof Error && err.message == out) return true;
                }
            );
            }
        })
    });

});
























// let enzyme = require("enzyme");
// const assert = require("power-assert");
// import Atra from "../dist/atra.js";

// it("div",() => {
//     let div = atra("div");
//     assert.deepStrictEqual(div,out.div);
// });
//
// it("a",() => {
//     let a = atra("a",{href:`chooslr.com`,target:`_blank`});
//     assert.deepStrictEqual(a,out.a);
// });
//
// it("span",() => {
//     let span = atra("span",{style:"#000000"});
//     assert.deepStrictEqual(span,out.span);
// });


// const recursiveAsset = (input,output) => (
//
//     (Object.keys(input))
//       .forEach((key)=>(
//           typeof input[key] == "object"
//           ? recursiveAsset(input[key],output[key])
//           : assert(input[key] == output[key])
//       ))
//
// )

// console.log(beforeEach);
// console.log(describe);
// console.log(it);

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
