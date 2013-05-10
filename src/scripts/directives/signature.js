/*
To Do
- test validity - use in forms
- add clear hook
- add pen tip option
- smoother pen stroke - http://twistedoakstudios.com/blog/Post3138_mouse-path-smoothing-for-jack-lumber?utm_source=html5weekly&utm_medium=email
- border option
- other API features - http://thomasjbradley.ca/lab/signature-pad/
*/

angular.module('io.directives').directive('signature', ['io.config', function(config) {
	var canvas, ctx, output = [], previous = {};
	//config = config.signature;
	return {
		restrict: 'EAC',
		replace: true,
		scope: {
			width: '@',
			height: '@'//,
			//onClear: '@'
		},
		template: '<canvas width="{{width}}" height="{{height}}"></canvas>',
		require: 'ngModel',
		link: function(scope, element, attrs, controller) {
			console.log(scope);
			console.log(element);
			console.log(attrs);
			console.log(controller);

			//canvas = element.children()[0];
			canvas = element[0];
			ctx = canvas.getContext('2d');

			// functions
			function mouseOffset(e) {
				// get offsets
				var pageX,pageY, totalOffsetX = 0, totalOffsetY = 0, currentElement = canvas;

				// global position of mouse pointer
				/*if (e.pageX || e.pageY) {
					pageX = e.pageX;
					pageY = e.pageY;
				}
				else {
					pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}*/

				// global position of canvas top-left
				do{
					totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
					totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
				}
				while(currentElement = currentElement.offsetParent);

				// calc grab offset - on mouse down only
				return {
					top:(e.clientY - totalOffsetY),
					left:(e.clientX - totalOffsetX)
				};
			}

			function drawLine(e) {
				var offset = mouseOffset(e);
				var newX = offset.left,
					newY = offset.top;
				if (previous.x === newX && previous.y === newY) { return; }
				if (previous.x === null) { previous.x = newX; }
				if (previous.y === null) { previous.y = newY; }

				ctx.beginPath();
				ctx.moveTo(previous.x, previous.y);
				ctx.lineTo(newX, newY);
				//ctx.lineCap = settings.penCap
				ctx.stroke();
				ctx.closePath();

				output.push({
					'lx': newX,
					'ly': newY,
					'mx': previous.x,
					'my': previous.y
				});
				previous.x = newX;
				previous.y = newY;

				controller.$modelValue = output;
				controller.$setValidity('signature', true);
			}



			function clear() {
				ctx.save();
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.restore();

				// init draw
				// x ---------- // 'x ' = 8px, '- ' = 4px
				var padding = 10, dash = '';
				for (var i = (canvas.width - 2*padding - 8*1.5); i > 0; i -= 5) {
					dash += '-';
				}
				ctx.font = '15px sans-serif';	// set text font
				ctx.textBaseline = 'bottom';	// set text position
				ctx.fillText('x'+dash, padding, canvas.height - padding); // str, x, yield

				// set validity false
				controller.$setValidity('signature', false);
			}

			canvas.onmousedown = function(e) {
				previous.x = null;
				previous.y = null;
				canvas.onmousemove = drawLine;
				document.onselectstart = null;
			};
			canvas.onmouseup = function() {
				canvas.onmousemove = null;
				previous.x = null;
				previous.y = null;
			};

			// catch render

			function drawSignature(paths, context) {
				for (var i in paths) {
					if (typeof paths[i] === 'object') {
						context.beginPath();
						context.moveTo(paths[i].mx, paths[i].my);
						context.lineTo(paths[i].lx, paths[i].ly);
						//context.lineCap = config.penCap;
						context.stroke();
						context.closePath();
					}
				}
			}

			controller.$render = function() {
				output = controller.$modelValue || [];
				clear();
				drawSignature(output, ctx);
				controller.$setValidity('signature', (output.length));
			};
		}
	};
}]);
