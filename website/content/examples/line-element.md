---
# This front matter is auto generated by the examples.js script
title: Line Element
id: line-element
script: /examples/elements/line-element.js
main: false
ignore: false
description: This interactive demonstrates the ellipse element.
input: undefined
tags: [elements]
weight: undefined
draft: undefined
---

{{< highlight javascript >}}
/**
* @title Line Element
* @description This interactive demonstrates the ellipse element.
* @tags [elements]
*/
import { Interactive, getScriptName } from '../../index.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let line = interactive.line(50, 25, 150, 125);
//# sourceMappingURL=line-element.js.map
{{</ highlight >}}

