//gun stats
var GUN_STATES = [
	//1- reload time
	[//type 1
		[1] //id-1
	]
];
//abstract gun
var createGun = function(type, num, par, pos, dir, scene){
	var obj = {};
	
	//member variables
	obj.type = type;
	obj.id = num;

	//states
	obj.reload = false;
	obj.firing = false;
	obj.aiming = false;
	
	//mesh for obj
	var box = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 1, depth: 5}, scene);
	var material = new BABYLON.StandardMaterial("material1", scene);
	box.position = pos;
	box.forward = dir;
	box.parent = par;
	box.material = material;	
	obj.mesh = box;
	
	//ray setup
	var ray = new BABYLON.Ray();
    var rayHelper = new BABYLON.RayHelper(ray);
    
    var localMeshDirection = new BABYLON.Vector3(0, 0, 1);
    var localMeshOrigin = new BABYLON.Vector3(0, 0, 3);
    var length = 10;
	rayHelper.attachToMesh(box, localMeshDirection,localMeshOrigin, length);
	rayHelper.show(scene);
	
	//light setup
	var light = new BABYLON.PointLight("spotLight", localMeshOrigin, scene);
	light.diffuse = new BABYLON.Color3(1,1,1);
	light.parent = box;
	light.setEnabled(false);
		
	//define methods
	obj.shoot = function(dir){ //firing function
		//change state
		if(this.firing){
			return;
		}
		this.firing = true;
		this.reload = false;
		
		/*
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
		*/
		var hit = scene.pickWithRay(ray);
		console.log("test");
		if(hit.pickedMesh){
			console.log("hit");
			hit.pickedMesh.scaling.y += 0.1;
		}
		
		/* Light enabling
		*/
		var lightHandle = async function(){
			light.setEnabled(true);
			await sleep(100);
			light.setEnabled(false);

		};
		lightHandle();
		
		/*
		set timer to change cooldown
		-wait bullet cooldown time
		*/
		var debounce = async function(){ 
			await sleep(10);
			obj.firing = false;
			console.log("end debounce");
		};
		debounce();
		
	};
	
	obj.reload = function(bool){ //reload and cancel reload
		if(bool){ //reload
			this.reload = true;
			
		}else{ //cancel reload
			this.reload = false;
			
		}
	};
	
	return obj;
}