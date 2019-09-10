import SVG from '../SVG.js';
import Element from './Element.js';

/**
* An ellipse is a basic element with a position, x-radius, and y-radius
*/
export default class Ellipse extends Element {

  // make the type of the root to be more specific
  root: SVGEllipseElement;

  /**
  * Constructs a ellipse element at the position (cx,cy) with a rx and ry radius.
  */
  constructor( cx:number, cy:number, rx:number, ry:number ) {
    let ellipse = SVG.Ellipse(cx, cy, rx, ry);
    super(ellipse);
  }

  /**
  * Returns the x position of the rectangle
  */
  get cx() : number {
    return this.root.cx.baseVal.value;
  }

  /**
  * Sets the x position of the rectangle
  */
  set cx( n:number ) {
    this.root.cx.baseVal.value = n;
  }

  /**
  * Returns the y position of the rectangle
  */
  get cy():number {
    return this.root.cy.baseVal.value;
  }

  /**
  * Sets the y position of the rectangle
  */
  set cy( n:number){
    this.root.cy.baseVal.value = n;
  }

  /**
  * Returns the width of the rectangle
  */
  get rx() : number {
    return this.root.rx.baseVal.value;
  }

  /**
  * Sets the width of the rectangle
  */
  set rx( n:number ) {
    this.root.rx.baseVal.value = n;
  }

  /**
  * Returns the height of the rectangle
  */
  get ry() : number {
    return this.root.ry.baseVal.value;
  }

  /**
  * Sets the height of the rectangle
  */
  set ry( n:number ) {
    this.root.ry.baseVal.value = n;
  }

  /**
  * Translates the ellipse to a new position by changing the x and y attributes.
  */
  translate(x:number, y:number) {
    this.root.cx.baseVal.value = this.root.cx.baseVal.value + x;
    this.root.cy.baseVal.value = this.root.cy.baseVal.value + y;
  }

  /**
  * Returns the fill style of this ellipse
  */
  get fill() : string {
    return this.root.style.fill;
  }

  /**
  * Sets the fill style of this ellipse
  */
  set fill(s:string) {
    this.root.style.fill = s;
  }

  /**
  * Returns the stroke style of this ellipse
  */
  get stroke() : string {
    return this.root.style.stroke;
  }

  /**
  * Sets the stroke style of this ellipse
  */
  set stroke(s: string) {
    this.root.style.stroke = s;
  }
}
