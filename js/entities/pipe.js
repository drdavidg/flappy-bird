var graphicsComponent = require("../components/graphics/pipe");

var Pipe = function() {
    console.log("Creating Pipe entity");

		var pipe = new graphicsComponent.PipeGraphicsComponent(this);
    this.components = {
			pipe: pipe
    };
};

exports.Pipe = Pipe;
