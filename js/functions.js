/** RG Landing Page **/

/**
 * Main class
 * 
 * @author ABCTPu9IHOB
 * @version 0.0.0, 2014-11-15
 */
function RG_LP_Main() { this.__construct(); }

RG_LP_Main.isset = function(v) {
	return !(typeof(v) === "undefined" || v === null);
};

RG_LP_Main.prototype.bgSite = {
	color: "transparent",
	image: "none",
	position: "left top",
	repeat: "repeat",
	css: { background: "transparent none repeat scroll left top" }
};

RG_LP_Main.prototype.changeBgDlg = null;

/**
 * Construct RG_LP_Main
 */
RG_LP_Main.prototype.__construct = function() {

};

/**
 * Called on document ready
 */
RG_LP_Main.prototype.init = function() {
	thisClass = this;
	thisClass.wrapp = $(".wrap");
// alert($('.wrap').css('background-color'));
// alert($('.wrap').css('background-repeat'));
// alert($('.wrap').css('background-position'));
	$("#rg_lp_background").bind("click", function() {
		// thisClass.site.changeSiteBackground();
		if (!thisClass.changeBgDlg) {
			thisClass.changeBgDlg = new RG_LP_Dialog('Свойства');
			thisClass.changeBgDlg.setMinBodyHeight(300);
			thisClass.changeBgDlg.setMaxBodyHeight(440);
			var panel = $('<table>' +
							'<tr><td rowspan="2"></td><td></td><td></td></tr><tr><td colspan="2"></td></tr>' +
						'</table>');
			thisClass.changeBgDlg.setContent(panel);
			var td, tds = panel.find('td'), idx = 0, lbl, w = 290;
			tds.css({ verticalAlign: "top" });
			td = tds.eq(idx++); 
			td.css({ paddingRight: "20px" });
			td = tds.eq(idx++);
			td.css({ paddingRight: "20px" });

			td = tds.eq(idx++);
			td.append('<h3 style="margin-top:-10px" class="head1">Фон сайта</h3>');
			td.append((bgPage = new RG_LP_BackgroundControl(false, {image:0, position:1, repeat:2, color:3}, '<table><tr><td></td><td></td><td></td></tr><tr><td colspan="3" style="padding-top:15px;"></td></tr></table>')).elem);
			thisClass.changeBgDlg.addButton('Отменить');
			thisClass.changeBgDlg.addButton('Применить', function() {
				thisClass.changeBgDlg.hide();
				thisClass.wrapp.css('background-color', bgPage.color.getValue());
			}, true);			
		};

		// changeBgDlg.setSize(770, null);
		thisClass.changeBgDlg.setVisible(true);
	});

};

window.rg_lp_main = new RG_LP_Main();

/**
 * On document ready
 */
$(function() {window.rg_lp_main.init();});

/** RG Landing Page **/

/**
 * Dialog class
 * 
 * @author ABCTPu9IHOB
 * @version 0.0.0, 2014-11-15
 */
function RG_LP_Dialog(title, isStatic) {this.__construct(title, isStatic);}

RG_LP_Dialog.prototype.id = null;
RG_LP_Dialog.prototype.title = "";
RG_LP_Dialog.prototype.dialog = null;
RG_LP_Dialog.prototype.content = null;
RG_LP_Dialog.prototype.xButton = null;
RG_LP_Dialog.prototype.fields = null;
RG_LP_Dialog.prototype.buttons = null;
RG_LP_Dialog.prototype.onOpen = null;
RG_LP_Dialog.prototype.onBeforeClose = null;
RG_LP_Dialog.prototype.onShown = null;
RG_LP_Dialog.prototype.onClose = null;
RG_LP_Dialog.prototype.stopPropagation = false;
RG_LP_Dialog.prototype.ignoreEvent = false;
RG_LP_Dialog.prototype.isStatic = false;
RG_LP_Dialog.prototype.isVisible = false;
RG_LP_Dialog.lastIndex = -1;
RG_LP_Dialog.stack = [];
RG_LP_Dialog.hasHotkey = null;
RG_LP_Dialog.hideEditors = true;

/**
 * Construct RG_LP_Dialog
 * @param title dialog title
 * @param isStatic no close on escape and no close on backbrop click
 */
RG_LP_Dialog.prototype.__construct = function(title, isStatic) {
	// if (!RG_LP_Dialog.hasHotkey) {
	// 	RG_LP_Dialog.hasHotkey = function() {
	// 		if (RG_LP_Dialog.stack.length > 0 && !RG_LP_Dialog.stack[RG_LP_Dialog.stack.length - 1].isStatic) {
	// 			RG_LP_Dialog.stack[RG_LP_Dialog.stack.length - 1].setVisible(false);
	// 		}
	// 	};
	// 	// wb_builder.addHotKey("esc", RG_LP_Dialog.hasHotkey);
	// }
	RG_LP_Dialog.lastIndex++;
	this.id = "rg_lp_dialog_" + RG_LP_Dialog.lastIndex;
	this.isStatic = isStatic ? true : false;
	this.dialog = $(
		'<div class="modal hide fade">' +
			'<div class="modal-header">' +
				(isStatic ? '' : '<button type="button" class="close" data-dismiss="modal">×</button>') +
				'<h3>&nbsp;</h3>' +
			'</div>' +
			'<div class="modal-body"><p>&nbsp;</p></div>' +
			'<div class="modal-footer"></div>' +
		'</div>'
	);
	this.dialog.attr("id", this.id);
	
	this.title = $(".modal-header", this.dialog).children("h3");
	this.xButton = $(".modal-header", this.dialog).children("button.close");
	
	this.content = $(".modal-body", this.dialog);
	
	this.buttons = $(".modal-footer", this.dialog);
	
	$(document.body).append(this.dialog);
	
	var opt = { show: false, keyboard: true };
	if (isStatic) {
		opt.keyboard = false;
		opt.backdrop = "static";
	}
	this.dialog.modal(opt);
	var thisClass = this;
	this.dialog.on("shown", function() {
		if (typeof(thisClass.onShown) === "function") thisClass.onShown();
    });
	this.dialog.on("hide", function() {
		if (thisClass.ignoreEvent) return;
		thisClass.setVisible(false, true);
		if (typeof(thisClass.onClose) === "function") thisClass.onClose();
		//console.log("Hidding: " + thisClass.id);
    });
	this.fields = {};
	
	
	/* var thisClass = this;
	$(".modal-header", this.dialog).children("button.close").bind("click", function() {
		//thisClass.setVisible(false, true);
		//if (typeof(thisClass.onClose) == "function") thisClass.onClose();
	});
	 */
	this.setTitle(title);
};

/**
 * Set dialog title
 * @param title dialog title
 */
RG_LP_Dialog.prototype.setTitle = function(title) {
	if (typeof(title) !== "undefined")
		this.title.html(title);
};

/**
 * Set dialog content HTML
 * @param htmlContent dialog content HTML
 */
RG_LP_Dialog.prototype.setContent = function(htmlContent) {
	if (htmlContent !== null && typeof(htmlContent) !== "undefined") {
		this.content.empty().append(htmlContent);
	}
};

/**
 * Add element to dialog content
 * @param elm element to add
 */
RG_LP_Dialog.prototype.addElement = function(elm) {
	this.content.append(elm);
	return elm;
};

RG_LP_Dialog.prototype.addNamedInput = function(title, type, id, name) {
	var div = document.createElement("div");
	var inp = document.createElement("input");
	var lbl = document.createElement("label");
	
	div.className = "ui-named-input";
	
	inp.type = type;
	if (name) inp.name = name;
	if (id) {
		inp.id = id;
		try {lbl.setAttribute("for", id);} catch (ex) {}
		try {lbl.setAttribute("htmlFor", id);} catch (ex) {}
	}
	$(lbl).html(title);
	
	if (type === "checkbox" || type === "radio") {
		div.appendChild(inp);
		div.appendChild(lbl);
	} else {
		div.appendChild(lbl);
		div.appendChild(inp);
	}
	$(this.dialog).append(div);
	if (id)
		this.fields[id] = inp;
	return inp;
};

/**
 * Set dialog size
 * @param width dialog width in pixels
 * @param height dialog height in pixels
 */
RG_LP_Dialog.prototype.setSize = function(width, height) {
	if (width*1 && typeof(width) !== "undefined" && width !== null)
		this.dialog.css({width: width + "px", marginLeft: -Math.round(width / 2) + "px"});
	if (height*1 && typeof(height) !== "undefined" && height !== null)
		this.dialog.height(height*1);
};

/**
 * Sets max height for dialog body
 * @param height max body height to set
 */
RG_LP_Dialog.prototype.setMaxBodyHeight = function(height) {
	if (RG_LP_Main.isset(height)) {
		$(".modal-body", this.dialog).css("max-height", height + "px");
	}
};

/**
 * Sets min height for dialog body
 * @param height min body height to set
 */
RG_LP_Dialog.prototype.setMinBodyHeight = function(height) {
	if (RG_LP_Main.isset(height)) {
		$(".modal-body", this.dialog).css("min-height", height + "px");
	}
};

/**
 * Removes scrolls on overflow and removes overflow hidden 
 */
RG_LP_Dialog.prototype.setNoScroll = function() {
	$(".modal-body", this.dialog).css({
		"overflow-x": "",
		"overflow-y": "",
		"overflow": "visible"
	});
};

/**
 * Set if buttons are centered 
 * @param {Boolean} value
 */
RG_LP_Dialog.prototype.setCenterButtons = function(value) {
	if (value) {
		$(".modal-footer", this.dialog).css("text-align", "center");
	} else {
		$(".modal-footer", this.dialog).css("text-align", "");
	}
};

/**
 * Set dialog visibility
 * @param visible dialog visibility
 * @param noAction (optional) no show/hide action
 * @param ignoreEvent (optional) ignore event
 */
RG_LP_Dialog.prototype.setVisible = function(visible, noAction, ignoreEvent) {
	if (this.stopPropagation) return;
	this.stopPropagation = true;
	if (visible) {
		if (!ignoreEvent) {
			// WB_ContextMenu.hideAllMenus();
			// if (RG_LP_Dialog.hideEditors)
			// 	WB_TextArea.hideEditors();
			if (RG_LP_Dialog.stack.length > 0) {
				RG_LP_Dialog.stack[RG_LP_Dialog.stack.length - 1].setVisible(false, false, true);
			}
			RG_LP_Dialog.stack.push(this);
		}
		if (!noAction) {
			if (ignoreEvent) this.ignoreEvent = true;
			this.dialog.modal("show");
			this.isVisible = true;
			if (ignoreEvent) this.ignoreEvent = false;
		}
	} else {
		if (!noAction) {
			if (ignoreEvent) this.ignoreEvent = true;
			this.dialog.modal("hide");
			this.isVisible = false;
			if (ignoreEvent) this.ignoreEvent = false;
		}
		if (!ignoreEvent) {
			RG_LP_Dialog.stack.pop();
			if (RG_LP_Dialog.stack.length > 0) {
				RG_LP_Dialog.stack[RG_LP_Dialog.stack.length - 1].setVisible(true, false, true);
			}
		}
	}
	this.stopPropagation = false;
};

/**
 * Show dialog
 * @param {Object|String} htmlContent
 */
RG_LP_Dialog.prototype.show = function(htmlContent) {
	this.setContent(htmlContent);
	this.setVisible(true);
};

/**
 * Hide dialog
 */
RG_LP_Dialog.prototype.hide = function() {
	this.setVisible(false);
};

/**
 * Add button to dialog
 * @param name button title
 * @param callback button click callback function or null (if null button will close dialog)
 * @param primary mark button as primary
 * @param cssClass class to add to button
 * @return button as jQuery selector object
 */
RG_LP_Dialog.prototype.addButton = function(name, callback, primary, cssClass) {
	this.buttons[name] = callback;
	var btn = $('<button class="btn" type="button"></button>');
	btn.html(name);
	if (typeof(callback) === "function") {
		btn.bind("click", callback);
	} else {
		var thisClass = this;
		//btn.attr("data-dismiss", "modal");
		btn.bind("click", function() {
			thisClass.setVisible(false);
			//if (typeof(thisClass.onClose) == "function") thisClass.onClose();
		});
	}
	if (primary) btn.addClass("btn-success");
	if (cssClass) btn.addClass(cssClass);
	btn.attr("iid", name);
	this.buttons.append(btn);
	return btn;
};

/**
 * Get dialog button callback
 * @param {String} name
 */
RG_LP_Dialog.prototype.getButtonCallback = function(name) {
	if (this.buttons[name]) 
		return this.buttons[name];
	else
		return false;
};

/**
 * Remove button from dialog
 * @param name button title to remove button by
 */
RG_LP_Dialog.prototype.removeButton = function(name) {
   this.buttons.children("[iid='" + name + "']").remove();
};

/**
 * Remove all button from dialog
 */
RG_LP_Dialog.prototype.removeAllButtons = function() {
   this.buttons.children("[iid]").remove();
};

;


/** RG Landing Page **/

/**
 * BackgroundControl component class
 * 
 * @author ABCTPu9IHOB
 * @version 0.0.0, 2014-11-17
 */
function RG_LP_BackgroundControl(useBgAttachment, inputPos, template) { this.__construct(useBgAttachment, inputPos, template); }

RG_LP_BackgroundControl.index = 0;
/**
 * Checks if background is set
 * @param {Object} data
 * @returns {Boolean}
 */
RG_LP_BackgroundControl.isSet = function(data) {
	if (data === null || typeof data !== "object") return false;
	var img = data.image;
	if (!img || img === "null" || img === "none") img = null;
	var color = data.color;
	if (!color || color === "transparent") color = null;
	return (img || color);
};
RG_LP_BackgroundControl.prototype.elem = null;
RG_LP_BackgroundControl.prototype.color = null;
RG_LP_BackgroundControl.prototype.image = null;
RG_LP_BackgroundControl.prototype.attachment = null;
RG_LP_BackgroundControl.prototype.position = null;
RG_LP_BackgroundControl.prototype.repeat = null;
RG_LP_BackgroundControl.prototype.inputPos = {
		color 		: 0,
		image 		: 1,
		position 	: 2,
		repeat 		: 3
};
RG_LP_BackgroundControl.prototype.template = '<table><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td colspan="2"><div></div></td></tr></table>';

/**
 * Construct RG_LP_BackgroundControl component
 * @param {Boolean} useBgAttachment
 * @param {Object} inputPos
 * @param {String} template
 */
RG_LP_BackgroundControl.prototype.__construct = function(useBgAttachment, inputPos, template) {
	if (inputPos)
		this.inputPos = inputPos;
	if (template)
		this.template = template;
	this.elem = $(this.template);
	
	$('td', this.elem).css("vertical-align", "top");
	var tds = $('td', this.elem);
	var td = $(tds.get(this.inputPos.color));
	td.css({ paddingRight: "25px" });
	td.append('<label>Цвет фона</label>');
	td.append((this.color = new RG_LP_ColorPicker(false, true)).elem);
	
	// td = $(tds.get(this.inputPos.image));
	// td.css({ paddingRight: "25px" });
	// td.append('<label>Изображение</label>');
	// td.append((this.image = new WB_ImagePicker()).elem);
	
	// td = $(tds.get(this.inputPos.position));
	// td.css({ paddingRight: "25px" });
	// td.append('<label>Позиция</label>');
	// td.append((this.position = new WB_AlignSelector()).elem);
	
	// td = $(tds.get(this.inputPos.repeat));
	
	// td.append('<label>Повторять</label>');
	// this.repeat = {
	// 	getValue: function() {
	// 		var repeat = "no-repeat";
	// 		if (this.horiz.getValue() && this.vert.getValue()) {
	// 			repeat = "repeat";
	// 		} else if (this.horiz.getValue()) {
	// 			repeat = "repeat-x";
	// 		} else if (this.vert.getValue()) {
	// 			repeat = "repeat-y";
	// 		}
	// 		return repeat;
	// 	},
	// 	setValue: function(val) {
	// 		this.horiz.setValue((val === "repeat-x" || val === "repeat"));
	// 		this.vert.setValue((val === "repeat-y" || val === "repeat"));
	// 	}
	// };
	
	// td.append((this.repeat.horiz = new WB_CheckBoxControl(__("Horizontally"))).elem);
	// td.append((this.repeat.vert = new WB_CheckBoxControl(__("Vertically"))).elem);
	
	// if (useBgAttachment) {
	// 	td = $(tds.get(5)).children("div");
	// 	td.css({ marginTop: "0px" });
	// 	//td.append(lbl = $('<label>' + __("Scrolling") + '</label>'));
	// 	td.append((this.attachment = new WB_CheckBoxControl(__("Don't scroll background"))).elem);
	// 	//lbl.append((new WB_ToolTipControl("?", __("This tells if background image will scroll with content or stay fixed. This is useful only for main site/page background. If you don't know what to chose set it to scroll."))).elem);
	// }
	
};

/**
 * Get value object
 * @return {Object} object = {color: ..., image: ..., position: ..., repeat: ..., css: ...}
 */
RG_LP_BackgroundControl.prototype.getValue = function() {
	var img = this.image.getValue();
	if (!img || img === "null") img = "none";
	var css = {
		background: (this.color.getValue() + " " + 
			((img === "none") ? img : ("url('" + WB_Builder.urlEncode(wb_builder.makeRelUrl(img)) + "')")) +
			" " + this.repeat.getValue() +
			" " + (this.attachment ? (this.attachment.getValue() ? "fixed" : "scroll") : "scroll") +
			" " + this.position.getValue())
	};
	return {
		color: this.color.getValue(),
		image: this.image.getValue(),
		attachment: (this.attachment ? (this.attachment.getValue() ? "fixed" : "scroll") : "scroll"),
		position: this.position.getValue(),
		repeat: this.repeat.getValue(),
		css: css
	};
};

/**
 * Set value object
 * @param {Object} obj value object = {color: ..., image: ..., position: ..., repeat: ...}
 */
RG_LP_BackgroundControl.prototype.setValue= function(obj) {
	if (!obj) obj = {
		color: "transparent", image: "none", position: "left top",
		attachment: "scroll", repeat: "repeat"
	};
	this.color.setValue(obj.color);
	this.image.setValue(obj.image);
	if (this.attachment) this.attachment.setValue((obj.attachment === "fixed"));
	this.position.setValue(obj.position);
	this.repeat.setValue(obj.repeat);
};

/**
 * Checks if background is set
 * @returns {Boolean}
 */
RG_LP_BackgroundControl.prototype.isSet = function() {
	return RG_LP_BackgroundControl.isSet(this.getValue());
};
;


/** RG Landing Page **/

/**
 * ColorPicker component class
 * 
 * @author ABCTPu9IHOB
 * @version 0.0.0, 2014-11-17
 */
function RG_LP_ColorPicker(noTransparent, big) { this.__construct(noTransparent, big); }

RG_LP_ColorPicker.prototype.elem = null;
RG_LP_ColorPicker.prototype.noTransparent = false;
RG_LP_ColorPicker.prototype.input = null;
RG_LP_ColorPicker.prototype.colorCode = null;
RG_LP_ColorPicker.prototype.color = null;
RG_LP_ColorPicker.prototype.editBtn = null;
RG_LP_ColorPicker.prototype.onChange = null;
//RG_LP_ColorPicker.prototype.tranBtn = null;

/**
 * Chose more readable color from black and white
 * 
 * @param color background color to calc readability for
 */
RG_LP_ColorPicker.readableColor = function(color) {
	var col = (color + "").replace(/[^0-9a-zA-Z]/i, "");
	var r = 0, g = 0, b = 0;
	if (col.length === 3) {
		r = parseInt(col.substring(0, 1), 16);
		g = parseInt(col.substring(1, 2), 16);
		b = parseInt(col.substring(2, 3), 16);
	} else {
		r = parseInt(col.substring(0, 2), 16);
		g = parseInt(col.substring(2, 4), 16);
		b = parseInt(col.substring(4, 6), 16);
	}
	
    r = Math.pow(r / 255, 2.2);
    g = Math.pow(g / 255, 2.2);
	b = Math.pow(b / 255, 2.2);
    
	var Y = 0.2126 * r + 0.7151 * g + 0.0721 * b;
	
	return (Y > 0.5) ? "#000000" : "#ffffff";
};

/**
 * Construct ColorPicker component
 * @param noTransparent no transparent color selector in picker
 * @param big big colorpicker
 */
RG_LP_ColorPicker.prototype.__construct = function(noTransparent, big) {
	this.noTransparent = noTransparent ? true : false;
	if (big) {
		var thumbSize = 50;
		this.elem = $('<table class="wb-colorpicker-controll">' +
				'<tr>' +
					'<td>' +
						'<a href="javascript:void(0)" class="thumbnail bg-transparent" style="width: ' + thumbSize + 'px; height: ' + thumbSize + 'px"></a>' +
						'<div class="colorcode"></div>' +
					'</td>' +
					'<td style="vertical-align: top;"><div class="btn-group2 btn-group-vertical2">' +
						'<button class="btn ui-colorpicker-btn" type="button"><i class="icon-pencil"></i></button>' +
//						'<button class="btn ui-colorpicker-btn2" type="button"><i class="icon-remove"></i></button>' +
					'</div></td>' +
				'</tr>' +
			'</table>');
		this.input = this.elem.find(".thumbnail");
		this.colorCode = this.elem.find(".colorcode");
		this.colorCode.css("display", "none");
		this.editBtn = this.elem.find(".ui-colorpicker-btn");
//		this.tranBtn = this.elem.find(".ui-colorpicker-btn2");
	} else {
		this.elem = $('<div class="input-append wb-colorpicker-controll">' +
				'<input type="text" size="6" maxlength="6" class="bg-transparent" readonly="readonly" />' +
				'<div class="colorcode"></div>' +
				'<button class="btn ui-colorpicker-btn" type="button"><i class="icon-pencil"></i></button>' +
//				'<button class="btn ui-colorpicker-btn2" type="button"><i class="icon-remove"></i></button>' +
			'</div>');
		this.input = this.elem.children("input");
		this.input.css({ width: "30px" });
		this.colorCode = this.elem.children(".colorcode");
		this.colorCode.css("display", "none");
		this.editBtn = this.elem.children(".ui-colorpicker-btn");
//		this.tranBtn = this.elem.children(".ui-colorpicker-btn2");
	}
	
	
	if (this.noTransparent) {
//		this.tranBtn.detach();
		this.input.removeClass("bg-transparent");
	}
	
	var thisClass = this;
	
	this.editBtn.ColorPicker({
		color: "#ffffff",
		trans: thisClass.noTransparent,
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			var top = thisClass.editBtn.offset().top + thisClass.editBtn.outerHeight(true) - $(window).scrollTop();
			var bh = $(window).height();
			var vh = top + $(colpkr).outerHeight(true);
			if (vh > bh) {
				top -= ($(colpkr).outerHeight(true) + thisClass.editBtn.outerHeight(true));
			}
			$(colpkr).css({
				position: "fixed",
				top: top + "px"
			});
			if (!thisClass.noTransparent)
				$(colpkr).find(".colorpicker_transparent").show();
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			
		},
		onSubmit: function(hsb, hex, rgb, el) {
			thisClass.setValue(hex);
			$(el).ColorPickerHide();
			thisClass.elem.trigger("change");
		},
		onBeforeShow: function () {
			//var col = thisClass.input.val();
			var col = thisClass.color;
			if (!col) col = "ffffff";
			$(this).ColorPickerSetColor(col);
		}
	});
	this.input.bind("click", function() {
		thisClass.editBtn.ColorPickerShow();
	}).bind("keyup", function(e) {
		var val = $(this).val();
		if (val.length == 6 || val.length == 3) {
			thisClass.setValue(val);
		}
	});
	/*this.tranBtn.bind("click", function() {
		thisClass.setValue("transparent");
	});*/
};

/**
 * Get currently selected color
 * @return css hex color code (ex. #0f0f0f) or 'transparent'
 */
RG_LP_ColorPicker.prototype.getValue = function() {
	//var color = this.input.val();
	var color = this.color;
	color = color ? ("#" + color) : (this.noTransparent ? "#000000" : "transparent");
	return color;
};

/**
 * Set color
 * @param color css hex color code (ex. #0f0f0f) or 'transparent' or empty string (defaults to 'transparent')
 */
RG_LP_ColorPicker.prototype.setValue = function(color) {
	if (color == "transparent") color = "";
	if (this.noTransparent && !color) color = "#000000";
	color = ("" + color).replace("#", "").substring(0, 6);
	this.color = color;
	if (color) {
		//this.input.val(color);
		this.colorCode.html("#" + color);
		this.input.removeClass("bg-transparent");
		this.input.css("background-color", "#" + color);
		this.input.css("color", RG_LP_ColorPicker.readableColor(color));
	} else {
		//this.input.val("");
		this.colorCode.html("#Прозрачный");
		this.input.addClass("bg-transparent");
		this.input.css("background-color", "");
		this.input.css("color", "");
	}
	if (typeof(this.onChange) == "function") {
		this.onChange.call(this);
	}
};

/**
 * Get currently selected color
 * NOTE: this is alias of getValue()
 * @return css hex color code (ex. #0f0f0f) or 'transparent'
 */
RG_LP_ColorPicker.prototype.getColor = function() {
	return this.getValue();
};

/**
 * Set color
 * NOTE: this is alias of setValue(...)
 * @param color css hex color code (ex. #0f0f0f) or 'transparent' or empty string (defaults to 'transparent')
 */
RG_LP_ColorPicker.prototype.setColor = function(color) {
	this.setValue(color);
};

/**
 * Show color picker popup
 */
RG_LP_ColorPicker.prototype.showPicker = function() {
	this.editBtn.ColorPickerShow();
};

/**
 * Hide color picker popup
 */
RG_LP_ColorPicker.prototype.hidePicker = function() {
	this.editBtn.ColorPickerHide();
};
;



(function(){

var rg = {};
CKEDITOR.disableAutoInline = true;
var activeEditor = 0;
var activeEditorElement = 0;
var activeId = '';
var newId=0;
CKEDITOR.config.allowedContent = true;

//текущее положение оболочки (вместе с внутренними отступами и рамкой) относительно документа
var offset = $('.wrap').offset();
//высота и ширина оболочки (вместе с внутренними отступами и рамкой)
var h_wr = $('.wrap').outerHeight();
var w_wr = $('.wrap').outerWidth();
//внутренние отступы оболочки
var p_l_wr = parseInt($('.wrap').css('padding-left'));
var p_r_wr = parseInt($('.wrap').css('padding-right'));
var p_t_wr = parseInt($('.wrap').css('padding-top'));
var p_b_wr = parseInt($('.wrap').css('padding-bottom'));
//ширина рамки оболочки
var b_l_wr = parseInt($('.wrap').css('border-left-width'));
var b_r_wr = parseInt($('.wrap').css('border-right-width'));
var b_t_wr = parseInt($('.wrap').css('border-top-width'));
var b_b_wr = parseInt($('.wrap').css('border-bottom-width'));
//границы оболочки без внутренних отступов и рамки
var pos_l = offset.left + p_l_wr + b_l_wr;
var pos_r = offset.left + w_wr - p_r_wr - b_r_wr;
var pos_t = offset.top + p_t_wr + b_t_wr;
var pos_b = offset.top + h_wr - p_b_wr - b_b_wr;

rg.editorInit = function(id){
	if (activeEditor) { 
                if (activeEditor.element.getId() == activeId) {
                     return;
                }
                activeEditor.destroy();				
            }

            if (! (activeEditorElement = document.getElementById(id))) {    
                 return;
            }
			
            activeEditorElement.setAttribute('contenteditable', 'true');
            activeEditor = CKEDITOR.inline(id);
			$("#"+id).draggable("disable");			
            activeEditor.on('blur', function() {
                this.element.setAttribute('contenteditable', 'false');
                activeId = '';
                activeEditor = 0;
                activeEditorElement = 0;
                this.destroy();
				$("#"+id).draggable("enable").resizable({ minWidth: 100, minHeight: 30, grid: [ 10, 10 ], containment: "parent"  });						
            });
          
			activeEditorElement.blur();
			setTimeout(function() {
				activeEditorElement.focus();
			}, 100);
}
rg.photoInit = function(id){
	$(".photos").css({
		'top' : '300px',
		'left' : '30%',
		'display' : 'block'
	});
$('#wb_dialog_7').modal('show'); 
$('#selected_img_placeholder').val(id); 
}

rg.getMaxId = function(){
	var arr = new Array;
	$('.rgElem').each(function(){
		var idstr = $(this).attr('id');
		id = idstr.replace('div','');
		arr.push(parseInt(id));		
	});	
	if(arr.length > 0) 
		return Math.max.apply(Math, arr);
	else {
		return 0;
	}
}

//ширина элемента (без рамки)
rg.W_el = function(el){
	//ширина левой и правой рамок элемента
	var b_l_el = parseInt($(el).css('border-left-width'));
	var b_r_el = parseInt($(el).css('border-right-width'));

	return $(el).outerWidth() - b_l_el - b_r_el;
}

//высота элемента (без рамки)
rg.H_el = function(el){
	//ширина верхней и нижней рамок элемента
	var b_t_el = parseInt($(el).css('border-top-width'));
	var b_b_el = parseInt($(el).css('border-bottom-width'));

	return $(el).outerHeight() - b_t_el - b_b_el;
}

//корректировка положения элемента по координате X
rg.Xcorrect = function(el,x,w_el){

	if (pos_l <= x) {

		if (pos_r - w_el >= x) {

			var new_x = (x - pos_l) % 10;
			if (new_x < 5) {
				x = x - new_x;
			}else{
				x = x - new_x + 10;
				if (x > pos_r - w_el) {
					x = pos_r - w_el;
				};
			};

		}else{
			x = pos_r - w_el;
		};

		$(el).css('left', x);
	};

}

//корректировка положения элемента по координате Y
rg.Ycorrect = function(el,y,h_el){

	if (pos_t <= y) {

		if (pos_b - h_el >= y) {

			var new_y = (y - pos_t) % 10;
			if (new_y < 5) {
				y = y - new_y;
			}else{
				y = y - new_y + 10;
				if (y > pos_b - h_el) {
					y = pos_b - h_el;
				};
			};

		}else{
			y = pos_b - h_el;
		};

		$(el).css('top', y);
	};

}

rg.generateTextArea = function(x,y){	
	var newId = rg.getMaxId()+1;	
	el = document.createElement('DIV');
	$(el)
		.addClass('ui-draggable')
		.addClass('rgElem')
		.attr('id','div'+newId)
		.attr('contenteditable','false')
		.html('<p>Ваш текст...</p>')
		.click(function(){ 
			$('.ui-selectable').selectable( 'destroy' );
			if(!activeEditor){
				$(this).selectable({delay:700});	
			}				
		})
		.dblclick(function(){
			$(this).selectable( "destroy" );
			$(this).draggable( "disable" );	
			$(this).resizable( "destroy" );
			rg.editorInit('div'+newId);
		});					

		$('.wrap').append(el);

		//высота и ширина текстового блока (без рамки)
		var w_ta = rg.W_el(el);
		var h_ta = rg.H_el(el);

		//корректировка положения элемента
		rg.Xcorrect(el,x,w_ta);
		rg.Ycorrect(el,y,h_ta);

		$("#div"+newId).draggable({ containment:"parent", grid: [ 10, 10 ] }).resizable({ minWidth: 100, minHeight: 30, grid: [ 10, 10 ], containment: "parent" });
}
rg.generateImage = function(x,y){
	var newId = rg.getMaxId()+1;	
	el = document.createElement('DIV');
	$(el)
		.addClass('ui-draggable')
		.addClass('rgElem')
		.addClass('image-placeholder')
		.attr('id','div'+newId)
		.attr('contenteditable','false')
		.html('<span class="rg_caption" style="display: block; position: absolute; top: 50%; left: 7px; width: 95%; margin: 20px 0px 0px; padding: 0px;">Дважды щелкните, чтобы изменить фотографию</span>')
		.click(function(){ 
			$('.ui-selectable').selectable( 'destroy' );
			if(!activeEditor){
				$(this).selectable({delay:700});	
			}				
		})
		.dblclick(function(){
			$(this).selectable( "destroy" );
			$(this).draggable( "disable" );	
			rg.photoInit('div'+newId);
		});					

		$('.wrap').append(el);

		//высота и ширина блока для изображения (без рамки)
		var w_im = rg.W_el(el);
		var h_im = rg.H_el(el);

		//корректировка положения элемента
		rg.Xcorrect(el,x,w_im);
		rg.Ycorrect(el,y,h_im);

		$("#div"+newId).draggable({ containment:"parent", grid: [ 10, 10 ] });
}

rg.removeImage = function(elem){ 
	var item = $(elem);
	var forRemove = $(elem).prev().attr('src');
	var str = 'http://'+siteurl+'/tpl/lp/'+template+'/images/';
	forRemove = forRemove.replace(str,'');
	if(confirm('Удалить этот файл?')){
		$.ajax({		
			type: 'POST',
			url: 'actions.php',
			data: "forRemove="+forRemove,
			success: function(data) {		  				
				item.prev().parent().parent().remove();				
							
			},
				error:  function(xhr, str){
					alert("Error!");
				}
		});
	}
}	

$(function(){
	var btnUpload=$('#upload');
	var status=$('#status');
	var template = $('#template_id').val();
	new AjaxUpload(btnUpload, {
		action: '/editor/upload-file.php',
		name: 'uploadfile',
		onSubmit: function(file, ext){
			if (! (ext && /^(jpg|png|jpeg|gif)$/.test(ext))){                   
				status.text('Only JPG, PNG or GIF files are allowed');
					return false;
			}
				status.text('Uploading...');
			},
		onComplete: function(file, response){				
			status.text('');				
			if(response==="success"){
				$('<div><div class="over"><img src="http://'+siteurl+'/tpl/lp/'+template+'/images/'+response+'" alt="" /></div><br /><span>'+response+'</span></div>').prependTo('#files').addClass('success').click(function(){ 
						$(this).removeClass('success'); 
						rg.selectImage($(this).find('img'));
					});				
			} else{
				$('<span></span>').prependTo('#files').text(file).addClass('error');
			}
		}
		});		
	});




rg.destroySelect = function(){
	$('.ui-selectable').each(function(){ 
			$(this).selectable( 'destroy' );
	});
}

$( ".btn" ).draggable({ 
		cursor:"crosshair",
		containment: "parent",
		appendTo: "wrap",
		helper: "clone",
		grid: [ 10, 10 ],
		scroll: "none",
		start: function(){
			rg.destroySelect();
			$('.wrap').addClass('ui-droppable');
			if($('.wrap').hasClass('ui-droppable-disabled')){
				$('.wrap').droppable('enable');
			}
			$( ".ui-droppable" ).droppable({
				activeClass: "ui-state-default",
				hoverClass: "ui-state-hover",
				accept: ":not(.ui-sortable-helper)",
				drop: function( event, ui ) {
					rg.generateTextArea(event.pageX,event.pageY);					
				}
			});
		},
		stop: function(){
			$('.wrap').droppable('disable');
			$('.wrap').removeClass('ui-droppable');
		}
    });

$( ".img" ).draggable({ 
		cursor:"crosshair",
		containment: "parent",
		appendTo: "wrap",
		helper: "clone",
		grid: [ 10, 10 ],
		scroll: "none",
		start: function(){
			rg.destroySelect();
			$('.wrap').addClass('ui-droppable');
			if($('.wrap').hasClass('ui-droppable-disabled')){
				$('.wrap').droppable('enable');
			}
			$( ".ui-droppable" ).droppable({
				activeClass: "ui-state-default",
				hoverClass: "ui-state-hover",
				accept: ":not(.ui-sortable-helper)",
				drop: function( event, ui ) {
					rg.generateImage(event.pageX,event.pageY);					
				}
			});
		},
		stop: function(){
			$('.wrap').droppable('disable');
			$('.wrap').removeClass('ui-droppable');
		}
    });
rg.selectImage = function(img){
	$(".photos div").removeClass("selected");
	$('.galka').remove();
	$(img).parent().addClass("selected");
	el = document.createElement('img');
	$(el)
		.addClass('galka')
		.attr('src', '/editor/images/remove.png')
		.click(function(){
			rg.removeImage(el);
		});
	$(img).parent().append(el);
}
$(".photos img").click(function(){
	$(".photos div").removeClass("selected");
	$('.galka').remove();
	$(this).parent().addClass("selected");
	el = document.createElement('img');
	$(el)
		.addClass('galka')
		.attr('src', '/editor/images/remove.png')
		.click(function(){
			rg.removeImage(el);
		});
	$(this).parent().append(el);
});
$("#cancel").click(function(){
	$("#files .over").removeClass('selected');
	var id = $("#selected_img_placeholder").val();
	$("#"+id).draggable({ containment:"parent", grid: [ 10, 10 ] }).resizable({ minWidth: 100, minHeight: 30, grid: [ 10, 10 ], containment: "parent" });
	$('#wb_dialog_7').modal('hide'); 
});

$(".close").click(function(){
	$("#files .over").removeClass('selected');
	var id = $("#selected_img_placeholder").val();
	$("#"+id).draggable({ containment:"parent", grid: [ 10, 10 ] }).resizable({ minWidth: 100, minHeight: 30, grid: [ 10, 10 ], containment: "parent" });
	$('#wb_dialog_7').modal('hide'); 
});
$("#choose").click(function(){	
	var src = $("#files").find(".selected").find('img').attr('src');
	var id = $("#selected_img_placeholder").val();
	$('#'+id).html('');
	$("#"+id).append('<div class="imgContainer"><img src="'+src+'" id="'+id+'"></div>').addClass('imgElem').addClass('rgElem');
	if($("#"+id).hasClass('ui-draggable'))
		$("#"+id).draggable('destroy');
	$("#"+id).draggable({ containment:"parent", grid: [ 10, 10 ] }).resizable({ minWidth: 100, minHeight: 30, grid: [ 10, 10 ], containment: "parent" });
	$('#'+id).removeClass('image-placeholder');
	$("#files .over").removeClass('selected');
	$(".galka").remove();
	$('#wb_dialog_7').modal('hide'); 
});
$(".btn").click(function(){ 
	$('.wrap').droppable();
	$(".wrap").removeClass('ui-droppable-disabled');
	$('.wrap').addClass('ui-droppable');
});  

$('body').bind('click',function(e){
    var target = $(e.target);
    if (target.is('.ui-selectable') || target.parents('.ui-selectable').length) return;
		$(document).unbind('click', arguments.callee);
		rg.destroySelect();
});
$(document).keyup(function(e){
		switch(e.which){
			case 46:
			$(".ui-selectable").remove();
		}
});
$(document).ready(function(){
	$(".wrap .rgElem").each(function(){	 
			$(this).draggable({ containment:"parent", grid: [ 10, 10 ] }).resizable({ minWidth: 100, minHeight: 30, grid: [ 10, 10 ], containment: "parent" });		
	});	
	$(".wrap .ui-draggable").resizable({ minWidth: 100, minHeight: 30, grid: [ 10, 10 ], containment: "parent" });	
	$(".wrap .ui-draggable").click(function(){	
		if(!activeEditor){
			$(this).selectable({delay:700});	
		}
	});
	
	$(".wrap .ui-draggable").dblclick(function(){
			$('.ui-selectable').selectable( 'destroy' );
			$(this).draggable( "destroy" );	
			$(this).resizable( "destroy" );		
			if ($(this).is(':has(img)')){
				rg.photoInit($(this).attr('id'));
			} else {
				rg.editorInit($(this).attr('id'));
			}
	});
});


$("#saveBtn").click(function(){
	setTimeout(function(){
		$('.ui-draggable').draggable( 'destroy' );
		$('.ui-selectable').selectable( 'destroy' );
		$(".ui-resizable").resizable( 'destroy' );
		var msg = $(".wrap").html();	
		
		$.ajax({		
			type: 'POST',
			url: 'actions.php',
			data: "content="+msg,
			success: function(data) {		  
				alert("Data saved successfully!");	
				$(".wrap .rgElem").each(function(){
					if($(this).hasClass("clearfix")==false){ 
						$(this).draggable({ containment:"parent", grid: [ 10, 10 ] }).resizable({ minWidth: 100, minHeight: 30, grid: [ 10, 10 ], containment: "parent" });
					}
				});	
				$(".wrap .ui-draggable").resizable({ minWidth: 100, minHeight: 30, grid: [ 10, 10 ], containment: "parent" });				
			},
				error:  function(xhr, str){
					alert("Error!");
				}
		});
	}, 2000);	
});
})();
