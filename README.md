Waybetter
=========

Animated scroll to destinations on the page

Usage
------

```js
import Waybetter from './smoothScroll'
```

or

```html
<script type="text/javascript" src="smoothScroll.js"></script>
```

then

```js
// scroll to a DOM Element
new SmoothScroll("#element");
new SmoothScroll(document.querySelector("#element"));

// scroll to explicit pixel value	
new SmoothScroll(0);	
new SmoothScroll(400);	
```


Options
-------


```js
new SmoothScroll(destination, { direction : "horizontal" });
```



### speed: 300

`number`

Will this modal be appearing in the dead center of the page?


### offset: null

`number` or `DOM element`

To scroll to -50px from the destination

```js
new Waybetter(destination, { offset : 50 });
```

To account for a fixed header

```js
new Waybetter(destination, { offset : document.querySelector("#header") });
```


### callback: null

`function`

A function to be called after arriving at the destination
