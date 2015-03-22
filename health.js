function health(hp) {
    //this object will draw a health pool

    //health pool
    this.texture = new Image();
    this.texture.src = 'healthTextures/healthSheet.png'
    //frame
    this.textFrame = new Image();
    this.textFrame.src = 'healthTextures/frame.png'

    //player health
    this.maxHealth = hp;
    this.health = hp;

    //animation vars
    this.frame = 0;
    this.frameTimer = 0;
    this.msPerFrame = 100;
    this.prevTime = 0;

    this.update = function update(hp){
        //update health
        this.health = hp;
    }

    this.draw = function draw(ctx){
        //input : drawing context
        // output: draw and update animations

        var Height = Math.round(this.texture.height);
        var Width = Math.round(this.texture.width/4);

        if (this.frameTimer > this.msPerFrame) {
            this.frameTimer = 0;
            this.frame++;
            if (this.frame >= 4)
                this.frame = 0;
        }
        else {
            this.frameTimer += Date.now() - this.prevTime;
        }
        // draw orb
        ctx.drawImage(this.texture,Width*this.frame,0,Width,Height,2,0,Width/2,Height/2);
        //draw health shader
        ctx.beginPath();
        ctx.rect(0, 40, 200,110-((this.health/this.maxHealth) * 110));
        ctx.fill();
        //draw frame
        ctx.drawImage(this.textFrame,0,0,this.textFrame.width,this.textFrame.height,0,2,this.textFrame.width/2,this.textFrame.height/2);
        this.prevTime = Date.now();
    }
}