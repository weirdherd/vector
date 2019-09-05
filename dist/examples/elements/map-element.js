import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';

let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let map = interactive.map("united-states",768,150);