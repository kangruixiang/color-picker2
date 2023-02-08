export function hslToHex(h: number, s: number, l: number) {
	l /= 100;
	let a = (s * Math.min(l, 1 - l)) / 100;
	let f = (n) => {
		let k = (n + h / 30) % 12;
		let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0'); // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToHSL(H: string) {

	if (typeof H !== "string") {
		console.log("Color is not in string format")
		return
	}
	// Convert hex to RGB first
	let r = 0,
		g = 0,
		b = 0;
	if (H.length == 4) {
		r = '0x' + H[1] + H[1];
		g = '0x' + H[2] + H[2];
		b = '0x' + H[3] + H[3];
	} else if (H.length == 7) {
		r = '0x' + H[1] + H[2];
		g = '0x' + H[3] + H[4];
		b = '0x' + H[5] + H[6];
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta == 0) h = 0;
	else if (cmax == r) h = ((g - b) / delta) % 6;
	else if (cmax == g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(0);
	l = +(l * 100).toFixed(0);

	// hue.set(h);
	// saturation.set(s);
	// value.set(l);

	return { h, s, l };
}

export function constArray(start: number, stop: number, step: number) {
	return Array.from({
		length: (stop - start) / step + 1
	}, (value, index) => start + index * step
	)
}