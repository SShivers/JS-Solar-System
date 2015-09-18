// Create the scene objects
var sun = document.createElement('div');
sun.id = 'sol';

var asteroids = document.createElement('div');
asteroids.id = "asteroids";

var mercuryPath = document.createElement('div');
mercuryPath.id = 'mercuryPath';
mercuryPath.className = 'planetPath';

var venusPath = document.createElement('div');
venusPath.id = 'venusPath';
venusPath.className = 'planetPath';

var earthPath = document.createElement('div');
earthPath.id = 'earthPath';
earthPath.className = 'planetPath';

var marsPath = document.createElement('div');
marsPath.id = 'marsPath';
marsPath.className = 'planetPath';

var jupiterPath = document.createElement('div');
jupiterPath.id = 'jupiterPath';
jupiterPath.className = 'planetPath';

var saturnPath = document.createElement('div');
saturnPath.id = 'saturnPath';
saturnPath.className = 'planetPath';

var uranusPath = document.createElement('div');
uranusPath.id = 'uranusPath';
uranusPath.className = 'planetPath';

var neptunePath = document.createElement('div');
neptunePath.id = 'neptunePath';
neptunePath.className = 'planetPath';

document.body.appendChild(sun);
document.body.appendChild(asteroids);
document.body.appendChild(mercuryPath);
document.body.appendChild(venusPath);
document.body.appendChild(earthPath);
document.body.appendChild(marsPath);
document.body.appendChild(jupiterPath);
document.body.appendChild(saturnPath);
document.body.appendChild(uranusPath);
document.body.appendChild(neptunePath);

// Set the scene center
var systemCenterX = 462;
var systemCenterY = 310;

// Create our prototypes
function planetOrbit(plRadian, plRotation, plObject) {

	var planetName = plObject;
	this.planetName = document.createElement('div');
	this.planetName.id = planetName;
	this.planetName.className = 'planet';
	document.body.appendChild(this.planetName);

	var radian = 0;

	// created this nested function because the callback in animate() was reaching the top of planetOrbit() and
	// constantly reseting the "radian" to 0 and defining "radian" outside of the function was applying that same
	// "radian" to all of the instances of the function (all planets we moving at the same speed)
	this.intRadian = function intRadianAnimate() {
		radian += plRadian;
		rotationRadius = plRotation;

		xMiddlePoint = $( '#'+plObject ).height() / 2;
		yMiddlePoint = $( '#'+plObject ).width() / 2;

		this.xPosition = Math.floor(systemCenterX + (rotationRadius * Math.cos(radian) - xMiddlePoint));
		this.yPosition = Math.floor(systemCenterY + (rotationRadius * Math.sin(radian) - yMiddlePoint));

		$("#" + plObject).animate({
			left: this.xPosition,
			top: this.yPosition,
			},
			1,
			function() {
				intRadianAnimate();
			}
		);
	}
}

function moonOrbit(plRadian, plRotation, plObject, parent) {

	var moonName = plObject;
	this.moonName = document.createElement('div');
	this.moonName.id = moonName;
	this.moonName.className = 'moon';
	document.body.appendChild(this.moonName);

	var radian = 0;

	this.intRadian = function intRadianAnimate() {
		radian += plRadian;
		rotationRadius = plRotation;

		xMiddlePoint = $( '#'+parent ).height() / 2;
		yMiddlePoint = $( '#'+parent ).width() / 2;

		xPosition = $( '#'+parent ).offset().left + xMiddlePoint;
		yPosition = $( '#'+parent ).offset().top + yMiddlePoint;

		this.xPosition = Math.floor(xPosition + (rotationRadius * Math.cos(radian)));
		this.yPosition = Math.floor(yPosition + (rotationRadius * Math.sin(radian)));

		$("#" + plObject).animate({
			left: this.xPosition,
			top: this.yPosition,
			},
			0.01,
			function() {
				intRadianAnimate();
			}
		);
	}
	
	intRadian();
}

function createStar() {
	var star = document.createElement('div');
	star.className = 'star';
	randomPositionX = Math.random() * 900;
	randomPositionY = Math.random() * 700;
	star.style.left = randomPositionX;	
	star.style.top = randomPositionY;
	document.body.appendChild(star);
}

function createComet() {
	var comet = document.createElement('div');
	comet.className = 'comet';
	document.body.appendChild(comet);

	// Randomize the comet's destination point
	cometRandomGoal = Math.random() * (1000 - 500) + 500;

	// Randomize the animation timing
	cometRandomTiming = Math.random() * (1500 - 1200) + 1200;

	$('.comet').animate({left: "-10", top: cometRandomGoal, opacity: "0.9"}, cometRandomTiming, "linear", function() {
		$('.comet').remove();
	});
}

// Animate the planets
mercury = new planetOrbit(0.04, 62, "mercury");
mercury.intRadian();

venus = new planetOrbit(0.02, 80, "venus")
venus.intRadian();

earth = new planetOrbit(0.01, 120, "earth");
earth.intRadian();

mars = new planetOrbit(0.005, 160, "mars");
mars.intRadian();

jupiter = new planetOrbit(0.00083333333, 260, "jupiter");
jupiter.intRadian();

saturn = new planetOrbit(0.00033898305, 330, "saturn");
saturn.intRadian();

uranus = new planetOrbit(0.000119047619047619, 400, "uranus");
uranus.intRadian();

neptune = new planetOrbit(0.000060606060606061, 430, "neptune");
neptune.intRadian();

// Animate the moons
moonOrbit(0.006, 20, "moon", "earth");
moonOrbit(0.006, 27, "io", "jupiter");
moonOrbit(0.008, 30, "ganymede", "jupiter");
moonOrbit(0.010, 33, "callisto", "jupiter");
moonOrbit(0.007, 33, "europa", "jupiter");
moonOrbit(0.007, 33, "titan", "saturn");

for(i = 0; i < 60; i++) {
	createStar();
}

var cometAnimation = setInterval("createComet()", 8000);