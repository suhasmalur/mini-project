import { useState } from 'react';
import { motion } from 'framer-motion';
import { PatientForm } from './components/PatientForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { PatientData } from './types/patient';
import { calculateBMI, getMedicalResources } from './utils/calculations';
import { predictDiabetes } from './models/diabetesModel';
import { predictHeartDisease } from './models/heartDiseaseModel';

export function App() {
  const [patientData, setPatientData] = useState<PatientData>({
    age: 45,
    gender: 'male',
    weight: 70,
    height: 170,
    bloodPressure: 120,
    cholesterol: 200,
    glucose: 100,
    familyHistory: {
      diabetes: false,
      heartDisease: false
    },
    checkHeartDisease: false
  });

  const [results, setResults] = useState<{
    bmi: number;
    diabetesRisk: number;
    heartRisk: number | null;
    resources: string[];
  } | null>(null);

  const handleAnalyze = async () => {
    const bmi = calculateBMI(patientData.weight, patientData.height);
    
    const diabetesRisk = await predictDiabetes({
      glucose: patientData.glucose,
      bloodPressure: patientData.bloodPressure,
      bmi,
      age: patientData.age
    });

    let heartRisk = null;
    if (patientData.checkHeartDisease) {
      heartRisk = await predictHeartDisease({
        age: patientData.age,
        bloodPressure: patientData.bloodPressure,
        cholesterol: patientData.cholesterol,
        maxHeartRate: 220 - patientData.age // Estimated max heart rate
      });
    }

    const resources = getMedicalResources(diabetesRisk, heartRisk);

    setResults({
      bmi,
      diabetesRisk,
      heartRisk,
      resources
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Medical Diagnosis Assistant
        </motion.h1>

        <div className="space-y-8">
          <PatientForm
            data={patientData}
            onChange={setPatientData}
            onSubmit={handleAnalyze}
          />

          {results && <ResultsDisplay {...results} />}
        </div>
      </div>
    </div>
  );
}