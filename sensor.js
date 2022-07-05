class Sensor{
  constructor(car, rayCount=3, rayLength=100, raySpread=Math.PI/4){
    this.car = car // saves the car in this instance (it's not really necessary)
    this.rayCount = rayCount // how many rays
    this.rayLength = rayLength // the range of the sensor in pixels
    this.raySpread = raySpread  // the angle spread of the sensor in degrees
    this.rays = []  // the array of rays <!> 
    this.readings= [] // readings from the sensors
  }
  update(roadBorders){
    this.#castRays()
    this.readings = this.rays.map( (ray)=> this.#getReadings( ray , roadBorders) )
    console.log({readings:this.readings})
  }

  #getReadings( ray, someBorders) {

    const interceptions = someBorders
      .map( border => getIntersection( ray , border) )
      .filter((interception)=> !!interception)
      .map( (point ) => Math.sqrt( (point[0]-ray[0][0])**2 + (point[1]-ray[0][1])**2 ) )
      .sort()
    return interceptions
  }


  
  #castRays(){
      this.rays = new Array(this.rayCount)
        .fill(null)
        .map( (_,i)=> {
          const rayAngle = lerp(
                this.raySpread/2,
                -this.raySpread/2,
              this.raycount ==1 ? 0.5 :  i/(this.rayCount-1)
              ) + this.car.angle 
          const start = { x: this.car.x, y: this.car.y }
          const end = { x: this.car.x - Math.sin(rayAngle)*this.rayLength , 
                  y: this.car.y - Math.cos(rayAngle)*this.rayLength
                }
          return [start, end]
        })
           
    }
  draw(ctx){
      this.rays.forEach((ray)=>{
        const [start, end] = ray 
        ctx.beginPath()
        ctx.lineWidth=2
        ctx.strokeStyle="yellow"
        ctx.moveTo( start.x, start.y)
        ctx.lineTo( end.x,end.y)
        ctx.stroke()
        
      })
    }
}
