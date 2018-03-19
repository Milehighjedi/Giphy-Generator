$(document).ready(function() {
    var input= $('#input');
    var submit = $('#submit');
    var apikey = 'dOaCcg8QMcvd3feyu19OyJEVp4nP2SJr'
    var imgBody = $('.imgBody');

    submit.on('click', function(event) {
        event.preventDefault();
        var inputValue = input.val();
        getGiphys(inputValue);
});

function getGiphys(inputValue) {
    $.get("http://api.giphy.com/v1/gifs/search?q=" + inputValue + "&api_key=dOaCcg8QMcvd3feyu19OyJEVp4nP2SJr&limit=5")
    .done(function (data) {
        for(var i = 0; i <= 5; i++) {
        console.log(data.data[i].images.downsized.url);
        createbox()
        }
    });

};  

function createbox() {
    var newImg = $('img');
    var newDiv = $('div');

    imgBody.append(newImg);
}





});