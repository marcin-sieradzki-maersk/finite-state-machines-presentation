export const getRandomNumber = () => {
  return Math.floor(Math.random() * (1 - 100) + 100);
};

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
