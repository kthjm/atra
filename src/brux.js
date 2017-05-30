import EventEmitter from "eventemitter2";
import set_rcs from "./setrcs";
import cq from "./cq";

const brux = Object.assign({},EventEmitter.prototype,{

    feed : {},

    recievemit(clone){
        this.feed = null;
        this.feed = clone;
        this.emit("recieve");
    },

    // syncemit(clone){
    //     this.feed = null;
    //     this.feed = clone;
    //     this.emit("sync");
    // },

    onRecieve(demand){
        this.on("recieve",demand);
    },

    offRecieve(demand){
        this.removeListener("recieve",demand);
    },

    supply(){
        return this.feed;
    },
    // on_sync(synced){
    //     this.on("sync",synced);
    // },
    //
    // off_sync(synced){
    //     this.removeListener("sync",synced);
    // },


/*--------------------------------------------------------------*/

    Brother : class {

        constructor(cqNeeds){

            cqNeeds.forEach(({name,causes})=>{
                this.cqs[name] = cqMaker(name).bind(this);
                this.causes[name] = set_rcs(causes);
            });

            if(addMessageListenerNeed(cqs)){
                window.addEventListener("message",this.cq);
            }

            // rcs
            // this.rcs = set_rcs(rcs);
            // this.cq = cq.bind(this);
            ["init","send","sync","fin"].forEach((method)=>{
                this[method] = this[method].bind(this);
            });
        }

        init(state){
            this.clone = new Map(Object.entries(state));
        }

        send(){
            brux.snatchemit(this.clone.toObject());
        }

        // sync(){
        //     brux.syncemit(this.clone.toObject());
        // }

        fin(){
            [this.clone,this.rcs] = [this.clone,this.rcs].map((map)=>{
                map.clear();
                return null;
            });
        }

    }

});

const addMessageListenerNeed = (cqs) => {

    let _workerExists = cqs.filter(({rcs})=>{
        let causes = rcs.map(({cause})=>(cause));
        return causes.includes("_worker");
    });

    return Boolean(_workerExists.length);

}

new Brother({
    name:name,
    causes:[
        {
            cause:"",
            commands:[]
        },
        {
            cause:"",
            commands:[]
        },
        {
            cause:"",
            commands:[]
        }
    ]
});

// new Brother([
//
//     {
//         name:name,
//         causes:[
//             {
//                 cause:"",
//                 commands:[]
//             }
//         ]
//     },
//
//     {
//         name:name,
//         causes:[]
//     }
//
// ])

brux.onRecieve = brux.onRecieve.bind(brux);
brux.offRecieve = brux.offRecieve.bind(brux);
brux.supply = brux.supply.bind(brux);
export default brux;










// import {Map,set_rcs,cq} from "./fn";
// import Map from "collections/map";
