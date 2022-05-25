import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { ClimingEnemy, FlyingEnemy, GroundEnemy } from './enemy.js';


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.gameSpeed = 0;
            this.maxGameSpeed = 3;
            this.gameHeightMargin = 80;
            this.background = new Background(this);
            this.enemies = [];
            this.enmeyInterval = 1000;
            this.enemyTimer = 0;
            this.player = new Player(this);
            this.input = new InputHandler();
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            
        }

        update(deltaTime){
           // this.addEnmey();
           if(this.enemyTimer > this.enmeyInterval) {
            this.enemyTimer = 0;   
            this.addEnmey();}
           else {this.enemyTimer += deltaTime;}
            this.background.update(deltaTime);
            this.player.update(this.input.keys, deltaTime);
            
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
           
        }

        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enmey => {
                enmey.draw(context);
            });

        }

        addEnmey(){
            if(this.gameSpeed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if(this.gameSpeed > 0) this.enemies.push(new ClimingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
            console.log(this.enemies);
           
        }

        
    }

    

    const game = new Game(canvas.width, canvas.height);
    
   let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
       
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    animate(0);
  
  
   

    
});

