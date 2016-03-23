// NOTE: This doesn't work. Abandoned.
var ColorConverter = {
	rgbToXYZ: function(r, g, b) {
		var x = r ;
		var y = g;
		var z = b;

		if (x > 0.04045) {
			x = Math.pow((x + 0.055) / 1.055, 2.4);
		} else {
			x = x / 12.95;
		}
		if (y > 0.04045) {
			y = Math.pow((y + 0.055) / 1.055, 2.4);
		} else {
			y = y / 12.95;
		}
		if (z > 0.04045) {
			z = Math.pow((z + 0.055) / 1.055, 2.4);
		} else {
			z = z / 12.95;
		}


		x = x * 100;
		y = y * 100;
		z = z * 100;

		return {x: x, y: y, z: z};
	}
};

module.exports = ColorConverter;