var Drag2Crop = new Class({
    Extends: Drag,
    Implements:[Options,Events],
    initialize: function(picture, options) {
        this.setOptions({
            relative    :    'relative',
            modifiers   :    { x: 'scrollLeft', y: 'scrollTop' },
            style       :    false,
            invert      :    true,
            onComplete  :    this.complete.bind(this),
            debug       :    false
        }, options);
		this.top        =     0;
        this.left       =     0;
        this.picture    =     $(picture);
        this.relative   =     $(this.options.relative).setStyles({cursor:'move'});
        this.parent(this.relative);
		this.__construct();
    },
	__construct	:    function(){
		if(Browser.Engine.trident) document.ondragstart = function (){return false;}; // IE fix
	},
    coordinates	: function(){
		this.getCoordinates	=	this.relative.getScroll();
        this.left  			=   this.getCoordinates.x;
        this.top    		=   this.getCoordinates.y;
    },
	complete    :    function(){
		this.coordinates();
		this.fireEvent("done",[this.top,this.left]);
	}
});