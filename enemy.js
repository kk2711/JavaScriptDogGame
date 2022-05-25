class Enemy{
    constructor(){
       
        this.frameX = 0;
        this.frameY = 0;
        this.markedForDeletion = false;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speedX = 2;
        this.speedY = 0;
    
    }

    update(deltaTime){
        this.x -= this.speedX + this.game.gameSpeed;
        this.y += this.speedY;
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else {
            this.frameTimer += deltaTime;
        } 

        // check enemies off screen
        if(this.x < -this.game.width - this.width) this.markedForDeletion = true;
    }

    draw(context){
        context.drawImage(this.image, this.width * this.frameX, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game){
     super();
     this.game = game;
     this.width = 60;
     this.height = 44;
     this.x = this.game.width + this.width;
     this.y = Math.random() * this.game.height * 0.5;
     this.maxFrame = 5;
     this.image = document.getElementById('enemy_fly')
     this.angle = 0;
     this.va = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle)* 2;
      
       
        
    }

    
 }

export class GroundEnemy extends Enemy{
    constructor(game){
        super()
        this.game = game;
        this.width = 60;
        this.height = 80;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.gameHeightMargin;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
        this.image = document.getElementById('ground_enemy');
    }

    
}



export class ClimingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.image = document.getElementById('climbing_enemy');
        this.maxFrame = 5;
    }

    update(deltaTime){
        super.update(deltaTime);
        if(this.y > this.game.height - this.height - this.gameHeightMargin) this.speedY *= -1;
        if(this.y < -this.height) this.markedForDeletion = true;
    }

    draw(context){
        super.draw(context);
       context.beginPath();
       context.moveTo(this.x + this.width/2, 0);
       context.lineTo(this.x + this.width/2 , this.y + 50);
       context.stroke();
       

    }
}