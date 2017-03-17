export default function(e){

    let {rcs,clone,send} = this;

    if(!clone) return false;

    rcs.forEach(rc=>{

        if(!rc.commands.length || !rc.fulfill(e)) return false;

        rc.commands.forEach(command=>{

            if(!command.fulfill(e,clone)) return false;

            if(e.persist) e.persist();

            (arg=>{

                if(!command.condition.gentle) return command.business(...arg);

                else command.condition.gentle_id = (({gentle,gentle_id})=>{

                    if(gentle_id) clearTimeout(gentle_id);
                    return setTimeout(()=>command.business(...arg),gentle);

                })(command.condition);

            })([
                e,
                q(command.query,clone),
                s(command.query,clone),
                send
            ]);

        });

    });

}

const q = (query,clone) => (obj=>{

    query.forEach(nec=>{obj[nec] = clone.get(nec);});

    return obj;

})({});

const s = (query,clone) => function(key,val){

    if(!query.filter(qr=>qr==key).length){

        console.error(`this business can't touch ${key}. registered is ${query}.`);

        return false;

    }

    clone.set(key,val);

};
