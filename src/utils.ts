// Randomly shuffles an array using sort and Math.random
export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
