module.exports = {
    toBePlaying: function(expectedSong) {
        var player = this.actual;
        return player.currentlyPlayingSong === expectedSong &&
            player.isPlaying;
    }
};
