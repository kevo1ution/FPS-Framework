/*
NOTES: Goals (date: description)

9/30/2018 - setup a working gun system (ray casting, firing, etc.)
ideas:
	gun.fire = {
		
		check cooldown
		-cancel fire if true
		-allow fire if true
		-set cooldown to true
		
		firing effects: recoil, light, sound, etc.
		
		create ray from gun tip position to mouse pointing direction
		-spread
		-range
		
		get first mesh on the ray
		-ignores gun mesh objects
		-check if mesh is part of a damageble entity (zombie, plr)
			-dmg the entity
		
		state changes
		-decrease bullets by 1
		-stop reloading if reloading
		
		set timer to change cooldown
		-wait bullet cooldown time
		
	}


*/

//standard functions
function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

//start everything
window.addEventListener('DOMContentLoaded', function(){
	
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
		camera.maxZ = 1000;//better performance
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
	UI_front();
	
	//render loop 
	engine.runRenderLoop(function(){
		var box = scene.getMeshByID("Box");
		box.position.x += vx;
		box.position.z += vy
		
		scene.render();
		
		vx = 0;
		vy = 0;
	});
	
	//wait loop
	var testfunc = async function(){
		//create bulelt
		await sleep(2000);
		//create test targets
		for(var x = 1; x < 5; x++){
			for(var y = 1; y < 5; y++){
				var temp = BABYLON.Mesh.CreateBox("", 3.0, scene);
				var material = new BABYLON.StandardMaterial("material1", scene);
				//temp.physicsImpostor = new BABYLON.PhysicsImpostor(temp, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0 }, scene);
				temp.position = new BABYLON.Vector3(5 * x, 1, 5 * y);
				temp.material = material;
			}
		}
	};
	
	testfunc();
	
	//control events
	document.addEventListener("keypress", function(keyCode){
		const key = keyCode.key;
		if(key == "w"){
			vy += .3;
		}else if(key == "s"){
			vy -= .3;
		}else if(key == "a"){
			vx -= .3;
		}else if(key == "d"){
			vx += .3;
		}
	});
	
	document.addEventListener("keyup", function(keyCode){
		const key = keyCode.key;
		if(key == "w"){
			vy -= .3;
		}else if(key == "s"){
			vy += .3;
		}else if(key == "a"){
			vx += .3;
		}else if(key == "d"){
			vx -= .3;
		}
	});
	
	//canvas click event 
	canvas.addEventListener('click', function(event){

	});
});

