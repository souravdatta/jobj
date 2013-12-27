/*
    Under MIT license. Please see accompanied LICENSE.txt file.
    Copyright (c) Sourav Datta (soura.jagat@gmail.com)
*/

Jobj = (function () {
    var Jobj = {};
    var genFunction = function (cont, fprop) {
        return function (ctx) {
            var args, indx;
            args = [];
            for (indx = 1; indx < arguments.length; indx++) {
                args.push(arguments[indx]);
            }
            return cont[fprop].apply(ctx, args);
        };
    };
    
    // Extend a class to create a new one.   
    Jobj.extend = function (klass, objFlags) {
        var dklass = function () {};
        var isOwner = ({}).hasOwnProperty;
        var fprop;
        
        dklass.prototype = new klass();
        dklass.prototype._parent = {};
        for (fprop in klass.prototype) {            
            if (isOwner.call(klass.prototype, fprop) &&
                fprop != '_parent' &&
                typeof(klass.prototype[fprop]) == 'function') {                
                dklass.prototype._parent[fprop] = genFunction(klass.prototype, fprop);
            }
        }
                
        if (objFlags) {
            var prop;
            for (prop in objFlags) {
                if (isOwner.call(objFlags, prop) &&
                    prop != '_parent') {
                    dklass.prototype[prop] = objFlags[prop];                    
                }
            }
        }
        
        return dklass;
    };
    
    // Create an object from a Jobj class.
    Jobj.create = function(klass /*, and other init args */) {
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
    
    // A basic parent class which can be used to inherit all other classes
    // from.
    Jobj.Class = function () {
        this.name = 'a Class';
    };
    
    return Jobj;
})();
