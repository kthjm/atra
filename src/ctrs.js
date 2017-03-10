import PathToRegExp from "path-to-regexp";
import {rc_fulfills,command_fulfills,CommandFulfill} from "./module";

const command_types = ["_dom","_window","_react","_path","_other"];

export default (obj=>{

    command_types.forEach(type=>{

        obj[type] = (Ctr=>{

            Ctr.prototype.fulfill = rc_fulfills[type];

            return Ctr;

        })(function({cause,commands}){

            this.commands = commands.map(

                command => new CommandCtrs[cause](command,(()=>{if(cause == "_path") return true;})())

            );

        });

    });

    return obj;

})({});

const CommandCtrs = (obj=>{

    command_types.forEach(type=>{

        obj[type] = (Ctr=>{

            Ctr.prototype.fulfill = CommandFulfill;

            Ctr.prototype.fulfill_typical = command_fulfills[type];

            return Ctr;

        })(function(command,path){

            Object.entries(command)
            .forEach(keyandvalue=>{
                let [key,value] = keyandvalue;
                this[key] = value;
            });

            if(path) this.determiner = PathToRegExp(command.condition.path);

        });

    });

    return obj;

})({});

// export default RcCtrs;

// export default function* GenerateCC(cause){
//
//     yield rc_fulfills[cause];
//
//     // delete rc_fulfills[cause];
//
//     yield CommandCtrs[cause];
//
//     // delete CommandCtrs[cause];
//
//     // 消しちゃうと一回限りになっちゃう
//
// };
