"use strict";

// Constructor
var Ball = function(canvas, x, y) {
    var self = this;

    this.radius = 20;

    this.x = x ? x : this.radius;
    this.y = y ? y : this.radius;
    this.interval = 1; // 100 milliseconds
    this.velocity_x = 5;
    this.velocity_y = 0;
    this.elapsed = 0;
    this.gravity = 10;

    this.d3canvas = d3.select(canvas);

    this.d3circle = this.d3canvas
        .append("circle")
    ;

    this.d3canvas
        .on("keydown", function(d,i) {console.log("key"); self.restart();})
    ;

    this.d3circle
        .attr("cx", function(d){return self.x;})
        .attr("cy", function(d){return self.y;})
        .attr("r", function(d){return self.radius;})
        .style("fill", function(d){return "blue";})
    ;

    this._timer = setInterval(
        function() {
            self.update();
        },

        this.interval * 100
    );

    this.d3canvas.node().focus();
}

Ball.prototype.restart = function() {
    this.velocity_y -= 30;
}

Ball.prototype.update = function() {
    var new_elapsed = this.elapsed + this.interval;
    var self = this;

    // Acceleration due to gravity
    this.velocity_y += this.gravity;

    // Distance = speed * time
    this.x += (this.velocity_x * this.interval);
    this.y += (this.velocity_y * this.interval);

    var bounding_box = this.d3circle
        .select(function() {return this.parentNode;})
        .node()
        .getBoundingClientRect()
    ;

    var radius = parseInt(
        this.d3circle.attr("r")
    );

    if (this.x + radius >= bounding_box.width) {
        this.x = bounding_box.width - radius;
        this.velocity_x = -this.velocity_x;
    }
    else if (this.x - radius <= 0) {
        this.x = radius;
        this.velocity_x = -this.velocity_x;
    }

    if (this.y < radius) {
        this.y = radius;
        this.velocity_y = -(this.velocity_y + this.gravity);
    }

    if (this.y + radius >= bounding_box.height) {
        this.y = (bounding_box.height - radius);
        this.velocity_y = -(this.velocity_y - this.gravity);
    }

    this.d3circle
        .attr("cx", function(d){return self.x;})
        .attr("cy", function(d){return self.y;})
    ;

    this.elapsed = new_elapsed;
}

// Make globally available
window.Ball = Ball;
