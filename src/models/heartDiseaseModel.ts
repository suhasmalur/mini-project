import * as tf from '@tensorflow/tfjs';

export interface HeartParameters {
  age: number;
  bloodPressure: number;
  cholesterol: number;
  maxHeartRate: number;
}

export async function predictHeartDisease(params: HeartParameters): Promise<number> {
  const model = await tf.sequential({
    layers: [
      tf.layers.dense({ units: 16, activation: 'relu', inputShape: [4] }),
      tf.layers.dense({ units: 8, activation: 'relu' }),
      tf.layers.dense({ units: 1, activation: 'sigmoid' })
    ]
  });

  const input = tf.tensor2d([[
    params.age,
    params.bloodPressure,
    params.cholesterol,
    params.maxHeartRate
  ]]);

  const prediction = model.predict(input) as tf.Tensor;
  const result = await prediction.data();
  return result[0];
}