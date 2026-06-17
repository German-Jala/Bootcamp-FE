# Research

To fulfill this task, I did a combination of research documentation and prompting LLMs (Claude)

First prompt:

> _"How to make an empty div fill all the available space from the parent, using flexbox, without using width and height"_

 Claude answered that using flex-grow is a good way to do it

Also I researched the flexbox doc: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

Another prompt I used was:

> _"If I don't have the option to use width and height to adjust the size of the elements inside the page, and I want to use flexbox, what options do I have?"_

To this, Claude basically answered this options:

* flex-basis: used to set an initial size using the absolute value or the relative (percentage).
* flex-grow: Defines how much of the remaining space each item is going to fill.
* flex-shrink: Determines how much the element shrinks if there is not enough space.
* aspect-ratio: Determines the size of an item using proportions.

> _"que pasa si el diseñador nos cambia el layout? se podría cambiar con su codigo actual? o tomaria mas tiempo el refactor?_

That's a good question. Right now, with the new changes, I need to change the perception I had of the blue section and treat it as a header. So it's not a small change, but is not a total refactor neither. In the end I had to add the header tag and remove the "main-header" class I had. Also I had to add 2 divs for the purple boxes and to finish I removed the "aspect-ratio" prop of the pink boxes because it was forcing the boxes to have certain form, and by default, certain size, so it was leaving no space for the purple boxes.