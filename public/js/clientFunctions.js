var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isChrome = !!window.chrome && !isOpera;
var isIE = /*@cc_on!@*/false || !!document.documentMode;

var setScreenSize = function(div, width, height){
	var jeu = div;
	var bW = width;
	var bH = height;

	var sW = $(window).width();
	var sH = $(window).height();

	var rW = sW/bW;
	var rH = sH/bH;

	if(rW < rH){
		//on gere en fonction de la largeur
		var scale = sW/bW;
	}else{
		//on gere en fonction de la hauteur
		var scale = sH/bH;
	}
	client.scale = scale;
	
	jeu.css({
		/*'zoom' : scale,
		'-moz-transform'    : 'scale(' + scale + ')',
		'-o-transform'    : 'scale(' + scale + ')',*/
		'transform'    : 'scale(' + scale + ')',
	});
	if(isFirefox || isOpera){
		jeu.css("top", (sH/2 - (bH/2)*scale)+"px");
		jeu.css("left", (sW/2 - (bW/2)*scale)+"px");
	}else{
		jeu.css("top", (sH/2 - (bH/2)*scale)+"px");
		jeu.css("left", (sW/2 - (bW/2)*scale)+"px")
	}
}

var canvasFullScreen = function(div){
	var jeu = div;
	var sW = $(window).width();
	var sH = $(window).height();
	jeu.attr("width", sW);
	jeu.attr("height", sH);
}

function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function loadEmoji(min, max){
	var html = '';
	for(var i = min; i <= max; i++){
		html += '<img class="emoji" val="'+i+'" src="img/emoji/'+i+'.png">';
	}
	document.getElementById("emoji").innerHTML = html;
}

function addMessage(mess){
	var image = '<img src="img/emoji/'+mess.msg+'.png">';
	$("#messages").append('<li>'+mess.pseudo+' : '+image+'</li>');
}