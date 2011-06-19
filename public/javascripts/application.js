window.name = 'fXD';

VK.init(function() {
    // API initialization succeeded
    // Your code here
    console.log(arguments);
    console.log(VK.api('getProfiles', function() {
        console.log(arguments);

    }));
    VK.api('getUserSettings', function(data) {
        console.log(data)
    });
});