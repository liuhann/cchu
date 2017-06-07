/**
 * Created by han on 2017/6/6.
 */

require('./style.less');

const StoryPlayer = {
    data: function() {
        return {
            playing: false,
            audioUrl: 'http://jinjing.duapp.com/story/mp3/593662a9f04a827e328d6b3c'
        };
    },
    methods: {
        togglePlay: function(e) {
            const audio = document.querySelector('#media-video');
            if (this.playing) {
                this.playing = false;
                audio.pause();
            } else {
                this.playing = true;
                audio.play();
            }
        }
    },
    template: require('./tpl.html')
};

module.exports = StoryPlayer;