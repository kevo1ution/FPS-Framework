
//start everything
window.addEventListener('DOMContentLoaded', function(){
	
	//define canvas
	var canvas = document.getElementById("canvas");
	
	//engine handles everything and rendering
	var engine = new BABYLON.Engine(canvas, true);
	
	var createBase = function (){
		//ground definition
		var ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 1, scene);
		ground.physicsImposter = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
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
	}
	var createCamera = function(scene){	
		/*CAMERAS!
			FreeCamera - moves freely and can be controlled if controls are setup
			ArcRotateCamera - based on target and rotation
			FollowCamera - follows a locked target
		*/
		var camera = new BABYLON.ArcRotateCamera("followCamera", Math.PI/2, Math.PI/2, 10, BABYLON.Vector3.Zero(), scene);
		camera.attachControl(canvas, true);
	}
	var createChar = function (scene){

	}
	var createObjects = function(scene){
		//box definition
		/*
		var box = BABYLON.Mesh.CreateBox("Box", 1.0, scene);
		var material = new BABYLON.StandardMaterial("material1", scene);
		box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
		box.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,1,0));
		box.position = new BABYLON.Vector3(0, 3, 0);
		box.material = material;
		*/
		
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
		var light = new BABYLON.PointLight("spotLight", new BABYLON.Vector3(0, 10, 0), scene);
		light.diffuse = new BABYLON.Color3(1,1,1);
		light.position = new BABYLON.Vector3(10, 10, 0); //parenting light to a camera makes it move with the camera!
		
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
	
	//render loop 
	engine.runRenderLoop(function(){

		scene.render();
	});
});

