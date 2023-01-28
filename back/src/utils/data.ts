export const generateRandomFeelingData = () => {
  const heartRate = [];
  const bloodPressure = [];
  const bloodOxygen = [];
  const temperature = [];
  const sleep = [];
  const stress = [];

  for (let i = 0; i < 365; i++) {
    heartRate.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      value: Math.floor(Math.random() * 130) + 50,
    });
    bloodPressure.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      systolic: Math.floor(Math.random() * 40) + 90,
      diastolic: Math.floor(Math.random() * 30) + 60,
    });
    bloodOxygen.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      value: Math.floor(Math.random() * 15) + 85,
    });
    temperature.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      value: Math.floor(Math.random() * 7) + 35,
    });
    sleep.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      value: Math.floor(Math.random() * 8) + 4,
    });
    stress.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      value: Math.floor(Math.random() * 100),
    });
  }
  return {
    heartRate,
    bloodPressure,
    bloodOxygen,
    temperature,
    sleep,
    stress,
    feeling: [],
  };
};
