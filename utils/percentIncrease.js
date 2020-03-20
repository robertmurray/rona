const percentIncrease = (new_cases, total_cases) => {
  return Math.floor((parseInt(new_cases) / parseInt(total_cases)) * 100);
};


export default percentIncrease; 