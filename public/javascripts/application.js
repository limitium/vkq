
VK.init(function() {
    console.log('vk inited');
    $(document).ready(function() {
        console.log('app start');
        getFriends();
    });
}, function() {
    alert('Ошибка инициализации JS VK API');
});

function getFriends() {
    console.log('getFrieds')
    VK.api('friends.get', {fields:"uid, first_name, last_name, nickname, sex, photo_medium"}, function(data) {
        console.log('f result')
        if (data.response) {
            var html_res = '';
            var f_cnt = data.response.length;
            for (var i = 0; i < f_cnt; i++)
                html_res += '<img src="' + data.response[i].photo_medium + '" align="left">';

            //html_res +=''+data.response[i].last_name+'';
            //html_res +='';
        }

        console.log(html_res);
    });

}
function qwe() {
    // API initialization succeeded
    // Your code here
    console.log(arguments);
    console.log(VK.api('getProfiles', function() {
        console.log(arguments);

    }));
    VK.api('getUserSettings', function(data) {
        console.log(data)
    });
}