function sostavChisla(massivChisel, chislo) {
  const result = [];

  const checkCombo = (start, current, sum) => {
    if (sum > chislo) {
      return;
    }
    if (sum === chislo) {
      result.push(current);
      return;
    }
    for (let i = start; i < massivChisel.length; i++) {
      const newSum = sum + massivChisel[i];
      if (current.includes(massivChisel[i])) continue;
      searchCombinations(i + 1, [...current, massivChisel[i]], newSum);
    }
  };
}
