// Default JavaScript Functions and Initiations
$(document).ready(function() {

    // PhyloPics
    var numImgs = 0;
    var max = 12;

    $.get("http://phylopic.org/api/a/image/count", function(num) {

        numImgs = num.result;

        var start = _.random(0, numImgs - max);

        $.get("http://phylopic.org/api/a/image/list/" + start + "/" + max + "?options=uid+pngFiles+svgFile", function(data) {
            var urls = [];

            data.result.forEach(function(i) {
                var url = i.pngFiles[0].url;
                urls.push(url);
                $("#phylopics").append("<div class='col-1-m'><img src='http://phylopic.org" + url + "' /></div>").hide().fadeIn();
            });

        });


    })

    // $('#phylopics').slick({
    //     dots: false,
    //     infinite: true,
    //     speed: 100,
    //     slidesToShow: 12,
    //     slidesToScroll: 1,
    //     responsive: [{
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 3,
    //                 infinite: true,
    //                 dots: false
    //             }
    //         },
    //         {
    //             breakpoint: 600,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //         // You can unslick at a given breakpoint now by adding:
    //         // settings: "unslick"
    //         // instead of a settings object
    //     ]
    // });


}); // end document ready