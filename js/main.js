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
	
	//start the orphan game
	startGame();
	
});

