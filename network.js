class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = [];
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
    this.output = new Array(outputCount);
    this.biases = new Array(outputCount)
      .fill(null)
      .map(() => Math.random() * 2 - 1);
    this.weights = new Array(inputCount)
      .fill(null)
      .map(() =>
        new Array(outputCount).fill(null).map(() => Math.random() * 2 - 1)
      );
  }
  static feedForward(givenInputs, level) {
    for (let i = 0; level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    }
    for (let i = 0; level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; leve.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }
      level.outputs[i] = +(sum > level.biases[i]);
    }
    return level.outputs;
  }
}
