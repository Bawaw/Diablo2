function character(mapWidth, mapHeight,map) {
    //this object will process everything related to the player and collect and translate user input
    this.textures = [new Image(), new Image(), new Image()]

    this.state = 0;
    /*
        0: stand
        1: run
        2: fight
     */
    this.health = 100;

    this.x; //x position on screen
    this.y; // y position on screen

 	//Player Velocity
    this.velX = 0;
 	this.velY = 0;

    //direction facing in rad
    this.direction = 0;

    //animation row used to simulate direction
    this.side = 0;

    //damage each blow will cause
    this.damage = 20;

    //amount of horizontal images in spritesheet
    this.tilesX = 8;

    //offset to compensate corner draw & size diff
    this.offsetX = 0;
    this.offsetY = 0;

    //map Velocity
    this.mapVelocityX = 0;
    this.mapVelocityY = 0;

    //speed of map
 	this.speed = 4;

    //virtual coordinate
    this.mapX = 0;
    this.mapY = 0;
   
    //isoPosition
    this.isoPositionX =  map.x*80;
    this.isoPositionY = map.y*80;

  	//coordinate offset
  	this.movX = 0;
  	this.movY = 0;

  	//animation vars
  	this.frame = 0;
    this.frameTimer = 0;
    this.msPerFrame = 50;
    this.prevTime = 0;

    this.loadTextures = function loadTextures(){
        //preload textures to reduce width calculation time
        this.textures[0].src = 'playerTextures/standSheet.png';
        this.textures[1].src = 'playerTextures/runSheet.png';
        this.textures[2].src = 'playerTextures/playerAttack.png';

        //center player
        this.x = mapWidth/2 - this.textures[this.state].width/8 + 10; //8 = number of frames in ani
        this.y = mapHeight/2 - this.textures[this.state].height/16 +60;
    }


    this.update = function update(keyboardInput){
        //input : arrow keys or attack key
        // output: velocity change, switch animation , deal damage
        this.offsetX = 0;
        this.offsetY = 0;
        this.tilesX = 8;

  	    this.velX = 0;
  	    this.velY = 0;
        this.mapVelocityX = 0;
        this.mapVelocityY = 0;

        //process user input, attack
        if(keyboardInput[4]){
            this.setState(2);
            this.tilesX = 15;
            this.offsetX = -51;     //outlining textures cuz of no origin
            this.offsetY = -12;
            if(this.frame >= this.tilesX-1){
                keyboardInput[4] = false;
                map.checkHit(this.damage,this.direction);
            }
        }

        //process user input, movement
  	    else if (keyboardInput[0] || keyboardInput[1] || keyboardInput[2] || keyboardInput[3] ) {
		  if(keyboardInput[0] && keyboardInput[1] ) //LU
		  {
		  		this.velX = - this.speed;

                this.mapVelocityX = this.speed;
                this.mapVelocityY = this.speed/2;
		  		this.side = 6;
		  }
		  else if(keyboardInput[1] && keyboardInput[2]) // UR
		  {
                this.velY = -this.speed;

                this.mapVelocityX = -this.speed;
                this.mapVelocityY = this.speed/2;
		  		this.side = 10;
		  }
		  		
		  else if(keyboardInput[2] && keyboardInput[3]) // RD
		  {
                this.velX = this.speed;

                this.mapVelocityX = -this.speed;
                this.mapVelocityY = -this.speed/2;
		  		this.side = 14;
		  }
		  else if(keyboardInput[0] && keyboardInput[3]) // LD
		  {
                this.velY = this.speed;
                this.mapVelocityX = this.speed;
                this.mapVelocityY = - this.speed/2;
		  		this.side = 2;
		  }
		  else if(keyboardInput[0]) // L
		  {
		  		this.velX = - this.speed/2;
                this.velY = this.speed/2;
                this.mapVelocityX = this.speed;
		  		this.side = 4;
		  }
		  else if(keyboardInput[1]) // U
		  {
                this.velX = - this.speed;
		  		this.velY = - this.speed;
                this.mapVelocityY = this.speed;
		  		this.side = 8;
		  }
		  		
		  else if(keyboardInput[2]) // R
		  {
		  		this.velX = this.speed/2;
                this.velY = - this.speed/2;
                this.mapVelocityX = -this.speed;
		  		this.side = 12;
		  }
		  else if(keyboardInput[3]) // D
		  {
		  		this.velY = this.speed;
                this.velX = this.speed;
                this.mapVelocityY = -this.speed;
		  		this.side = 0;
		  }
        this.direction = Math.atan2(this.velX,this.velY)
        this.setState(1);

        this.movX += this.mapVelocityX;
        this.movY += this.mapVelocityY;
        this.isoPositionX += this.velX;
        this.isoPositionY += this.velY;
	}
	else {
        this.setState(0);
	}
    this.mapX = (this.isoPositionX/TILE_WIDTH);
    this.mapY = (this.isoPositionY/TILE_WIDTH);
  }

  this.draw = function draw(ctx){
      //input : drawing context
      // output: drawn and updated animations

      //calculate width and height of one animation frame
      var Height = Math.round(this.textures[this.state].height/16);
      var Width = Math.round(this.textures[this.state].width/this.tilesX);

      if (this.frameTimer > this.msPerFrame) {
          this.frameTimer = 0;
          this.frame++;
          if (this.frame >= this.tilesX)
              this.frame = 0;
      }
      else {
          this.frameTimer += Date.now() - this.prevTime;
      }
      ctx.drawImage(this.textures[this.state],Width*this.frame,this.side * Height ,Width,Height,this.x + this.offsetX,this.y + this.offsetY,Width,Height);
      this.prevTime = Date.now();
    }

    this.setState = function setState(state){
        //input: new state
        // output : if newstate different than old state set oldstate to new state and start drawing from frame 0
        if(this.state != state){
            this.state = state;
            this.frame = 0;
        }
    }

    this.damaged = function damaged(amount){
        //input: player has been damaged
        //output: health - damage
        this.health -= amount;
    }
}

 		