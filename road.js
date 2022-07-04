class Road{
  constructor(x,width, laneCount=3){
    this.x = x      // where the middle of the road will be (in width)
    this.width = width
    this.laneCount = laneCount
    this.left = this.x - this.width/2
    this.right = this.x + this.width/2
    const infinity = 10000000   // the end of the road ...
    this.bottom = infinity
    this.top = -infinity;
    const topLeft = {x : this.left, y:this.top}
    const topRight = { x: this.right, y:this.top}
    const bottomLeft = {x:this.left , y:this.bottom}
    const bottomRight = {x:this.right, y:this.bottom}
    this.borders = [
      [topLeft,bottomLeft],
      [topRight,bottomRight]
    ]
  }
  getLaneCenter(laneIndex){
    const laneWidth = this.width / this.laneCount
    return this.left+laneWidth/2+laneIndex*laneWidth
  }
  draw(ctx){
    ctx.lineWidth = 6
    ctx.strokeStyle = "white"
    
    // draw the inner divisors (lane count 1 to lanecount -1 )
    // the number of inner lane dividers will be laneCount - 1
    for (let i=1 ; i<=this.laneCount-1 ; i++){
      const x = lerp(
        this.left,
        this.right,
        i/this.laneCount
      )
      ctx.setLineDash([20,20])
      ctx.beginPath()
      ctx.moveTo(x, this.top)
      ctx.lineTo(x, this.bottom)
      ctx.stroke()
    }
    
    this.borders.forEach(border => {
      const [begin, end] = border
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.moveTo(begin.x, begin.y)
      ctx.lineTo(end.x,end.y)
      ctx.stroke()
    })
  }
}
