// @flow

export default (config: any) => ((name: string,arg: any) => (alloc.call(config,name,arg)))

const atraError = (name,cfg,arg) => (

    (!cfg) ? `couldn't find "${name}" in config. set "${name}".`
    :(typeof cfg == "object" && arg) ? `"${name}" is not function. so need not arg.`
    :false

);

function alloc(name,arg){

    let cfg: any = this[name];

    let error: string | boolean = atraError(name,cfg,arg);
    if(error) throw new Error(error);

    if(!arg && typeof arg != "number") return {style:retort(cfg)};

    switch(typeof arg){

    case "boolean":return retort(cfg);

    case "string":
    case "number":return retort(cfg,arg);

    case "object":return(
        ("style" in arg && Object.keys(arg).length == 1)
        ? {style:retort(cfg,arg.style)}
        : retort(cfg,arg)
    );

    }
};

const retort = (cfg,arg): any => (
    (typeof cfg == "object")
    ? cfg
    : cfg(arg)
);
