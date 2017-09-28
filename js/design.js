var box = [];

function lists (id) {
	var a = $("#tab" + id + "").attr("style")
	
	if ( a == '' ) {
		$("#tab" + id + "").css('display', 'none');
	} else {
		$("#tab" + id + "").show(0);
	}
}

this.imagePreview = function(){
		
	xOffset = 10;
	yOffset = 30;
	w = 600;
	
	$("a.preview")
		.hover(function(e){
			this.t = this.title;
			this.title = "";	
			
			var c = (this.t != "") ? "<br/>" + this.t : "";
			var preview = $("<p id='preview-box'><img src='" + this.href + "' />"+ c +"</p>");
			
			preview
				.appendTo("body")
				.css("top",(e.pageY - xOffset) + "px")
				.css("left",(e.pageX - w - yOffset) + "px")
				.fadeIn("fast");
		},
		function(){
			this.title = this.t;	
			$("#preview-box").remove();
		})
		.mousemove(function(e){
			$("#preview-box")
				.css("top",(e.pageY - xOffset) + "px")
				.css("left",( (($(window).width() - e.pageX - (yOffset * 2)) > w) ? (e.pageX + yOffset) : (e.pageX - w - yOffset) ) + "px");
		});
};

function box_show(opt) {
	box_id = box.length + 1;
	box.push(box_id);
	
	var width = ( opt.width ) ? opt.width : 500,
		text = ( opt.text ) ? opt.text : '',
		top = ( opt.top ) ? opt.top : 100;
	
	var a = $('<dic class="box-over" id="box-over-' + box_id + '" />'),
		b = $('<div class="box-body" id="box-' + box_id + '" style="display:none; width:' + width + 'px"><div class="box-main">' + text + '</div><span class="box-close">&times;</span></div>');
	
	a.appendTo('body');
	b.appendTo('body').css({ 'margin-left': -parseInt(width / 2), 'top': $(window).scrollTop() + top }).fadeIn(200);
}

function box_hide() {
	box_id = box.pop();
	$('#box-' + box_id).remove();
	$('#box-over-' + box_id).remove();

	return false;
}

$(document).on("click", ".box-over, .box-close", function(e) {
	box_hide();
});

function order_tpl(action, id) {
	if ( ! action ) return false;
	
	if ( action == 'send' ) {
		var str = $('#order').serialize();
		
		$.post('/component/editor/include/design/proccess.php?action=send', str, function (data) {
			if ( data == 'error' ) return false;
			eval(data);
		});
	} else {
		$.post('/component/editor/include/design/proccess.php', {
			id: id, 
			action: action
		}, function (data) {
			if ( data == 'error' ) return false;
			box_show({width: 500, text: data});
		});
	}
}

function order_other() {
	var str = $('#form').serialize();

	$.post('/component/editor/include/design/proccess.php?action=send_other', str, function (data) {
		if ( data == 'error' ) return false;
		eval(data);
	});
}

function decor_save() {
	var str = $('#form').serialize(), btn = $('#submit');
	
	btn.addClass('process');
	$.post('/component/editor/include/design/proccess.php', str, function (data) {
		btn.removeClass('process');
		if ( data == 'error' ) return false;
		eval(data);
		decor.show();
	});
}

$(function(){
	$('.choice-design').click(function(){
		if (confirm("Внимание, текущий дизайн вашего сайта будет изменён! Вы точно хотите сменить дизайн?")) {
			$.get($(this).attr('href'),function(data){
				eval (data);
			});
			return false;
		} else {
			return false;
		}
	});
	
	imagePreview();
});