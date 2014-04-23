
$(document).ready(function () {
	var POSTERS_PER_ROW = 8;
	 
	var $ring = $('#ring-1');
	var deg=0;

	var $contentArray = {};

	for (var i = POSTERS_PER_ROW - 1; i >= 0; i--) {
		var c = $('.poster[num='+i+'] .content');
		if(c&&c.length>0){
			$contentArray[i] = c;
		}
	};

	go(0,360);

	$('.wrapper').click(function (e) {
		var $target = $(e.target).closest('[cmd]');
		var cmd=$target.attr('cmd');
		if (cmd) {
			doCommand[cmd]($target);
		}
	});

	var doCommand = {
		prev: function () {
			var current = getCurrent();
			//current=(current-1 + POSTERS_PER_ROW);
			//current = current%POSTERS_PER_ROW;
			go(--current);

		},
		next: function () {
			var current = getCurrent();
			//current=(current+1 + POSTERS_PER_ROW);
			//current = current%POSTERS_PER_ROW;
			go(++current);
		},
		goto:function ($target) {
			var num=$target.attr("num");
			go(num);
		}
	}
	function getCurrent () {
		var current = $ring.attr('pos');
		if (!current) {current=0}
			else{
				current=parseInt(current);
			}
		return current;
	}
	function go (num, additional) {
		num = (num%POSTERS_PER_ROW+POSTERS_PER_ROW)%POSTERS_PER_ROW;
		additional = additional||0;
		var current = getCurrent();
		var step = num-current;
		if(Math.abs(step)>Math.abs(step-POSTERS_PER_ROW)){
			step -= POSTERS_PER_ROW;
		}
		if(Math.abs(step)>Math.abs(step+POSTERS_PER_ROW)){
			step += POSTERS_PER_ROW;
		}
		deg += step*-45 +additional;
		console.log('from: '+current+' goto:'+num+', step: '+step);


		$('.poster.current').removeClass('current');
		$('.poster[num='+num+']').addClass('current');
		$ring.attr('pos',num);

		var rotateTmpl = 'rotateY('+deg+'deg)';
		$ring.css('-webkit-transform',rotateTmpl)
		$ring.css('-moz-transform',rotateTmpl)
		$ring.css('transform',rotateTmpl);

		var left = num-1,left2 = num-2, right = num+1,right2 = num+2;
		if(left<0){left+=POSTERS_PER_ROW;}
		if(left2<0){left2+=POSTERS_PER_ROW;}
		if(right>=POSTERS_PER_ROW){right-=POSTERS_PER_ROW;}
		if(right2>=POSTERS_PER_ROW){right2-=POSTERS_PER_ROW;}

		setTimeout(function  (argument) {
			for (var i = POSTERS_PER_ROW - 1; i >= 0; i--) {
				if(i==num||i==left||i==right){
					$contentArray[i].removeClass('flip');
				}
				else{
					$contentArray[i].addClass('flip');
				}
			}
		},200);


	}

});