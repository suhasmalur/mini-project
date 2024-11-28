import * as tf from '@tensorflow/tfjs';

export interface DiabetesParameters {
  glucose: number;
  bloodPressure: number;
  bmi: number;
  age: number;
}

export async function predictDiabetes(params: DiabetesParameters): Promise<number> {
  const model = await tf.sequential({
    layers: [
      tf.layers.dense({ units: 16, activation: 'relu', inputShape: [4] }),
      tf.layers.dense({ units: 8, activation: 'relu' }),
      tf.layers.dense({ units: 1, activation: 'sigmoid' })
    ]
  });

  const input = tf.tensor2d([[
    params.glucose,
    params.bloodPressure,
    params.bmi,
    params.age
  ]]);

  const prediction = model.predict(input) as tf.Tensor;
  const result = await prediction.data();
  return result[0];
}