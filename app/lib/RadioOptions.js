exports.createGroup = function(arg) {
    
    //// Main object that will be returned when createGroup is called.
    var self = Ti.UI.createView({
        width:Ti.UI.SIZE,
        height:Ti.UI.SIZE,
        top:20, // You can remove (just padding from the main window vertical layout)
    });
    
    self.reset = function() {
        if (self.children[self.selectedValue]) { // has a selected value
            self.children[self.selectedValue].children[0].setImage(arg.radioItemsBackgroundImage);
            self.selectedValue = null;
        }
    };
    
    self.groupId = arg.groupId;
    self.layout = arg.layout;
    self.callback = (arg.callback) ? arg.callback : null;
    
    var isVertical = arg.layout ==='vertical';
    

    //// Looping through radio buttons that will be created inside the radioGroup. 
    for(var i = 0, count = arg.radioItemsValue.length; i<count; i++){
        var radioLabelView = Ti.UI.createView({ 
            layout: !isVertical?'vertical':'horizontal',
            width:Ti.UI.SIZE,
            height:Ti.UI.SIZE,
            left: !isVertical? arg.radioItemsPadding:0,
            right : 0,
            top: isVertical? arg.radioItemsPadding:null,
        });
        
        if(arg.setnull == true)
        	radioLabelView.width = null;
        
        var radioItem = Ti.UI.createImageView({
            width:arg.radioItemsWidth,
            height:arg.radioItemsHeight,
            image:arg.radioItemsBackgroundImage,
            top:0,
            left:!isVertical?0:null,
            id:i,
        }); 
        
        var radioItemLabel = Ti.UI.createLabel({
            width:isVertical?250:null,
            height:Ti.UI.SIZE,
            text: arg.radioItemsValue[i],
            saveValue : arg.radioItemsSaveValue[i],
            font: {}, // Can add your own font styles
            color:'#000000',
            top:isVertical?null:5, // 5 padding between RadioBtn & Label
            left:!isVertical?null:5, // 5 padding between RadioBtn & Label
            id:i,
            wordWrap : true
        });
        
        if(arg.font){
        	radioItemLabel.font = arg.font;
        }
    
        // Adding left padding/margin/spacing radio items. Ofc. not the first one ;) 
        if(i!=0 && !isVertical) {
            radioLabelView.setLeft(arg.radioItemsPadding);
        }
        if(i!=0 && isVertical) {
            radioLabelView.setTop(arg.radioItemsPadding);
        }
        
        //// Adding singletap event that will chnage background image on the selected radio item.
        radioItem.addEventListener('singletap', function(e) {
            var __parent = this.getParent();
            var _parent = __parent.getParent();
        
            for(var i = 0, count = _parent.children.length; i<count; i++){
                if(i === e.source.id) {
                    _parent.children[i].children[0].setImage(arg.radioItemsBackgroundSelectedImage);
                    _parent.selectedValue = i;
                    _parent.selectedIndex = _parent.children[i].children[1].text;
                    _parent.selectedSaveValue = _parent.children[i].children[1].saveValue;
                }
                else {
                    _parent.children[i].children[0].setImage(arg.radioItemsBackgroundImage);
                }
            }
            if(self.callback)
            	self.callback();
        });
        
        radioItemLabel.addEventListener('singletap', function(e) {
            var __parent = this.getParent();
            var _parent = __parent.getParent();
        
            for(var i = 0, count = _parent.children.length; i<count; i++){
                if(i === e.source.id) {
                    _parent.children[i].children[0].setImage(arg.radioItemsBackgroundSelectedImage);
                    _parent.selectedValue = i;
                    _parent.selectedIndex = _parent.children[i].children[1].text;
                    _parent.selectedSaveValue = _parent.children[i].children[1].saveValue;
                }
                else {
                    _parent.children[i].children[0].setImage(arg.radioItemsBackgroundImage);
                }
            }
            if(self.callback)
            	self.callback();
        });
        
        radioLabelView.add(radioItem);
        radioLabelView.add(radioItemLabel);
        
        //// Adding radio button to our main object/container/holder
        self.add(radioLabelView);
    }
    
    //// Returning the main object that contains radio buttons. 
    return self;
};