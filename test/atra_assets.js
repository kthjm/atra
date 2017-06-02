export default {

    onlyStyle:{
        config:{
            position:"relative",
            background:"#483758"
        },
        arg:false,
        out:{
            style:{
                position:"relative",
                background:"#483758"
            }
        }
    },

    onlyStyleByFunction:{
        config:(background)=>({
            background:background
        }),
        arg:{style:"#000000"},
        out:{
            style:{
                background:"#000000"
            }
        }
    },

    // needNotArgBecauseNotFunction:{
    //     config:{
    //         position:"relative",
    //         background:"#483758"
    //     },
    //     arg:true,
    //     out:`"needNotArgBecauseNotFunction" is not function. so need not arg.`
    // },

    notFindInConfig:{
        config:undefined,
        arg:true,
        out:`couldn't find "notFindInConfig" in config. set "notFindInConfig".`
    },

    AttrByObject:{
        config:{
            href:`chooslr.com`,
            target:`_blank`,
            style:{
                textDecoration:"none",
                color:"inherit"
            }
        },
        arg:true,
        out:{
            href:`chooslr.com`,
            target:`_blank`,
            style:{
                textDecoration:"none",
                color:"inherit"
            }
        }
    },

    AttrByFunction:{
        config:({href,target})=>({
            href:href,
            target:target,
            style:{
                textDecoration:"none",
                color:"inherit"
            }
        }),
        arg:{href:`chooslr.com`,target:`_blank`},
        out:{
            href:`chooslr.com`,
            target:`_blank`,
            style:{
                textDecoration:"none",
                color:"inherit"
            }
        }
    },

    zeroIsFalseButNumber:{
        config:(num)=>({
            "data-number":num,
            style:{
                position:"absolute"
            }
        }),
        arg:0,
        out:{
            "data-number":0,
            style:{
                position:"absolute"
            }
        }
    },

    argIssingleFunction:((fn)=>({
        config:(fn)=>({
            onClick:fn,
            style:{}
        }),
        arg:fn,
        out:{
            onClick:fn,
            style:{}
        }
    }))(
        (e)=>(console.log(e))
    )

};
