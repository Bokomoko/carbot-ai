class Controls{
  constructor() {
    this.right = false
    this.left = false
    this.forward = false
    this.reverse = false
    this.#addKeyboardListeners()
  }
  #addKeyboardListeners(){
    // whenever a key is pressed the following function will be invoked
    document.onkeydown = ( (event)=>{
      switch(event.key){
        case "ArrowLeft" :
          this.left = true
          break
        case "ArrowRight" :
          this.right = true
          break
        case "ArrowUp" :
          this.forward = true
          break
        case "ArrowDown" :
          this.reverse = true
          break
      }
    })
    // whenever a key is released the following function will be inkoved
    document.onkeyup=( (event)=>{
      switch(event.key){
        case "ArrowLeft" :
          this.left = false
          break
        case "ArrowRight" :
          this.right = false
          break
        case "ArrowUp" :
          this.forward = false
          break
        case "ArrowDown" :
          this.reverse = false
          break
      }
      
    })
  }
}