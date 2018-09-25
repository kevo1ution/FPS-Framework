//class description of guns
var castRay() = function(org, dir, length){
	var ray = new BABYLON.Ray(orig, dir, length);
	//var hit = scene
}

var createBullet = function(scene, pos, dir, id){
	//box definition
	
}

//abstract gun
var createGun = function(type, num, par){
	var obj = {};
	
	//member variables
	obj.type = type;
	obj.id = num;

	//states
	obj.reload = false;
	obj.firing = false;
	obj.aiming = false;
	
	//define methods
	obj.shoot = function(dir){ //firing function
		
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