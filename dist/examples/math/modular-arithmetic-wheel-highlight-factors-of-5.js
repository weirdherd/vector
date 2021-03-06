/**
* @ignore true
*/
import numberWheelMain from './modular-arithmetic-wheel.js';
function highlight(n) {
    return n % 5 === 0;
}
/**
* Exposes a function that creates a number wheel within the provided id. The
* configuration controls the look and feel of the number wheel.
*/
export default function main(id) {
    numberWheelMain(id, { modulo: 5, highlight: highlight });
}
//# sourceMappingURL=modular-arithmetic-wheel-highlight-factors-of-5.js.map