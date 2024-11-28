export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export const getRiskLevel = (probability: number): 'low' | 'moderate' | 'high' => {
  if (probability < 0.3) return 'low';
  if (probability < 0.6) return 'moderate';
  return 'high';
};

export const getMedicalResources = (
  diabetesRisk: number,
  heartRisk: number | null
): string[] => {
  const resources: string[] = [];
  
  if (diabetesRisk > 0.5) {
    resources.push('https://www.diabetes.org/diabetes/newly-diagnosed');
  }
  
  if (heartRisk && heartRisk > 0.5) {
    resources.push('https://www.heart.org/en/health-topics/heart-attack/warning-signs-of-a-heart-attack');
  }
  
  return resources;
};