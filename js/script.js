
    //CREATE CANVAS 2D CONTEXT
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    //VARIABLES

    let CANVAS_WIDTH = canvas.width 
    let CANVAS_HEIGHT = canvas.height

    const totalImages = 8
    let counterForLoadImages = 0

    let score = 0
    let beers = 0

    let isEasterEgg = false
    let arrayOfClouds = []
    let arrayOfMarges = []
    let arrayOfDuffs = []
    let arrayOfDuffsAmo = []

    ctx.font = ('bold 50px simpson font')
    ctx.fillStyle = 'yellow'

     //SOUNDS

    let duffSound = new Audio('./sounds/drinking.mp3')
    duffSound.volume = 1
    duffSound.preload = 'auto'
    duffSound.load()

    let ouchSound = new Audio('./sounds/homer-simpson-ouch.mp3')                        //cargando archivos de audio
    ouchSound.volume = 0.15
    ouchSound.preload = 'auto'
    ouchSound.load()

    let soundTrack = new Audio('./sounds/simpsons-8-bit.mp3')
    soundTrack.volume = 0.07
    soundTrack.preload = 'auto'
    soundTrack.load()

    let jumpSound = new Audio('./sounds/burp.wav')
    jumpSound.volume = 0.10
    jumpSound.preload = 'auto'
    jumpSound.load()

    let margeSound = new Audio('./sounds/beer-09.wav')
    margeSound.volume = 0.15
    margeSound.preload = 'auto'
    margeSound.load()

    let easterEggSound = new Audio('./sounds/beer-07.wav')
    easterEggSound.volume = 0.15
    easterEggSound.preload = 'auto'
    easterEggSound.load()
 
 //LOAD IMAGES

 const loadImages = {}
 const imagesLinks = [
     {link: './images/homer-pj.png', name: 'homer'},
     {link: './images/cloud-1.png', name: 'cloud1'},
     {link: './images/cloud-2.png', name: 'cloud2'},
     {link: './images/marge.png', name: 'marge'},               //creando un array con las imagenes para luego cargarlas todas y guardarlas como objeto con el nombre de key y la url de value
     {link: './images/duff.png', name: 'duff'},
     {link: './images/city-2D-game.png', name: 'city'},
     {link: './images/game-over.png', name: 'gameover'},
     {link: './images/drunk-homer.jpeg', name: 'drunkhomer'}
 ]



    imagesLinks.forEach((imagen)=>{
        const img = new Image()
        img.src = imagen.link
         img.onload = ()=>{
            counterForLoadImages++
            loadImages[imagen.name] = img
         }
    })

 


    //FUNCTIONS

    const startGame = ()=>{
        const createMarges = setInterval(()=>{
            arrayOfMarges.push(new Marge())
        },3000)

        const createDuffs = setInterval(()=>{               //Llamamondo al updatecanvas para comenzar el loop, y empezamos a crear los objetos y personajes y los metemos en sus respectivos arrays
            arrayOfDuffs.push(new Duff())
        }, 15000)

        const createClouds = setInterval(()=>{             
            arrayOfClouds.push(new Cloud())
        }, 10000)           
        updateCanvas()
    }

    const endGame = ()=>{
        ctx.drawImage(loadImages.gameover, 0, 0, CANVAS_WIDTH, 800)              //Finaliza el loop y muestra en la pantalla el game over!                                                                                    
        cancelAnimationFrame()
    }

    const easterEgg = ()=>{
        ctx.drawImage(loadImages.drunkhomer, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)              //Finaliza el loop y muestra en la pantalla a homer borracho     
        easterEggSound.play()                                                                              
        cancelAnimationFrame()
    }

    const drawDuffsAmo = ()=>{
        arrayOfDuffsAmo.forEach((duffAmo)=>{
            ctx.drawImage(loadImages.duff, duffAmo.x, duffAmo.y, duffAmo.width, duffAmo.height)       //Dibujando las duff que sirven de municion
        })
    }

    const deleteDuffsAmo = ()=>{
        arrayOfDuffsAmo = arrayOfDuffsAmo.filter((duffAmo)=>{              
            return !duffAmo.shoot
        })
    }

    const updateDuffsAmo = ()=>{
        arrayOfDuffsAmo.forEach((duffAmo)=>{
            duffAmo.speed = 3
            duffAmo.x += duffAmo.speed
            if(duffAmo.x === 800){
                duffAmo.shoot = true
            }
        })
        deleteDuffsAmo()
        checkCollision()
    }

    const checkCollision = (arr1, arr2) => { 
        arrayOfMarges.forEach((marge) => { 
        arrayOfDuffsAmo.forEach((duffAmo) => {
            if (!(marge.x > duffAmo.x + duffAmo.width -150 ||
                marge.x + marge.width < duffAmo.x ||
                marge.y > duffAmo.y + duffAmo.height ||                     //comprobando si hay colision entre marge y la duff y si es asi borramos ambas
                marge.y + marge.height < duffAmo.y)){
                    margeSound.play()
                    marge.toDelete = true 
                    duffAmo.shoot = true 
                    }
            })
        })
    }
                               
    const drawClouds = ()=>{
        arrayOfClouds.forEach((cloud)=>{                                                              //dibujando las nubes 
            ctx.drawImage(loadImages.cloud2, cloud.x, cloud.y, cloud.width, cloud.height)
        })
    }

    
    const updateCloud = ()=>{                   
        arrayOfClouds.forEach((cloud)=>{
            cloud.speed = -2                        //actualizando su posicion en x aumentando su velocidad
            cloud.x += cloud.speed
            if(cloud.x < 0 -cloud.width){
                cloud.toDelete = true
            }
        })
        deleteCloud()
    }

    const deleteCloud = ()=>{
        arrayOfClouds = arrayOfClouds.filter((cloud)=>{
            return !cloud.toDelete
        })
    }

    const drawMarges = ()=>{
        arrayOfMarges.forEach((marge)=>{                        
            ctx.drawImage(loadImages.marge, marge.x, marge.y, marge.width, marge.height)        //misma operacion con el enemigo
        })
    }

    const updateMarges = ()=>{
        arrayOfMarges.forEach((marge)=>{
            marge.speed = -3
            marge.x += marge.speed
            if((marge.x + marge.width) < 0){
                marge.toDelete = true
                score += 10
                document.getElementById('score_counter').innerText = score
            }
        })
        deleteMarge()
        margeTouchHomer()
    }

    const margeTouchHomer = ()=>{
        arrayOfMarges.forEach((marge)=>{
            const bothInX = (marge.x -35) < homer.x && (marge.x + 80) > homer.x
            const bothInY = (marge.y - 100) < homer.y && (marge.y + 50) > homer.y

            if(bothInX && bothInY){                                                 //comprobamos si marge toca a homer con la aspiradora, y llamamos al endGame()
                ouchSound.play()
                endGame()
            }
        })
    }

    const deleteMarge = ()=>{
        arrayOfMarges = arrayOfMarges.filter((marge)=>{
            return !marge.toDelete
        })
    }

    const drawDuffs = ()=>{
        arrayOfDuffs.forEach((duff)=>{
            ctx.drawImage(loadImages.duff, duff.x, duff.y, duff.width, duff.height) //misma operacion con los items
        })
    }

    const checkDrinkBeer = ()=>{
        arrayOfDuffs.forEach((duff)=>{
            const bothInX = (duff.x - 20) < homer.x && (duff.x + 25) > homer.x
            const bothInY = (duff.y - 100) < homer.y && (duff.y + 20) > homer.y     //comprobamos que homer este dentro de los limites de la duff y sumamos uno al contador

            if(bothInX && bothInY){
                duffSound.play()
                duff.drink = true                            //Le cambiamos el estado a la duff para poder borrarla
                beers++
                document.getElementById('beers_counter').innerText = beers                  //le pasamos el contador de beers con el DOM al html
            }
            })
    }

    const deleteDuff = ()=>{
        arrayOfDuffs = arrayOfDuffs.filter((duff)=>{              //función para borrar las duff, haciendo un filer sobre el array de duffs y metiendo solo las que no han sido bebidas
            return !duff.drink
        })
    }

    const updateDuffs = ()=>{
        arrayOfDuffs.forEach((duff)=>{
            duff.speed = -2
            duff.x += duff.speed
        })
        checkDrinkBeer()
        deleteDuff()
    }

    const drawBackgrounds = ()=>{
        ctx.drawImage(loadImages.city, background_1.x, background_1.y, background_1.width, background_1.height)
        ctx.drawImage(loadImages.city, background_2.x, background_2.y, background_2.width, background_2.height)
    }

    const updateBackground = () => {
        if (homer.x > 300) {
          if (background_1.x <= -800) {
            background_1.x = 800
          }                                              
          if (background_2.x <= -800) {
            background_2.x = 800
          }
          background_1.x -= 5
          background_2.x -= 5
        }
      };

    const clearCanvas = ()=>{
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)        
    }

    const drawHomer = (imagen)=>{
            ctx.drawImage(loadImages.homer, homer.x, homer.y, homer.width, homer.height)
        }

    const drawPictures = ()=>{
        drawBackgrounds()
        drawDuffs()
        drawClouds()
        drawMarges()
        drawDuffsAmo()
        drawHomer()
    }
    
    const updatePositions = ()=>{
        updateCloud()
        updateMarges()
        updateDuffs()
        updateBackground()
        updateDuffsAmo()
    }

    const updateLimits = ()=>{
        homer.updatePosition()
        homer.checkLimits()
        
    }
    
     const updateCanvas = ()=>{
        if(counterForLoadImages === totalImages){               // comprobamos que todas las imagenes esten cargadas antes de empezar a dibujar ninguna
        clearCanvas()  
        drawPictures()                                          //creando un updateCanvas con la función requesAnimationFrame que ejecuta un loop infinito 
        updatePositions()
        updateLimits()
        if(isEasterEgg){
            easterEgg()
        }
        }
       requestAnimationFrame(updateCanvas)
    }





