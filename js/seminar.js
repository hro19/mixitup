//絞込機能 【アンカー式】、【セレクト式】を含む
$(function() {
	var containerEl = document.querySelector('.container');
	//alert(containerEl);

	$(function() {
		spSelectHandle('.select-filter');
		spSelectHandle('.select-filter2');
		spSelectHandle('.select-filter3');
	});

	//mixitup関数設定
	function spSelectHandle(elm){
	    var selectFilter = document.querySelector(elm);

		var mixer = mixitup(containerEl, {
		    callbacks: {
		        onMixEnd:function() {
					appendNoEvent();
      			}
		    }
		});

	    selectFilter.addEventListener('change', function(e) {

			// 絞込し直しで「条件に一致するセミナーはございません。」を削除する
	    	//$('p.no_event_message').remove();

	        var selector = selectFilter.value;
	        mixer.filter(selector);


	        //選択ごとにセレクト値が初期値に戻る設定（選択した値はそのままで）
	    	$('.select-filter,.select-filter2,.select-filter3').each(function() {
	    		var eTarget =e.target;
	    		//console.log(eTarget);
	    		//console.log($(this).context);
	    		if(($(this).context) == (eTarget)){
	    			//console.log("yes");
	    			$(this).css( "background-color", "#fe4a51" );
	    			$(this).css( "color", "#fff" );
	    			$(this).children().css( "background-color", "#fff" );
	    			$(this).children().css( "color", "#000" );
	    		}else{
	    			$(this).css( "background-color", "#efefef" );
	    			$(this).css( "color", "initial" );
 		       		$(this).children('option').removeAttr('selected'); //optionのselected要素の削除
   		     		this.selectedIndex= 0; //selectIndexを0に設定。
	    		}
        	});
	    });
	}
});


//絞込後の件数チェック、空ならメッセージ出力
function appendNoEvent(){
	var hitFrg = false;

	// 絞込し直しで「条件に一致するセミナーはございません。」を削除する
	$('p.no_event_message').remove();

	$('li.mix').each(function(i) {
		if ($(this).css('display') != 'none') {
			hitFrg = true;
		}
	});

	if(hitFrg === false){
		let noEventMessage = "条件に一致するセミナーはございません。"
		if($('ul.container p').length === 0){ //メッセージが既に発動していないかチェック
			$('ul.container').append('<p class="no_event_message">' + noEventMessage + '</p>');
		}
	}
}

//セミナー選択エリアにアニメーション
$(function() {
	var pagetop = $('.goseminar_sk');

	$(window).scroll(function () {

		//セミナー開催エリアの高さを取得する
		var seminarTopPosi = $('#seminar_skeg').offset().top;
		//console.log(seminarTopPosi);

		if ($(this).scrollTop() > seminarTopPosi) {
			pagetop.fadeIn();
		} else {
			pagetop.fadeOut();
		}
	});
	
	pagetop.click(function() {
		$("html,body").animate({ scrollTop: seminarTopPosi }, 500);
		return false;
	});
});


// 「全てのセミナーを表示する」ボタンの挙動
$(function(){
	let allSeminar = $(".all_seminar a");
	allSeminar.on("click",function(){
		$('.select-filter,.select-filter2,.select-filter3').each(function() {
	    	$(this).css( "background-color", "#efefef" );
	    	$(this).css( "color", "initial" );
			$(this).children('option').removeAttr('selected'); //optionのselected要素の削除
	    	this.selectedIndex= 0; //selectIndexを0に設定。
	    })
	})
});