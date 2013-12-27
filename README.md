jobj
====

A simple JavaScript object system with basic inheritance support. Inheritance in JavaScript is done thourgh setting the `prototype` property of a function object. The property chains of prototype objects are inspected when a property is not found in the immediate object. `jobj` library offers an alternate way of doing the same albeit allowing function overriding present in the traditional ways found in Object oriented languages like C++, Java or Smalltalk. This wrapper makes it easy to create class hierarchies and effectively use base class functions in child class's overridden methods. 

A class is created by calling `Jobj.extend` and passing the name of the parent class. The second optional argument is a hash of all the instance variables and methods for the current object. The `init` function, if defined, becomes the constructor of the new class. But it is not automatically called if `new ClassName()` is used. To create an object with Jobj library, use `Jobj.create` method and pass all the initialization parameters to it along with the class name. 

The immediate parent class methods are available to the child object through `Class.parent` object, where Class refers to the child class name. However, calling functions through `Class.parentt` requires to pass the context (that is the value of `this`, the child object) as the first argument. This is ugly - yes! But later this can be modified to something more graceful!

See the `jobj.html` for examples.
