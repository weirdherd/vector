/**
* An interactive to demonstrate how the radius of a circle can be used to
* measure the angle between two rays.
*
* @title Unit Circle Angle
* @date June 9, 2019
* @author Kurt Bruns
*/
import Interactive from '../Interactive.js';
// Initialize the interactive
let id = 'unit-circle-angle';
let interactive = new Interactive(id);
interactive.window = false;
interactive.width = 320;
interactive.height = 340;
interactive.originX = interactive.width / 2;
interactive.originY = 125;
// Create a circle
let circle = interactive.circle(0, 0, 100);
// Create a control
let control = interactive.control(circle.r * Math.cos(-1), circle.r * Math.sin(-1));
control.constrainToCircle(circle.cx, circle.cy, circle.r);
// Create a path
let path = interactive.path('');
path.root.style.fill = 'gray';
path.root.style.fillOpacity = '.3';
path.update = function () {
    let flag = (control.y > 0) ? 1 : 0;
    path.d = `M 0 0
            L ${circle.r} 0
            L ${circle.r / 3} 0
            A ${circle.r / 3} ${circle.r / 3} 0 ${flag} 0 ${control.x / 3} ${control.y / 3}
            L ${control.x} ${control.y}
            z`;
};
path.update();
path.addDependency(control);
// Create a point at the origin
let point = interactive.circle(0, 0, 3);
point.fill = 'black';
// Create a checkbox to toggle between displaying radians and degrees
let degrees = interactive.checkBox(-80, 180, "degrees", false);
// Gets the normalized angle between zero and tau. TODO: Maybe transform the
// coordinate system so that the positive y-direction is up instead of down.
// UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
// as expected: the text element was upside down, but maybe that could be
// reversed? bleh.
function getAngle() {
    let angle;
    if (control.y <= 0) {
        angle = Math.abs(Math.atan2(control.y, control.x));
    }
    else {
        angle = Math.PI * 2 - Math.atan2(control.y, control.x);
    }
    if (degrees.value) {
        return (angle * 180 / Math.PI).toFixed(1) + '°';
    }
    else {
        return angle.toFixed(3) + ' rad';
    }
}
// Create text to display the current angle. TODO: add a check-box to change
// between radians and degrees
let text = interactive.text(0, 150, "test");
text.addDependency(control);
text.update = function () {
    text.contents = `angle = ${getAngle()}`;
};
text.addDependency(degrees);
text.update();
text.x = -text.root.textLength.baseVal.value / 2;
export { interactive, control };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5nbGUtZml4ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvZXhhbXBsZXMvYW5nbGUtZml4ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7RUFPRTtBQUVGLE9BQU8sV0FBVyxNQUFNLG1CQUFtQixDQUFDO0FBRTVDLDZCQUE2QjtBQUM3QixJQUFJLEVBQUUsR0FBRyxtQkFBbUIsQ0FBQztBQUM3QixJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUMzQixXQUFXLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUN4QixXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUN6QixXQUFXLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO0FBQzFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBRTFCLGtCQUFrQjtBQUNsQixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFFNUMsbUJBQW1CO0FBQ25CLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUUsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRixPQUFPLENBQUMsaUJBQWlCLENBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUzRCxnQkFBZ0I7QUFDaEIsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FB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