app = {
    initHandlers: function() {
        $('.filter').click(app.on.click.filter);
        $('button.vote_button').click(app.on.click.vote);
        $(window).scroll(app.on.scroll.window);

        $('#show_more_link').click(app.preloadData);
    },
    on:{
        click: {
            filter: function() {
                var filter = $(this);
                $.each(filter.attr('class').split(/\s/), function(i, cls) {
                    var matches = cls.match(/f_(\w+)/);
                    if (matches) {
                        console.log(filter.attr(matches[1]));
                    }
                })

            },
            vote: function() {
                var but = $(this);
                var queenId = but.attr('queen');
                var val = but.hasClass("rating_up") ? 1 : -1;

                VKQ.vote(queenId, val, function(rating) {
                    app.updateStats(queenId,val, rating);
                    app.addLog(val);
                    app.checkPosition(queenId);
                });
            }
        },
        scroll: {
            window: function() {
                if ($(window).scrollTop() == $(document).height() - $(window).height()){
                    app.preloadData();
                }
            }
        }
    },

    preloadData: function(){
        var progress = $(".progress");
        if(!progress.is(":visible")){
            var lastRow = $("tr[last_page]").last();
            if(!lastRow.is("[end_of_list]")){
                var link = $("div#show_more");
                progress.show();
                link.hide();
                VKQ.preload($(".queen").attr("queen"), parseInt(lastRow.attr("last_page")) + 1, function(result){
                    VKQ.updateWindow();
                    if(result.indexOf("end_of_list") != -1){
                        $("a#show_more_link").remove();
                    }else{
                        link.show();
                    }
                    $(".queen_list tbody").append(result);
                    progress.hide();
                });
            }
        }
        return false;
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


        var totalSelf = $('.total_self_' + server.current_queen._id);
        if(totalSelf){
            totalSelf.html(parseInt(totalSelf.html()) + 1);
            var percentSelf = $('.percent_self_' + server.current_queen._id);

            var plusesSelf = $('.pluses_self_' + server.current_queen._id);
            if (val == 1) {
                plusesSelf.html(parseInt(plusesSelf.html()) + 1);
            }
            percentSelf.html(Math.round(plusesSelf.html() / totalSelf.html() * 1000) / 10);
        }
    },
    getForce: function(rating){
        return rating > 0 ? Math.round((Math.log(rating / 4) / Math.LN10) + 1.2) : 1;
    },
    start: function() {
        app.initHandlers();

        VKQ.updateWindow();

        if (server.update_profile) {
            VKQ.updateProfile(function(profile) {
                console.log(profile);
                $(".name_" + profile.uid).html(profile.first_name + " " + profile.last_name);
                $.each(['photo','photo_rec','photo_big','photo_medium_rec'], function() {
                    $("." + this + "_" + profile.uid).attr("src", profile[this]);
                });
                VKQ.updateWindow();
            });
        }

        console.log(VK);
        console.log(VK);
    }
};

//$(document).ready(function() {
//    app.start();
//});
VKQ.run(server.api_id, app.start);


