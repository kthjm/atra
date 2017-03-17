const fs = require("fs");
const path = require("path");

const [package_json,message_for_commit] = ["package.json","cm.txt"].map(file=>path.resolve(process.cwd(),file));

(pj=>fs.writeFileSync(

    package_json,

    (new_ver=>{

        console.log(`${pj.version} => ${new_ver}`);

        pj.version = new_ver;

        fs.writeFileSync(message_for_commit,new_ver);

        return JSON.stringify(pj,null,"  ");

    })(
        pj.version.split(".")
        .map((v,i,a)=>{
            if(i == a.length-1) return String(Number(v)+1);
            else return v;
        }).join(".")
    )

))(

    require(package_json)

);






// fs.readFile(package_json,(err,data)=>{
//
//     if(err) console.error(err);
//
//     fs.writeFileSync(
//
//         package_json,
//
//         (jsn=>{
//
//             let new_ver = (
//                 jsn.version.split(".")
//                 .map((v,i,a)=>{
//                     if(i == a.length-1) return String(Number(v)+1);
//                     else return v;
//                 }).join(".")
//             );
//
//             console.log(`${jsn.version} => ${new_ver}`);
//
//             jsn.version = new_ver;
//
//             fs.writeFileSync(message_for_commit,new_ver);
//
//             return JSON.stringify(jsn,null,"  ");
//
//         })(JSON.parse(data.toString()))
//
//     );
//
// });








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
