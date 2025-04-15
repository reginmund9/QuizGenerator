// Randomly shuffles an array using sort and Math.random //shuffle answers so they’re not always in the same order
export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);
