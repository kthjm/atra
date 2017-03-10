export const rc_fulfills = {

    _dom(e){

        if(!e.currentTarget) return false;

        if(e.currentTarget === window) return false;

        if(!e.currentTarget.nodeName) return false;

        return true;

    },

    _window(e){

        if(!e.currentTarget) return false;

        if(e.currentTarget !== window) return false;

        // if(e.currentTarget.nodeName) return false;

        return true;

    },

    _path(e){

        if(!e.currentTarget) return false;

        if(e.currentTarget !== window) return false;

        return true;

    },

    _react(e){

        if(e.currentTarget) return false;

        // if(e.currentTarget === window) return false;
        //
        // if(e.currentTarget.nodeName) return false;

        return true;

    },

    _other(e){

        // if(e.currentTarget === window) return false;

        return true;

    }

};

export function CommandFulfill(e,clone){

   let condition = this.condition;

   if(e.type !== condition.type) return false;

   if("prevent" in condition){

       if(condition.prevent(e,Object.assign({},clone.toObject()))) return false;

   }

   if(this.fulfill_typical(e,condition)) return true;

};

export const command_fulfills = {

    _dom(e,condition){

        if("id" in condition && condition.id !== e.target.id) return false;

        if("className" in condition && e.target.getAttribute("class").indexOf(condition.className) == -1) return false;

        return true;

    },

    _window(e,condition){

        if(e.currentTarget !== window) return false;

        return true;

    },

    _react(e,condition){

        if("name" in condition && e.name !== condition.name) return false;

        return true;

    },

    _path(e,condition){

        if(this.determiner.exec(location.pathname)) return true;

        else return false;

    },

    _other(e,condition){return false;}

};
