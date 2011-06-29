VKQ = {

    run: function(runner) {
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
            console.log("from client to http://vkontakte.ru/app" + api_id);
//            window.location.href = "http://vkontakte.ru/app" + VKQ.api_id;
        }
    },

    getProfile: function(callback) {
    	console.log('fetch profile');
			var fields_param = '"fields": "uid, first_name, last_name, nickname, domain, sex, bdate, city, country, photo, photo_rec, photo_medium_rec, photo_big, rate, contacts, education"';
			// Code in VKScript lang
			var code =
			'var profile = API.getProfiles({"uids": ' + VK.params.viewer_id + ', ' + fields_param + '})[0];';
			//'profile.country_name = API.getCountryById({"cids":profile.country})[0].name;' +
			//'profile.city_name = API.getCityById({"cids":profile.city})[0].name;';


			VK.api('execute', {'code': code}, function(data) {
				callback(data.response);
			});

    return;	
        VK.api('getProfiles', {
            uids: VK.params.viewer_id,
            fields: "uid, first_name, last_name, nickname, domain, sex, bdate, city, country, photo, photo_rec, photo_medium_rec, photo_big, rate, contacts, education"
        }, function(data) {
            callback(data);
        });
    },

    updateProfile: function() {
        this.getProfile(function(profile) {
            $.post('/queens/' + profile.uid, {
                queen: profile
            }, function() {
                console.log(arguments);
                console.log("updated profile");
            });
        });
    }
};