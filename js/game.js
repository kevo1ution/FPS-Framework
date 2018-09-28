
var GAME = {};

GAME.Instance = function(){
	//VARIABLES
	this.ClassName = "Instance"; 	//class name to give object type
	this.Name = ""; 				//name of object
	this.Parent = null;				//parent of object
	this.Children = {};				//array of children
	
	//FUNCTIONS
	this.ClearAllChildren = function(){
		for (var key in this.Children){
			if(this.Children[key] != null){
				this.Children[key].Destroy(); //destroy the instance
			}
		}
		
		this.Children = {}; //reset the array
	};
	
	this.Clone = function(par){ //clone everything about this instance
		var obj = {}
		for (var key in this){
			//if the object is not an json
			if(key != Children){
				obj[key] = this[key];
			}else{
				for(k1 in this.Children){
					this.Children.k1.Clone(obj); //set the object as the parent of the cloned items
				}
			}
		}
		
		if(par != null){
			obj.Parent = par;
		}
		
		return obj;
	}
	
	this.Destroy = function(){
		//destroy all children
		this.ClearAllChildren();
		
		//delete the parent reference to children
		if(this.Parent != null){
			delete this.Parent.Children[this.Name]
		}
		
	}
	
	this.FindFirstAncestor = function(name){
		var temp = this.Parent;
		
		while(temp != null){
			if(temp.Name == name){
				return temp;
			}
			
			temp = temp.Parent;
		}
		
		return null;
	}
	
	this.FindFirstAncestorOfClass= function(className){
		var temp = this.Parent;
		
		while(temp != null){
			if(temp.ClassName == className){
				return temp;
			}
			
			temp = temp.Parent;
		}
		
		return null;		
	}
	
	this.FindFirstChild = function(name){
		if(this.Children[name]){
			return this.Children[name];
		}
		return null;
	};
	
	this.FindFirstChildOfClass = function(className){
		for(var key in this){
			if(this[key].ClassName == className){
				return this[key];
			}
		}
		return null;
	}
	
	this.GetChildren = function(){
		return this.Children;
	}
	
	this.IsAncestorOf(descendant){
		var par = descendant.Parent;
		
		while(par != null){
			if(this == par){
				return true
			}
			par = par.Parent;
		}
		
		return false;
	}
	
	this.IsDescendantOf(ancestor){
		var par = this.Parent;
		
		while(par != null){
			if(ancestor == par){
				return true
			}
			par = par.Parent;
		}
		
		return false;		
	}
	
	this.IsA = function(className){
		return this.ClassName == className;
	}
}

GAME.Character = function(){
	
}

//setting up game objects
GAME.Player = function(){
	
	//create player information
	this.Username = "";
	this.Character;

	//METHODS
	this.LoadCharacter = function(){
		
	}
	
	this.Move = function(){
		
	}
	
	this.Kick = function(msg){
		alert(msg);
	}
};