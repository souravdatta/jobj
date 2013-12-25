/*
    Under MIT license. Please see accompanied LICENSE.txt file.
    Copyright (c) Sourav Datta (soura.jagat@gmail.com)
*/

Jobj = (function () {
    var Jobj = {};
    
    // Extend a class to create a new one   
    Jobj.extend = function (klass, objFlags) {
        var dklass = function () {};
        
        dklass.prototype = new klass();
        dklass.prototype.parent = klass.prototype;
        if (objFlags) {
            var prop;
            for (prop in objFlags) {
                if (({}).hasOwnProperty.call(objFlags, prop) &&
                    prop != 'parent') {
                    dklass.prototype[prop] = objFlags[prop];
                }
            }
        }
        
        return dklass;
    };
    
    Jobj.create = function(klass) {
        var args = [], indx;
        for (indx = 1; indx < arguments.length; indx++) {
            args.push(arguments[indx]);
        }
        
        var inst = new klass();
        if (inst.init && typeof(inst.init) == 'function') {
            inst.init.apply(inst, args);
        }
        
        return inst;
    };
    
    Jobj.Class = function () {
        this.name = 'a Class';
    };
    
    return Jobj;
})();
