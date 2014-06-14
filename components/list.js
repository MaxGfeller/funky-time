var inherits = require('util').inherits;
var fs = require('fs');
var domify = require('domify');
var Widget = require('browserify-widget');
var player = require('./player');

var html = fs.readFileSync(__dirname + '/list.html', 'utf8');
var listItem = fs.readFileSync(__dirname + '/list-item.html', 'utf8');

inherits(List, Widget);

function List() {
    Widget.call(this, html);
    player.appendTo(document.body);
}

List.prototype.clear = function() {
    this.renderedTo.forEach(function(el) {
        el.querySelector('.search-results-list').innerHTML = '';
    });
}

List.prototype.addItem = function(item) {
    var li = domify(listItem);
    li.querySelector('.song-link').onclick = player.play.bind(player, item);
    li.querySelector('.song-name').textContent = item.text;
    this.renderedTo.forEach(function(el) {
        el.querySelector('.search-results-list').appendChild(li);
    });
}

var instance = new List();

module.exports = instance;
