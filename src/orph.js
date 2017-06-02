
import Map from "collections/map"
import causeClasses from "./orphans/causeClasses.js";

// import type {causebefore} from "./arguxType.js";

const workerString = 'self.addEventListener("message",(e)=>(postMessage(e.data)))';
const ww = new Worker(URL.createObjectURL(new Blob([workerString])));
const postMessage = ww.postMessage.bind(ww);

const addMessageListenerNeed = (causes) => (causes.map(({cause})=>(cause)).includes("worker"));

export default (causes) => {

    let closureThis = {
        addWorkerNeed: (!ww) ? false : addMessageListenerNeed(causes),
        realCauses: causes.map((_cause)=>{
            let {cause} = _cause;
            let CauseClass = causeClasses[cause];
            return new CauseClass(_cause);
        })
    };

    return{
        create:(react: react)=>(create.call(closureThis,react)),
        removeWorkerListener: (
            (!closureThis.addWorkerNeed)
            ? false
            : (argus)=>(ww.removeEventListener("message",argus))
        )
    };

}

const create = (react) => {

    let {state,setState} = react;

    if(this.clone) this.clone.clear();
    this.clone = new Map(Object.entries(state));

    if(this.render) this.render = null;
    this.render = Render(setState.bind(react),this.clone);

    let newArgus = argus.bind(this);
    if(this.addWorkerNeed) ww.addEventListener("message",newArgus);
    return newArgus;

}

const Render = (setStateBinded,clone) => (
    () => (setStateBinded(clone.toObject()))
)

const argus = (e) => (

    this.realCauses
      .filter(({nodes,prevent})=>(nodes.length && !prevent(e)))
      .forEach(({nodes})=>(

        nodes
          .filter((node)=>(!node.prevent(e,clone)))
          .forEach((node)=>(
              doBusiness(e,node,this)
          ))

    ))

);

const doBusiness = (e,node,closureThis) => {

    let {condition,stateKeys,business} = node;
    let {clone,render} = closureThis;

    let businessArg = [e,orderClone(stateKeys,clone),{
        set:orderSet(stateKeys,clone),
        render:render,
        post:(condition.ww) ? postMessage : undefined
    }];

    if(!condition.gentle) return business(...businessArg);

    let {gentle,gentleTimer} = condition;
    if(gentleTimer){
        clearTimeout(gentleTimer);
        condition.gentleTimer = false;
    }
    if(e.persist) e.persist();
    condition.gentleTimer =  setTimeout(()=>(business(...businessArg)),gentle);

}

const orderClone = (stateKeys,clone): any => (
    stateKeys
      .map((stateKey)=>({[stateKey]:clone.get(stateKey)}))
      .reduce((pre,cur)=>(Object.assign(pre,cur)))
);

const orderSet = (stateKeys,clone) => (
    (key,val) => (sharedSet(stateKeys,clone,key,val))
);

const sharedSet = (stateKeys,clone,key,val) => {
    if(!stateKeys.includes(key)){
        console.error(`this business can't touch "${key}". registered is [${stateKeys}].`);
        return false;
    }
    return clone.set(key,val);
}


// const [ww,postMessage] = (
//     (Worker)
//     ? [undefined,undefined]
//     : ((workerString)=>{
//         let ww = new Worker(URL.createObjectURL(new Blob([workerString])));
//         return [ww,ww.postMessage.bind(ww)];
//     })('self.addEventListener("message",(e)=>(postMessage(e.data)))')
// )
