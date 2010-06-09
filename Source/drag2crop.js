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
    initialize: function(picture, options) {
        this.setOptions({
            relative    :    'relative',
            modifiers   :    { x: 'scrollLeft', y: 'scrollTop' },
            style       :    false,
            invert      :    true,
            top  		:    0,
            left		:    0,
            onComplete  :    this.complete.bind(this),
            debug       :    false
        }, options);
		this.top        =     this.options.top.toInt();
        this.left       =     this.options.left.toInt();
        this.picture    =     $(picture);
        this.relative   =     $(this.options.relative).setStyles({cursor:'move'}).scrollTo(-this.top, -this.left);
        this.parent(this.relative);
		this.__construct();
    },
	__construct	:    function(){
		if(Browser.Engine.trident) document.ondragstart = function (){return false;}; // IE fix
	},
    coordinates	: function(){
		this.getCoordinates	=	this.relative.getScroll();
		this.getSize		=	this.relative.getSize();
        this.width  		=   this.relative.getSize().x.toInt();
        this.height  		=   this.relative.getSize().y.toInt();
        this.left  			=   -this.getCoordinates.x.toInt();
        this.top    		=   -this.getCoordinates.y.toInt();
    },
	complete    :    function(){
		this.coordinates();
		this.fireEvent("done",[this.top,this.left,this.width,this.height]);
	}
});