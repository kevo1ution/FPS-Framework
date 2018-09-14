
//start everything
window.addEventListener('DOMContentLoaded', function(){
	
	//define canvas
	var canvas = document.getElementById("canvas");
	
	//engine handles everything and rendering
	var engine = new BABYLON.Engine(canvas, true);
	
	var createBase = function (){
		
	}
	var createSky = function (scene){
		var skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
		skyMaterial.backFaceCulling = false;

		var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
		skybox.material = skyMaterial;

	}
	var createChar = function (){
		
	}
	var createScene = function (){
		//set up the scene we are returning, and physics
		var scene = new BABYLON.Scene(engine);
		var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
		var physicsPlugin = new BABYLON.CannonJSPlugin();
		scene.enablePhysics(gravityVector, physicsPlugin);
		scene.clearColor = new BABYLON.Color3.White();

		//box definition
		var box = BABYLON.Mesh.CreateBox("Box", 1.0, scene);
		var material = new BABYLON.StandardMaterial("material1", scene);
		box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
		box.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,1,0));
		box.position = new BABYLON.Vector3(0, 3, 0);
		
		/* Material Components
		material.diffuseColor = new BABYLON.Color3(1, 0, 0);
		material.emissiveColor = BABYLON.Color3.Red(); //color emitted by the material
		material.specularColor = BABYLON.Color3.Blue(); //reflected color from lights
		material.alpha = 0.5; //changes transparency
		*/		
		box.material = material;
		
		//ground definition
		var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
		ground.physicsImposter = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
		
		
		/*CAMERAS!
			FreeCamera - moves freely and can be controlled if controls are setup
			ArcRotateCamera - based on target and rotation
			FollowCamera - follows a locked target
		*/
		var camera = new BABYLON.ArcRotateCamera("followCamera", Math.PI/2, Math.PI/2, 10, box.position, scene);
		camera.attachControl(canvas, true);
		
		/*LIGHTS!
			Pointlight - like the sun
			SpotLight - like flash light
		*/
		var light = new BABYLON.PointLight("spotLight", new BABYLON.Vector3(0, 10, 0), scene);
		light.diffuse = new BABYLON.Color3(1,1,1);
		light.parent = camera; //parenting light to a camera makes it move with the camera!
		
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