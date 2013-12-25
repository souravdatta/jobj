/*
    Under MIT license. Please see accompanied LICENSE.txt file.
    Copyright (c) Sourav Datta (soura.jagat@gmail.com)
*/

Jobj = (function () {
    var Jobj = {};
    
    // Extend a class to create a new one.   
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
