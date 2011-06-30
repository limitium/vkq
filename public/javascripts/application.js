
$(document).ready(function() {
 	$('.rating_list div.name .button_01').click(function(){
 		var but = $(this);
 		var queenLi = but.parents('li');
 		var queen = queenLi.attr('queen');
 		var val = but.hasClass("button_green") ? 1 : -1;
    	
 		VKQ.vote(queen, val, function(){
 			var rating = queenLi.children('div.rating');
 			rating.html(parseInt(rating.html()) + val);
 		});
	});
});
                
VKQ.run(function() {
	
    console.log(VK);
    VKQ.updateProfile();
	
});


