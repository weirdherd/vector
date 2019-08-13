import Element from './Element.js';
import SVG from '../SVG.js';
/**
* A circle is a basic element with a position and radius.
*/
export default class Circle extends Element {
    /**
    * Constructs a rectangle element at the position (x,y)
    */
    constructor(cx, cy, r) {
        super();
        this.root = SVG.Circle(cx, cy, r);
        this.root.classList.add('default');
        this.root.id = this.id;
    }
    /**
    * Returns the radius of this circle.
    */
    get r() {
        return this.root.r.baseVal.value;
    }
    /**
    * Sets the value of the radius of this circle.
    */
    set r(value) {
        this.root.r.baseVal.value = value;
    }
    /**
    * Returns the x position of the rectangle
    */
    get cx() {
        return this.root.cx.baseVal.value;
    }
    /**
    * Sets the x position of the rectangle
    */
    set cx(n) {
        this.root.cx.baseVal.value = n;
    }
    /**
    * Returns the y position of the rectangle
    */
    get cy() {
        return this.root.cy.baseVal.value;
    }
    /**
    * Sets the y position of the rectangle
    */
    set cy(n) {
        this.root.cy.baseVal.value = n;
    }
    /**
    * Translates the circle to a new position by changing the x and y attributes.
    */
    translate(x, y) {
        this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
        this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
    }
    /**
    * Returns the fill style of this circle
    */
    get fill() {
        return this.root.style.fill;
    }
    /**
    * Sets the fill style of this circle
    */
    set fill(s) {
        this.root.style.fill = s;
    }
    /**
    * Returns the stroke style of this circle
    */
    get stroke() {
        return this.root.style.stroke;
    }
    /**
    * Sets the stroke style of this circle
    */
    set stroke(s) {
        this.root.style.stroke = s;
    }
}
//# sourceMappingURL=Circle.js.map