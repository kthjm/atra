const fs = require("fs");
const path = require("path");
const packagejson = path.resolve(process.cwd(),"package.json");
const message_for_commit = "./cm.txt";

fs.readFile(packagejson,(err,data)=>{

    if(err) console.error(err);

    fs.writeFileSync(

        packagejson,

        (jsn=>{

            let newversion = (
                jsn.version.split(".")
                .map((v,i,a)=>{
                    if(i == a.length-1) return String(Number(v)+1);
                    else return v;
                }).join(".")
            );

            console.log(`${jsn.version} => ${newversion}`);

            jsn.version = newversion;

            fs.writeFileSync(message_for_commit,newversion);

            return JSON.stringify(jsn,null,"  ");

        })(JSON.parse(data.toString()))

    );

});








// var pack = (pj=>{
//
//     pj.version = "0.0.4";
//
//     return pj;
//
// })
// (JSON.parse(data.toString()));
//
// (js=>{
//
//     fs.writeFileSync("test.json",js);
//
// })(JSON.stringify(pack,null,"  "))
