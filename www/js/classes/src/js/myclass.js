function MyClass(selector) {
    console.log("Instatiated base class");
    this.d3_reference = d3.select(selector);
    this.x = 0;
    this.init();
}

MyClass.prototype.init = function() {
    var obj = this;

    this._timer = setInterval(
        function() {
            obj.update();
        },

        100
    );
}

MyClass.prototype.update = function() {
    console.log(this.x);
    this.x += 5;
    
    if (this.x >= 100) {
        clearInterval(this._timer);
    }
}

window.MyClass = MyClass;

function MyDerivedClass(selector) {
    MyClass.call(this, selector);
    
    console.log("Instatiated subclass");
}

MyDerivedClass.prototype.init = function() {
}

window.MyDerivedClass = MyDerivedClass;