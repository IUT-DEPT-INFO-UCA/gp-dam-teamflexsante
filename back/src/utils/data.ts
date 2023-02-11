import { Health } from '../schemas/user.schema';

export const generateRandomData = () => {
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

export const generateStrangeData = () => {
  const heartRate = [];
  const bloodPressure = [];
  const bloodOxygen = [];
  const temperature = [];
  const sleep = [];
  const stress = [];

  for (let i = 0; i < 245; i++) {
    heartRate.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      value: Math.floor(Math.random() * 230) + 50,
    });
    bloodPressure.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      systolic: Math.floor(Math.random() * 20) + 90,
      diastolic: Math.floor(Math.random() * 30) + 60,
    });
    bloodOxygen.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      value: Math.floor(Math.random() * 0) + 85,
    });
    temperature.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      value: Math.floor(Math.random() * 2) + 35,
    });
    sleep.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      value: Math.floor(Math.random() * 2) + 4,
    });
    stress.push({
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      value: Math.floor(Math.random() * 200),
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

export const controlRandomData = (data: Health) => {
  const heartRate = data.heartRate;
  const bloodPressure = data.bloodPressure;
  const bloodOxygen = data.bloodOxygen;
  const temperature = data.temperature;
  const sleep = data.sleep;
  const stress = data.stress;

  if (
    heartRate.length !== 365 ||
    bloodPressure.length !== 365 ||
    bloodOxygen.length !== 365 ||
    temperature.length !== 365 ||
    sleep.length !== 365 ||
    stress.length !== 365
  ) {
    return false;
  }

  for (let i = 0; i < 365; i++) {
    if (
      heartRate[i].number === null ||
      bloodPressure[i].systolic === null ||
      bloodPressure[i].diastolic === null ||
      bloodOxygen[i].number === null ||
      temperature[i].number === null ||
      sleep[i].number === null ||
      stress[i].number === null
    ) {
      return false;
    }
  }

  for (let i = 0; i < 365; i++) {
    if (heartRate[i].number < 50 || heartRate[i].number > 180) {
      return false;
    }
  }
  for (let i = 0; i < 365; i++) {
    if (bloodPressure[i].systolic < 90 || bloodPressure[i].systolic > 130) {
      return false;
    }
    if (bloodPressure[i].diastolic < 60 || bloodPressure[i].diastolic > 90) {
      return false;
    }
  }
  for (let i = 0; i < 365; i++) {
    if (bloodOxygen[i].number < 85 || bloodOxygen[i].number > 100) {
      return false;
    }
  }
  for (let i = 0; i < 365; i++) {
    if (temperature[i].number < 35 || temperature[i].number > 42) {
      return false;
    }
  }
  for (let i = 0; i < 365; i++) {
    if (sleep[i].number < 4 || sleep[i].number > 12) {
      return false;
    }
  }
  for (let i = 0; i < 365; i++) {
    if (stress[i].number < 0 || stress[i].number > 100) {
      return false;
    }
  }

  return true;
};
