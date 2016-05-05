'use strict';

angular.module('earApp')
.controller('ResultsCtrl', function($scope, keyboardConfig) {
	var keyboard = keyboardConfig.data;

	var chocolates = [{
	    "name": "Dairy Milk",
	        "type": "error",
	        "price": 70,
	        "rating": 0
	}, {
	    "name": "Galaxy",
	        "type": "error",
	        "price": 64,
	        "rating": 0
	}, {
	    "name": "Lindt",
	        "type": "error",
	        "price": 75,
	        "rating": 0
	}, {
	    "name": "Hershey",
	        "type": "error",
	        "price": 68,
	        "rating": 0
	}, {
	    "name": "Dolfin",
	        "type": "success",
	        "price": 72,
	        "rating": 0
	}, {
	    "name": "Bournville",
	        "type": "error",
	        "price": 70,
	        "rating": 0
	}];

	// call the method below
	showScatterPlot(chocolates);

	function showScatterPlot(data) {
	    // just to have some space around items.
	    var margins = {
	        "left": 40,
	            "right": 30,
	            "top": 30,
	            "bottom": 30
	    };

	    var width = 500;
	    var height = 300;

	    // this will be our colour scale. An Ordinal scale.
	    var colors = d3.scale.category10();

	    // we add the SVG component to the scatter-load div
	    var svg = d3.select("#scatter-load").append("svg").attr("width", width).attr("height", height).append("g")
	        .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

	    // this sets the scale that we're using for the X axis.
	    // the domain define the min and max variables to show. In this case, it's the min and max prices of items.
	    // this is made a compact piece of code due to d3.extent which gives back the max and min of the price variable within the dataset
	    var x = d3.scale.linear()
	        .domain([keyboard.startingNote.midi, keyboard.endingNote.midi])
	    // the range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
	        .range([0, width - margins.left - margins.right]);

	    // we add the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
	    svg.append("g").attr("class", "x axis");

	    // this is our X axis label. Nothing too special to see here.
	    svg.append("text")
	        .attr("fill", "#414241")
	        .attr("text-anchor", "end")
	        .attr("x", width / 2)
			.attr("y", 30)
	        .text("Price in pence (£)");


	    // this is the actual definition of our x axis. The orientation refers to where the labels appear - for the x axis, below or above the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
	    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);

	    // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
	    svg.selectAll("g.x.axis").call(xAxis);

	    // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
	    var chocolate = svg.selectAll("g.node").data(data, function (d) {
	        return d.name;
	    });

	    // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.

	    var chocolateGroup = chocolate.enter().append("g").attr("class", "node")
	    // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
	    .attr('transform', function (d) {
	        return "translate(" + x(d.price) + ")";
	    });

	    // we add our first graphics element! A circle!
	    chocolateGroup.append("circle")
	        .attr("r", 5)
	        .attr("class", "dot")
	        .style("fill", function (d) {
	            // remember the ordinal scales? We use the colors scale to get a colour for our type. Now each node will be coloured
	            // by who makes the chocolate.
	            return colors(d.type);
	    });

	    // now we add some text, so we can see what each item is.
	    chocolateGroup.append("text")
	        .style("text-anchor", "middle")
	        .attr("dy", -10)
	        .text(function (d) {
	            // this shouldn't be a surprising statement.
	            return d.name;
	    });
	}
});
