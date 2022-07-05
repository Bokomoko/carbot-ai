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

  // this is a very specific algorithm to get the points of the 
  // vertices of the rectangular shaped car.
  // the array returned is the list of vertices of the car
  #createPolygon(){
    const points = []
    const rad = Math.hypot(this.width, this.height)/2
    const alpha = Math.atan2(this.width, this.height)
    points.push({
      x : this.x - Math.sin(this.angle+alpha)*rad,
      y : this.y - Math.cos(this.angle+alpha)*rad
    })
    points.push({
      x : this.x - Math.sin(this.angle-alpha)*rad,
      y : this.y - Math.cos(this.angle-alpha)*rad
    })
    points.push({
      x : this.x - Math.sin(Math.PI+this.angle+alpha)*rad,
      y : this.y - Math.cos(Math.PI+this.angle+alpha)*rad
    })
    points.push({
      x : this.x - Math.sin(Math.PI+this.angle-alpha)*rad,
      y : this.y - Math.cos(Math.PI+this.angle-alpha)*rad
    })
    return points
  }

  draw(ctx) { // method that draws the car into a given context
    ctx.beginPath()
    ctx.moveTo(this.polygon[0].x,this.polygon[0].y)
    for (let i= 1; i<this.polygon.length; i++){
      const { x , y } = this.polygon[i]
      ctx.lineTo( x, y)
    }
    ctx.fill()

    this.sensors.draw(ctx)
    
  }

  update(roadBorders){
    this.#move()
    this.sensors.update(roadBorders)
    this.polygon = this.#createPolygon()
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