function fibb(n) {
  let previousNumber = 1;
  let prePreviousNumber = 1;
  for (let i = 2; i < n; i++){
    let summ = prePreviousNumber + previousNumber;
    prePreviousNumber = previousNumber;
    previousNumber = summ;
  }
  return previousNumber;
}

console.log(fibb(28));
