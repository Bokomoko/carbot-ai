class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = new Array(neuronCounts.length).fill(null).map((_, i) => {
      return new Array(neuronCounts[i]).fill(null);
    });
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels[i] = new Level(neuronCounts[i], neuronCounts[i + 1]);
    }
  }
  static feedForward(givenInputs, network) {
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }
    return outputs;
  }
}

class Level {
  constructor(inputCount, outputCount) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount)
      .fill(null)
      .map(() => Math.random() * 2 - 1);
    console.log('biases ', this.biases);
    this.weights = new Array(inputCount).fill(null).map(() => {
      return new Array(outputCount).fill(null).map(() => Math.random() * 2 - 1);
    });
    console.log('weights', this.weights);
  }
  static feedForward(givenInputs, level) {
    console.log(`feeding forward with ${givenInputs}`);
    for (let i = 0; level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    }
    console.log(level.inputs);
    console.log(level.outputs);
    console.log(level.biases);
    console.log(level.weights);
    for (let i = 0; level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }
      level.outputs[i] = +(sum > level.biases[i]);
    }
    return level.outputs;
  }
}
