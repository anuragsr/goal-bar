$(document).ready(function(){
    var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'), img, cmd;
	var stage = new createjs.Stage("canvas");
	var con1 = new createjs.Container(),
		con2 = new createjs.Container(),
		con3 = new createjs.Container();
	var conArr = [con1, con2, con3];
	var cmdArr = [];
	var particle_count = 30;
	var radiusArr = [30, 60, 70];
	var parts = [];
	var growTl = new TimelineMax();
	function createParticles(){
		for(var j = 0; j < 3; j++){			
			var parRad = radiusArr[j];
			for(var i=0; i<particle_count; i++){
				var rad = parRad + Math.random()*10,
					xpos = (j+1)*70+50 + Math.random()*20,
					ypos = (j+1)*5+45 + Math.random()*10;
		        var redCirc = new createjs.Shape();
		        redCirc.graphics
		        .beginRadialGradientFill(["rgba(255,0,0,0.8)","rgba(255,0,0,0.8)","rgba(255,0,0,0)"], [0, .5, 1], xpos, ypos, 0, xpos, ypos, rad)
					.drawCircle(xpos, ypos, rad);
		        redCirc.x = xpos;
		        redCirc.y = ypos;
		        redCirc.alpha = 0.5;
		        redCirc.compositeOperation = 'lighter';
			    parts.push(redCirc);		        

		        xpos+=30;
		        ypos+=10;
		        var purpleCirc = new createjs.Shape();
		        purpleCirc.graphics
		        .beginRadialGradientFill(["rgba(116,52,116,0.6)","rgba(116,52,116,0.6)","rgba(116,52,116,0)"], [0, .5, 1], xpos, ypos, 0, xpos, ypos, rad)
					.drawCircle(xpos, ypos, rad)
		        purpleCirc.x = xpos;
		        purpleCirc.y = ypos;
		        purpleCirc.alpha = 0.5;
		        purpleCirc.compositeOperation = 'lighter';
			    parts.push(purpleCirc);		        

		        xpos+=30;
		        ypos+=10;
		        var blueCirc = new createjs.Shape();
		        blueCirc.graphics
		        .beginRadialGradientFill(["rgba(0,162,232,0.2)","rgba(0,162,232,0.2)","rgba(0,162,232,0)"], [0, .5, 1], xpos, ypos, 0, xpos, ypos, rad)
					.drawCircle(xpos, ypos, rad)
		        blueCirc.x = xpos;
		        blueCirc.y = ypos;
		        blueCirc.alpha = 0.5;
		        blueCirc.compositeOperation = 'lighter';
			    parts.push(blueCirc);	

			    conArr[j].addChild(redCirc);
			    conArr[j].addChild(purpleCirc);
			    conArr[j].addChild(blueCirc);
				stage.addChild(conArr[j]);
			}
		}
	}

	createParticles();

	TweenLite.ticker.fps(60);
    TweenLite.ticker.addEventListener("tick", stage.update, stage);

	var game = {score:0, min:100, max:100};
	var tl = new TimelineMax();
	var tlFl = new TimelineMax({repeat:-1});

	tl
	.add("enter1")
	.to(".goal-ind", 2, {width:"100%"}, "enter1")
  	.to(game, 2, {score:100, roundProps:"score", onUpdate:updateHandler}, "enter1")
  	.to($(".progress-ind"), 2, {width:"33%"}, "enter1")
	.to(con1, 2, {alpha:0.5}, "enter1")
  	.to(game, 2, {score:200, roundProps:"score", onUpdate:updateHandler}, "enter2")
  	.to($(".progress-ind"), 2, {width:"66%"}, "enter2")
	.to(con2, 2, {alpha:0.5}, "enter2")
  	.to(game, 2, {score:300, roundProps:"score", onUpdate:updateHandler}, "enter3")
  	.to($(".progress-ind"), 2, {width:"100%"}, "enter3")
	.to(".goal-container", 1, {opacity:0.8}, "enter3")
	.to(con3, 2, {alpha:0.5}, "enter3")
	;

	function pauseTl(){
		tl.pause();
		tlFl.pause();
	}

	function playTl(){
		tl.play();
		tlFl.play();
	}

	function resetTl(){
		tl.tweenTo("enter1").duration(1);
		tlFl.tweenTo("enter+=20").duration(1);		
		updateHandler();
	}

	$("button#play").on("click", playTl);
	$("button#pause").on("click", pauseTl);
	$("button#reset").on("click", resetTl);
	/*$("button#fade").on("click", fade);*/

    function updateHandler() {
        document.getElementById("score").innerHTML = game.score;
    }
	// console.log(parts)

	tlFl
	.add("enter")
	.to(con1, 1, {alpha:0}, "enter")
	.to(con2, 1, {alpha:0}, "enter")
	.to(con3, 1, {alpha:0}, "enter")
	.to(parts, 1, {x:"-=150", y:"+=50"}, "enter")
	.staggerTo(parts, 1, {x:"+=300", y:"-=80", scale:0, alpha:0, ease:Power2.easeInOut, repeat:-1}, 0.02, "enter")
	;
	tlFl.seek(20).timeScale(0.25);
	
	pauseTl();

});