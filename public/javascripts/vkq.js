VKQ = function() {

    this.run = function(runner) {
        console.log('vkq starting');
        VK.init(function() {
            console.log('VK init');
            $(document).ready(function() {
                console.log('DOC ready - run');
                runner();
            });
        });
    };

    this.getProfile = function(callback) {
        VK.api('getProfiles', {
            uids: VK.params.user_id,
            fields: "uid, first_name, last_name, nickname, domain, sex, bdate, city, country, timezone, photo, photo_rec, photo_medium_rec, photo_big, rate, contacts, education"
        }, function(data) {
            callback(data);
        });
    };

    this.updateProfile = function() {
        this.getProfile(function() {
            console.log(arguments)
        })
    };
};