$(document).ready(function () {
    var input = $('#input');
    var submit = $('#submit');
    var apikey = 'dOaCcg8QMcvd3feyu19OyJEVp4nP2SJr'
    var imgBody = $('.img-body');

    submit.on('click', function (event) {
        event.preventDefault();
        imgBody.empty();
        var inputValue = input.val();
        getGiphys(inputValue);
        input.val(' ');
    });

    function getGiphys(inputValue) {
        $.get("http://api.giphy.com/v1/gifs/search?q=" + inputValue + "&api_key=dOaCcg8QMcvd3feyu19OyJEVp4nP2SJr&limit=10")
            .done(function (data) {
                for (var i = 0; i < 10; i++) {
                    var gifImg = data.data[i].images.downsized.url;
                    createbox(gifImg);
                }
            });

    };

    function createbox(gifImg) {
        var newImg = $('<img>');
        newImg.attr('src', gifImg);
        newImg.addClass('img-box');

        imgBody.append(newImg);
    }

});