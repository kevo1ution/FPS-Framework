
//setup the game
var startGame = function(){

	//define canvas
	var canvas = document.getElementById("canvas");
	
	//engine handles everything and rendering
	var engine = new BABYLON.Engine(canvas, true);
	
	var createBase = function (){
		//ground definition
		var ground = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 1, scene);
		ground.physicsImposter = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
		ground.checkCollisions = true;
	}
	var createSky = function (scene){
		var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
		skyMaterial.backFaceCulling = false;

		var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
		skybox.material = skyMaterial;
		skyMaterial.turbidity = 1; // Represents the amount (scattering) of haze as opposed to molecules in atmosphere
		skyMaterial.luminance = 1; // Controls the overall luminance of sky in interval ]0, 1,190[
	
		// Control the planet's orientation over the sun
		skyMaterial.inclination = 0.5; // The solar inclination, related to the solar azimuth in interval [0, 1]
		skyMaterial.azimuth = 0.25; // The solar azimuth in interval [0, 1]
		
		// Manually set the sun position
		skyMaterial.useSunPosition = true; // Do not set sun position from azimuth and inclination
		skyMaterial.sunPosition = new BABYLON.Vector3(0, 100, 0);
		
		skyMaterial.rayleigh = 2; // Represents the sky appearance (globally)

		// The amount of haze particles following the Mie scattering theory
		skyMaterial.mieDirectionalG = 0.8;

		skyMaterial.mieCoefficient = 0.005; // The mieCoefficient in interval [0, 0.1], affects the property skyMaterial.mieDirectionalG

	}
	var createPhysics = function(scene){
		var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
		var physicsPlugin = new BABYLON.CannonJSPlugin();
		scene.enablePhysics(gravityVector, physicsPlugin);
		scene.clearColor = new BABYLON.Color3.White();
		scene.collisionsEnabled = true;
	}
	var createCamera = function(scene, box){	
		/*CAMERAS!
			FreeCamera - moves freely and can be controlled if controls are setup
			ArcRotateCamera - based on target and rotation
			FollowCamera - follows a locked target
		*/
		var camera = new BABYLON.ArcRotateCamera("followCamera", Math.PI/2, Math.PI/2, 10, scene.getMeshByID("Box"), scene);
		camera.attachControl(canvas, true);
		camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5);
		camera.checkCollisions = true;
	}
	var createChar = function (scene){

	}
	var createObjects = function(scene){
		//box definition
		var box = BABYLON.Mesh.CreateBox("Box", 2.0, scene);
		var material = new BABYLON.StandardMaterial("material1", scene);
		box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0 }, scene);
		box.position = new BABYLON.Vector3(-20, 10, -20);
		box.material = material;
		box.checkCollisions = true;
		
		/* Material Components
		material.diffuseColor = new BABYLON.Color3(1, 0, 0);
		material.emissiveColor = BABYLON.Color3.Red(); //color emitted by the material
		material.specularColor = BABYLON.Color3.Blue(); //reflected color from lights
		material.alpha = 0.5; //changes transparency
		*/		
	}
	var createLight = function(scene){
		/*LIGHTS!
			Pointlight - like the sun
			SpotLight - like flash light
		*/
		
		/*
		var light = new BABYLON.PointLight("spotLight", new BABYLON.Vector3(0, 10, 0), scene);
		light.diffuse = new BABYLON.Color3(1,1,1);
		light.position = new BABYLON.Vector3(10, 10, 0); //parenting light to a camera makes it move with the camera!
		*/
		
		var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
		light.diffuse = new BABYLON.Color3(0.2, 0.2, 0.2);
		light.specular = new BABYLON.Color3(0, 0, 0);
		light.groundColor = new BABYLON.Color3(0, 0, 0);
				
		/* //actionManager for binding spacebar
		scene.actionManager = new BABYLON.ActionManager(scene);
		scene.actionManager.registerAction(
			new BABYLON.ExecuteCodeAction(
				{trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: " "}, //parameter defines the key you are binding
				function(){
					light.setEnabled(!light.isEnabled());
				}
			)
		);
		*/
	}
	var createScene = function (){
		//set up the scene we are returning, and physics
		var scene = new BABYLON.Scene(engine);

		createPhysics(scene);
		
		createObjects(scene);

		createBase(scene);
		
		createCamera(scene);
		
		createLight(scene);
		
		createSky(scene);
		
		createChar(scene);
		
		//return the scene setup		
		return scene;
	}
	
	//call the create Scene function
	var scene = createScene();
	var vx = 0;
	var vy = 0;
	
	//testing gun
	//var gun = createGun(1, 1, scene.getMeshByID("Box"), new BABYLON.Vector3(0, 1, 0), new BABYLON.Vector3(1, 1, 0) , scene);
	
	//testing ui
	
	//render loop 
	var t = 0;
	engine.runRenderLoop(function(){
		scene.render();
		
		var box = scene.getMeshByID("Box");
		box.position.x += vx;
		box.position.z += vy
		
		//set the sky color
		var skybox = scene.getMeshByID("skyBox");
		skybox.material.sunPosition = new BABYLON.Vector3(Math.sin(t) * 100, Math.cos(t) * 100 + 50 , Math.cos(t) * 100);
		t = (t + 0.0001) % 6.28;
		
		
		vx = 0;
		vy = 0;
	});	
	
	//control events
	document.addEventListener("keypress", function(keyCode){
		const key = keyCode.key;
		if(key == "w"){
			vy += 1;
		}else if(key == "s"){
			vy -= 1;
		}else if(key == "a"){
			vx -= 1;
		}else if(key == "d"){
			vx += 1;
		}
	});
	
	document.addEventListener("keyup", function(keyCode){

	});
	
	//canvas click event 
	canvas.addEventListener('click', function(event){

	});	

	
	//testing instances
	for(var k = 1, k <= 10, k++){
		var temp = new GAME.Instance;
	}
};

var gameOver = function(){
	
};

//ui setup
var UI_front = function(){
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Click Me");
    button1.width = "150px"
    button1.height = "40px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "green";
    button1.onPointerUpObservable.add(function() {
		
    });
    advancedTexture.addControl(button1);   
};
