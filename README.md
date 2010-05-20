Drag2Crop
===========

This small mootools plugin to drag picture inside a small box to get a thumbnail showing the good part of the picture, then return values [Top, Left] of picture relative to the box.

![Screenshot](http://updel.com/demos/drag2crop/screen.png)

### Demo

[http://updel.com/demos/drag2crop/screen.png](http://updel.com/demos/drag2crop/screen.png)

How to use
----------

### Requires

* [MooTools More 1.2.4](http://mootools.net/more): Drag.* (and its dependencies)

- An element parent where the image is shild and have a fix With and height and Overflow:hidden

	#JS
		new Drag2Crop('pictureId', {
			setOptions	:    {
				relative 	: 	'relative'
			},
			onStart		:    function(){
				this.picture.setStyles({opacity:0.5});
			},
			onDone      :    function(top,left){
				this.picture.setStyles({opacity:1});
				alert('text', 'Top : ' + top + ' | Left : ' + left);
			}
		});
	
### More Information

See [http://updel.com/drag2crop/](http://updel.com/drag2crop/) for more information.
	