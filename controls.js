class Controls {
  constructor(controlType) {
    this.controlType = controlType;
    this.right = false;
    this.left = false;
    this.forward = false;
    this.reverse = false;
    switch (controlType) {
      case 'KEYS':
        this.#addKeyboardListeners();
        break;
      case 'DUMMY':
        this.forward = true;
        break;
    }
  }
  update(outputs) {
    if (outputs[0] > 0.5) {
      this.forward = true;
    } else {
      this.forward = false;
    }
    if (outputs[1] > 0.5) {
      this.left = true;
    } else {
      this.left = false;
    }
    if (outputs[2] > 0.5) {
      this.right = true;
    } else {
      this.right = false;
    }
    if (outputs[3] > 0.5) {
      this.reverse = true;
    } else {
      this.reverse = false;
    }
  }
  #addKeyboardListeners() {
    // whenever a key is pressed the following function will be invoked
    document.onkeydown = event => {
      switch (event.key) {
        case 'ArrowLeft':
          this.left = true;
          break;
        case 'ArrowRight':
          this.right = true;
          break;
        case 'ArrowUp':
          this.forward = true;
          break;
        case 'ArrowDown':
          this.reverse = true;
          break;
      }
    };
    // whenever a key is released the following function will be inkoved
    document.onkeyup = event => {
      switch (event.key) {
        case 'ArrowLeft':
          this.left = false;
          break;
        case 'ArrowRight':
          this.right = false;
          break;
        case 'ArrowUp':
          this.forward = false;
          break;
        case 'ArrowDown':
          this.reverse = false;
          break;
      }
    };
  }
}
