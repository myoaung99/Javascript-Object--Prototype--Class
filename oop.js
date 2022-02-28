// function hex(r, g, b) {
//   return (
//     '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
//   );
// };

// function rgb(r,g,b){
//   return `rgb(${r}, ${g}, ${b})`;
// }


// Object တစ်ခု တည်ဆောက်နည်းများ
// // Function Factory
// const makeHex = function(r,g,b){
//   const color = {};
//   color.r = r;
//   color.g = g;
//   color.b = b;
//   color.rgb = function (){
//     const {r,g,b} = this;
//     return `rgb(${r}, ${g}, ${b})`;
//   }

//   color.hex = function (){
//     return (
//       '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
//     );
//   }
//   // Return object 
//   return color;
// }

// const color = makeHex(12,233,23);
// const color2 = makeHex(122,32,12);


// Constractor Function
// function Color(r, g, b) {
//   this.r = r;
//   this.g = g;
//   this.b = b;
// }

// Color.prototype.rgb = function () {
//   const {
//     r,
//     g,
//     b
//   } = this;
//   return `rgb(${r}, ${g}, ${b})`;
// }

// Color.prototype.hex = function (){
//   const {r,g,b} = this;
//   return (
//            '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
//          );
// }

// const color1 = new Color(121, 2, 121);
// const color2 = new Color(11, 222, 1);


class Color {
  constructor(r, g, b) {
      this.r = r,
      this.g = g,
      this.b = b,
      this.calcHSL();
  }

  innerRGB() {
    const {
      r,
      g,
      b
    } = this;
    return `${r}, ${g}, ${b}`;
  }
  rgba(a = 1) {
    return `rgba(${this.innerRGB()}, ${a})`;
  }
  rgb() {
    return `rgb(${this.innerRGB()})`;
  }
  hex() {
    const {
      r,
      g,
      b
    } = this;
    return (
      '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    );
  }
  opposite(){
    const {h,s,l} = this;
    const newHue = (h+180) % 360;
    return `hsl(${newHue}, ${s}%, ${l}%)`
  }
  fullySaturated(){
    const {h,l} = this;
    return `hsl(${h}, 100%, ${l}%)`
  }
  hsl(){
    const {h,s,l} = this;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  calcHSL() {
		let { r, g, b } = this;
		// Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r)
			// Red is max
			h = ((g - b) / delta) % 6;
		else if (cmax == g)
			// Green is max
			h = (b - r) / delta + 2;
		else
			// Blue is max
			h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;
		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		this.h = h;
		this.s = s;
		this.l = l;
	}
}

const c1 = new Color(122, 21, 12);
const c2 = new Color(12, 225, 211);