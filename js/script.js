$(function(){
	//banner init
	var bannerSlider = $( ".main-banner .slider" ).owlCarousel( {
			singleItem: true,
			navigation : true,
			pagination : false,
			slideSpeed : 400,
			navigationText : false
		});
})


//документация здесь:  instafeedjs.com     
var instaGallary = function(){
	$(function(){
		var setGallary,
			downloadMore = $('.insta-gallary .download'),
			userId = '623597756',
			clientId = '02b47e1b98ce4f04adc271ffbd26611d',
			accessToken = '623597756.02b47e1.3dbf3cb6dc3f4dccbc5b1b5ae8c74a72';



		setGallary = new Instafeed({
		    get: 'user',
		    userId: userId,
		    clientId: clientId,
		    accessToken: accessToken,
		    resolution: 'low_resolution',
		    template: '<div class="post"><a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" alt=""></a></div>',
		    sortBy: 'least-recent',
		    limit: 8,
		    links: false,
		    before: function(){
		    	downloadMore.on('click', function(){
		    		setGallary.next();
		    		$(this).text('').html('<img src="img/Loading_icon.gif">').attr('disabled', 'disabled');
		    	})
		    },
		    after: function(){
		    	downloadMore.text('Загрузить еще').removeClass('loading').removeAttr('disabled');
		    	if (!this.hasNext()){
		    		downloadMore.attr('disabled', 'disabled');
		    	}
		    }
	  	});

	  setGallary.run(); 
	});
};
instaGallary();