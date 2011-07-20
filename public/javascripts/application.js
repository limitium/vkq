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
            var rating = $('#rating_' + queen);
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


//$(document).ready(function() {
//
//
//
//});

VKQ.run(server.api_id, function() {
    app.initHandlers();

    VKQ.updateWindow();

    if (server.update_profile) {
        VKQ.updateProfile(function(data) {
            $(".name_" + data.profile.uid).html(data.profile.first_name + " " + data.profile.last_name);
            $.each(['photo','photo_rec','photo_big','photo_medium_rec'], function(photo) {
                $("." + photo + "_" + data.profile.uid).attr("src", data.profile[photo]);
            });

        });
    }

    console.log(VK);
});


