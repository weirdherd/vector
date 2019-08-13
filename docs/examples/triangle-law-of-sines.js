// import Interactive from 'https://unpkg.com/@interactive-svg/library/dist/Interactive.js';
import Interactive from '../Interactive.js';
import { PointWhereTwoLinesIntersect } from '../Util.js';
import SVG from '../SVG.js';
// Initialize the interactive
let id = 'triangle-law-of-sines';
let interactive = new Interactive(id);
interactive.window = true;
// Create three control points
let p1 = interactive.control(300, 75);
let p2 = interactive.control(225, 225);
let p3 = interactive.control(425, 225);
// addLabelToControl( p1, 'p1');
// addLabelToControl( p2, 'p2');
// addLabelToControl( p3, 'p3');
// Draw little angle displays
let displayAngle1 = mirrorCircle(p2);
let displayAngle2 = mirrorCircle(p3);
let group = SVG.Group();
group.appendChild(displayAngle1.root);
group.appendChild(displayAngle2.root);
interactive.svg.insertBefore(group, interactive.svg.firstChild);
function mirrorCircle(point) {
    let circle = interactive.circle(point.x, point.y, 25);
    circle.root.style.fill = 'grey';
    circle.root.style.fillOpacity = '.3';
    circle.addDependency(point);
    circle.update = function () {
        this.cx = point.x;
        this.cy = point.y;
    };
    circle.update();
    return circle;
}
// Draw a triangle for the clip path
let triangle = interactive.path('');
// triangle.root.style.fill = 'rgb(236,236,236)';
triangle.addDependency(p1);
triangle.addDependency(p2);
triangle.addDependency(p3);
triangle.update = function () {
    this.d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} Z`;
};
triangle.update();
// TODO: change this
let clipPath = SVG.ClipPath();
clipPath.id = id + '-clip-path';
clipPath.appendChild(triangle.root);
interactive.svg.appendChild(clipPath);
group.setAttribute('clip-path', `url(#${clipPath.id})`);
let line = interactive.path('');
line.addDependency(p1);
line.addDependency(p2);
line.addDependency(p3);
line.update = function () {
    let slope1 = (p3.y - p2.y) / (p3.x - p2.x);
    let slope2 = (-1 / slope1);
    let x = p1.x + 100;
    let y = slope2 * (100) + p1.y;
    let point = PointWhereTwoLinesIntersect(p1, { x: x, y: y }, p2, p3);
    this.d = `M ${p1.x} ${p1.y}
            L ${point.x} ${point.y}
            L ${p3.x} ${p3.y}
            L ${p2.x} ${p2.y} Z
            L ${p3.x} ${p3.y}`;
};
line.update();
/**
* Normalizes the angle to be within the range [0, 2 PI].
*/
function normalize(angle) {
    if (angle > 0) {
        return angle;
    }
    else {
        return 2 * Math.PI + angle;
    }
}
function addLabelToControl(control, label) {
    let text = interactive.text(0, 0, label);
    text.addDependency(control);
    text.update = function () {
        this.x = control.x + 15;
        this.y = control.y + 15;
    };
    text.update();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpYW5nbGUtbGF3LW9mLXNpbmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL2V4YW1wbGVzL3RyaWFuZ2xlLWxhdy1vZi1zaW5lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0RkFBNEY7QUFDNUYsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFDNUMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pELE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQztBQUU1Qiw2QkFBNkI7QUFDN0IsSUFBSSxFQUFFLEdBQUcsdUJBQXVCLENBQUM7QUFDakMsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFFMUIsOEJBQThCO0FBQzlCLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLElBQUksRUFBRSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLGdDQUFnQztBQUNoQyxnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBRWhDLDZCQUE2QjtBQUU3QixJQUFJLGFBQWEsR0FBRyxZQUFZLENBQUUsRUFBRSxDQUFDLENBQUM7QUFDdEMsSUFBSSxhQUFhLEdBQUcsWUFBWSxDQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4QixLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FB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