export interface PatientData {
  age: number;
  gender: 'male' | 'female';
  weight: number; // in kg
  height: number; // in cm
  bloodPressure: number;
  cholesterol: number;
  glucose: number;
  familyHistory: {
    diabetes: boolean;
    heartDisease: boolean;
  };
  checkHeartDisease: boolean;
}