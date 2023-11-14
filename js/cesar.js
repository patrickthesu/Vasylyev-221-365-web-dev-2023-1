const ALPHABET = ["а","б","в","г","д","е","ё","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ы","ь","э","ю","я"];

function getShiftedAlphabet (array, shift) {
  array = [...array];
  while (--shift >= 0) array.push(array.shift());
  return array;
}

function cesarEncode (str, shift) {
  let newString = "";
  let decodedAlphabet = getShiftedAlphabet(ALPHABET, shift);
  for (let i in str) {
    if (str[i] == " "){
      newString += " "; continue;
    }
    newString += decodedAlphabet[ALPHABET.indexOf(str[i])];
  }
  return newString;
}

function cesarDecode (str, shift) {
  let newString = "";
  let decodedAlphabet = getShiftedAlphabet(ALPHABET, shift);
  for (let i in str) {
    if (str[i] == " "){
      newString += " ";
      continue;
    }
    newString += ALPHABET[decodedAlphabet.indexOf(str[i])];
  }
  return newString;
}

function cesar(str, shift, action) {
  if (action == "encode") return cesarEncode (str, shift);
  if (action == "decode") return cesarDecode (str, shift);
  return "Invalid action;"  
}

for (let i = 0; i < 33; i++){
  if (cesar ("эзтыхз фзъзъз", i, "decode") == "хакуна матата") console.log(i);
  if (cesar ("хакуна матата", i, "encode") == "эзтыхз фзъзъз") console.log(i);
}

// Ответ
// хакуна матата
