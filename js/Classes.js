    CANVAS_WIDTH = canvas.width 
    CANVAS_HEIGHT = canvas.height
    
    //CLASSES

    class Homer{
        constructor(){
            this.x = 200
            this.y = 350
            this.speedX = 0
            this.speedY = 0 

            this.weight = 0.19 
            this.gravity = 15
                                                //creando la clase del personaje principal y actualixzando su posicion respecto a la velocidad
            this.width = 100           
            this.height = 150
        }
        
        updatePosition(){
            this.x += this.speedX
            this.y += this.speedY
            if (this.speedY < this.gravity){
                this.speedY += this.weight                // comprobamos que la velocidad Vertical sea menor a gravedad, si es mayor le sumamos progresivamente el peso
            } 

        }

        jump(){
            if(this.y === 350){
                this.speedY = -8
                jumpSound.play()
            }                            // Le damos el valor que queramos que salte
        }
        
        checkLimits(){
            if(this.x < 0){
                this.x = 0
            }
            
            if(this.x > CANVAS_WIDTH - 80){  
                this.x = CANVAS_WIDTH - 80     //comprobando los limites del canvas para que nuestro personaje nunca se salga
            }

            if(this.y > 350){
                this.y = 350
            }
        }

    }

    class Cloud{
        constructor(){
            this.x = CANVAS_WIDTH
            this.y = Math.floor(Math.random() * 200)
            this.speed = 0
            this.width = 150
            this.height = 100
            this.toDelete = false
        }
    }

    class Marge{
        constructor(){
            this.x = CANVAS_WIDTH
            this.y = Math.floor(Math.random() * 200) + 200          //classes de enemigo y objetos y posicion en y random
            this.speed = 0
            this.width = 200
            this.height = 140
            this.toDelete = false
        }
    }

    class Duff{
        constructor(){
            this.drink = false
            this.x = CANVAS_WIDTH
            this.y = Math.floor(Math.random() * 100) + 200
            this.speed = 0
            this. width = 90
            this.height = 60
        }
        
    }

    class DuffAmo{
        constructor(){
            this.shoot = false
            this.x = homer.x
            this.y = homer.y + 20
            this.speed = 0
            this. width = 90
            this.height = 60
        }
        
    }

    class Background {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.width = CANVAS_WIDTH;
          this.height = CANVAS_HEIGHT;
        }
      
        update() {}
      }

      const background_1 = new Background(0, 0);
      const background_2 = new Background(800, 0);
      const homer = new Homer()


    

   
