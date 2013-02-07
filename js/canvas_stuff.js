
// setting up the canvas
setup = function() {
	// Grab the body element using document.getElementById,
	// assume the body element has an id of 'body'.
	// Create a canvas element using document.createElement,
	// then set the width and height properties to 1200 and
	// 720, respectively.
	// Finally, append the canvas element to the body.
	var body = document.getElementById("body");
	var canvas = document.createElement("canvas");
	context = canvas.getContext('2d');
	canvas.width = 1200; //window.innerWidth;
	canvas.height = 720; //window.innerHeight;

	body.appendChild(canvas);
};



// Loading an image
setup = function() {
	body = document.getElementById('body');
	canvas = document.createElement('canvas');
	context = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	body.appendChild(canvas);

	// Create a new image with a src of "/media/js/standalone/libs/gamedev_assets/ralphyrobot.png" and onload of onImageLoad
	// YOUR CODE HERE
    img = new Image();
    img.onload = onImageLoad;
    img.src = "/media/js/standalone/libs/gamedev_assets/ralphyrobot.png";
};

var onImageLoad = function(){
	console.log("IMAGE!!!");
	// Draw an image to the canvas at position 192,192.
	// Remember that the drawImage method is attached
	// to the 2D Context, not the canvas element!
	// YOUR CODE HERE
    context.drawImage(img,192,192);
};

// flip book animation
var canvas = null;
var context = null;
var framerate = 1000/30;
frame = 0;
var assets = ['/media/js/standalone/libs/gamedev_assets/robowalk/robowalk00.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk01.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk02.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk03.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk04.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk05.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk06.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk07.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk08.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk09.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk10.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk11.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk12.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk13.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk14.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk15.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk16.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk17.png',
			  '/media/js/standalone/libs/gamedev_assets/robowalk/robowalk18.png'
			 ];
var frames = [];

var onImageLoad = function(){
	console.log("IMAGE!!!");
};

var setup = function() {
	body = document.getElementById('body');
	canvas = document.createElement('canvas');
	context = canvas.getContext('2d');
	canvas.width = 100;
	canvas.height = 100;
	body.appendChild(canvas);

	// Load each image URL from the assets array into the frames array 
	// in the correct order.
	// Afterwards, call setInterval to run at a framerate of 30 frames 
	// per second, calling the animate function each time.
	// YOUR CODE HERE
	for(var i = 0; i < assets.length; i++) {
		frames.push(new Image());
		frames[i].src = assets[i];
		frames[i].onload = onImageLoad;
	}
	setInterval(animate,framerate)
};

var animate = function(){
	// Draw each frame in order, looping back around to the 
	// beginning of the animation once you reach the end.
    // Draw each frame at a position of (0,0) on the canvas.
	// YOUR CODE HERE
	context.clearRect(0,0,canvas.width,canvas.height)
	context.drawImage(frames[frame], 192,192);
	frame = (frame+1) % frames.length;
};

//setup();

