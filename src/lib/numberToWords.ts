// Simple number to words for Indian Rupees (crore/lakh/thousand)
// Only for positive integers up to 999,99,99,999

const units = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function numToWords(num: number): string {
  if (num === 0) return "Zero";
  if (num < 0) return "Minus " + numToWords(Math.abs(num));

  let words = "";

  function getWords(n: number, suffix: string) {
    if (n > 19) {
      words += tens[Math.floor(n / 10)] + (n % 10 ? " " + units[n % 10] : "");
    } else if (n > 0) {
      words += units[n];
    }
    if (n) words += suffix;
  }

  getWords(Math.floor(num / 10000000), " Crore ");
  num = num % 10000000;
  getWords(Math.floor(num / 100000), " Lakh ");
  num = num % 100000;
  getWords(Math.floor(num / 1000), " Thousand ");
  num = num % 1000;
  getWords(Math.floor(num / 100), " Hundred ");
  num = num % 100;
  if (words !== "" && num > 0) words += "and ";
  getWords(num, "");

  return words.trim();
}

export function rupeesToWords(amount: number): string {
  return numToWords(amount) + " Rupees";
}
