const StoryPlayer = require('../player/index');

new Vue({
    el: '#main',
    template: require('./tpl.html'),
    components: {
        StoryPlayer
    },
    data: {
        scene: 'player'
    }
});