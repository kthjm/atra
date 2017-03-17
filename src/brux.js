import EventEmitter from "eventemitter2";
import set_rcs from "./setrcs";
import cq from "./cq";

const brux = Object.assign({},EventEmitter.prototype,{

    feed : {},

    snatchemit(clone){

        this.feed = null;

        this.feed = clone;

        this.emit("snatch");

    },

    on_snatch(demand){

        this.on("snatch",demand);

    },

    off_snatch(demand){

        this.removeListener("snatch",demand);

    },

    supply(){

        return this.feed;

    },

/*--------------------------------------------------------------*/

    Brother : class {

        constructor(rcs){

            this.rcs = set_rcs(rcs);

            this.cq = cq.bind(this);

            ["init","send","fin"].forEach(method=>{

                this[method] = this[method].bind(this);

            });

        }

        init(state){

            this.clone = new Map(Object.entries(state));

        }

        send(){

            brux.snatchemit(this.clone.toObject());

        }

        fin(){

            [this.clone,this.rcs] = [this.clone,this.rcs].map(map=>{

                map.clear();

                return null;

            });

        }

    }

});

export default brux;










// import {Map,set_rcs,cq} from "./fn";
// import Map from "collections/map";
