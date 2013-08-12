/*
---
description: Drag picture inside a small box to get a thumbnail showing the good part of the picture.

license: 
  MIT-style

authors:
  Abdelkader ELKALIDI (http://updel.com)

requires:
  core/1.2.4:   '*'
  more/1.2.4: 'Drag.*'

provides:
  Drag2Crop
  
version:
  0.4
...
*/
var Drag2Crop = new Class({
  Extends: Drag,
	Implements:[Options,Events],
	options: {
			relative: 'relative',
			modifiers: { x: 'scrollLeft', y: 'scrollTop' },
			style: false,
			minWidth: false,
			maxWidth: false,
			minHeight: false,
			maxHeight: false,
			padding: false,
			invert: true,
			top: 0,
			left: 0,
			resizable: false,
			onComplete: function() { this.complete(); },
			debug: false
	},
	initialize: function(picture, options) {
		this.setOptions(options);
		this.relative = (this.options.resize) ? this.__makeResizableContainer() : document.id(this.options.relative);
		this.relative.setStyles({cursor:'move'}).scrollTo(-this.left,-this.top);
		this.top = this.options.top.toInt();
		this.left = this.options.left.toInt();
		this.picture = document.id(picture);
		this.parent(this.relative);
		this.__construct();
	},
	__construct: function(){
		if(Browser.name.ie) document.ondragstart = function (){return false;}; // IE fix
	},
	__makeResizableContainer: function() {
		var styles = {'overflow': 'hidden', 'resize': 'both', 'overflow': 'hidden', 'height': '100%'}, cnt = document.id(this.options.relative), cSize = cnt.getSize(), img = cnt.getElement('img');

		switch (this.options.resize){
			case 'horizontal':
				styles.resize = 'horizontal';
				styles['min-width'] = this.options.minWidth ? this.options.minWidth : cSize.x.toInt();
				if (this.options.maxWidth) styles['max-width'] = this.options.maxWidth;
			break;
			case 'vertical':
				styles.resize = 'vertical';
				styles['min-height'] = this.options.minHeight ? this.options.minHeight : cSize.y.toInt();
				if (this.options.minHeight) styles['min-height'] = this.options.minHeight;
				if (this.options.maxHeight) styles['max-height'] = this.options.maxHeight;
			break;
			case 'both':
				styles.resize = 'both';
				styles['min-width'] = this.options.minWidth ? this.options.minWidth : cSize.x.toInt();
				if (this.options.maxWidth) styles['max-width'] = this.options.maxWidth;
				styles['min-height'] = this.options.minHeight ? this.options.minHeight : cSize.y.toInt();
				if (this.options.maxHeight) styles['max-height'] = this.options.maxHeight;
			break;
		}
		if (this.options.padding) styles.padding = this.options.padding;
		cnt.setStyles(styles);
		var w = new Element('div', {'class': 'wrapper', 'styles': {'overflow': 'hidden', 'width': '100%', 'height': '100%'}});
		if (img) w.grab(img);
		w.inject(cnt);
		return w;
	},
	coordinates: function(){
		this.getCoordinates	= this.relative.getScroll();
		this.getSize = this.relative.getSize();
		this.width = this.relative.getSize().x.toInt();
		this.height = this.relative.getSize().y.toInt();
		this.left = -this.getCoordinates.x.toInt();
		this.top = -this.getCoordinates.y.toInt();
	},
	complete: function(){
		this.coordinates();
		this.fireEvent("done",[this.top,this.left,this.width,this.height]);
	}
});
