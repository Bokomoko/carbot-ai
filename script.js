// gets the object canvas defined in the html file
const canvas = document.getElementById("mycanvas")
// the constant canvas now points to the canvas on the html page
canvas.width = 200               // sets the width (horizontal size)

const ctx = canvas.getContext("2d")  // the context that we'll draw things to

const road = new Road( canvas.width/2, canvas.width*0.9, 4)
const middle = road.getLaneCenter(Math.floor(road.laneCount/2))
const car = new Car(middle,100,30,50)   // creates a car at pos 100,100 with 30x50 pixels size

car.draw(ctx) // invokes the method to draw the car into a context

animate()

function animate() {
  car.update()

  // this will resize and clear the canvas
  canvas.height = window.innerHeight // sets the Height (vertical size) to the max fit 

  ctx.save()
  ctx.translate(0,-car.y+canvas.height*0.7)
  road.draw(ctx)
  car.draw(ctx)
  ctx.restore()
  requestAnimationFrame(animate)  
}