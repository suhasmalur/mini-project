import { motion } from 'framer-motion';
import { PatientData } from '../types/patient';
import { ParameterInput } from './ParameterInput';

interface PatientFormProps {
  data: PatientData;
  onChange: (data: PatientData) => void;
  onSubmit: () => void;
}

export function PatientForm({ data, onChange, onSubmit }: PatientFormProps) {
  const handleChange = (field: keyof PatientData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 gap-4"
    >
      <ParameterInput
        label="Age"
        value={data.age}
        onChange={(value) => handleChange('age', value)}
        min={0}
        max={120}
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
        <select
          value={data.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <ParameterInput
        label="Weight (kg)"
        value={data.weight}
        onChange={(value) => handleChange('weight', value)}
        min={20}
        max={300}
      />

      <ParameterInput
        label="Height (cm)"
        value={data.height}
        onChange={(value) => handleChange('height', value)}
        min={100}
        max={250}
      />

      <ParameterInput
        label="Blood Pressure (mmHg)"
        value={data.bloodPressure}
        onChange={(value) => handleChange('bloodPressure', value)}
        min={70}
        max={200}
      />

      <ParameterInput
        label="Cholesterol (mg/dL)"
        value={data.cholesterol}
        onChange={(value) => handleChange('cholesterol', value)}
        min={100}
        max={500}
      />

      <ParameterInput
        label="Glucose (mg/dL)"
        value={data.glucose}
        onChange={(value) => handleChange('glucose', value)}
        min={70}
        max={300}
      />

      <div className="col-span-2 space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={data.familyHistory.diabetes}
            onChange={(e) => handleChange('familyHistory', { 
              ...data.familyHistory,
              diabetes: e.target.checked 
            })}
            className="mr-2"
          />
          <label>Family History of Diabetes</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={data.familyHistory.heartDisease}
            onChange={(e) => handleChange('familyHistory', {
              ...data.familyHistory,
              heartDisease: e.target.checked
            })}
            className="mr-2"
          />
          <label>Family History of Heart Disease</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={data.checkHeartDisease}
            onChange={(e) => handleChange('checkHeartDisease', e.target.checked)}
            className="mr-2"
          />
          <label>Check for Heart Disease Risk</label>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="col-span-2 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
      >
        Analyze Health Risks
      </button>
    </motion.div>
  );
}