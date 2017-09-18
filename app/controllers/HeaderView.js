// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.setBackImage = function(_image, _width, _height){
	$.backImage.image = _image;
	if(_width && _height){
		$.backImage.width = _width;
		$.backImage.height = _height;
	}
};

$.setBackText = function(_text){
	$.backTitle.text = _text;
};

$.setRightText = function(_text){
	$.rightTitle.text = _text;
};

$.setRightImage = function(_image){
	$.rightImage.image = _image;
};

$.setTitle = function(_text){
	$.titleLabel.text = _text;
};
