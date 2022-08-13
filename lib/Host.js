export const Host = () => {
  const dev = process.env.NODE_ENV !== 'production';
  return dev ? 'http://localhost:3000' : 'https://informaticalab.nl';
}