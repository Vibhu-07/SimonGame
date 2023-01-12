//simon game
// $("h1").css("color", "red"); testing purpose


//jQuery and Js code down here::

//History of game pattern
var gamePattern = [];
//History of user pattern
var userClickedPattern = [];
//array with colors
var buttonColours = ["red", "blue", "green", "yellow"];
//level tracker
var level = 0; //initiate
//start tracker
var started = false; //initiate


//call nextSequence on first key press as instructions
$(document).on("keydown", function(){
    if (started === false) {
        //change h1 heading to level 0 in start
        $("#level-title").html("level " + level);
        //call nextSequence
        nextSequence();
        //change started to stop new start on every keypress
        started = true;
    }
});


//user created sequence (listener) USER CREATED SEQUENCE
$(".btn").on("click", function(event) {
    //id (name) of chosen color
    var userChosenColour = (event.target.id) 
    //push this color in userClickedPattern array to record history
    userClickedPattern.push(userChosenColour);  
    //playSound of that btn
    playSound(userChosenColour); 
    //press animation
    animatePress(userChosenColour);
    //call check function with last index(user pattern) to be checked against game pattern array
    checkAnswer(userClickedPattern.length - 1);
});


//checkanswer functon
function checkAnswer(currentLevel) {
    //check color correctness
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
    }else {
        //game over formalities
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart")
        //start over again
        $(document).on("keydown", function(){
            startOver();
        });
    }
    //check if the user has entered correct number of colors and triger next sequence again clearing user array.............................................
    if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
}

//game created sequence NEXT SEQUENCE
function nextSequence(){
    //clear/empty previous filled user array
    userClickedPattern = [];
    //update level and heading
    level++;
    $("#level-title").html("level " + level);
    //chose a random color name from array
    var randomNumber = Math.floor(Math.random() * 4); //0-3
    var randomChosenColour = buttonColours[randomNumber];  
    //push this color in gamePattern array to record history
    gamePattern.push(randomChosenColour); 
    //flash (randomly chosen btn) after pushing in game pattern
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);    
    //playSound of that btn
    playSound(randomChosenColour); 
}


//startOver function if the value gets wrong
function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}

// Animation and sounds 

//play sound function
function playSound(name) {
    //ceating audio object as per input name
    var audio = new Audio("sounds/" + name + ".mp3");
    //playing audio by method
    audio.play();
}
//animation on btn press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
