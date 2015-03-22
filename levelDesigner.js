function Level(map,focusTarget){
    //this object will design a level and redraw it to the perspective of the player & checks collision

	this.loadTextures = function () {
		map.loadTextures(); 
		map.loadMonsters(); 
	}

	this.update = function update(){
        //input: moves player wants to make
        //output: moves player can make
        var pCorX = Math.floor(focusTarget.mapX);
        var pcorY = Math.floor(focusTarget.mapY);

        // if the tile position is about to change
        if( pCorX != map.x || pcorY != map.y){
           //if no collision
           if(!map.checkSolid(pCorX,pcorY)){
              //draw viewport with right offset
              if( pCorX > map.x) { // x +1
                 focusTarget.movX += TILE_WIDTH;
                 focusTarget.movY += TILE_WIDTH/2;
             }
             else if(pCorX < map.x){
                 focusTarget.movX -= TILE_WIDTH;
                 focusTarget.movY -= TILE_WIDTH/2;
             }
             if(pcorY > map.y){
                 focusTarget.movX -= TILE_WIDTH;
                 focusTarget.movY += TILE_WIDTH/2;
             }
             else if( pcorY < map.y){
                focusTarget.movX += TILE_WIDTH;
                focusTarget.movY -= TILE_WIDTH/2;
             }
             //change the viewport
             map.x = Math.floor(focusTarget.mapX);
             map.y = Math.floor(focusTarget.mapY);
           }
           else{ // if collision, undo movement
               focusTarget.movX -= focusTarget.mapVelocityX;
               focusTarget.movY -= focusTarget.mapVelocityY;

               focusTarget.isoPositionX -= focusTarget.velX;
               focusTarget.isoPositionY -= focusTarget.velY;
           }
	    }
        //update the monsters in this map
		map.updateMonsters(focusTarget);
    }

	this.draw = function draw (ctx)	
	{
        //input : drawing context
        // output: draw tiles in isometric order
  		for (var i= 0 -6; i<map.tilesY; i++)  //row
  		{
 			for (var j= 0 -6; j<map.tilesX; j++) //column
 			{
 			 	var x = j * TILE_WIDTH;
 		 		var y = i * TILE_WIDTH;
 		 		var viewX = j + map.x - parseInt(Math.sqrt(Math.pow(focusTarget.x,2) + Math.pow(focusTarget.y,2) ) / TILE_WIDTH);
 		 		var viewY = i + map.y;   //player starts in middle of screen so screen has to be drawn from offset

                var tileType = '   '

 		 		if ( (viewY >= 0) && (viewX >= 0) && (viewY < map.map.length) && (map.map[viewY][viewX] != null) && (map.map[viewY][viewX] != '   ') )
                    tileType = map.map[viewY][viewX].substring(0,map.map[viewY][viewX].length - 1);
                    //find image to draw

                //isometric position
                var isoX = x - y + focusTarget.movX;
                var isoY = (x + y) / 2 + focusTarget.movY;

                var image = map.getImage(tileType);
                ctx.drawImage(image,isoX ,isoY);
            }
        }
        //draw monsters in this map
    	map.drawMonsters(ctx,focusTarget);
	}
}