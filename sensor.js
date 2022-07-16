class Sensor {
  constructor(car, rayCount = 3, rayLength = 100, raySpread = Math.PI / 4) {
    this.car = car; // saves the car in this instance (it's not really necessary)
    this.rayCount = rayCount; // how many rays
    this.rayLength = rayLength; // the range of the sensor in pixels
    this.raySpread = raySpread; // the angle spread of the sensor in degrees
    this.rays = []; // the array of rays <!>
    this.readings = []; // readings from the sensors
  }
  update(roadBorders, traffic) {
    this.#castRays();
    this.readings = []; // no readings
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.#getReadings(this.rays[i], roadBorders, traffic));
    }
  }

  #getReadings(ray, borders, traffic) {
    let touches = [];
    for (let i = 0; i < borders.length; i++) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        borders[i][0],
        borders[i][1]
      );
      if (touch) {
        touches.push(touch);
      }
    }
    for (let i = 0; i < traffic.length; i++) {
      const poly = traffic[i].polygon;
      for (let j = 0; j < poly.length; j++) {
        const touch = getIntersection(
          ray[0],
          ray[1],
          poly[j],
          poly[(j + 1) % poly.length]
        );
        if (touch) {
          touches.push(touch);
        }
      }
    }

    if (touches.length == 0) {
      // the ray didn't touch anything
      return null;
    }
    // return the touch with the least offset
    // sorts the touches by offset
    // returns touches[0]
    return touches.sort((first, second) => first.offset - second.offset)[0];
  }

  #castRays() {
    this.rays = new Array(this.rayCount).fill(null).map((_, i) => {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.raycount == 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;
      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };
      return [start, end];
    });
  }
  draw(ctx) {
    this.rays.forEach((ray, whichRay) => {
      let [start, end] = ray;
      if (this.readings[whichRay]) {
        // if there is a reading for this ray ...
        end = this.readings[whichRay]; // the ray stops at the first obstacle
      }
      // draws the ray yellow until it reaches a block
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'yellow';
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      // from then on, we'll paint it red so we can see the reach of the sensor
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.moveTo(ray[1].x, ray[1].y); // where it should've ended if not blocked
      ctx.lineTo(end.x, end.y); // where it ended because of block
      ctx.stroke();
    });
  }
}
