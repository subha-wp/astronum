export const calculateLifePathNumber = (
  dateOfBirthIsoString: string
): number => {
  const dateOfBirth = new Date(dateOfBirthIsoString);

  const day = dateOfBirth.getDate();
  const month = dateOfBirth.getMonth() + 1; // JavaScript months are 0-indexed
  const year = dateOfBirth.getFullYear();

  // Sum all digits in the date
  const daySum = sumDigits(day);
  const monthSum = sumDigits(month);
  const yearSum = sumDigits(year);

  // Sum the results
  const total = daySum + monthSum + yearSum;

  // Reduce to a single digit, except for master numbers 11, 22, 33
  return reduceToSingleDigit(total);
};

export const calculateDestinyNumber = (name: string): number => {
  const normalizedName = name.toUpperCase().replace(/[^A-Z]/g, "");
  let sum = 0;

  for (const char of normalizedName) {
    sum += getLetterValue(char);
  }

  return reduceToSingleDigit(sum);
};

export const calculateDayNumber = (date: Date): number => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const sum = sumDigits(day) + sumDigits(month) + sumDigits(year);
  return reduceToSingleDigit(sum);
};

export const calculateNumberValue = (number: string): number => {
  // Remove any non-numeric characters
  const cleanNumber = number.replace(/\D/g, "");

  // Sum all digits
  let sum = 0;
  for (const digit of cleanNumber) {
    sum += parseInt(digit);
  }

  // Reduce to single digit
  return reduceToSingleDigit(sum);
};

// Helper functions
const sumDigits = (number: number): number => {
  let sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  return sum;
};

const reduceToSingleDigit = (number: number): number => {
  // Special case for master numbers
  if (number === 11 || number === 22 || number === 33) {
    return number;
  }

  while (number > 9) {
    number = sumDigits(number);
  }

  return number;
};

const getLetterValue = (char: string): number => {
  const values = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };

  return values[char as keyof typeof values] || 0;
};
