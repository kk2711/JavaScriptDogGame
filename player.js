import {Sitting, Running, Jumping, Falling} from './playerState.js';

export class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height -  this.height - this.game.gameHeightMargin;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.speed = 0;
        this.maxSpeed = 10;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 0;
        this.fps = 20;
        this.frameInterval = 1000/ this.fps;
        this.frameTimer = 0;

        
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        
    }

    update(input, deltaTime){
        this.currentState.handleInput(input);
        // horizontal movment
        this.x += this.speed;
        if(input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if(input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        
        //boundary collision
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;
      
        // vertical movment
        
        this.y += this.vy;
        
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;


        // animatiom of sprite
        if(this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if(this.frameX < this.maxFrameX)  this.frameX++;   
            else  this.frameX = 0;
        }else {
            this.frameTimer += deltaTime;
        }
    

        

  
    }

    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width , this.height, this.x, this.y, this.width, this.height);
       
    }

    onGround(){
        return this.y >= this.game.height - this.height - this.game.gameHeightMargin;
    }

    setState(state, speed){
        this.currentState = this.states[state];
        this.game.gameSpeed = this.game.maxGameSpeed * speed;
        this.currentState.enter();
    }
}