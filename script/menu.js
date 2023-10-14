//setup the order object
var order = {
    items: [
    ],
    totalItems: 0,
    totalPrice: 0
};

var activeMenu = "menuSelection";
let menus = ["menuSelection", "menuReview", "menuConfirm"];
var timerInterval;
var timerDuration = "10:00";
$(document).ready(function () {
    //get all the menu item selection divs
    setupProgess();
    setupMenuSelection();
});

//function for when the selectionBall is clicked 

//functino to decrease timer

function setupProgess() {
    $("#selectionBall").addClass("active");
    var setBall = function (ball, width) {
        clearInterval(timerInterval);
        $(".progress-ball").removeClass("active");
        $(ball).addClass("active");
        $("#progress").css("width", width);
    };
    var setMenu = function (menu) {
        $("#" + activeMenu).removeClass("active");
        $("#" + menu).addClass("active");
        activeMenu = menu;
    };
    $("#selectionBall").click(function () {
        setBall(this, "30%");

        //set menuSelection to active
        setMenu("menuSelection");

    });
    $("#reviewBall").click(function () {
        setBall(this, "60%");
        $("#selectionBall").addClass("active");

        //set menuReview to active
        setMenu("menuReview");

    });
    $("#confirmBall").click(function () {
        $(".progress-ball").removeClass("active");
        $("#selectionBall").addClass("active");
        $("#reviewBall").addClass("active");
        $("#progress").css("width", "80%");

        //set menuConfirm to active
        setMenu("menuConfirm");
        $("#timer").text(timerDuration);

        handleTimer();
    });
    function handleTimer() {
        var timer = $("#timer");
        var time = timer.text();
        var timeSplit = time.split(":");
        var minutes = parseInt(timeSplit[0]);
        var seconds = parseInt(timeSplit[1]);
        seconds += minutes * 60;
        //now that we have the seconds we can calculate the width to move the progress bar
        var percentagePerSecond = 20 / seconds;
        console.log(percentagePerSecond);
        clearInterval(handleTimer);
        timerInterval = setInterval(function () {
            //get the timer
            var timer = $("#timer");
            //get the time
            var time = timer.text();
            //split the time
            var timeSplit = time.split(":");
            //get the minutes and seconds
            var minutes = parseInt(timeSplit[0]);
            var seconds = parseInt(timeSplit[1]);
            //decrease the seconds
            seconds--;
            //if seconds is less than 0
            if (seconds < 0) {
                //decrease the minutes
                minutes--;
                //set the seconds to 59
                seconds = 59;
            }
            //if minutes is less than 0
            if (minutes < 0) {
                //set the minutes to 0
                minutes = 0;
                //set the seconds to 0
                seconds = 0;
                //stop the timer
                clearInterval(timerInterval);
                $("#confirmBall").addClass("active");
            }
            //if seconds is less than 10
            if (seconds < 10) {
                //add a 0 to the front of the seconds
                seconds = "0" + seconds;
            }
            //set the timer text
            timer.text(minutes + ":" + seconds);
            //set the progess bar
            var progressWidth = +(100 * $("#progress").width() / $("#progress").parent().width()).toFixed(2);
            // console.log(progressWidth);
            var newWidth = progressWidth + percentagePerSecond;
            console.log(newWidth);
            $("#progress").css("width", (newWidth) + "%");
        }, 1000);
    }
}

function setupMenuSelection() {



    //for every menu-item div first get id
    $(".menu-item").each(function () {
        //get the id
        var id = $(this).attr("id");
        var price = $(this).attr("price");
        var btnMinus = $(this).find(".btn-minus");
        var btnPlus = $(this).find(".btn-plus");
        var input = $(this).find("input");
        var title = $(this).find(".menu-item-title").text();
        //input values changed

        //setup the minus button
        btnMinus.click(function () {
            //get the value of the input
            var value = input.val();
            //if the value is greater than 0
            if (value > 0) {
                //decrease the value
                value--;
                //set the value
                input.val(value);
                input.change();
            }
        });
        //setup the plus button
        btnPlus.click(function () {
            //get the value of the input
            var value = input.val();
            //increase the value
            value++;
            //set the value
            input.val(value);
            input.change();
        });
        input.change(function () {
            order.items[id] = {title: title, count:  +input.val(), price: price*input.val()};
            //calculate the total 
            order.totalItems = 0;
            order.totalPrice = 0;
            for (var key in order.items) {
                order.totalItems += order.items[key].count;
                order.totalPrice += order.items[key].price;
            }
            $("#totalItems").text(order.totalItems);
            $("#totalPrice").text(order.totalPrice);
            if(order.totalItems>0){
                $("#menuSelectionNext").attr("disabled", false);
            }
            else{
                $("#menuSelectionNext").attr("disabled", true);
            }
        });
    });

    $("#menuSelectionNext").click(function () {
        $("#reviewBall").click();
    });
}
