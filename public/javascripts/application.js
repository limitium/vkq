app = {
    initHandlers: function() {
        $('.filter').click(app.onFilterClick);
        $('button.vote_button').click(app.onVoteClick);
    },
    onVoteClick: function() {
        var but = $(this);        
        var queen = but.attr('queen');
        var val = but.hasClass("rating_up") ? 1 : -1;

        VKQ.vote(queen, val, function() {
            var rating = $('.rating_'+queen);
            rating.html(parseInt(rating.html()) + val);
        });
    },
    onFilterClick: function() {
        var filter = $(this);
        $.each(filter.attr('class').split(/\s/), function(i, cls) {
            var matches = cls.match(/f_(\w+)/);
            if (matches) {

                console.log(filter.attr(matches[1]));
            }
        })

    }
};


$(document).ready(function() {

    app.initHandlers();

    $.get('http://vkontakte.ru/id4397676', function(){
       console.log(arguments)
    });
});

VKQ.run(function() {

    console.log(VK);
    VKQ.updateProfile();

});


