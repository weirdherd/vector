// base element for everything
import {BaseElement} from './elements/base-element';

// base svg element
import Element from './elements/svg/element';

// svg objects
import Circle from './elements/svg/circle';
import ClipPath from './elements/svg/clip-path';
import Definitions from './elements/svg/definitions';
import Description from './elements/svg/description';
import Ellipse from './elements/svg/ellipse';
import Group from './elements/svg/group';
import Line from './elements/svg/line';
import Marker from './elements/svg/marker';
import Path from './elements/svg/path';
import Polygon from './elements/svg/polygon';
import Rectangle from './elements/svg/rectangle';
import SVG from './elements/svg/svg';
import Shape from './elements/svg/shape';
import Symbol from './elements/svg/symbol';
import TSpan from './elements/svg/t-span';
import Text from './elements/svg/text';
import Use from './elements/svg/use';

// input objects
import Button from './elements/input/button';
import CheckBox from './elements/input/check-box';
import ControlCircle from './elements/input/control-circle';
import Control from './elements/input/control';
import RadioControl from './elements/input/radio-control';
import DropdownControl from './elements/input/dropdown-control';
import Scrubber from './elements/input/scrubber';
import Slider from './elements/input/slider';
import Input from './elements/input/input';

// complex objects
import Interactive from './elements/interactive';
import Plot from './elements/math/plot';
import Point from './elements/math/point';

// templates
import {AnimationPlayer} from './templates/animation-player';
import {HolyGrailTemplate} from './templates/holy-grail';
import {SideBarTemplate} from './templates/side-bar';
import { SVGResponsiveTemplate } from './templates/svg-responsive';
import { SVGOverflowTemplate } from './templates/svg-overflow';

// export utility functions
export { File } from './util/file';
export { Math2 } from './util/math';

// export objects
export  {	
	Button,
	BaseElement,
	Circle,
	CheckBox,
	ClipPath,
	ControlCircle,
	Control,
	Definitions,
	Description,
	Element,
	Ellipse,
	Group,
	Input,
	Interactive,
	Line,
	Marker,
	Path,
	AnimationPlayer,
	Plot,
	Point,
	Polygon,
	RadioControl,
	DropdownControl,
	Rectangle,
	Scrubber,
	Shape,
	SideBarTemplate,
	Slider,
	SVG,
	SVGResponsiveTemplate,
	SVGOverflowTemplate,
	Symbol,
	HolyGrailTemplate,
	Text,
	TSpan,
	Use 
};
