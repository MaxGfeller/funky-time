var fs = require('fs');
var Widget = require('browserify-widget');
var inherits = require('util').inherits;
var youtubeMp3 = require('youtube-mp3');
var html = fs.readFileSync(__dirname + '/player.html', 'utf8');

inherits(Player, Widget);

function Player() {
    Widget.call(this, html);
}

Player.prototype.play = function(item) {
    this.show();
    console.log(item);
    youtubeMp3.getDownloadLink(item.url, function(err, result) {
        console.log('in cb');
        if(err) return alert(err);
        alert(result);
        // document.querySelector('#main-player').src = result;
    });
}

Player.prototype.setSource = function(src) {

}

Player.prototype.pause = function() {

}

Player.prototype.hide = function() {
    this.renderedTo.forEach(function(el) {
        el.querySelector('.player').classList.remove('show');
    });
}

Player.prototype.show = function() {
    this.renderedTo.forEach(function(el) {
        // register close callback
        el.querySelector('.button-close').onclick = this.hide.bind(this);

        el.querySelector('.player').classList.add('show');
    }.bind(this));
}

var instance = new Player();

module.exports = instance;
