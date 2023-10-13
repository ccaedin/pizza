//on page load
$(document).ready(function () {
    console.log("script.js loaded");
    //for every instance of carousel-container
    $(".carousel-container").each(function (carousel) {
        //get the number of photos in the carousel
        var numPhotos = $(this).find(".carousel-image").length;
        // for every photo add a span circle to the carousel-indicators
        console.log("numPhotos: " + numPhotos);
        for (i = 0; i < numPhotos; i++) {
            var indicator = document.createElement("span");
            indicator.classList.add("carousel-circle");
            //jquerery add the indicator to the carousel
            indicator.addEventListener("click", function () {
                $(this).parent().parent().find(".carousel-image").removeClass("active");
                $(this).parent().parent().find(".carousel-circle").removeClass("active");
                $(this).addClass("active");
                $(this).parent().parent().find(".carousel-image").eq($(this).index()).addClass("active");
                //change the span to the active span
                $(carousel).parent().find(".carousel-highlight.active").removeClass("active");
                $(carousel).parent().find("highlight").eq($(this).index()).addClass("active");
            });
            $(this).find(".carousel-indicators").append(indicator);
        }
        //set the first carousel-indicator to active
        $(this).find(".carousel-circle").eq(0).addClass("active");
    });
    //a timer for 5 seconds
    var carouselTimerFunction = function () {
        $(".carousel-container").each(function (carousel) {
            //find the carousel that is active an move it to the next image
            console.log("carousel: " + carousel);
            var numPhotos = $(this).find(".carousel-image").length;
            console.log("numPhotos: " + numPhotos);
            if (numPhotos > 0) {
                var image = $(this).find(".carousel-image.active");
                var circle = $(this).find(".carousel-circle.active");
                image.removeClass("active");
                circle.removeClass("active");
                $(this).find(".carousel-image").eq((image.index() + 1) % numPhotos).addClass("active");
                $(this).find(".carousel-circle").eq((circle.index() + 1) % numPhotos).addClass("active");
            }
        });
    };
    var carouselTimer = setInterval(carouselTimerFunction, 5000);


    //set up highlight
    //find all highlights that are not images
    var highlights = [];
    $(".highlight").each(function (highlight) {
        //if highlight is image, continue
        if ($(this).prop("tagName") == "IMG") {
            highlights.push($(this));
            console.log("g");
            //add event for when the image has the class active
        }
    });
    //set up highlight timer
    setInterval(function () {
        highlights.forEach(function (highlight) {
            // var highlight = $(h);
            //print out classes
            if (highlight.hasClass("active")) {
                var container = highlight.closest(".highlight-container");
                //list the sub elements of container
                // console.log(container.find(".highlight"));
                container.find(".highlight.active").removeClass("active");
                container.find(".highlight").eq((highlight.index()) % container.find(".highlight").length).addClass("active");
            }
        });

    });
});
//every time a css class changes
