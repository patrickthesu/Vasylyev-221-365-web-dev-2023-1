function pow(x, n) {
  let result = x;
  while (--n > 0){
    result*=x;
  }
  return result;
}

console.log (pow(2, 2))
console.log (pow(2, 4))
console.log (pow(3, 3))


