class Car {
  constructor( x, y, width, height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.controls = new Controls()
    this.sensors = new Sensor(this, 9, 150,Math.PI/2)
    this.speed = 0 
    this.accelaration = 0.2
    this.maxSpeed = 3
    this.friction = 0.05
    this.angle = 0 // the heading of the car, to which direction it's pointed to
  }

  draw(ctx) { // method that draws the car into a given context
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(-this.angle)
    ctx.beginPath()
    ctx.rect(
       - this.width/2,
       - this.height/2,
      this.width,
      this.height
    )
    ctx.fill()
    ctx.restore() // this ensures the translations and rotations apply only to the car
    this.sensors.draw(ctx)
    
  }

  update(roadBorders){
    this.#move()
    this.sensors.update(roadBorders)
  }
  #move() {
    if (this.controls.forward){
      this.speed += this.accelaration
    }
    if (this.controls.reverse) {
      this.speed -= this.accelaration
    }
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed
    }
    if (this.speed < -this.maxSpeed/2) {
      this.speed = -this.maxSpeed/2
    }

    if (this.speed > 0 ) {
      this.speed -= this.friction
    }

    if (this.speed < 0 ) {
      this.speed += this.friction
    }
    if (Math.abs(this.speed)< this.friction) {
      this.speed = 0
    }    

    // if the car is moving, we can turn it 
    if (this.speed!=0){
      const flip = this.speed>0 ? 1:-1
      if (this.controls.left) {
        this.angle += 0.03*flip
      }
      if   (this.controls.right) {
        this.angle -= 0.03*flip
      }
    }
    this.x -= Math.sin(this.angle)*this.speed
    this.y -= Math.cos(this.angle)*this.speed
  }
  
}