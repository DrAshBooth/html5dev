// This is an example of how the JSON would be structured.
// Note that this is an actual Javascript object, whereas
// JSON is a string that represents that object.

JSONExample = {
    "frames": {
        "chaingun.png": {
            "frame": {
                "x": 1766,
                "y": 202,
                "w": 42,
                "h": 34
            },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": {
                "x": 38,
                "y": 32,
                "w": 42,
                "h": 34
            },
            "sourceSize": {
                "w": 128,
                "h": 128
            }
        },
        "chaingun_impact.png": {
            "frame": {
                "x":1162,
                "y":322,
                "w":38,
                "h":34},
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": {
                "x":110,
                "y":111,
                "w":38,
                "h":34},
            "sourceSize": {
                "w":256,
                "h":256}
        },
        "chaingun_impact_0000.png": {
            "frame": {
                "x": 494,
                "y": 260,
                "w": 22,
                "h": 22
            },
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": {
                "x": 113,
                "y": 108,
                "w": 22,
                "h": 22
            },
            "sourceSize": {
                "w": 256,
                "h": 256
            }
        }
    }
};

// How to read in some JSON
parseJSON = function (weaponJSON) {
    // First, use the JSON.parse function to
    // parse the passed in weaponJSON.
    var parsed = JSON.parse(weaponJSON);
    console.log( 'parsed = ' + parsed ); // Note lower-case 'c' for console
    
    // Next, grab the 'x' data field within
    // 'spriteSourceSize' of 'chaingun_impact.png'
    var frames = parsed['frames'];
    console.log( 'frames = ' + frames ); // Note lower-case 'c' for console
    var x = frames['chaingun_impact.png']['spriteSourceSize'].x;
    console.log( 'x = ' + x ); // Note lower-case 'c' for console

    return x;
};

// These JSON objects first needed to be requested from a server
// this is done using XMLHttpRequest() and the code below
var weaponXHR = new XMLHttpRequest();

var setup = function() {
 weaponXHR.open("GET","/media/js/standalone/libs/gamedev_assets/weapon.json",true);
 weaponXHR.onload = function() {
     parsedJSON = JSON.parse(this.responseText);
     return parsedJSON['frames']['chaingun_impact.png']['spriteSourceSize']['x'];
 };
	weaponXHR.send();
};


// To request a sound file (or any binary file)
// we ust specify the xhr.responseType = 'arraybuffer'
var soundRequest = new XMLHttpRequest();

var setup = function() {
	// YOUR CODE HERE
    soundRequest.open("GET",'/media/js/standalone/libs/gamedev_assets/bg_menu.ogg',true);
    soundRequest.responseType = 'arraybuffer';
	soundRequest.onload = function() {
		try {
			var context = new webkitAudioContext();

			var mainNode = context.createGainNode(0);
			mainNode.connect(context.destination);

			var clip = context.createBufferSource();

			context.decodeAudioData(soundRequest.response, function (buffer) {
				clip.buffer = buffer;
				clip.gain.value = 1.0;
				clip.connect(mainNode);
				clip.loop = true;
				clip.noteOn(0);
			}, function (data) {});
		}
		catch(e) {
			console.warn('Web Audio API is not supported in this browser');
		}
	};
	soundRequest.send();
};

// This sort of procedure can be generalised with the following function
function xhrGet(reqUri, callback, type) {
	var caller = xhrGet.caller;	// stores the id of the id of the person that calls the function
    var xhr = new XMLHttpRequest();
    xhr.open("GET",reqUri,true);
    if(type) xhr.responseType = type;
    xhr.onload = function() {
    	if(callback) {
    		try {
    			callback(xhr);
    		} catch(e) {
    			throw "xhrGet failed:\n" + reqUri + "\nException: " + e +"\nresponseText: " + xhr.responseText + "\ncaller: " + caller;
    		}
    	}
    };
    xhr.send();
}

parseJSON = function (xhr) {
    parsedJSON = JSON.parse(xhr.responseText);
    x = parsedJSON['frames']['chaingun_impact.png']['spriteSourceSize']['x'];
    console.log(x);
    return x;
};

playSound = function (xhr) {
    try {
        var context = new webkitAudioContext();
        var mainNode = context.createGainNode(0);
        mainNode.connect(context.destination);
        var clip = context.createBufferSource();
        context.decodeAudioData(xhr.response, function (buffer) {
            clip.buffer = buffer;
            clip.gain.value = 1.0;
            clip.connect(mainNode);
            clip.loop = true;
            clip.noteOn(0);
        }, function (data) {});
    }
    catch(e) {
        console.warn('Web Audio API is not supported in this browser');
    }
};

// Test code for you to run
var test = function() {
    xhrGet('/media/js/standalone/libs/gamedev_assets/weapon.json', parseJSON, null);
    xhrGet('/media/js/standalone/libs/gamedev_assets/bg_menu.ogg', playSound, 'arraybuffer');
};



// Using the DOM to manipulates a pages html
// This function grabs a body element from the page and appends a div and a canvas to it
var manipulateDOM = function() {
    var body = document.getElementById("body");
    
    var div = document.createElement("div");
    div.id = "gameContent";
    
    var canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    
    div.appendChild(canvas);
    body.appendChild(div);
};

// Javascript does not support true inheritance but we can fake it with the following
// 1) Weapon should extend Class.
// 2) MachineGun should extend Weapon.
// 4) Entity should extend Class.
// 5) Teleporter should extend Entity.

Weapon = Class.extend({
    init: function() {
    }
});

MachineGun = Weapon.extend({
    init: function() {
    }
});

Entity = Class.extend({
    init: function() {
    }
});

Teleporter = Entity.extend({
    init: function() {
    }
});
