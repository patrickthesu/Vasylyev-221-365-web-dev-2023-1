function min(a, b) {
  if (a > b) return b;
  return a;
}

function gcd(a, b) {
  let x = 1;
  for (let i = 1; i <= min(a, b); i++){
    if (a % i == 0 && b % i == 0) x = i;
  }
  return x;
}

console.log(gcd (40, 100));
console.log(gcd (12, 144));