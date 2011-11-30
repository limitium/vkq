VKQ = {

    run: function(api_id, runner) {
        try {
            if (parent.frames.length == 0) {
                throw "Где фреймы нах?"
            }

            console.log('vkq starting');
            VK.init(function() {
                console.log('VK init');
                VK.loadParams(window.location.href);
                $(document).ready(function() {
                    console.log('DOC ready - run');
                    runner();
                });
            });
        } catch(e) {
            console.log(e);
            console.log("from client to http://vkontakte.ru/app" + api_id);
            window.location.href = "http://vkontakte.ru/app" + api_id;
        }
    },

    getProfile: function(callback) {
        console.log('fetch profile');
        var fields_param = '"fields": "uid, first_name, last_name, nickname, domain, sex, bdate, city, country, photo, photo_rec, photo_medium_rec, photo_big, rate, contacts, education"';

        var code =
                'var profile = API.getProfiles({"uids": ' + VK.params.viewer_id + ', ' + fields_param + '})[0];' +
                        'return {"profile":profile,"country_name":API.places.getCountryById({"cids":profile.country})@.name,"city_name":API.places.getCityById({"cids":profile.city})@.name};';

        // Check empty city and country
        VK.api('execute', {'code': code}, function(data) {
            var profile = data.response.profile;
            profile.country_name = data.response.country_name ? data.response.country_name[0] : "";
            profile.city_name = data.response.city_name ? data.response.city_name[0] : "";
            callback(profile);
        });
    },

    updateProfile: function(callback) {
        this.getProfile(function(profile) {
            callback && callback(profile);
            $.post('/queen/' + profile.uid, {
                queen: profile
            }, function(data) {
                console.log(arguments);
                console.log("updated profile");
            });
        });
    },

    vote: function(queen, val, callback) {
        $.post('/vote', {
            vote: {
                rated: queen,
                value: val
            }
        }, function(response) {
            callback(response);
        });
    },
    preload: function(queen, page, callback) {
        $.get('/votes/load', {
            vote: {
                id: queen,
                page: page
            }
        }, function(response) {
            callback(response);
        });
    },

    updateWindow: function() {
        var page = $('#page');
        VK.External.resizeWindow(page.width(), page.height());
    },

    scroll: function(callback){
        VK.addCallback("onScroll", function(){console.log(arguments)});
    }
};