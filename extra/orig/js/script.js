$(document).ready(function(){
	var game = {score:0, min:100, max:100};


	var tl = new TimelineMax();
	tl
	.add("enter1")
	.to(".goal-ind", 2, {width:"100%"}, "enter1")
  	.to(game, 2, {score:100, roundProps:"score", onUpdate:updateHandler, ease:Linear.easeNone}, "enter1")
  	.to($(".progress-ind"), 2, {width:"33%"}, "enter1")
	.add("enter2")
	.staggerFromTo($(".fire"), 1, {opacity:0}, {opacity:1}, 0.1, "enter2")
  	.to(game, 3, {score:200, roundProps:"score", onUpdate:updateHandler, ease:Linear.easeNone}, "enter2")
  	.to($(".progress-ind"), 4, {width:"66%"}, "enter2")  	
	.add("enter3")
	.staggerTo($(".fire"), 1, {zoom:1, top:"-=25", zIndex:2, opacity:0.8}, 0.1, "enter3")
  	.to(game, 2, {score:300, roundProps:"score", onUpdate:updateHandler, ease:Linear.easeNone}, "enter3")
  	.to($(".progress-ind"), 2, {width:"100%"}, "enter3")  	
	
	playTl();

	function pauseTl(){
		tl.pause();
	}

	function playTl(){
		tl.play();
	}

	function resetTl(){
		tl.tweenTo("enter1").duration(1);
		updateHandler();
	}

	$("button#play").on("click", playTl);
	$("button#pause").on("click", pauseTl);
	$("button#reset").on("click", resetTl);

    function updateHandler() {
        document.getElementById("score").innerHTML = game.score;
    }
});