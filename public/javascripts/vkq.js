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
        VK.api('getProfiles', {
            uids: VK.params.viewer_id,
            fields: "uid, first_name, last_name, nickname, domain, sex, bdate, city, country, photo, photo_rec, photo_medium_rec, photo_big, rate, contacts, education"
        }, function(data) {
            callback(data);
        });
    },

    updateProfile: function() {
        this.getProfile(function(data) {
            var profileData = data.response.pop();
            $.post('/queens/' + profileData.uid, {
                queen: profileData
            }, function() {
                console.log(arguments);
                console.log("updated profile");
            });
        });
    }
};