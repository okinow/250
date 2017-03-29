var uri = new Object();
uri.base  = document.location.protocol+'//'+document.location.hostname;
//uri.base  = 'http://me:81/pum8';
uri.js    = uri.base+'/public/js';
uri.img   = uri.base+'/public/img';
uri.ax    = uri.base+'/ax';
var lang  = 'es';
var imgLoading = new Image(60,60);  
imgLoading.src = uri.img+'/ajax-loader.gif'; 

(function($){$.fn.rateit=function(p1,p2){var options={};var mode="init";var capitaliseFirstLetter=function(string){return string.charAt(0).toUpperCase()+string.substr(1)};if(this.length==0){return this}var tp1=$.type(p1);if(tp1=="object"||p1===undefined||p1==null){options=$.extend({},$.fn.rateit.defaults,p1)}else{if(tp1=="string"&&p2===undefined){return this.data("rateit"+capitaliseFirstLetter(p1))}else{if(tp1=="string"){mode="setvalue"}}}return this.each(function(){var item=$(this);var itemdata=function(key,value){arguments[0]="rateit"+capitaliseFirstLetter(key);return item.data.apply(item,arguments)};if(!item.hasClass("rateit")){item.addClass("rateit")}var ltr=item.css("direction")!="rtl";if(mode=="setvalue"){if(!itemdata("init")){throw"Can't set value before init"}if(p1=="readonly"&&!itemdata("readonly")){item.find(".rateit-range").unbind();itemdata("wired",false)}if(p1=="value"&&p2==null){p2=itemdata("min")}if(itemdata("backingfld")){var fld=$(itemdata("backingfld"));if(p1=="value"){fld.val(p2)}if(p1=="min"&&fld[0].min){fld[0].min=p2}if(p1=="max"&&fld[0].max){fld[0].max=p2}if(p1=="step"&&fld[0].step){fld[0].step=p2}}itemdata(p1,p2)}if(!itemdata("init")){itemdata("min",itemdata("min")||options.min);itemdata("max",itemdata("max")||options.max);itemdata("step",itemdata("step")||options.step);itemdata("readonly",itemdata("readonly")!==undefined?itemdata("readonly"):options.readonly);itemdata("resetable",itemdata("resetable")!==undefined?itemdata("resetable"):options.resetable);itemdata("backingfld",itemdata("backingfld")||options.backingfld);itemdata("starwidth",itemdata("starwidth")||options.starwidth);itemdata("starheight",itemdata("starheight")||options.starheight);itemdata("value",itemdata("value")||options.value||options.min);itemdata("ispreset",itemdata("ispreset")!==undefined?itemdata("ispreset"):options.ispreset);if(itemdata("backingfld")){var fld=$(itemdata("backingfld"));itemdata("value",fld.hide().val());if(fld.attr("disabled")||fld.attr("readonly")){itemdata("readonly",true)}if(fld[0].nodeName=="INPUT"){if(fld[0].type=="range"||fld[0].type=="text"){itemdata("min",parseInt(fld.attr("min"))||itemdata("min"));itemdata("max",parseInt(fld.attr("max"))||itemdata("max"));itemdata("step",parseInt(fld.attr("step"))||itemdata("step"))}}if(fld[0].nodeName=="SELECT"&&fld[0].options.length>1){itemdata("min",Number(fld[0].options[0].value));itemdata("max",Number(fld[0].options[fld[0].length-1].value));itemdata("step",Number(fld[0].options[1].value)-Number(fld[0].options[0].value))}}item.append('<div class="rateit-reset"></div><div class="rateit-range"><div class="rateit-selected" style="height:'+itemdata("starheight")+'px"></div><div class="rateit-hover" style="height:'+itemdata("starheight")+'px"></div></div>');if(!ltr){item.find(".rateit-reset").css("float","right");item.find(".rateit-selected").addClass("rateit-selected-rtl");item.find(".rateit-hover").addClass("rateit-hover-rtl")}itemdata("init",true)}var range=item.find(".rateit-range");range.width(itemdata("starwidth")*(itemdata("max")-itemdata("min"))).height(itemdata("starheight"));var presetclass="rateit-preset"+((ltr)?"":"-rtl");if(itemdata("ispreset")){item.find(".rateit-selected").addClass(presetclass)}else{item.find(".rateit-selected").removeClass(presetclass)}if(itemdata("value")!=null){var score=(itemdata("value")-itemdata("min"))*itemdata("starwidth");item.find(".rateit-selected").width(score)}var resetbtn=item.find(".rateit-reset");if(resetbtn.data("wired")!==true){resetbtn.click(function(){itemdata("value",itemdata("min"));range.find(".rateit-hover").hide().width(0);range.find(".rateit-selected").width(0).show();if(itemdata("backingfld")){$(itemdata("backingfld")).val(itemdata("min"))}item.trigger("reset")}).data("wired",true)}var calcRawScore=function(element,event){var pageX=(event.changedTouches)?event.changedTouches[0].pageX:event.pageX;var offsetx=pageX-$(element).offset().left;if(!ltr){offsetx=range.width()-offsetx}if(offsetx>range.width()){offsetx=range.width()}if(offsetx<0){offsetx=0}return score=Math.ceil(offsetx/itemdata("starwidth")*(1/itemdata("step")))};if(!itemdata("readonly")){if(!itemdata("resetable")){resetbtn.hide()}if(!itemdata("wired")){range.bind("touchmove touchend",touchHandler);range.mousemove(function(e){var score=calcRawScore(this,e);var w=score*itemdata("starwidth")*itemdata("step");var h=range.find(".rateit-hover");if(h.data("width")!=w){range.find(".rateit-selected").hide();h.width(w).show().data("width",w);var data=[(score*itemdata("step"))+itemdata("min")];item.trigger("hover",data).trigger("over",data)}});range.mouseleave(function(e){range.find(".rateit-hover").hide().width(0).data("width","");item.trigger("hover",[null]).trigger("over",[null]);range.find(".rateit-selected").show()});range.mouseup(function(e){var score=calcRawScore(this,e);var newvalue=(score*itemdata("step"))+itemdata("min");itemdata("value",newvalue);if(itemdata("backingfld")){$(itemdata("backingfld")).val(newvalue)}if(itemdata("ispreset")){range.find(".rateit-selected").removeClass(presetclass);itemdata("ispreset",false)}range.find(".rateit-hover").hide();range.find(".rateit-selected").width(score*itemdata("starwidth")*itemdata("step")).show();item.trigger("hover",[null]).trigger("over",[null]).trigger("rated",[newvalue])});itemdata("wired",true)}if(itemdata("resetable")){resetbtn.show()}}else{resetbtn.hide()}})};function touchHandler(event){var touches=event.originalEvent.changedTouches,first=touches[0],type="";switch(event.type){case"touchmove":type="mousemove";break;case"touchend":type="mouseup";break;default:return}var simulatedEvent=document.createEvent("MouseEvent");simulatedEvent.initMouseEvent(type,true,true,window,1,first.screenX,first.screenY,first.clientX,first.clientY,false,false,false,false,0,null);first.target.dispatchEvent(simulatedEvent);event.preventDefault()}$.fn.rateit.defaults={min:0,max:5,step:0.5,starwidth:16,starheight:16,readonly:false,resetable:true,ispreset:false};$(function(){$("div.rateit").rateit()})})(jQuery);
(function($){$.fn.ShowName=function(){var opts=$.fn.ShowName.defaults;return this.each(function(){var oText=$(this).children(opts.TagName);oText=oText.hide();var oImg=$(this).hover(function(){oHover=oText;window.setTimeout(function(){HoverCheckAndShow(oText)},opts.HoverCheck)},function(){oHover=null;oText.animate(opts.AnimHide,opts.HoverOut,opts.AnimHideCallback)})})};$.fn.ShowName.defaults={AnimShow:{opacity:"show"},AnimShowCallback:null,HoverCheck:100,HoverIn:200,AnimHide:{opacity:"hide"},AnimHideCallback:null,HoverOut:200,TagName:"p"};function HoverCheckAndShow(oText){var opts=$.fn.ShowName.defaults;if(oHover==oText){oText.animate(opts.AnimShow,opts.HoverIn,function(){this.style.display="inline";if(typeof(opts.AnimShowCallback)=="function"){opts.AnimShowCallback()}});oText.each(function(){this.style.display="inline"});if($.browser.msie){oText.each(function(){var oThis=this;window.setTimeout(function(){oThis.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=80)"},opts.HoverIn-260)})}}return oText}var oHover=null;$.fx.prototype.update=function(){if(this.options.step){this.options.step.apply(this.elem,[this.now,this])}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width"){this.elem.style.display="inline"}}})(jQuery);
$.fn.countDown=function(settings,to){settings=$.extend({startFontSize:"20px",endFontSize:"20px",duration:1000,startNumber:10,endNumber:0,skipAd:10,callBack:function(){}},settings);return this.each(function(){if(!to&&to!=settings.endNumber){to=settings.startNumber}if(to==settings.skipAd){$("#gameAd .loading").html('<span class="closeAd">SKIP TO GAME</span>')}$(this).text(to).css("fontSize",settings.startFontSize);$(this).animate({fontSize:settings.endFontSize},settings.duration,"",function(){if(to>settings.endNumber+1){$(this).css("fontSize",settings.startFontSize).text(to-1).countDown(settings,to-1)}else{settings.callBack(this)}})})};
$.fn.showDetails=function(){if($("#detBox").length==0){$("body").append('<div class="bRound" id="detBox"><div class="detHolder bRound detTop"><span class="name"></span><span class="arrow"></span></div></div>')}var s=$("#detBox");var h=$(window).height();var d=$(window).width();var j=$(this[0]);var g=$(j).offset();var o=g.top;var k=g.left;var s=$("#detBox");var text="";if($(j).attr("title")!="" && $(j).attr('title') != undefined){text=$(j).attr("title");$(j).attr("data-title",text);$(j).attr("title","")}else{text=$(j).attr("data-title")}if(text==undefined||text.length==0){return false}text=text.split(" || ");$(s).find(".name").html(text[0]);$(s).find(".cat").html(text[1]);var r=$(s).outerHeight();var l=$(s).outerWidth();var i=$(j).outerWidth();var m=$(j).outerHeight();var p=l/2-(i/2);var t=m+5;var q=o+r+t+20;var n=h+$(window).scrollTop();var holder=$(s).find(".detHolder");if(q>=n){o=o-r-5;t=-15;$(holder).removeClass("detTop");$(holder).addClass("detBottom")}else{t=t+15;$(holder).removeClass("detBottom");$(holder).addClass("detTop")}if(k-p<=0){k=1;p=0}else{if(k+p>=d){k=d-(l/2+(i/2))-5}}$(s).css({top:o+t,left:k-p,position:"absolute","z-index":"1000",display:"block"});return false};
(function($){var b_text="";var tbi=-1;var tindex=0;$.fn.__searchkeys=function(){b_text=$(this).attr("data-alt");var inp=$(this);$("body").live("click",function(){$("#searchResults").hide()});$(inp).live("blur",function(){if(!$(this).val()){$(this).val(b_text)}});$(inp).live("focus",function(){if($(this).val()==b_text){$(this).val("")}});$(inp).live("keyup",function(d){var c=$(this).val();var a=d.charCode?d.charCode:d.keyCode;if(a==38){return up_focus()}else{if(a==40){return down_focus()}else{if(c.length>1){$.ajax({type:"GET",async:true,url:uri.ax+"/search.php?k="+encodeURIComponent(c),success:function(data){$("#searchResults").html(data);$("#searchResults").show()}})}else{$("#searchResults").hide();tbi=-1}}}$("#searchResults").hide()});$(inp).live("keypress",function(d){var a=d.charCode?d.charCode:d.keyCode;c=$(this).val();if(a==13){document.location.href=uri.base+$("#searchResults a.activeHover").attr("href")}})};function down_focus(){tindex=$("#searchResults a").index();if(tbi<tindex){tbi++;$("#searchResults a").removeClass("activeHover");$("#searchResults a").eq(tbi).addClass("activeHover")}}function up_focus(){if(tbi>0){tbi--;$("#searchResults a").removeClass("activeHover");$("#searchResults a").eq(tbi).addClass("activeHover")}}})(jQuery);

$(document).ready(function(){
    var lang = $('html').attr('lang');

    $('a.ti img, a.t img').each(function() {
        $(this).attr("src", $(this).attr('data-src'));	    
        $(this).removeAttr('data-src');
    });

    $('#searchText').focus(function(){
        if ($(this).val() == $(this).attr('data-alt')) $(this).val('');
    });
        
    $('#searchText').blur(function(){
        if ($(this).val() == '') $(this).val($(this).attr('data-alt'));
    });        
        
    $('#searchText').__searchkeys();
        
    $('body').click(function(){
        $("#searchResults").fadeOut();
    });

    if ($('.menu').length > 0) {

        $.fn.ShowName.defaults.AnimShow = {
            height: "show"
        };
        $.fn.ShowName.defaults.AnimHide = {
            height: "hide"
        };

        /* activate ShowName */
        $('.frivgames a, .tp a').ShowName();
    
        $("http://www.friv10com.com/plugins/site/themes/friv10/a.t, a.ti").live('mouseout', function (event) {
            event.preventDefault();
            var img =  $(this).find('img');
            var color = $(img).parent().parent().hasClass('tp') ? '#fff' : '#093d62';
            $(img).stop().animate({
                borderTopColor: color,
                borderBottomColor: color,
                borderLeftColor: color,
                borderRightColor: color
            }, 400);
        });
    
        $('http://www.friv10com.com/plugins/site/themes/friv10/a.t, a.ti').live('mouseover', function (event) {
            event.preventDefault();
            var img =  $(this).find('img');
            var color = $(img).parent().parent().hasClass('tp') ? '#004060' : '#fff';
            $(img).stop().animate({
                borderTopColor: color,
                borderBottomColor: color,
                borderLeftColor: color,
                borderRightColor: color
            }, 400);
        });    


        $('.menu').hover(function(){
            $('.dropdown .parent',this).addClass('hover');
            $('.dropdown .children',this).show();
            $('.dropdown .littleArrow',this).html('▲');
 
        }, function(){
            $('.dropdown .parent',this).removeClass('hover');
            $('.dropdown .children',this).hide();
            $('.dropdown .littleArrow',this).html('▼');
        });
        
        $("#languageBox").mouseover(function(){
            var xy = $("#languageBox").position();
            var top = xy.top-70;
            $("#languageBox .flagSelector").css({
                top: top+'px'
            }).show();
        });
        
        $("#languageBox").mouseout(function(){
            $("#languageBox .flagSelector").hide();
        });
        
        
        
    } else {
        
        $('a.t').live('mouseout', function () {
            $('#detBox').hide();
        });
        $('a.t').live('mouseover', function () {
            $(this).showDetails();
        });
        
        //we bind only to the rateit controls within the products div
        $('#voting .rateit').bind('rated reset', function (e) {
            var ri = $(this);
 
            //if the use pressed reset, it will get value: 0 (to be compatible with the HTML range control), we could check if e.type == 'reset', and then set the value to  null .
            var value = ri.rateit('value');
            var gameID = ri.data('id'); // if the product id was in some hidden field: ri.closest('li').find('input[name="productid"]').val()
 
            //maybe we want to disable voting?
            ri.rateit('readonly', true);
            $(ri).showDetails();
            
            var time = window.setTimeout(function(){$('#detBox').fadeOut('slow');}, 3000);
            
            $.ajax({
                url: uri.ax+'/rating.php', //your server side script
                data: {
                    id: gameID, 
                    rating: value
                }, //our data
                type: 'POST',
                success: function (data) {
//                    $('#response').append('<li>' + data + '</li>');
                },
                error: function (jxhr, msg, err) {
//                    $('#response').append('<li style="color:red">' + msg + '</li>');
                }
            });
        });
        
        $('.closeAd').live('click', function(){
            $('#gameAd').fadeOut('fast');
            $('#gameBox .gameWrap .game').css({
                'visibility' : 'visible'
            });
            return false;
        });
        $('#gameAd').fadeIn('fast');
        $('#gameAd .clock span').countDown({
            startNumber: 15,
            skipAd: 10,
            callBack: function(me) {
                $('#gameAd').fadeOut('fast');
                $('#gameBox .gameWrap .game').css({
                    'visibility' : 'visible'
                });
            }
        });
        
    }
});


function getGames() {
    $.ajax({
        type : 'GET',
        async : true,
        url: uri.ax+'/get_games.php?lpag='+pag+'&idc='+cat+'&l='+lang,
        success : function(data){
            console.log(data);
        }
    });
}

var is_loading = false;
function paging(page) {
    
    var cur_page = parseInt($('#curPage').val());
    
    var pos = page > cur_page ?  1 : 0;
    
    if (!page || page > parseInt($('#totPages').val()) || is_loading) return false;

    is_loading = true;

    var parent = $('#cont_'+cur_page).parent();
    var h = $(parent).height();
    var w = $(parent).width();

    cur_rel = $('#cont_'+cur_page).is(":first-child") ? true : false;
    page_rel = $('#cont_'+page).is(":first-child") ? true : false;
            
    if ($('#cont_'+page).length > 0) {

        /* izquierda a derecha */
        if (pos) {
            $('#cont_'+cur_page).animate({
                'left' : '-106%'
            }, 400, function(){
                if (cur_rel) $(this).css({
                    'position': 'relative'
                })
            });
            $('#cont_'+page).css({
                'left' : '106%', 
                'top' : '0px', 
                'width' : '100%', 
                'position' : (page_rel ? 'relative' : 'absolute')
            });
            $('#cont_'+page).animate({
                'left' : '0%'
            }, 400);
        } else {
            
            $('#cont_'+cur_page).animate({
                'left' : '106%'
            }, 400, function(){
                if (cur_rel) $(this).css({
                    'position': 'relative'
                })
            });
            $('#cont_'+page).css({
                'left' : '-106%', 
                'top' : '0px', 
                'width' : '100%', 
                'position' : (page_rel ? 'relative' : 'absolute')
            });
            $('#cont_'+page).animate({
                'left' : '0%'
            }, 400);
            
        }

    } else {

        $.getJSON(uri.ax+'/get_games.php?pag='+page+'&idc='+$('#curCat').val()+'&l='+lang+'&o='+$('#o').val(), function(data){

            var games = '<div id="cont_'+page+'">';

            for (var i=0, l=data.length; i<l; i++) 
                games += '<div class="frivgames"><div class="scale"></div><a class="ti" href="'+lang+'/game/'+data[i].link+'/"><p><span class="shadowed">'+data[i].name+'</span><span class="dropshadow">'+data[i].name+'</span></p><img src="../../../../index.htm"/*tpa=http://www.friv10com.com/plugins/site/themes/friv10/public/img/ajax-loader.gif*/ data-src="'+data[i].image+'" alt="'+data[i].name+'" /></a></div>';
            
            games += '</div>';
            
            if (games != '') $('#contGames').append(games);
            
            if (pos) {
                
                $('#cont_'+page).css({
                    'left' : '106%', 
                    'top' : '0px', 
                    'width' : '100%', 
                    'position' : (page_rel ? 'relative' : 'absolute')
                });
            
                $('#cont_'+cur_page).animate({
                    'left' : '-106%'
                }, 400, function(){
                    if (cur_rel) $(this).css({
                        'position': 'relative'
                    })
                });
                
                $('#cont_'+page).animate({
                    'left' : '0%'
                }, 400);
                
            } else {
                
                $('#cont_'+cur_page).animate({
                    'left' : '106%'
                }, 400, function(){
                    if (cur_rel) $(this).css({
                        'position': 'relative'
                    })
                });
                $('#cont_'+page).css({
                    'left' : '-106%', 
                    'top' : '0px', 
                    'width' : '100%', 
                    'position' : (page_rel ? 'relative' : 'absolute')
                });
                $('#cont_'+page).animate({
                    'left' : '0%'
                }, 400);
            } 
            
            $('#cont_'+page+' a.ti img').each(function(){ 
                var img = new Image(60,60);  
                img.src = $(this).attr('data-src');
                var obj = $(this);
                $(img).load(function(){
                    $(obj).attr("src", $(obj).attr('data-src'));      
                    $(obj).removeAttr('data-src');
                })
            });
            
            $('#cont_'+page+' a.ti').ShowName();
        });
    }
    
     
    
    return false;
}