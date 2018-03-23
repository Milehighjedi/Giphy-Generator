$(document).ready(function () {
    var input = $('#input');
    var submit = $('#submit');
    var apikey = 'dOaCcg8QMcvd3feyu19OyJEVp4nP2SJr'
    var imgBody = $('.img-body');
    var topics = ['George Carlin', 'Dave Chapelle', 'Mitch Hedberg', 'Chris Rock', 'Dane Cook', 'Bill Burr', 'Patton Oswalt', 'Kat Williams', 'Robin Williams', 'Sam Kinison', 'Lewis Black'];

    submit.on('click', function (event) {
        event.preventDefault();
        imgBody.empty();
        var inputValue = input.val();
        getGiphys(inputValue);
        input.val(' ');
    });

    function getGiphys(inputValue) {
        $.get("https://api.giphy.com/v1/gifs/search?q=" + inputValue + "&api_key=dOaCcg8QMcvd3feyu19OyJEVp4nP2SJr&limit=10")
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

    var buttonFunctions = {
        buttonHolder: $('.dynamic-button-holder'),
        listToButtons: function (list) {
            buttonFunctions.buttonHolder.empty();
            list.map(buttonFunctions.stringToButton);
        },


        stringToButton: function (str) {
            var button = $('<button>');
            var span = $('<span>');
            span.text(str);
            button.addClass('btn btn-info gif-button');
            button.attr('data-topic', str);
            button.append(span);
            buttonFunctions.buttonHolder.append(button);
        }
    };

    buttonFunctions.listToButtons(topics);

});

var queryMethod = 'GET';


$(document).on('click', '.gif-button', function () {
    $('.img-body').empty();
    var topic = $(this).data('topic').trim();
    var term = topic.replace(/[^A-Za-z0-9]/g, '+');

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dOaCcg8QMcvd3feyu19OyJEVp4nP2SJr&limit=10";

    $.ajax({
        url: queryURL,
        method: queryMethod
    }).done(function (response) {
        var results = response.data;
        createGIF(results, alt = 'A GIF related to ' + topic);
    });

});

$(document).on('click', '#clear-button', function () {
    $('.img-body').empty();
});

var createGIF = function (results, alt) {
    results.map(function (result) {
        var gifDiv = $('<div class="gif-div">');
        var gifImage = $('<img class="gif center-block">');
        var p = $('<p class="text-center">');
        gifImage.attr('src', result.images.fixed_height_still.url);
        gifImage.attr('alt', alt);
        gifImage.attr('data-state', 'still');
        gifImage.attr('data-still', result.images.fixed_height_still.url);
        gifImage.attr('data-active', result.images.fixed_height.url);
        p.text('Rating: ' + result.rating);
        gifDiv.append(p);
        gifDiv.prepend(gifImage);
        $('.img-body').prepend(gifDiv);
    });
};



$(document).on('click', '.gif', function () {
    var state = $(this).attr('data-state');

    if (state == 'still') {
        $(this).attr('src', $(this).data('active'));
        $(this).attr('data-state', 'active');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

});

