function monster(corX,corY) {
    // this object will process everything related the fire monster
    //states and their textures
    this.textures = [new Image(), new Image(), new Image(),new Image(), new Image()]

    //virtual position
	this.x = corX * 80;
 	this.y = corY * 80;

    //virtual coordinate
    this.coorX = corX;
    this.coorY = corY;

    //health
    this.health = 100;

    //position monster is drawn on screen
 	this.drawX = 0;
	this.drawY = 0;

    //visibility of the monster
	this.visible = false;

    //direction the monster is facing
    this.direction = 0;

    //animation row used to simulate direction
    this.side = 0;

    //damage dealt on each blow
    this.damage = 1;

	this.states = 0;
	//states :    0 : rise
    //            1 : fighting
	//			  2 : stand
	//			  3 : walk
    //            4 : dead

    //when monster becomes visible
	this.attackSight = 100;

    //when monster attacks
    this.attackRange = 40;

 	//Monster Velocity
    this.velX = 0;
 	this.velY = 0;

 	this.speed = 2;

  	//animation vars
   this.frame = 0;
   this.frameTimer = 0;
   this.msPerFrame = 140;
   this.prevTime = 0;

   
   this.update = function update(player,map) {
       //input : player and map
       //output: monster dead,
       this.velX = 0;
       this.velY = 0;

       //check if monster is still alive
       if(this.health <= 0){
           this.setState(4);
           if(this.frame >= 18 && this.states == 4){
               map.monsterKilled(this); // remove monster at the end of death animation
           }
       }
       else if(this.checkDistance(this.attackRange, player.isoPositionX,player.isoPositionY) && this.states != 0){
            this.setState(1); //check if player is close enough to attack him
            if(this.frame >= 16 && this.states == 1){
                    //attack player
                    player.damaged(this.damage);
                }
        }
    	else if(this.checkDistance(this.attackSight *this.states , player.isoPositionX, player.isoPositionY)){
            // check if player is close enough to move towards him
   	    	//normalize vector towards player
   		    var valX = player.isoPositionX - this.x;
   		    var valY = player.isoPositionY - this.y;
   		    var r =  Math.sqrt(Math.pow(valX,2) + Math.pow(valY,2));
   		    this.velX = (valX/r) * this.speed/2;
   		    this.velY = (valY/r) * this.speed/2;
            this.checkCollision(map); //check if there's a collision on the next position

            if( this.velX != 0 || this.velY != 0)
                this.setState(3);

            else if(this.velX == 0 && this.velY == 0)
                this.setState(2);

            this.x += this.velX;
            this.y += this.velY;
   	    }
        else if((this.frame >= 15 && this.states == 0) || (this.states != 0 && (this.velX == 0 && this.velY == 0)) ){
                this.setState(2);
        }
   }

   this.checkCollision = function checkCollision(map){
        //input : map, velocity
        //output : set velocity to 0 if monster is about to collide
        this.coorX = parseInt((this.x + this.velX) /80);
        this.coorY = parseInt((this.y + this.velY) /80);
        if(this.coorX != parseInt(this.x /80) || this.coorY != parseInt(this.y /80) ){
            if(map.checkSolid(this.coorX,this.coorY)){
                this.velX = 0;
                this.velY = 0;
            }
        }
   }
   this.setState = function setState(state){
        //input: new state
        // output : if newstate different than old state set oldstate to new state and start drawing from frame 0
        if(this.states != state){
            this.states = state;
            this.frame = 0;
        }
   }
   this.checkAttacked = function checkAttacked(damage,direction){
       //input: damage received if monster is attacked, direction other object is facing
       //output: if in damage range receive damage
       if(this.health > 0 && this.states != 4){
           //calculate angle between objects
           var valX = this.x - player.isoPositionX;
           var valY = this.y - player.isoPositionY;
           this.angle = Math.atan2(valX, valY);
           //if angle is between attack range => receive damage
           if(this.angle > direction -2 && this.angle < direction +2)
                this.health -= damage;
       }

   }
   
   this.draw = function draw(ctx,player){
        //input : drawing context
        // output: draw and update animations

        //amount of images in spritesheet
   	    var tilesX = 1;
   	    var tilesY = 1;
        //offset to compensate corner draw & size diff
   	    var offsetX = 0;
        var offsetY = 0

   	    switch(this.states) {
            case 0: {
        	    this.visible = true;
                tilesX = 16;
                offsetX = -80
                break;
            }
            case 1: {
                tilesX = 17;
                tilesY = 8;
                offsetX = -30;
                break;
            }
            case 2: {
		        tilesX = 8;
                tilesY = 8;
                break;
            }
            case 3: {
                tilesX = 8;
                tilesY = 8;
                this.direction = Math.atan2(this.velX,this.velY)
                this.side = this.calculateDirection(this.direction);
                break;
            }
            case 4: {
                tilesX = 19;
                offsetX = -90;
                offsetY = -120;
                this.side = 0;
                break;
            }
 	    }
       //calculate distance between objects
     	var distX = (this.x - player.isoPositionX);
    	var distY = (this.y - player.isoPositionY);

      //calculate isometric position of monster on screen
    	this.drawX =  (distX - distY) + player.x;
     	this.drawY =  ((distX + distY) / 2) + player.y;

        //calculate width and height of one animation frame
    	var Height = Math.round(this.textures[this.states].height/tilesY);
	    var Width = Math.round(this.textures[this.states].width/tilesX);

	    if (this.frameTimer > this.msPerFrame) {
			this.frameTimer = 0;
   			this.frame++;
   			if (this.frame >= tilesX) this.frame = 0;
        }
	    else {
			this.frameTimer += Date.now() - this.prevTime;
        }
        ctx.drawImage(this.textures[this.states],Width*this.frame,this.side * Height ,Width,Height,this.drawX + offsetX,this.drawY + offsetY,Width,Height);
	    this.prevTime = Date.now();
	}


	this.checkDistance = function checkDistance(dist, relPosX, relPosY){
        //input: max distance, relative position
        // output: if distance is smaller then distance parameter return true
		var vis = false;
		if(parseInt(Math.sqrt(Math.pow(this.x - relPosX,2) + Math.pow(this.y - relPosY,2))) < dist)
			vis = true;
		return vis;
	}

    this.loadTextures = function loadTextures(){
        //preload textures to reduce width calculation time
        this.textures[0].src = 'monsterTextures/rise.png';
        this.textures[1].src = 'monsterTextures/attack.PNG';
        this.textures[2].src = 'monsterTextures/neutralMonster.png';
        this.textures[3].src = 'monsterTextures/walkingMonster.png';
        this.textures[4].src = 'monsterTextures/monsterDead.png';
    }

    this.calculateDirection = function calculateDirection(direction){
        //input: direction facing in rad
        // output: side of animation used to simulate
        var pi = Math.PI;
        var side = 0;
        if(direction > pi/6 && direction < pi/3) //Down
            side = 0;
        else if (direction > pi/3 && direction < 2*pi/3) // Right down
            side = 7;
        else if (direction > 2*pi / 3 && direction < 5*pi/6) // Right
            side = 6;
        else if (Math.abs(direction) > 5*pi/6 && Math.abs(direction) < 7*pi/6) // Right up
            side = 5;
        else if(direction*-1 > 2*pi / 3 && direction*-1 < 5*pi/6) //up
            side = 4;
        else if (direction*-1 > pi/3 && direction*-1 < 2*pi/3) // Left up
            side = 3;
        else if(direction*-1 > pi/6 && direction*-1 < pi/3) // left
            side = 2;
        else                                                //Left down
            side = 1;
        return side;
    }
}
