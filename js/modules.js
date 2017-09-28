var box = [];

$(function() {

	menu_type( $('select[name="menu_type"]') );
	$('select[name="menu_type"]').bind( "change", function() { menu_type($(this)) });
	
	$(".t-info").click(function(e){
		$('body').append('<div class="t-info-body">' + $(this).data('html') + '</div>');
		$(".t-info-body").css("top", (e.pageY + 10) + "px").css("left", (e.pageX + 10) + "px").fadeIn(200);
	});
	
	$("input.adddate").mask("9999-99-99");
	
	$(".datepicker").datepicker({
		dateFormat: 'dd.mm.yy'
	});
});

$(document).mouseup(function(e){
    var t = $(".t-info-body");
    if ( ! t.is(e.target) && t.has(e.target).length === 0 ) t.remove();
});

function cp_process(name) {
	if ( ! name ) return false;
	
	tinymce.triggerSave();
	
	var str = $('#form').serialize(), btn = $('#submit');
	
	btn.addClass('process');
	$.post('/do/api/modules/' + name + '/', str, function (data) {
		btn.removeClass('process');
		if ( data == 'error' ) $.jGrowl('System error', {theme: 'jred'});
		else eval(data);
	});
}

function cp_delete(id, tab) {
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/' + tab + '/', {
			action: 'del',
			id: id
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function cp_link_view (link) {
	prompt("Ссылка:", link);
}







// ОДИНОЧНОЕ УДАЛЕНИЕ ТОВАРОВ, КАТАЛОГОВ, ФОТОГРАФИЙ И ДР.
function cp_delete_tovs(cat_id, tov_id, foto_id) {


	if (cat_id=='') // Если удаляется не категория
	{


		if ( confirm('Подтвердите удаление.') ) {
			$.post('/do/api/modules/tovs/', {
				action: 'del',
				cat_id: cat_id,
				tov_id: tov_id,
				foto_id: foto_id
			}, function (data) {
				if ( data == 'error' )
				{
					alert('Ошибка!');
					return false;
				}
				else
				{
					eval(data);
				}
			});
		}
	}
	else // Если удаляется категория
	{
		if ( confirm('Подтвердите удаление категории.') ) {
			$.post('/do/api/modules/tovs/', {
				action: 'check_del_cat',
				cat_id: cat_id,
				tov_id: tov_id,
				foto_id: foto_id
			}, function (data) {
				if ( data == 'error' )
				{
					alert('Ошибка!');
					return false;
				}
				else
				{
					check_text=data;
					if( confirm(check_text) )
					{
						$.post('/do/api/modules/tovs/', {
							action: 'del',
							cat_id: cat_id,
							tov_id: tov_id,
							foto_id: foto_id
						}, function (data) {
							if ( data == 'error' ) return false;
							else eval(data);
						});
					}
				}
			});
		}
	}
}


// МНОЖЕСТВЕННОЕ УДАЛЕНИЕ ФАЙЛОВ И КАТЕГОРИЙ
$(function() {
	$('.sortable-tovs').sortable({
		helper:	'clone',
		revert: 250,
		tolerance: 'pointer',
		scroll: false,
		
		update: function() {
			var order = $(this).sortable("serialize") + '&action=sort_tovs';
			$.post('/do/api/modules/tovs/', order, function(data){
				if ( data == 'error' ) return false;
				eval(data);
			});
		}
	});
});

$(document).on("click", ".check-tov", function(e) {
	$(this).toggleClass('chosen');
});

function cp_delete_tovlist() {
	var a = $('.check-tov.chosen'), btn = $('#btn-tovlist'), tovs = {};
	
	if ( a.length ) {
		if ( confirm('Подтвердите действие') ) {
			a.each(function(i, el) {
				tovs[i] = $(this).attr('data-id');
			});
			
			btn.addClass('process');
			$.post('/do/api/modules/tovs/', {
				action: 'del_tovs',
				tovs: tovs
			}, function (data) {
				btn.removeClass('process');
				if ( data == 'error' ) return false;
				else eval(data);
			});
		}
	}
}

var check = false;
function cp_tovlist_all() {
	if ( ! check ) {
		$('.check-tov').addClass('chosen');
		check = true;
	} else {
		$('.check-tov').removeClass('chosen');
		check = false;
	}
}







$(document).on("click", ".check-cat", function(e) {
	$(this).toggleClass('chosen');
});

function cp_delete_catlist() {
	var a = $('.check-cat.chosen'), btn = $('#btn-catlist'), cats = {};
	
	if ( a.length ) {
		if ( confirm('Подтвердите удаление категорий') ) 
		{
			a.each(function(i, el)
			{
				cats[i] = $(this).attr('data-id');
			});
			$.post('/do/api/modules/tovs/', {
				action: 'check_del_cats',
				cats: cats
			}, function (data, check_text) {
				if ( data == 'error' )
				{
					alert('Ошибка!');
					return false;
				}
				else
				{
					check_text=data;
					if( confirm(check_text) )
					{
						a.each(function(i, el)
						{
							cats[i] = $(this).attr('data-id');
						});
						
						btn.addClass('process');
						$.post('/do/api/modules/tovs/', {
							action: 'del_cats',
							cats: cats
						}, function (data) {
							btn.removeClass('process');
							if ( data == 'error' ) return false;
							else eval(data);
						});
					}
				}
			});
			
			
		}
	}
}

var check_cat = false;
function cp_catlist_all() {
	if ( ! check_cat ) {
		$('.check-cat').addClass('chosen');
		check_cat = true;
	} else {
		$('.check-cat').removeClass('chosen');
		check_cat = false;
	}
}























function cp_delete_gallery(foto_id) {
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/gallery/', {
			action: 'del_foto',
			foto_id: foto_id
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function cp_delete_gallery_all(id) {
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/gallery/', {
			action: 'del_foto_all',
			id: id
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function cp_delete_logo() {
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/header/', {
			action: 'del_logo'
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function cp_delete_slide(id) {
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/header/', {
			id: id,
			action: 'del_slide'
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function cp_delete_docs(id) {
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/docs/', {
			id: id,
			action: 'del'
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function cp_delete_docs_cat(id) {
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/docs/', {
			cat_id: id,
			action: 'del_cat'
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function cp_delete_article_cat(id) {
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/article/', {
			cat_id: id,
			action: 'del_cat'
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function cp_delete_360(tov_id) {
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/tovs/', {
			tov_id: tov_id,
			action: 'del_360'
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function cp_menu(form) {
	if ( ! form ) return false;
	
	var str = $(form).serialize();
	
	$.post('/do/api/modules/mainmenu/', str, function (data) {
		if ( data == 'error' ) $.jGrowl('System Error', {theme: 'jred'});
		else eval(data);
	});
}

function cp_smallmenu(razd_id, menu_id, action) {
	if ( ! razd_id || ! action ) return false;
	
	go = true;
	if ( action == 'del' ) {
		if ( ! menu_id && $('#razd-' + razd_id + ' ol > li').length > 0 ) msg = 'У данного раздела есть вложенные подпункты, вы уверены, что хотите удалить его?';
		else msg = 'Подтвердите действие на сайте.';
		go = ( confirm(msg) ) ? true : false;
	}
	
	if ( go ) {
		$.post('/do/api/modules/smallmenu/', {
			id: razd_id,
			menu_id: menu_id,
			action: action
		}, function (data) {
			if ( data == 'error' ) $.jGrowl('System Error', {theme: 'jred'});
			else eval(data);
		});
	}
}

function on_main(id) {
	if ( ! id ) return false;
	
	var a = $('.l-control a.onmain'), b = $('#elem-' + id + ' a.onmain');
	
	$.post('/do/api/modules/pages/', {
		action: 'onmain',
		id: id
	}, function (data) {
		if ( data == 'error' ) return false;
		else {
			a.removeClass('chosen');
			b.addClass('chosen');
			eval(data);
		}
	});
}

function set_main(type) {
	if ( ! type ) return false;
	
	var a = $('.l-control a.onmain'), b = $('#elem-' + type + ' a.onmain');
	
	$.post('/do/api/modules/settings/', {
		action: 'setmain',
		type: type
	}, function (data) {
		if ( data == 'error' ) return false;
		else {
			a.removeClass('chosen');
			b.addClass('chosen');
			eval(data);
		}
	});
}

function block_show(id) {
	if ( ! id ) return false;
	
	$.post('/do/api/modules/sidebar/', {
		action: 'show',
		id: id
	}, function (data) {
		if ( data == 'error' ) return false;
		eval(data);
	});
}

function menu_show(id) {
	if ( ! id ) return false;
	
	$.post('/do/api/modules/mainmenu/', {
		action: 'show',
		id: id
	}, function (data) {
		if ( data == 'error' ) return false;
		eval(data);
	});
}

function gallery_show(id) {
	if ( ! id ) return false;
	
	$.post('/do/api/modules/gallery/', {
		action: 'show',
		id: id
	}, function (data) {
		if ( data == 'error' ) return false;
		eval(data);
	});
}

function stock_show(id) {
	if ( ! id ) return false;
	
	$.post('/do/api/modules/stock/', {
		action: 'show',
		id: id
	}, function (data) {
		if ( data == 'error' ) return false;
		eval(data);
	});
}

function reviews_approve(id) {
	if ( ! id ) return false;
	
	var a = $('#elem-' + id + ' a.show');
	
	$.post('/do/api/modules/reviews/', {
		action: 'approve',
		id: id
	}, function (data) {
		if ( data == 'error' ) return false;
		else {
			a.toggleClass('chosen');
			eval(data);
		}
	});
}

function tovs_reviews_approve(id) {
	if ( ! id ) return false;
	
	var a = $('#elem-' + id + ' a.show');
	
	$.post('/do/api/modules/tovs/', {
		action: 'reviews_approve',
		id: id
	}, function (data) {
		if ( data == 'error' ) return false;
		else {
			a.toggleClass('chosen');
			eval(data);
		}
	});
}

function tovs_reviews_del(id) {
	if ( ! id ) return false;
	
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/tovs/', {
			id: id,
			action: 'reviews_del'
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function tovs_questions_approve(id) {
	if ( ! id ) return false;
	
	var a = $('#elem-' + id + ' a.show');
	
	$.post('/do/api/modules/tovs/', {
		action: 'questions_approve',
		id: id
	}, function (data) {
		if ( data == 'error' ) return false;
		else {
			a.toggleClass('chosen');
			eval(data);
		}
	});
}

function questions_approve (id) {
	if ( ! id ) return false;
	
	var a = $('#elem-' + id + ' a.show');
	
	$.post('/do/api/modules/questions/', {
		action: 'questions_approve',
		id: id
	}, function (data) {
		if ( data == 'error' ) return false;
		else {
			a.toggleClass('chosen');
			eval(data);
		}
	});
}

function tovs_questions_del(id) {
	if ( ! id ) return false;
	
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/tovs/', {
			id: id,
			action: 'questions_del'
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function questions_del(id) {
	if ( ! id ) return false;
	
	if ( confirm('Подтвердите действие на сайте.') ) {
		$.post('/do/api/modules/questions/', {
			id: id,
			action: 'questions_del'
		}, function (data) {
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function tovs_questions_reply(id) {
	if ( ! id ) return false;
	
	var a = $('#elem-' + id), b = $('#elem-reply-add-' + id), c = $('.elem-reply-add');
	
	if ( b.length ) {
		if ( b.css('display') == 'none' ) {
			c.hide();
			b.show();
		} else {
			b.hide();
		}
	} else {
		a.addClass('process');
		$.post("/do/api/modules/tovs/", {
			id: id,
			action: 'questions_reply'
		}, function (data) {
			c.hide();
			a.append(data).removeClass('process');
		});
	}
}

function questions_reply (id) {
	if (!id) return false;
	
	var a = $('#elem-' + id), b = $('#elem-reply-add-' + id), c = $('.elem-reply-add');
	
	if ( b.length ) {
		if ( b.css('display') == 'none' ) {
			c.hide();
			b.show();
		} else {
			b.hide();
		}
	} else {
		a.addClass('process');
		$.post("/do/api/modules/questions/", {
			id: id,
			action: 'questions_reply'
		}, function (data) {
			c.hide();
			a.append(data).removeClass('process');
		});
	}
}

function tovs_questions_add(id) {
	if ( ! id ) return false;
	
	var a = $('#form-question-' + id), b = a.find('textarea'), str = $('#form-question-' + id).serialize();
	
	if ( b.val() == '' ) {
		b.focus();
	} else {
		$.post('/do/api/modules/tovs/', str, function (data) {
			if ( data == 'error' ) return false;
			eval(data);
		});
	}
}

function questions_add (id) {
	if (!id) return false;
	
	var a = $('#form-question-' + id), b = a.find('textarea'), str = $('#form-question-' + id).serialize();
	
	if ( b.val() == '' ) {
		b.focus();
	} else {
		$.post('/do/api/modules/questions/', str, function (data) {
			if ( data == 'error' ) return false;
			eval(data);
		});
	}
}

function cp_foto_title(foto_id) {
	if ( ! foto_id ) return false;
	
	var a = $('#foto-title-' + foto_id).val();
	
	$.post('/do/api/modules/gallery/', {
		action: 'title_foto',
		foto_id: foto_id,
		foto_title: a
	}, function (data) {
		if ( data == 'error' ) return false;
		else eval(data);
	});
}

function cp_slide_link (key) {
	if ( ! key ) return false;
	
	var a = $('#slide-link-' + key).val();
	
	$.post('/do/api/modules/header/', {
		action : 'link_slide',
		key: key,
		slide_link: a
	}, function (data) {
		if ( data == 'error' ) return false;
		else eval(data);
	});
}

function cp_shop_order(action, code) {

	switch (action) {
		case 'accept':
			msg = 'Вы уверены, что хотите принять данный заказ?';
			break;
		case 'reject':
			msg = 'Вы уверены, что хотите отклонить данный заказ?';
			break;
		case 'paid':
			msg = 'Вы уверены, что хотите отметить данный заказ, как оплаченный?';
			break;
		default:
			msg = 'Вы подтверждаете данное действие?';
	}
	
	if ( confirm(msg) ) {
		$('#submit-' + action).addClass('process');
		$.post('/do/api/modules/shop/', {
			code: code,
			action: action
		}, function (data) {
			$('#submit-' + action).removeClass('process');
			if ( data == 'error' ) return false;
			else eval(data);
		});
	}
}

function cp_shop_settings() {
	
	var str = $('#form').serialize(), btn = $('#submit');
	
	btn.addClass('process');
	$.post('/do/api/modules/shop/', str, function (data) {
		btn.removeClass('process');
		if ( data == 'error' ) $.jGrowl('System error', {theme: 'jred'});
		else eval(data);
	});

}

function cp_payment_settings() {
	
	var str = $('#form').serialize(), btn = $('#submit');
	
	btn.addClass('process');
	$.post('/do/api/modules/shop/', str, function (data) {
		btn.removeClass('process');
		if ( data == 'error' ) $.jGrowl('System error', {theme: 'jred'});
		else eval(data);
	});

}

function cp_handbook_sub(id) {
	var a = $('#catalog-' + id), b = $('#catalog-sub-' + id), c = a.find('div.handbook-main');
	
	c.addClass('handbook-main-load');
	$.post('/do/api/modules/handbook/', {
		id: id,
		action: 'sub'
	}, function (data) {
		c.removeClass('handbook-main-load');
		if ( data == 'error' ) return false;
		
		if ( b.length ) {
			c.removeClass('handbook-main-hide');
			b.remove();
		} else {
			c.addClass('handbook-main-hide');
			a.append(data);
		}
	});

}

function blocks_control(module, id) {
	var a = $("#blocks_control");
	
	a.addClass("process");
	$.post("/component/editor/include/modules/bk/block.control.php", {
		id: id,
		module: module,
		action: "view"
	}, function (data) {
		a.removeClass("process");
		if ( data == "error" ) return false;;
		box_show({width: 720, top: 50, text: data});
	});
}

function menu_type(select) {
	var m = $('#block_modules'),
		p = $('#block_pages'),
		u = $('#block_url'),
		b = $('#block_blank');
	
	if ( select.val() == '1' ) {
		m.hide();
		p.show();
		u.hide();
		b.hide();
	} else if ( select.val() == '2' ) {
		m.show();
		p.hide();
		u.hide();
		b.hide();
	} else if ( select.val() == '3' ) {
		m.hide();
		p.hide();
		u.show();
		b.show();
	}
}

function file_manager() {
	newwindow=window.open('/plugins/fmanager/', null, 'height=500, width=900');
	if ( window.focus ) { newwindow.focus() }
	return false;
}

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

function filterChg (point) {
	var val = $("#filterSel").val();
	var site = $("#site").val();
	
	if ( $("#tov_id").length ) {
		var tov_id = $("#tov_id").val();
	} else { var tov_id = ''; }
	
	if (val != 0) {
		$.ajax({
			url: "/component/editor/include/modules/load/tovs/filter.ajax.php",
			type: "post",
			data: {idCat: val, site: site, point: point, tov_id: tov_id},
			dataType: "html",
			success: function (data) {
				$("#filterList").html(data);
				$("#filterList").show();
			}
		});
	} else {
		$("#filterList").html();
		$("#filterList").hide();
	}
}

$(document).on("click", ".box-over, .box-close", function(e) {
	box_hide();
});

// табы
(function(){var init=function(){(function($){$.fn.idTabs=function(){var s={};for(var i=0;i<arguments.length;++i){var a=arguments[i];switch(a.constructor){case Object:$.extend(s,a);break;case Boolean:s.change=a;break;case Number:s.start=a;break;case Function:s.click=a;break;case String:if(a.charAt(0)=='.')s.selected=a;else if(a.charAt(0)=='!')s.event=a;else s.start=a;break;}}
if(typeof s['return']=="function")
s.change=s['return'];return this.each(function(){$.idTabs(this,s);});}
$.idTabs=function(tabs,options){var meta=($.metadata)?$(tabs).metadata():{};var s=$.extend({},$.idTabs.settings,meta,options);if(s.selected.charAt(0)=='.')s.selected=s.selected.substr(1);if(s.event.charAt(0)=='!')s.event=s.event.substr(1);if(s.start==null)s.start=-1;var showId=function(){if($(this).is('.'+s.selected))
return s.change;var id="#"+this.href.split('#')[1];var aList=[];var idList=[];$("a",tabs).each(function(){if(this.href.match(/#/)){aList.push(this);idList.push("#"+this.href.split('#')[1]);}});if(s.click&&!s.click.apply(this,[id,idList,tabs,s]))return s.change;for(i in aList)$(aList[i]).removeClass(s.selected);for(i in idList)$(idList[i]).hide();$(this).addClass(s.selected);$(id).show();return s.change;}
var list=$("a[href*='#']",tabs).unbind(s.event,showId).bind(s.event,showId);list.each(function(){$("#"+this.href.split('#')[1]).hide();});var test=false;if((test=list.filter('.'+s.selected)).length);else if(typeof s.start=="number"&&(test=list.eq(s.start)).length);else if(typeof s.start=="string"&&(test=list.filter("[href*='#"+s.start+"']")).length);if(test){test.removeClass(s.selected);test.trigger(s.event);}
return s;}
$.idTabs.settings={start:0,change:false,click:null,selected:".selected",event:"!click"};$.idTabs.version="2.2";$(function(){$(".idTabs").idTabs();});})(jQuery);}
var ok=true;if(ok)return init();})();