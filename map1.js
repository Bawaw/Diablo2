function map1(){
    //this object will keep all data of this level/map
    //with of tiles used
    window.TILE_WIDTH = 79;

	//map info			
	this.map =
        //  0      1      2      3      4      5      6      7      8      9     10     11     12     13     14     15
        [['   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', 'S1s', 'S1s', '   ', '   '],  //0
         ['   ', '   ', '   ', '   ', '   ', '   ', 'S2s', 'S3s', 'S4s', 'S5s', 'S1s', 'S6s', 'O1s', 'O2s', 'S7s', '   '],  //1
         ['   ', '   ', '   ', '   ', '   ', 'S6s', 'C1s', 'W1s', 'W2s', 'W3s', 'W4s', 'W5s', 'F1f', 'F2f', 'G1s', '   '],  //2
         ['   ', '   ', '   ', '   ', '   ', 'S8s', 'W6s', 'F2f', 'F3f', 'F2f', 'F1f', 'F1f', 'F2f', 'F5f', 'G2s', '   '],  //3
         ['   ', '   ', '   ', '   ', '   ', 'S9s', 'W7s', 'F1f', 'F2f', 'F3f', 'F1f', 'F2f', 'F3f', 'F4f', 'W8s', 'W9s'],  //4
         ['   ', '   ', '   ', '   ', '   ', 'SAs', 'WAs', 'F1f', 'O3s', 'O4s', 'O5f', 'F2f', 'F1f', 'F6f', 'F7f', 'G2s'],  //5
         ['   ', '   ', '   ', '   ', '   ', 'SBs', 'WBs', 'F2f', 'O6f', 'O7s', 'O8s', 'F4f', 'F2f', 'F8f', 'F9f', 'G3s'],  //6
         ['   ', 'SCs', 'SDs', 'SEs', 'SFs', 'SGs', 'FAf', 'F3f', 'F1f', 'F2f', 'F2f', 'F1f', 'F1f', 'F1f', 'G4s', 'G5s'],  //7
         ['SHs', 'SIs', 'SJs', 'WCs', 'SKs', 'W4s', 'FAf', 'F1f', 'F1f', 'F3f', 'F2f', 'F1f', 'F3f', 'F2f', 'G6s', '   '],  //8
         ['SLs', 'SMs', 'SNf', 'F2f', 'F2f', 'F2f', 'F2f', 'F4f', 'F2f', 'F2f', 'G7s', 'G8s', 'G9s', 'GAs', 'GBs', '   '],  //9
         ['SOs', 'WDs', 'F1f', 'F3f', 'F2f', 'F3f', 'F2f', 'F2f', 'F6f', 'GCf', 'GDs', '   ', '   ', '   ', '   ', '   '],  //10
         ['S6s', 'SPs', 'F2f', 'F1f', 'GEs', 'GFs', 'GGs', 'GHs', 'GIs', 'GJs', 'GKs', '   ', '   ', '   ', '   ', '   '],  //11
         ['S8s', 'WEs', 'F3f', 'FBf', 'GLs', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   '],  //12
         ['   ', 'GNs', 'GIs', 'GFs', 'GMs', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ', '   ']]; //13

    //viewport
	this.tilesX = 12;
	this.tilesY = 9;
	
	//start pos
	this.x = 3;
	this.y = 12;
	
	//tile textures
	this.tileSet = [];
	
	// array of monsters in this map
	this.monsterList = new Array();

    //load monsters in array
	this.loadMonsters = function(){
		this.monsterList.push(new monster(7,8));
        this.monsterList.push(new monster(2,9));
        this.monsterList.push(new monster(7,4));
        this.monsterList.push(new monster(13,3));
        this.monsterList.push(new monster(14,6));
        this.monsterList.push(new monster(11,8));
        this.monsterList.push(new monster(8,10));

        //load monster textures
        for (var i = 0; i < this.monsterList.length; i++)
            this.monsterList[i].loadTextures();
	}

    //list of textures used and their id
    this.loadTextures = function () {
        // floor textures
        //               ID     PATH
        this.storeImage('F1', 'mapTextures/Ground.png');
        this.storeImage('F2', 'mapTextures/Ground_rough.png');
        this.storeImage('F3', 'mapTextures/Ground_rough2.png');
        this.storeImage('F4', 'mapTextures/Ground_rough3.png');
        this.storeImage('F5', 'mapTextures/Ground_woodpile.png');
        this.storeImage('F6', 'mapTextures/Ground_skeletonHeap_Up.png');
        this.storeImage('F7', 'mapTextures/Ground_skeletonHeap_Right.png');
        this.storeImage('F8', 'mapTextures/Ground_skeletonHeap_Left.png');
        this.storeImage('F9', 'mapTextures/Ground_skeletonHeap_Bot.png');
        this.storeImage('FA', 'mapTextures/Floor_Rock_Flow.png');
        this.storeImage('FB', 'mapTextures/Ground_skeleton.png');

        //shade textures
        this.storeImage('S1', 'mapTextures/Cover_LD_rock_shade.png');
        this.storeImage('S2', 'mapTextures/Back_pileRock.png');
        this.storeImage('S3', 'mapTextures/Back_boulder.png');
        this.storeImage('S4', 'mapTextures/Cover_T_spike.png');
        this.storeImage('S5', 'mapTextures/Cover_spike_L.png');
        this.storeImage('S6', 'mapTextures/Cover_RD_rock2.png');
        this.storeImage('S7', 'mapTextures/LE_fill.png');
        this.storeImage('S8', 'mapTextures/Cover_RD_rock.png');
        this.storeImage('S9', 'mapTextures/Back_Stal_Rock.png');
        this.storeImage('SA', 'mapTextures/Back_Cave.png');
        this.storeImage('SB', 'mapTextures/Shader.png');
        this.storeImage('SC', 'mapTextures/Stairs_top.png');
        this.storeImage('SD', 'mapTextures/Back_Peek_rock.png');
        this.storeImage('SE', 'mapTextures/Back_heavyShader.png');
        this.storeImage('SF', 'mapTextures/Back_spikes_stal.png');
        this.storeImage('SG', 'mapTextures/Back_RD_stal.png');
        this.storeImage('SH', 'mapTextures/Cover_rock.png');
        this.storeImage('SI', 'mapTextures/Stairs_left.png');
        this.storeImage('SJ', 'mapTextures/Stairs_right.png');
        this.storeImage('SK', 'mapTextures/Back_spikes_rock.png');
        this.storeImage('SL', 'mapTextures/cover_spikedrips.png');
        this.storeImage('SM', 'mapTextures/cover_spikes2.png');
        this.storeImage('SN', 'mapTextures/Stairs_Bot.png');
        this.storeImage('SO', 'mapTextures/Cover_spikes.png');
        this.storeImage('SP', 'mapTextures/Back_rock.png');


        //Obstacles
        this.storeImage('O1', 'mapTextures/Obst_Rock.png');
        this.storeImage('O2', 'mapTextures/Obst_Rock2.png');
        this.storeImage('O3', 'mapTextures/cliff_left_up.png');
        this.storeImage('O4', 'mapTextures/cliff_mid_up.png');
        this.storeImage('O5', 'mapTextures/cliff_right_up.png');
        this.storeImage('O6', 'mapTextures/cliff_left.png');
        this.storeImage('O7', 'mapTextures/cliff_mid.png');
        this.storeImage('O8', 'mapTextures/cliff_right.png');
        this.storeImage('O9', 'mapTextures/Ground_obstacle.png');

        //wall
        this.storeImage('W1', 'mapTextures/wall1.png');
        this.storeImage('W2', 'mapTextures/back_rock_spike.png');
        this.storeImage('W3', 'mapTextures/Back_spikes_R.png');
        this.storeImage('W4', 'mapTextures/Back_spikes3.png');
        this.storeImage('W5', 'mapTextures/Back_spikes_R2.png');
        this.storeImage('W6', 'mapTextures/Back_spikes4.png');
        this.storeImage('W7', 'mapTextures/back_rock_spikes.png');
        this.storeImage('W8', 'mapTextures/RR_rock.png');
        this.storeImage('W9', 'mapTextures/Stomp.png');
        this.storeImage('WA', 'mapTextures/Back_spikes6.png');
        this.storeImage('WB', 'mapTextures/Back_L_spikes_rock.png');
        this.storeImage('WC', 'mapTextures/Back_spikes2.png');
        this.storeImage('WD', 'mapTextures/Back_spikes.png');
        this.storeImage('WE', 'mapTextures/Back_pointRock.png');

        //corner
        this.storeImage('C1', 'mapTextures/Back_LU_corner.png');

        //cliff
        this.storeImage('G1', 'mapTextures/LU_dknot.png');
        this.storeImage('G2', 'mapTextures/LU_spikes.png');
        this.storeImage('G3', 'mapTextures/B_cor.png');
        this.storeImage('G4', 'mapTextures/LU_cor_rock4.png');
        this.storeImage('G5', 'mapTextures/U_cor.png');
        this.storeImage('G6', 'mapTextures/UR_cor.png');
        this.storeImage('G7', 'mapTextures/LU_cor_rock3.png');
        this.storeImage('G8', 'mapTextures/RU_rock_spiked.png');
        this.storeImage('G9', 'mapTextures/SD_Fill_spike.png');
        this.storeImage('GA', 'mapTextures/LU_cor_rock.png');
        this.storeImage('GB', 'mapTextures/RU_cor_rock.png');
        this.storeImage('GC', 'mapTextures/Ground_spiked_rocked.png');
        this.storeImage('GD', 'mapTextures/LU_cor_rock2.png');
        this.storeImage('GE', 'mapTextures/LU_cor_rock.png');
        this.storeImage('GF', 'mapTextures/RU_rock3.png');
        this.storeImage('GG', 'mapTextures/RU_rock4.png');
        this.storeImage('GH', 'mapTextures/RU_rock.png');
        this.storeImage('GI', 'mapTextures/RU_rock2.png');
        this.storeImage('GJ', 'mapTextures/R_spiked_rock.png');
        this.storeImage('GK', 'mapTextures/LE_fill.png');
        this.storeImage('GL', 'mapTextures/L_rock.png');
        this.storeImage('GM', 'mapTextures/RU_cor_rock.png');
        this.storeImage('GN', 'mapTextures/inner_cor_cliff.png');

        //void textures
        this.storeImage('   ', 'mapTextures/fill.png');
    }

    //update all monsters that are visible or in range
	this.updateMonsters = function updateMonsters(player){
		for (var i = 0; i < this.monsterList.length; i++)
		    if(this.monsterList[i].visible || this.monsterList[i].checkDistance(this.monsterList[i].attackSight *4, player.isoPositionX, player.isoPositionY)  )
		  			this.monsterList[i].update(player,map);
	}

    //draw all monsters that are visible or in range
	this.drawMonsters = function drawMonsters(ctx,player){
		for (var i = 0; i < this.monsterList.length; i++)
		    if(this.monsterList[i].visible || this.monsterList[i].checkDistance(this.monsterList[i].attackSight *4, player.isoPositionX, player.isoPositionY) )
		  			this.monsterList[i].draw(ctx, player);
	}

    this.checkSolid = function checkSolid(x,y){
        //input: position
        //output: collision or not at position
        var solid = false;
        if(this.map[y][x].charAt(this.map[y][x].length-1) == 's')
            solid = true;
        return solid;
    }

    this.checkHit = function checkHit(dmg,dir){
        //input: damage dealt with blow and direction blow was aimed at
        //output: call checkAttacked for all monsters that where in range
        for (var i = 0; i < this.monsterList.length; i++)
            if(this.monsterList[i].visible && this.monsterList[i].checkDistance(this.monsterList[i].attackRange *2, player.isoPositionX, player.isoPositionY) )
                this.monsterList[i].checkAttacked(dmg,dir);
    }

    this.monsterKilled = function monsterKilled(monster){
        //input: monster that has been slain
        //output: array of monsters minus the slain monster
        var removed = false;
        for (var i = 0; i < this.monsterList.length && !removed; i++){
            if(this.monsterList[i] == monster && !removed){
                this.monsterList.splice(i,1);
                removed = true;
            }
        }
    }
	
	this.storeImage = function storeImage(id, imgSrc) {
        //input: id of image and image path
        //output: add id and image to array of images tileSet
   	    var tile  = [id, new Image()];   //create new tile id,image,successfully loaded?
   
   	    tile[1].src = imgSrc;
   	    this.tileSet[this.tileSet.length] = tile;
	}

	this.getImage = function getImage(id) {
        //input: id of image
        //output: image
        var found = false;
        var img = this.tileSet[0][0];
   	    for(var i =0; i<this.tileSet.length && !found; i++)
   	    {
     	    if(this.tileSet[i][0] == id){
         	    img = this.tileSet[i][1];
                found = true;
            }
        }
        return img;
	}
}