// WHO Median Height (cm) and Weight (kg) for Boys and Girls (0–6 years)
const growthData = {
  male: [
    { age: 0, weight: 3.3, height: 49.9 },
    { age: 1, weight: 4.5, height: 54.7 },
    { age: 2, weight: 5.6, height: 58.4 },
    { age: 3, weight: 6.4, height: 61.4 },
    { age: 4, weight: 7.0, height: 63.9 },
    { age: 5, weight: 7.5, height: 65.9 },
    { age: 6, weight: 7.9, height: 67.6 },
    { age: 9, weight: 8.9, height: 71.0 },
    { age: 12, weight: 9.6, height: 74.0 },
    { age: 18, weight: 10.9, height: 79.2 },
    { age: 24, weight: 12.2, height: 84.1 },
    { age: 36, weight: 14.3, height: 94.9 },
    { age: 48, weight: 16.3, height: 103.3 },
    { age: 60, weight: 18.3, height: 110.0 },
    { age: 72, weight: 20.5, height: 116.0 }
  ],
  female: [
    { age: 0, weight: 3.2, height: 49.1 },
    { age: 1, weight: 4.2, height: 53.7 },
    { age: 2, weight: 5.1, height: 57.1 },
    { age: 3, weight: 5.8, height: 59.8 },
    { age: 4, weight: 6.4, height: 62.1 },
    { age: 5, weight: 6.9, height: 64.0 },
    { age: 6, weight: 7.3, height: 65.7 },
    { age: 9, weight: 8.3, height: 69.0 },
    { age: 12, weight: 9.2, height: 72.0 },
    { age: 18, weight: 10.5, height: 77.8 },
    { age: 24, weight: 11.5, height: 83.1 },
    { age: 36, weight: 13.9, height: 94.0 },
    { age: 48, weight: 16.0, height: 102.7 },
    { age: 60, weight: 18.1, height: 109.4 },
    { age: 72, weight: 20.3, height: 115.1 }
  ]
};

function interpolate(data, ageMonths) {
  for (let i = 0; i < data.length - 1; i++) {
    if (ageMonths >= data[i].age && ageMonths <= data[i + 1].age) {
      const ratio = (ageMonths - data[i].age) / (data[i + 1].age - data[i].age);
      const weight = data[i].weight + ratio * (data[i + 1].weight - data[i].weight);
      const height = data[i].height + ratio * (data[i + 1].height - data[i].height);
      return { weight, height };
    }
  }
  return data[data.length - 1];
}

function checkGrowth() {
  const years = parseInt(document.getElementById('years').value) || 0;
  const months = parseInt(document.getElementById('months').value) || 0;
  const gender = document.getElementById('gender').value;
  const totalMonths = years * 12 + months;

  if (totalMonths < 0 || totalMonths > 72) {
    document.getElementById('result').innerHTML = "❗ Age should be between 0 and 6 years.";
    return;
  }

  const data = growthData[gender];
  const { weight, height } = interpolate(data, totalMonths);

  document.getElementById('result').innerHTML = `
    👶 Normal for ${years} years ${months} months ${gender === 'male' ? 'boy' : 'girl'}:<br>
    <b>Weight:</b> ${weight.toFixed(1)} kg<br>
    <b>Height:</b> ${height.toFixed(1)} cm
  `;
}
