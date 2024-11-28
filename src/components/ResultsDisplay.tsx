import { motion } from 'framer-motion';
import clsx from 'clsx';
import { getRiskLevel } from '../utils/calculations';

interface ResultsDisplayProps {
  bmi: number;
  diabetesRisk: number;
  heartRisk: number | null;
  resources: string[];
}

export function ResultsDisplay({ bmi, diabetesRisk, heartRisk, resources }: ResultsDisplayProps) {
  const getRiskColor = (risk: number) => {
    const level = getRiskLevel(risk);
    return {
      'bg-green-100 text-green-800': level === 'low',
      'bg-yellow-100 text-yellow-800': level === 'moderate',
      'bg-red-100 text-red-800': level === 'high',
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold">Your BMI</h3>
        <p className="text-lg">{bmi}</p>
      </div>

      <div className={clsx('p-4 rounded-lg', getRiskColor(diabetesRisk))}>
        <h3 className="font-semibold">Diabetes Risk</h3>
        <p className="text-lg">{(diabetesRisk * 100).toFixed(1)}%</p>
      </div>

      {heartRisk !== null && (
        <div className={clsx('p-4 rounded-lg', getRiskColor(heartRisk))}>
          <h3 className="font-semibold">Heart Disease Risk</h3>
          <p className="text-lg">{(heartRisk * 100).toFixed(1)}%</p>
        </div>
      )}

      {resources.length > 0 && (
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold mb-2">Recommended Resources</h3>
          <ul className="list-disc list-inside space-y-2">
            {resources.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}