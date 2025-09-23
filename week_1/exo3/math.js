export const somme = (...nombres) => {
  return nombres.reduce((acc, n) => acc + n, 0);
}