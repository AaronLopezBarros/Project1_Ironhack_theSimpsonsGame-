window.onload = ()=>{
    //EVENT LISTENERS
    

    document.addEventListener('keydown', (event)=>{
       if(event.key === 'ArrowRight'){
           homer.speedX= 3
       }else if(event.key === 'ArrowLeft'){
           homer.speedX = -3
       }else if(event.key === ' '){
           homer.jump()
       }else if(event.key === 'b' && beers > 0){
           arrayOfDuffsAmo.push(new DuffAmo())
           beers--
           document.getElementById('beers_counter').innerText = beers
       }else if(event.key === 'd' && beers >= 10){
           isEasterEgg = true
       }
   })
   
   document.addEventListener('keyup', (event)=>{                                   
       if(event.key === 'ArrowRight' || event.key === 'ArrowLeft'){
           homer.speedX = 0
       }
   })

   const startButon = document.getElementById('start_button')
       startButon.onclick = ()=>{
           soundTrack.play()
           startGame()
           startButon.classList.remove('yes')                      //Eliminando el boton de start para que no de fallo
           startButon.classList.add('none')
    }

    
   document.getElementById('sound_button_on').onclick = ()=>{
       soundTrack.play()
   }

   document.getElementById('sound_button_off').onclick = ()=>{
       soundTrack.pause()
   }
}