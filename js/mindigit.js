function min(a, b) {
  if (a > b) return b;
  return a;
}

function minDigit(x) {
  let minimal = 9;
  while(x > 0) {
    let digit = x % 10;
    if (minimal > digit) minimal = digit;
    x -= digit;
    x /= 10;
  }
  return minimal;
}

console.log(minDigit(34567));
console.log(minDigit(12345));
console.log(minDigit(9));
console.log(minDigit(10));
console.log(minDigit(01));
