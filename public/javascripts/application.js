app = {
    initHandlers: function() {

        $('.filter').click(app.onFilterClick);
        $('button.vote_button').click(app.onVoteClick);
    },

    onVoteClick: function() {
        var but = $(this);
        var queenId = but.attr('queen');
        var val = but.hasClass("rating_up") ? 1 : -1;

//        VKQ.vote(queen, val, function(rating) {
        app.updateStats(queenId,val, 100);
        app.addLog(val);
        app.checkPosition(queenId);
//        });
    },
    checkPosition: function(queenId){
        var rows = $('table.rating_list tbody > tr').get();

            rows.sort(function(a, b) {

            var keyA = parseInt($(a).children('td.rating').html());

            var keyB = parseInt($(b).children('td.rating').html());

            if (keyA > keyB) return -1;

            if (keyA < keyB) return 1;

            return 0;

        });

        $.each(rows, function(index, row) {
            (function(i){
                $('td.position div',row).html(i+1);
            })(index);

            $('table.rating_list tbody').append(row);
        });
        $('tr[queen='+queenId+']').hide().fadeIn();
    },
    addLog: function(val){
        var cq = server.current_queen;
        var row = $('<tr'+(val>0?"":' class="minus"')+'>'+
              '<td class="stats_photo">'+
                '<div>'+
                  '<a href="/queens/'+cq._id+'"><img src="'+cq.photo_rec+'" class=" photo_rec_'+cq._id+'" alt="'+cq.last_name+' '+cq.first_name+'"></a>'+
                '</div>'+
              '</td>'+
              '<td class="stats_from">'+
                '<div class="name wrapped">'+
                  '<a class="name_'+cq._id+'" href="/queens/'+cq._id+'">'+cq.last_name+' '+cq.first_name+'</a>'+
                '</div>'+
                '<div class="date">'+
                  'только что'+
                '</div>'+
              '</td>'+
              '<td class="voter_value">'+
                '<div class="rate_'+(val>0?"plus":"minus")+'">'+
                '</div>'+
                '<div class="rate_value">'+
                  app.getForce(cq.rating)+
                '</div>'+
              '</td>'+
              '<td class="voter_stat">'+
                '<div class="label">Рейтинг:</div>'+
                '<div class="labeled">'+
                  cq.rating+
                '</div>'+
              '</td>'+
            '</tr>');
        $('#rates tbody').prepend(row.fadeIn());
    },
    updateStats: function(queenId,val,rating) {
        $('.rating_' + queenId).html(rating);
        $('.force_' + queenId).html(app.getForce(rating));

        var total = $('.total_' + queenId);
        total.html(parseInt(total.html()) + 1);
        var percent = $('.percent_' + queenId);


        var pluses = $('.pluses_' + queenId);
        if (val == 1) {
            pluses.html(parseInt(pluses.html()) + 1);
        }
        percent.html(Math.round(pluses.html() / total.html() * 1000) / 10);
    },
    onFilterClick: function() {
        var filter = $(this);
        $.each(filter.attr('class').split(/\s/), function(i, cls) {
            var matches = cls.match(/f_(\w+)/);
            if (matches) {
                console.log(filter.attr(matches[1]));
            }
        })

    },
    getForce: function(rating){
        return rating > 0 ? Math.round((Math.log(rating / 4) / Math.LN10) + 1.2) : 1;
    },
    start: function() {
        app.initHandlers();

//        VKQ.updateWindow();
//
//        if (server.update_profile) {
//            VKQ.updateProfile(function(profile) {
//                $(".name_" + profile.uid).html(profile.first_name + " " + profile.last_name);
//                $.each(['photo','photo_rec','photo_big','photo_medium_rec'], function() {
//                    $("." + this + "_" + profile.uid).attr("src", profile[this]);
//                });
//                VKQ.updateWindow();
//            });
//        }
//
//        console.log(VK);
//        console.log(VK);
    }
};

$(document).ready(function() {
    app.start();

});
//VKQ.run(server.api_id, app.start);


