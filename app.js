var list = require('./components/list');
var ytSearch = require('youtube-search');

list.appendTo('#search-results');

var searchField = document.querySelector('.search-field');

var search = function(val) {
    ytSearch(val, { maxResults: 10 }, function(err, results) {
        if(err) return console.error(err);

        list.clear();

        results.forEach(function(result) {
            list.addItem({
                text: result.title,
                url: result.url
            });
        });
    });
}

searchField.onkeydown = function(evt) {
    var string = evt.target.value;
    search(string);
}
