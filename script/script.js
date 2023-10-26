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
                var image = $(this).parent().parent().find(".carousel-image").eq($(this).index());
                image.addClass("active");
                //change the span to the active span
                $(carousel).parent().find(".carousel-highlight.active").removeClass("active");
                $(carousel).parent().find("highlight").eq($(this).index()).addClass("active");

                var container = $("#process > .highlight-container > p");
                var highlight = container.find(".highlight.active");
                highlight.removeClass("active");
                var highlightNum = image.attr("highlight");
                container.find("span[highlight=" + highlightNum + "]").addClass("active");
            });
            $(this).find(".carousel-indicators").append(indicator);
        }
        //set the first carousel-indicator to active
        $(this).find(".carousel-circle").eq(0).addClass("active");
    });
    //setup highlights
    var highlights = [];
    $("img.highlight").each(function (highlight) {
        //if highlight is image, continue
        if ($(this).prop("tagName") == "IMG") {
            highlights.push($(this));
            console.log("g");
            //add event for when the image has the class active
        }
    });
    //a timer for 5 seconds
    var carouselTimerFunction = function () {
        $(".carousel-container").each(function (carousel) {
            //find the carousel that is active an move it to the next image
            var numPhotos = $(this).find(".carousel-image").length;
            if (numPhotos > 0) {
                var image = $(this).find(".carousel-image.active");
                var circle = $(this).find(".carousel-circle.active");
                image.removeClass("active");
                circle.removeClass("active");
                var newImage = $(this).find(".carousel-image").eq((image.index() + 1) % numPhotos);
                newImage.addClass("active");
                $(this).find(".carousel-circle").eq((circle.index() + 1) % numPhotos).addClass("active");

                var container = $("#process > .highlight-container > p");
                var highlight = container.find(".highlight.active");
                highlight.removeClass("active");
                var highlightNum = newImage.attr("highlight");
                container.find("span[highlight=" + highlightNum + "]").addClass("active");
            }
        });
    };
    var carouselTimer = setInterval(carouselTimerFunction, 5000);

    /* gracais de https://stackoverflow.com/questions/54807535/intersection-observer-api-observe-the-center-of-the-viewport */
    const ioConfig = {
        rootMargin: '-50% 0% -50% 0%',
        threshold: 0.0
    };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            //if the element is in the middle of the viewport
            //activate it.
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                console.log(entry);
            }
            else {
                entry.target.classList.remove("active");
            }
        });
    }, ioConfig);
    document.querySelectorAll(".animate").forEach(function (animate) {observer.observe(animate);});

    $(".hamburger-menu").click(function() {
        $(".menu").toggleClass("active");
    });

});
