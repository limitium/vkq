VKQ = {

    run:function (api_id, runner) {
        try {
            if (parent.frames.length == 0) {
                throw "Где фреймы нах?"
            }

            console.log('vkq starting');
            VK.init(function () {
                console.log('VK init');
                VK.loadParams(window.location.href);
                $(document).ready(function () {
                    console.log('DOC ready - run');
                    runner();
                });
            });
        } catch (e) {
            console.log(e);
            console.log("from client to http://vkontakte.ru/app" + api_id);
            window.location.href = "http://vkontakte.ru/app" + api_id;
        }
    },

    getProfile:function (callback) {
        console.log('fetch profile');
        var fields_param = '"fields": "uid, first_name, last_name, nickname, domain, sex, bdate, city, country, photo, photo_rec, photo_medium_rec, photo_big, rate, contacts, education"';

        var code =
            'var profile = API.getProfiles({"uids": ' + VK.params.viewer_id + ', ' + fields_param + '})[0];' +
                'return {"profile":profile,"country_name":API.places.getCountryById({"cids":profile.country})@.name,"city_name":API.places.getCityById({"cids":profile.city})@.name,"balance":API.getUserBalance(),"settings":API.getUserSettings()};';

        // Check empty city and country
        VK.api('execute', {'code':code}, function (data) {
            var profile = data.response.profile;
            profile.country_name = data.response.country_name ? data.response.country_name[0] : "";
            profile.city_name = data.response.city_name ? data.response.city_name[0] : "";
            profile.balance = data.response.balance;
            profile.settings = data.response.settings;
            callback(profile);
        });
    },

    updateProfile:function (callback) {
        this.getProfile(function (profile) {
            callback && callback(profile);
            $.post('/queen/' + profile.uid, {
                queen:profile
            }, function (data) {
                console.log(arguments);
                console.log("updated profile");
            });
        });
    },

    vote:function (queen, val, msg, callback) {
        $.post('/vote', {
            vote:{
                rated:queen,
                value:val,
                message:msg
            }
        }, function (response) {
            callback(response);
        });
    },
    updateWindow:function () {
        setTimeout(function () {
            var body = $('.popup_box_container');
            var html = $('#page');
            VK.External.resizeWindow(Math.max(body.width(), html.width()), Math.max(body.outerHeight(1), html.outerHeight(1)));
        }, 300);
    },


    scroll:function (callback) {
        VK.addCallback("onScroll", callback);
        VK.callMethod("scrollSubscribe");
    },
    search:function (q, callback) {
        $.get('/queens/load', {
            q:q
        }, function (response) {
            callback(response);
        });
    },
    loadQueens:function (callback) {
        $.get('/queens/load', function (response) {
            callback(response);
        });
    },
    preloadVotes:function (queen, page, callback) {
        $.get('/votes/preload', {
            vote:{
                id:queen,
                page:page
            }
        }, function (response) {
            callback(response);
        });
    },
    preloadQueens:function (q, page, callback) {
        var params = {
            page:page
        };
        if (q) {
            params.q = q;
        }
        $.get('/queens/preload', params, function (response) {
            callback(response);
        });
    },
    invite3:function () {
//        VK.callMethod("showSettingsBox",1283);
        VK.callMethod("showMerchantPaymentBox", 0);
    },
    invite2:function () {
        VK.callMethod("showPaymentBox", {
            type:"votes",
            votes:100
        });
        VK.addCallback("onOrderSuccess", function () {
            console.log("success", arguments)
        });
        VK.addCallback("onOrderFail", function () {
            console.log("fail", arguments)
        });
        VK.addCallback("onOrderCancle", function () {
            console.log("cancel", arguments)
        });
    },
    postMsg:function (queen, msg, cb) {
        VK.api("wall.post", {
            owner_id:queen,
            message:msg,
            services:'twitter,facebook',
            friends_only:0
        }, cb);
    },
    getFriends:function (cb) {
        VK.api("friends.get", {
            fields:"uid, first_name, last_name, nickname, photo_rec"
        }, cb);
    },
    setLocation:function (location) {
        VK.callMethod("setLocation", location);

    }
};