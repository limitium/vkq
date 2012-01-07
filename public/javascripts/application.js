app = {
    search:{
        lastQ: null
    },
    initHandlers: function() {
        $('#show_more_link').click(app.preloadData);
        $('button.vote_button').click(app.on.click.vote);

        $('div.input_back_content').click(app.on.click.searchText);

        $('#search_submit').click(app.on.click.search);
        $('#search_query').focus(app.on.focus.search);
        $('#search_query').blur(app.on.blur.search);
        $('#search_query').keypress(app.on.keyup.search).keyup(app.on.keyup.search);
        $('#search_query_reset').click(app.on.click.searchReset);

        VKQ.scroll(app.on.scroll.window);
    },
    on:{
        keyup: {
            search: function(e){
                if(this.value.length){
                    if(e.keyCode == 13){
                        $('#search_submit').trigger("click");
                    }else{
                        $('#search_query_reset').show();
                        $('div.input_back_content').hide();
                    }
                }else{
                    $('#search_query_reset').hide();
                    $('div.input_back_content').show();
                }
            }
        },
        focus:{
            search: function(){
                $('.input_back_content').css('color','rgb(192, 200, 208)')
            }
        },
        blur:{
            search: function(){
               $('.input_back_content').css('color','rgb(119, 119, 119)')
            }
        },
        click: {
            search: function(){
                var progress = $('#search_query_progress');
                var q = $('#search_query').val();
                if(q && app.search.lastQ != q){
                    $('#search_query_reset').hide();
                    app.search.lastQ = q;
                    progress.show();
                    VKQ.search(q, function(result){
                        progress.hide();
                        $('#search_query_reset').show();
                        $('.rating_list_wrapper').html(result);
                    });
                }
            },
            searchText: function(){
                $('#search_query').focus();
            },
            searchReset: function(){
                $('#search_query').val("");
                $('#search_query').trigger('keypress');
            },
            vote: function() {
                var but = $(this);
                var queenId = but.attr('queen');
                var val = but.hasClass("rating_up") ? 1 : -1;
                var msg = '<div>'+
                            '<div>'+$('.name_' + queenId).html() + ' получит "' + (val == 1 ? '+' : '-') + app.getForce(server.current_queen.rating) + '" в рейтинг от вас!</div>'+
                            '<textarea />'+
                            '<div class="counter">140</div>'+
                        '</div>';

                var sendVote = function(){
                    $('.progress',box).show();
                    if($('.ok.button_blue').size()){
                        $('.box_x_button,.cancel button,.ok button',box).unbind('click');
                        var message = $('textarea',box).val().substr(0,140);
                        VKQ.vote(queenId, val, message, function(stats) {
                            app.updateStats(queenId, val, stats);
                            app.addLog(queenId, val, message);
                            app.checkPosition(queenId);
                            app.hideMessage();
                            app.showBaloon({
                                title: 'Голос учтен.',
                                content: 'Вы проголосовали '+(val == 1 ? 'за ' : 'против ')+'<a href="/queen/'+queenId+'">'+$('.name_' + queenId).html()+'</a>'
                            });
                        });
                    }
                };
                var box = app.showMessage({
                    title: (val == 1 ? 'Я за' : 'Я против'),
                    content: msg,
                    okText: 'ДА!',
                    cancelText: 'Не надо',
                    okCb: sendVote
                });

                $('.box_body textarea').focus();

                var checker = function(e){
                    if(e.keyCode == 13){
                        sendVote();
                    }else{
                        var left = 140 - this.value.length;
                        var counter = $('.counter',box);
                        $('.ok',box).addClass('button_blue').removeClass('button_gray');
                        if(left > 20){
                            counter.removeClass('warn').removeClass('superwarn');
                        }else if(left > 10){
                            counter.addClass('warn').removeClass('superwarn');
                        }else{
                            counter.removeClass('warn').addClass('superwarn');
                            if(left < 0){
                                $('.ok',box).removeClass('button_blue').addClass('button_gray');
                            }
                        }
                        counter.html(left);
                    }
                };
                $('textarea',box).keypress(checker).keyup(checker);
            }
        },
        scroll: {
            window: function(top, height) {
                if (top - 152 == $(document).height() - height){
                    app.preloadData();
                }
            }
        }
    },
    preloadData: function(){
        var progress = $("#show_more_link .progress");
        if(!progress.is(":visible")){
            var lastRow = $("tr[last_page]").last();
            if(!lastRow.is("[end_of_list]")){
                var link = $("div#show_more");
                progress.show();
                link.hide();
                VKQ.preload($(".queen").attr("queen"), parseInt(lastRow.attr("last_page")) + 1, function(result){
                    $(".queen_list tbody").append(result);
                    if(result.indexOf("end_of_list") != -1){
                        $("a#show_more_link").remove();
                    }else{
                        link.show();
                    }
                    progress.hide();
                    VKQ.updateWindow();
                });
            }
        }
        return false;
    },
    checkPosition: function(queenId){
        var rows = $('table.rating_list tbody > tr.queen').get();

        rows.sort(function(a, b) {

            var keyA = parseInt($('span.rating',a).html());

            var keyB = parseInt($('span.rating',b).html());

            if (keyA > keyB) return -1;

            if (keyA < keyB) return 1;

            return 0;

        });

        $.each(rows, function(index, row) {
            (function(i){
                $('span.position',row).html(i+1);
            })(index);

            $('table.rating_list tbody').append(row);
        });
        $('tr[queen='+queenId+']').hide().fadeIn();
    },
    addLog: function(queenId, val, message){
        var cq = server.current_queen;
        var rates = $('#rates');
        var link = '<a href="/queen/' + cq._id + '"><img src="' + cq.photo_rec + '" class=" photo_rec_' + cq._id + '" alt="' + cq.last_name + ' ' + cq.first_name + '"></a>';
        var vote = '<div class="rate_'+(val>0?"plus":"minus")+'"> '+
                    ' </div>'+
                    '<div class="rate_value"> '+
                      app.getForce(cq.rating)+
                    ' </div>';

        if(rates.length){
            var row = $('<tr' + (val > 0 ? "" : ' class="minus"') + '>' +
                      '<td class="stats_photo">' +
                          '<div>' + link + '</div>'+
                      '</td>'+
                      '<td class="stats_from">'+
                        '<div class="name wrapped">'+
                          '<a class="name_'+cq._id+'" href="/queen/'+cq._id+'">'+$('.name_'+cq._id).html()+'</a>'+
                        '</div>'+
                        '<div class="rate">'+
                            vote +
                        '</div>'+
                        '<div class="date">'+
                          'только что'+
                        '</div>'+
                        '<div class="message">'+message+'</div>'+
                      '</td>');
            rates.prepend(row.fadeIn());
        }else{
            var scope = $('tr[queen='+queenId+']');

            $('.vote', scope).html(vote);
            $('.text',scope).html(message);
            $('.from_wrapper>a',scope).remove();
            $('.from_wrapper',scope).prepend(link);
        }
    },
    updateStats: function(queenId,val,stats) {
        $('.rating_' + queenId).html(stats.rating);
        $('.position_' + queenId).html(stats.position);
        $('.force_' + queenId).html(app.getForce(stats.rating));

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

        if(server.current_queen._id == queenId){
            server.current_queen.rating = stats.rating;
        }
    },
    getForce: function(rating){
        return rating > 0 ? Math.round((Math.log(rating / 4) / Math.LN10) + 1.2) : 1;
    },
    showMessage: function(opt){
        opt = $.extend({
            title: 'Заголовок',
            content: 'Текст',
            okText: 'OK',
            cancelText: 'Отмена',
            okCb: function(){}
        },opt);
         var box = $('<div class="popup_box_container" style="width: 410px; height: auto; margin-top: 171.333px;">'+
          '<div class="box_layout">'+
            '<div class="box_title_wrap">'+
              '<div class="box_x_button">'+
              '</div>'+
              '<div class="box_title">'+opt.title+'</div>'+
            '</div>'+
            '<div class="box_body">'+opt.content+'</div>'+
            '<div class="box_controls_wrap">'+
              '<div class="box_controls">'+
                '<table cellspacing="0" cellpadding="0" class="fl_r">'+
                  '<tbody>'+
                  '<tr>'+
                    '<td>'+
                      '<div class="button_blue ok">'+
                        '<button>'+opt.okText+'</button>'+
                      '</div>'+
                    '</td>'+
                    '<td>'+
                      '<div class="button_gray cancel">'+
                        '<button>'+opt.cancelText+'</button>'+
                      '</div>'+
                    '</td>'+
                  '</tr>'+
                  '</tbody>'+
                '</table>'+
                '<div id="box_progress4" class="progress">'+
                '</div>'+
                '<div class="box_controls_text">'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>');
        $('#box_layer_wrap').show();
        $('#box_layer_bg').show();
        $('#box_layer').append(box);
        $('.box_x_button,.cancel button',box).click(app.hideMessage);
        $('.ok button',box).click(opt.okCb);
        return box;
    },
    hideMessage: function(){
        $('#box_layer_wrap').hide();
        $('#box_layer_bg').hide();
        $('.popup_box_container').remove();
    },
    showBaloon: function(opt){
        opt = $.extend({
            title: 'Заголовок',
            content: 'Текст'
        },opt);
        $('.top_result_baloon').html('<div class="top_result_header">'+opt.title+'</div>'+opt.content);
        $('.top_result_baloon_wrap').show();
        setTimeout(function(){$('.top_result_baloon_wrap').hide()},2500);
    },
    timeout: {
        set: function(queenId, timeout){
            app.timeout[queenId] = new Date().setTime(new Date().getTime() + timeout);
        },
        get: function(queenId){
            if(typeof app.timeout[queenId] != 'undefined'){
                var timeout = app.timeout[queenId] - new Date().getTime();
                console.log(timeout);
                if(timeout > 0){
                    /* Get 1 hour in milliseconds, ie 1000*60*60 */
                    var one_hour = 3600000;
                    var elapsedHours = Math.floor(timeout / one_hour );

                    /* Milliseconds still unaccounted for – less than an hour’s worth. */
                    timeout = timeout % one_hour;

                    /* Get 1 minute in milliseconds, ie 1000*60 */
                    var one_minute = 60000;
                    var elapsedMinutes = Math.floor(timeout / one_minute );

                    /* Milliseconds still unaccounted for – less than a minute’s worth. */
                    timeout = timeout % one_minute;

                    /* Get 1 second in milliseconds */
                    var one_second = 1000;
                    var elapsedSeconds = Math.round(timeout / one_second);
                    return (elapsedHours < 10?"0":"")+elapsedHours+":"+(elapsedMinutes < 10?"0":"")+elapsedMinutes+":"+(elapsedSeconds < 10?"0":"")+elapsedSeconds;
                }
            }
        }
    },
    start: function() {
        console.log(VK);
        app.initHandlers();

//        VKQ.updateWindow();
//
//        if (server.update_profile) {
//            VKQ.updateProfile(function(profile) {
//                console.log(profile);
//                $(".name_" + profile.uid).html(profile.first_name + " " + profile.last_name);
//                $.each(['photo','photo_rec','photo_big','photo_medium_rec'], function() {
//                    $("." + this + "_" + profile.uid).attr("src", profile[this]);
//                });
//                VKQ.updateWindow();
//            });
//        }
    }
};

$(document).ready(function() {
    app.start();
});
//VKQ.run(server.api_id, app.start);


