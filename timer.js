//bugs:
//1. when pressing Start twice it messes the clock up
//2. when reducing either one of the timers from it's intial time of 25 or 5, respectively,
//then pressing Restart, each timer goes back to 25 or 5, respectively;
//but, if the user presses the negative key again it goes directly 
//back to the last number the user chose rather then decreasing by 1.  

$(document).ready(function() {
    var b = $("#break").text();
    var t = $("#timer").text();

    //this section allows the user to choose the amount of time for either session

    //when pressing minus on break, decrease number
    $("#minus-break").click(function(event) {
        if (b > 1) {
            b--;
        }

        $("#break").text(b);
    });

    //when pressing plus on break, increase number
    $("#plus-break").click(function() {
        b++;
        $("#break").text(b);
    });

    //when pressing minus on timer, decrease number 
    $("#minus-timer").click(function() {
        if (t > 1) {
            t--;
        }
        $("#timer").text(t);
    });

    //when pressing plus on timer, increase number
    $("#plus-timer").click(function() {
        t++;
        $("#timer").text(t);
    });
    //-------this is the end of that timer and break preference section---------------//


    //this section is the control of the clock buttons: start, pause, resume, and restart 

    //start timer button
    $("#start-button").click(function() {
        var productivity = $("#productivity").text();
        var paused = false;
        if (paused == false) {
            function startTimer(duration, display) {
                var timer = duration,
                    minutes, seconds;

                minutes = $("#numbers").text();

                var startTime = setInterval(function() {
                    minutes = parseInt(timer / 60, 10);
                    seconds = parseInt(timer % 60, 10);

                    // to eliminate decimals, the following conditions apply

                    if (minutes < 1 === true) {
                        minutes = "00";
                    } else {
                        minutes = minutes;
                    }
                    if (minutes < 10 === true && minutes > 0 === true) {
                        minutes = "0" + minutes;
                    } else {
                        minutes = minutes;
                    }
                    if (seconds < 1 === true) {
                        seconds = "00";
                    } else {
                        seconds = seconds;
                    }
                    if (seconds < 10 === true && seconds > 0 === true) {
                        seconds = "0" + seconds;
                    } else {
                        seconds = seconds;
                    }
                    if (seconds == 0 && minutes == 0 && productivity == "Productivity") {
                        clearInterval(startTime);
                        $("#productivity").text("Take a Break!");
                        try {
                            $('#audio')[0].play();
                        } catch (e) {}


                    } else if (seconds == 0 && minutes == 0 && productivity == "Take a Break!") {
                        clearInterval(startTime);
                        $("#productivity").text("Productivity");


                    }
                    display.text(minutes + ":" + seconds);

                    if (--timer < 0) {
                        timer = duration;
                    }
                }, 1000);

                //pause timer button
                $("#pause-button").click(function() {
                    paused = true;
                    clearInterval(startTime);
                });

                //resume timer button
                $("#resume-button").click(function() {
                    paused = false;
                    display.text(minutes + ":" + seconds);
                    startTimer(timer, display);
                });

                //reset timer button
                $("#restart-button").click(function() {
                    $("#timer").text("25");
                    $("#break").text("5");
                    $("#numbers").text("25:00");
                    $("#productivity").text("Productivity");
                    clearInterval(startTime);
                });
            }
        }
        var productivityTime = $("#timer").text();
        var breakTime = $("#break").text();
        var minute = $("#numbers").text();

        //your productivity time
        if (productivity == "Productivity") {
            minute = productivityTime;
            var countdown = 60 * minute,
                display = $("#numbers");
            startTimer(countdown, display);
            $("#productivity").text("Productivity");
        }
        //back to break time
        else {
            minute = breakTime;
            var countdown = 60 * minute,
                display = $("#numbers");
            startTimer(countdown, display);
            $("#productivity").text("Take a Break!");
        }
    });

});
