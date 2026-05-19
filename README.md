# Relative Size CSS Units
## Structure and Container Units (fr)

The `fr` unit comes from "fraction" and is used exclusively within the `CSS Grid Layout system`. It doesn't represent a fixed physical measurement nor does it depend directly on the screen size, but rather on the available space within a grid container.

* How it works: It divides the container's free space into proportional parts after subtracting elements with fixed sizes (such as pixels or percentages) and gaps.

* Example: If a container has `grid-template-columns: 1fr 2fr;`, the available space will be divided into 3 equal parts. The first column will take 1 part, and the second will take 2 parts.

---

## Viewport Units (vh vs dvh)
Both units are based on the `Viewport Height (viewport height)`, that is, the visible size of the browser window. 1vh or 1dvh is equivalent to 1% of the window height. The crucial difference lies in how they handle dynamic navigation bars on mobile devices (such as the address bar in Chrome or Safari that hides when scrolling).

### vh (Standard Viewport Height)
Behavior: Calculates the screen height assuming the browser bars are hidden.

The problem: When you open a page on a mobile device and the address bar is visible, an element with height: 100vh will extend beyond the current screen background, forcing the user to scroll to see the background content. This can obscure important buttons or calls to action.

### dvh (Dynamic Viewport Height)
Behavior: This is a modern, dynamic unit. It adapts in real time to the state of the browser interface.

The solution: If the address bar is expanded, 100dvh is equivalent to the exact (smaller) visible space. If the address bar is hidden when scrolling, 100dvh automatically expands to fill the entire screen. This completely prevents unwanted overflow on mobile devices.

---

## Typography and Accessibility Units (rem)
The rem unit stands for "Root EM." Unlike the previous units, it doesn't depend on screen size or grid containers, but rather on the font size of the page's root element (the <html> tag).

How it works: By default, most web browsers have a root font size of 16px. Therefore, 1 rem equals 16px, 2 rem equals 32px, and so on.

Importance in Accessibility: If a user has visual impairments and changes their browser's default font size to 24px (for example), 1 rem will automatically become 24px. If you design using rem, your entire interface (fonts, margins, padding) will scale proportionally, maintaining design harmony and respecting the user's preference.

---

# Other Size CSS Units
## em (Relative to the parent element)
How it works: Measures the font size of the element itself or its closest ancestor. If the text in a container is 16px, 1em in that container is 16px. If you increase the text to 20px, 1em becomes 20px.

* Ideal use case: Modular components. If you create a button and define its padding and border-radius in em, the button will maintain its perfect proportions whether you make it huge for a banner or tiny for a footer. You only change the font-size, and the entire button scales harmoniously.

* Beware of: The "cascade effect." If you nest elements with em (a div inside another div with font-size: 1.2em), the sizes multiply exponentially, and the text can quickly become either huge or invisible.

---

## ch (The width of the character "0")
How it works: This is equivalent to the width of the number zero (0) in the font you are currently using.

* Ideal use case: Readability. Web design studies indicate that a line of text is optimally readable when it has between 45 and 75 characters. By setting a paragraph to max-width: 60ch;, you ensure that the line of text never exceeds approximately 60 characters in width, regardless of screen size or font.
