app = {
    initHandlers: function() {
        $('.filter').click(app.onFilterClick);
        $('.rating_list div.name button').click(app.onVoteClick);
    },
    onVoteClick: function() {
        var but = $(this);
        var queenLi = but.parents('li');
        var queen = queenLi.attr('queen');
        var val = but.hasClass("button_up") ? 1 : -1;

        VKQ.vote(queen, val, function() {
            var rating = queenLi.children('div.rating');
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
});

VKQ.run(function() {

    console.log(VK);
    VKQ.updateProfile();

});


