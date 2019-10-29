import Circle from '../svg/circle.js';
import Group from '../svg/group.js';
import Line from '../svg/line.js';
import Path from '../svg/path.js';
import Rectangle from '../svg/rectangle.js';
import SVG from '../svg/svg.js';
import Text from '../svg/text.js';

/**
* These options control the configuration of a plot object when it is created.
*/
export interface PlotOptions {

  /**
  * When set to true allows the user to zoom in/out and pan using the mouse
  * scroll event and clicking and dragging. Default value is false.
  */
  zoomable?:boolean;

  /**
  * When set to true displays a point representing the output of the function
  * for the current x-location of the user's mouse.
  */
  displayPoint?:boolean;

  /**
  * When set to true displays a grid representing the current scale of the plot
  */
  grid?:boolean;

  /**
  * Controls how much the plot is scaled in the x direction.
  */
  scaleX?:number;

  /**
  * Controls how much the plot is scaled in the y direction.
  */
  scaleY?:number;

  /**
  * Sets the x origin of the internal coordinate system relative to the top left
  * corner of the plot.
  */
  originX?:number;

  /**
  * Sets the y origin of the internal coordinate system relative to the top left
  * corner of the plot.
  */
  originY?:number;
  border?:boolean;
  controls?:boolean;
}

/**
* Returns the closest power of ten. TODO: replace this with an optimized
* function that remembers the last closest power of ten and first checks the
* adjacent powers of ten and then continues.
*/
function expTrunc(x:number) {

  // constants so don't have to count zeros
  const N06 =  1000000;
  const N05 =   100000;
  const N04 =    10000;
  const N03 =     1000;
  const N02 =      100;
  const N01 =       10;
  const N00 =        1;
  const N_1 =      0.1;
  const N_2 =     0.01;
  const N_3 =    0.001;
  const N_4 =   0.0001;
  const N_5 =  0.00001;
  const N_6 = 0.000001;

  if( x >= N06 ) {
    return N06;
  } else if ( x > N05) {
    return N05;
  } else if ( x > N04) {
    return N04;
  } else if ( x > N03) {
    return N03;
  } else if ( x > N02) {
    return N02;
  } else if ( x > N01) {
    return N01;
  } else if ( x > N00) {
    return N00;
  } else if ( x > N_1) {
    return N_1;
  } else if ( x > N_2) {
    return N_2;
  } else if ( x > N_3) {
    return N_3;
  } else if ( x > N_4) {
    return N_4;
  } else if ( x > N_5) {
    return N_5;
  } else if ( x > N_6) {
    return N_6;
  }
}

/**
* A plot of the graph of a function.
*/
export default class Plot extends Group {

  /**
  * Invisible element for registering events
  */
  rect : Rectangle;

  /**
  * This view port is a coordinate system where things are scaled using svg's
  * internal representatino of scaling.
  */
  viewPort : SVG;

  /**
  * This static group gets translated along witht he viewPort, but elements
  * retain their original sizing.
  */
  staticGroup : Group;

  /**
  * Represents the path taken by the function.
  */
  fPath : Path;

  /**
  * A display circle to display input and output
  */
  displayCircle: Circle;

  /**
  * A line to represent the x-axis of this graph
  */
  xAxis : Line;

  /**
  * A line to represent the y-axis of this graph
  */
  yAxis : Line;

  /**
  * A group containing the grid lines
  */
  grid: Group;

  // elements
  xRect : Rectangle;
  yRect : Rectangle;
  xText : Text;
  yText : Text;

  /**
  * Keeps track of whether a translate is active or not.
  */
  private active : boolean;

  /**
  * The function that is currently being displayed for this graph.
  */
  private _function : (x:number) => number;

  // actual height and width of plot element
  private x : number;
  private y : number;
  private width : number;
  private height : number;

  // represents the transformation from svg coordinate system to internal
  private scaleX : number;
  private scaleY : number;

  // these variables represent the internal coordinate system of the plot
  private internalX : number;
  private internalY : number;
  private visibleWidth : number;
  private visibleHeight : number;

  // keeps track of the previous mouse position
  private prevX : number;
  private prevY : number;

  /**
  * Constructs a new graph capable of displaying a function in the form of
  * x -> y. The user is able to drag, zoom-in, and zoom-out on the graph to
  * explore the shape and form of the function.
  */
  constructor( width :number = 600, height:number = 300, fn:(x:number) => number, options:PlotOptions ) {
    super();

    // default configuration options
    let defaultOptions:PlotOptions = {
      scaleX:1,
      scaleY:1,
      grid:true,
      zoomable:false, // experimental
      displayPoint:false, // experimental
      controls:false // experimental
    };

    // combine the default configuration with the user's configuration
    let config = { ...defaultOptions, ...options};

    // event variables
    this.prevX = 0;
    this.prevY = 0;
    this.active = false;
    this._function = fn;

    // calculate the visible dimensions and top-left position of svg coordinates
    this.x = -width/2;
    this.y = -height/2;
    this.width = width;
    this.height = height;

    // creates a transparent rectangle to capture all user events
    this.rect = this.rectangle(0, 0, this.width, this.height);
    this.rect.style.fill = 'transparent';
    if( config.border === undefined || config.border ) {
      this.rect.style.border = '1px solid #404040';
    } else {
      this.rect.style.stroke = 'none';
    }

    // default values
    this.viewPort = this.svg(0, 0, this.width, this.height);
    this.viewPort.setAttribute('preserveAspectRatio','none');

    // create a static group for non-size-scaling objects
    this.staticGroup = this.group();
    this.xAxis = this.staticGroup.line(-10000, 0, 10000, 0);
    this.yAxis = this.staticGroup.line( 0, -10000, 0, 10000);
    this.staticGroup.circle(0, 0, 3).fill = '#404040';

    // initialize the scaling
    this.scaleX = config.scaleX;
    this.scaleY = config.scaleY;

    // calculate the visible dimensions and top-left position of internal coordinates
    this.visibleWidth = this.width/this.scaleX;
    this.visibleHeight = this.height/this.scaleY;
    this.internalX = -this.visibleWidth/2;
    this.internalY = -this.visibleHeight/2;

    this.fPath = this.staticGroup.path('');
    // this.fPath.root.setAttribute('vector-effect','non-scaling-stroke');
    this.fPath.setAttribute('transform', 'scale(1, -1)');

    this.setViewBox();

    if( config.originX != undefined && config.originY != undefined){
      this.setOrigin(config.originX, config.originY);
    }

    // draw a grid of rectangles
    if( config.grid ) {
      this.grid = this.viewPort.group();
      this.grid.classList.add('grid');
      this.grid.style.opacity = '.4';
      this.drawGrid();
    }

    // store a temp variable for registering events
    let graph = this;

    // Registers event listeners
    if( config.displayPoint === undefined || config.displayPoint ) {

      // create a display circle for showing input and output
      this.displayCircle = this.staticGroup.circle(0,0,4);
      this.displayCircle.style.fill = 'cornflowerblue';
      this.displayCircle.setAttribute('transform', 'scale(1, -1)');

      this.xRect = this.rectangle(0, 0, 125, 40);
      this.yRect = this.rectangle(120, 0, 125, 40);
      this.xRect.root.style.fill = 'white';
      this.yRect.root.style.fill = 'white';

      this.xText = this.text( 15, 20, 'x:0');
      this.xText.root.style.dominantBaseline = 'middle';
      this.xText.root.style.whiteSpace = 'pre';

      this.yText = this.text( 125 + 15, 20, 'y:0');
      this.yText.root.style.dominantBaseline = 'middle';
      this.yText.root.style.whiteSpace = 'pre';

      this.root.addEventListener('mousemove', function( event:MouseEvent) {
        graph.handleMouseMove(event);
      });

    }

    if( config.zoomable === undefined || config.zoomable ) {
      this.root.addEventListener('mousedown', function( event:MouseEvent) {
        graph.handleMouseDown(event);
      });
      this.root.addEventListener('mouseup', function( event:MouseEvent) {
        graph.handleMouseUp(event);
      });
      this.root.addEventListener('mouseleave', function( event:MouseEvent) {
        graph.handleMouseLeave(event);
      });
      this.root.addEventListener('mousewheel', function( event:WheelEvent) {
        graph.handleMouseWheelEvent(event);
      }, {passive:false});
    }

    if( config.controls ) {
      let zoomIn = this.rectangle( this.width - 48, 16, 30, 30);
      zoomIn.setAttribute('rx', '3');
      zoomIn.style.fill = '#f8f8f8';
      let zoomOut = this.rectangle( this.width - 48, 46, 30, 30);
      zoomOut.setAttribute('rx', '3');
      zoomOut.style.fill = '#f8f8f8';
      let fullscreen = this.circle( this.width - 32, this.height - 32, 16);
      fullscreen.style.fill = '#f8f8f8';
    }

    // draw the initial state of the graph
    this.draw();
  }

  /**
  * Sets the internal function to the provided function
  */
  set function( f:(x:number) => number ) {
    this._function = f;
  }

  /**
  * Returns the internal function
  */
  get function() : (x:number) => number {
    return this._function;
  }

  get originX():number {
    return - this.x;
  }

  get originY():number {
    return - this.y;
  }

  /**
  * Updates the display circle based on its current cx position, also updates
  * the display text elements to represent the position of the display circle.
  */
  updateDisplayCircle() {
    // Set the initial display position
    if( this.displayCircle != undefined ) {
      let cy = this.call(this.displayCircle.cx, false);
      if( isNaN(cy)) {
        this.displayCircle.cy = 0;
      } else if( isFinite(cy) ){
        this.displayCircle.cy = cy;
        this.xText.contents = this.format(this.displayCircle.cx/this.scaleX);
        this.yText.contents = this.format(this.displayCircle.cy/this.scaleY);
      } else {
        this.displayCircle.cy = this.height*3;;
        this.xText.contents = this.format(this.displayCircle.cx/this.scaleX);
        this.yText.contents = cy.toString();
      }
    }
  }

  /**
  * Returns the result of calling the internal function with the provided
  * function scaling both the input and the output.
  */
  call( x:number, trim = false ) : number {

    // call and scale the function
    let y = this.scaleY*this._function(x/this.scaleX);

    // normalize big/small y values
    if( trim ) {
      let margin = 8;
      let yMax = this.y + this.height + margin;
      let yMin = this.y - margin;
      if( -y > yMax ) { y = -yMax; }
      if( -y < yMin ) { y = -yMin; }
    } else {
      let yMin = this.y - this.height;
      let yMax = this.y + 2*this.height;
      if( -y > yMax ) { y = -yMax; }
      if( -y < yMin ) { y = -yMin; }
    }
    return y;
  }

  /**
  * Formats the input number to be displayed within the graph.
  */
  format( n:number ) : string {
    if ( n > 10000 || n < -10000 || (n < .01 && n > -.01)) {
      return n.toExponential(2);
    } else {
      return n.toPrecision(4);
    }
  }

  /**
  * Draws the internal function over the interval [startX, endX]. The default
  * interval is [ minX - width, maxX + width ] so that when a user drags the
  * graph there is enough drawn so that a translate may be applied instead of
  * having to call draw again.
  */
  draw( startX = this.x - this.width, endX = this.x + 2*this.width, trim = false ) {

    this.setViewBox();
    this.updateDisplayCircle();

    // Start drawing the function
    let start = false;
    let x = startX;
    let y = this.call(x, false);
    let d : string = '';
    let prev : number;

    // If y is valid input start drawing
    if(!isNaN(y)) {
      d = `M ${x} ${y} `;
      prev = y;
      start = true;
    }

    // Loop through and draw coordiantes of the function path
    for( x+=1; x < endX; x+=1 ){
      let y = this.call(x, trim);
      if(isNaN(y) || !isFinite(y)) {
        continue;
      }
      // check for vertical asymptotes or if we haven't started drawing
      else if( Math.abs(prev - y) >= this.height || !start ) {
        d += `M ${x.toFixed(1)} ${y.toFixed(1)} `;
        start = true;
      } else {
        d += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      }
      prev = y;
    }
    this.fPath.d = d;

    // Update the dependents if there are any
    this.updateDependents();
  }

  /**
  *
  */
  drawGrid() {

    // clear all the children
    this.grid.clear();

    // TODO: use a combination of these metrics below to calculate the spacing
    // between two grid lines. I am guessing the goal is to space grid lines
    // somewhere between 10 - 50 pixels in the actual coordinate system
    let pixelsX = 200*this.visibleWidth/this.width;
    let pixelsY = 200*this.visibleHeight/this.height;
    let spacingX = expTrunc(pixelsX);
    let spacingY = expTrunc(pixelsY);

    // TODO: use the static group for this?
    let minX = this.internalX - this.visibleWidth;
    let maxX = this.internalX + 2*this.visibleWidth;
    let minY = this.internalY - this.visibleHeight;
    let maxY = this.internalX + 2*this.visibleWidth;

    console.log(spacingX, spacingY);

    let x = -10*spacingX;
    while( x < maxX ) {
      if( x >= minX ) {
        this.grid.line(x, minY, x, maxY);
      }
      x += spacingX;
    }

    let y = -10*spacingY;
    while( y < maxY ) {
      if( y >= minY ) {
        this.grid.line(minX, y, maxX, y);
      }
      y += spacingY;
    }

    // // horizontal lines
    // for( let i = minY; i <= maxY; i += spacingX ) {
    //   this.grid.line(minX, i, maxX,  i);
    // }
    //
    // // vertical lines
    // for( let i = minX; i <= maxX; i += spacingY ) {
    //   this.grid.line( i, minY,  i, maxY);
    // }

  }

  /**
  * When a user mouses down over this graph a drag is active.
  */
  handleMouseDown( event:MouseEvent ) {
    this.active = true;
    this.prevX = event.clientX;
    this.prevY = event.clientY;
  }

  /**
  * Deactivates the current drag event.
  */
  handleMouseUp( _event:MouseEvent ) {
    this.active = false;
  }

  /**
  * When the user's mouse leaves the graph deactivates any concurrent drag.
  */
  handleMouseLeave( event:MouseEvent ) {
    this.handleMouseUp(event);
  }

  /**
  * Updates the position of the static group and sets the viewbox on the
  * viewPort element.
  */
  setViewBox() {
    this.staticGroup.setAttribute('transform',`translate(${-this.x}, ${-this.y})`);
    this.viewPort.setAttribute('viewBox', `${this.internalX} ${this.internalY} ${this.visibleWidth} ${this.visibleHeight}`);
  }

  /**
  * This moves the origin of the plot to the location (x,y) relative to the size
  * of the plot. For example, if the plot is 600 wide and 300 tall, placing the
  * origin at (100,100) move the origin to the point 100 units in the x
  * direction and 100 units in the y direction from the top left corner of the
  * plot.
  */
  setOrigin( x:number, y:number ) {
    this.x = -x;
    this.y = -y;
    this.internalX = this.x/this.scaleX;
    this.internalY = this.y/this.scaleY;
    this.draw();
  }

  /**
  * Handle when a mouse moves over this graph. If a drag event is active then
  * translates the position of the graph to the new location.
  */
  handleMouseMove( event:MouseEvent ) {
    if( this.active ) {
      let deltaX = event.clientX - this.prevX;
      let deltaY = event.clientY - this.prevY;
      this.x -= deltaX;
      this.y -= deltaY;
      this.internalX -= deltaX/this.scaleX;
      this.internalY -= deltaY/this.scaleY;
      this.prevX = event.clientX;
      this.prevY = event.clientY;
      this.draw();
    } else {
      let br = this.rect.root.getBoundingClientRect();
      if( this.displayCircle != undefined ) {
        this.displayCircle.cx = event.clientX - br.left + this.x;
        this.updateDisplayCircle();
      }
    }
  }

  /**
  * Zooms in and out on this graph. TODO: There is some jarring wheel action
  * where an active wheel event on the page will stop dead when the mouse
  * goes over the graph. Also it seems as if the scroll has pre-existing
  * "momentum" that it can also affect the graph.
  */
  handleMouseWheelEvent( event:WheelEvent ) {
    event.preventDefault();

    let zoomIntensity = .02;
    let br = this.rect.root.getBoundingClientRect();
    let x = event.clientX - br.left;
    let y = event.clientY - br.top;

    let wheel = event.deltaY < 0 ? 1 : -1;
    let zoom = Math.exp(wheel*zoomIntensity);

    // transform the internal coordinate system
    let deltaX = x/(this.scaleX*zoom) - x/this.scaleX;
    let deltaY = y/(this.scaleY*zoom) - y/this.scaleY;
    this.internalX -= deltaX;
    this.internalY -= deltaY;
    this.scaleX *= zoom;
    this.scaleY *= zoom;
    this.visibleWidth = this.width/this.scaleX;
    this.visibleHeight = this.height/this.scaleY;

    // update the elements in the static (svg) coordinate system
    this.x = this.internalX*this.scaleX;
    this.y = this.internalY*this.scaleY;

    // update the position of the display circle
    if( this.displayCircle != undefined ) {
      this.displayCircle.cx = event.clientX - br.left + this.x;
    }

    // redraw visual elements
    this.drawGrid();
    this.draw();
  }

  /**
  *
  */
  export() : SVG {
    let result = new SVG(0, 0, this.width, this.height);

    let margin = 8;

    // trim axis
    this.xAxis.x1 = this.x;
    this.xAxis.x2 = this.x + this.width;
    this.yAxis.y1 = this.y;
    this.yAxis.y2 = this.y + this.height;

    // draw trimmed version
    this.draw(this.x - margin, this.x + this.width + margin, true);

    return result;
  }
}
