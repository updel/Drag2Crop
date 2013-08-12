/*
---
description: Drag picture inside a small box to get a thumbnail showing the good part of the picture.

license: 
  MIT-style

authors:
  Abdelkader ELKALIDI (http://updel.com)
  Updateded to mootools 1.4.5 by Rudolph Sand

requires:
  core/1.4.5:   '*'
  more/1.4.5: 'Drag.*'

provides:
  Drag2Crop
  
version:
  0.5
...
*/
var Drag2Crop = new Class({
    Extends: Drag,
    Implements:[Options,Events],
    options: {
            relative    :    'relative',
            modifiers   :    { x: 'scrollLeft', y: 'scrollTop' },
            style       :    false,
            invert      :    true,
            top         :    0,
            left        :    0,
            onComplete  :    function() { this.complete(); },
            debug       :    false
    },
    initialize: function(picture, options) {
        this.setOptions(options);
        this.top        =     this.options.top.toInt();
        this.left       =     this.options.left.toInt();
        this.picture    =     document.id(picture);
        this.relative   =     document.id(this.options.relative).setStyles({cursor:'move'}).scrollTo(-this.left,-this.top);
        this.parent(this.relative);
        this.__construct();
    },
    __construct :    function(){
        if(Browser.name.ie) document.ondragstart = function (){return false;}; // IE fix
    },
    coordinates : function(){
        this.getCoordinates =   this.relative.getScroll();
        this.getSize        =   this.relative.getSize();
        this.width          =   this.relative.getSize().x.toInt();
        this.height         =   this.relative.getSize().y.toInt();
        this.left           =   -this.getCoordinates.x.toInt();
        this.top            =   -this.getCoordinates.y.toInt();
    },
    complete    :    function(){
        this.coordinates();
        this.fireEvent("done",[this.top,this.left,this.width,this.height]);
    }
});
