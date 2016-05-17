'use strict';

angular.module('earApp')
.directive('numberline', function(keyboardConfig) {
	return {
		restrict: 'E',
		replace: false,
		link: function(scope, element, attrs) {
			showScatterPlot(scope.line, element);
			d3.selectAll('.node-correct').moveToFront();
		}
	};

	function showScatterPlot(data, element) {

		// https://github.com/wbkd/d3-extended
		d3.selection.prototype.moveToFront = function() {
			return this.each(function(){
				this.parentNode.appendChild(this);
			});
		};
		d3.selection.prototype.moveToBack = function() {
			return this.each(function() {
				var firstChild = this.parentNode.firstChild;
				if (firstChild) {
					this.parentNode.insertBefore(this, firstChild);
				}
			});
		};

		var kbdMin = keyboardConfig.getMin();
		var kbdMax = keyboardConfig.getMax();
		var notesInKeyboard = keyboardConfig.getNotesInKeyboard();

		// just to have some space around items.
	    var margins = {
	        "left": 20,
            "right": 20,
            "top": 20,
            "bottom": 20
	    };

	    var width = 500;
	    var height = 40;

	    // this will be our colour scale. An Ordinal scale.
		var pointSettings = {
			radius: {
				error: 10,
				correct: 16
			},
			class: {
				error: 'dot-error',
				correct: 'dot-correct'
			},
			dy: {
				error: 4,
				correct: 7
			}
		};

	    // we add the SVG component to the scatter-load div
	    var svg = d3.select(element[0]).append("svg").attr("width", width).attr("height", height).append("g")
	        .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

	    // this sets the scale that we're using for the X axis.
	    // the domain define the min and max variables to show. In this case, it's the min and max scores of items.
	    // this is made a compact piece of code due to d3.extent which gives back the max and min of the score variable within the dataset
	    var x = d3.scale.linear()
	        .domain([kbdMin.midi, kbdMax.midi])
	    // the range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
	        .range([0, width - margins.left - margins.right]);

	    // we add the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
	    svg.append("g").attr("class", "x axis");

	    // this is the actual definition of our x axis. The orientation refers to where the labels appear - for the x axis, below or above the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
	    // var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2).outerTickSize(0);
		var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(notesInKeyboard.length).tickPadding(2).tickFormat(function(d) {
			var index = d - kbdMin.midi;
			var el = notesInKeyboard[index];
			return el.note;
		})

	    // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
	    svg.selectAll("g.x.axis").call(xAxis);

	    // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the key. Not usually a great key, but fine for this example.
	    var datapoints = svg.selectAll("g.node").data(data, function (d) {
	        return d.key;
	    });

	    // we 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.

	    var dataGroup = datapoints.enter().append("g").attr("class", function (d) {
			var c = 'node ';
			c += d.key > 0 ? 'node-error' : 'node-correct';
			return c;
		})
	    // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
	    .attr('transform', function (d) {
	        return "translate(" + x(d.midi) + ")";
	    });


	    // we add our first graphics element! A circle!
	    dataGroup.append("circle")
	        .attr("r", function(d) {
				return pointSettings.radius[d.type];
			})
	        .attr("class", "dot");

	    // now we add some text, so we can see what each item is.
	    dataGroup.append("text")
	        .style("text-anchor", "middle")
	        .attr("dy", function(d) {
				return pointSettings.dy[d.type];
			})
	        .text(function (d) {
	            // this shouldn't be a surprising statement.
				if (d.key > 0) {
					return d.key
				} else {
					return '\uf00c'; // check icon in font awesome
				};
	    });
	}

});
