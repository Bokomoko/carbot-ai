// gets the object canvas defined in the html file
const canvas = document.getElementById("mycanvas")
// the constant canvas now points to the canvas on the html page
canvas.width = 200               // sets the width (horizontal size)

const ctx = canvas.getContext("2d")  // the context that we'll draw things to

// @Road( position of the center of the road, width of the road, number of lanes)
const road = new Road( canvas.width/2, canvas.width*0.9, 3)
// lanes are numbered from 0 to laneCount -1 
// get the center of the middle lane
const middle = road.getLaneCenter(Math.floor(road.laneCount/2))
// create a car and put it in this middle lane
const car = new Car(middle,100,30,50)   // creates a car at the middle lane of the road

car.draw(ctx) // invokes the method to draw the car into a context

animate()

function animate() {
  car.update(road.borders)

  // this will resize and clear the canvas
  canvas.height = window.innerHeight // sets the Height (vertical size) to the max fit 

  ctx.save()
  ctx.translate(0,-car.y+canvas.height*0.7)
  road.draw(ctx)
  car.draw(ctx)
  ctx.restore()
  requestAnimationFrame(animate)  
}