/*
    Under MIT license. Please see accompanied LICENSE.txt file.
    Copyright (c) Sourav Datta (soura.jagat@gmail.com)
*/

Jo = (function () {
    var Jo = {};
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
    Jo.extend = function (klass, objFlags) {
        var dklass = function () {};
        var isOwner = ({}).hasOwnProperty;
        var fprop;
        
        dklass.prototype = new klass();
        
        // setup Class.parent to access base class functions
        dklass._p = {};
        for (fprop in klass.prototype) {            
            if (isOwner.call(klass.prototype, fprop) &&
                fprop != '_p' &&
                typeof(klass.prototype[fprop]) == 'function') {                
                dklass._p[fprop] = genFunction(klass.prototype, fprop);
            }
        }
                
        if (objFlags) {
            var prop;
            for (prop in objFlags) {
                if (isOwner.call(objFlags, prop)) {
                    dklass.prototype[prop] = objFlags[prop];                    
                }
            }
        }
        
        // Set _class to point to it's own class
        dklass.prototype._class = dklass;
        
        return dklass;
    };
    
    // Create an object from a Jobj class.
    Jo.create = function(klass /*, and other init args */) {
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
    Jo.Class = function () {
        this.name = 'a Class';
    };
    
    return Jo;
})();
