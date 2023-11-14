
function pluralizeRecords(n) {
  wordForm = "записей"
  if (n % 10 == 1) wordForm = "запись";
  if (n % 10 > 2 && n % 10 < 5) wordForm = "записи";
  if ((n % 100) - (n % 10) == 10) wordForm = "записей"
  return `В результате выполнения запроса было найдено ${n} ${wordForm}`;
}

console.log(pluralizeRecords(1))
console.log(pluralizeRecords(101))
console.log(pluralizeRecords(159))
console.log(pluralizeRecords(1984))
console.log(pluralizeRecords(1911))
