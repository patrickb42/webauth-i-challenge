export const normalizePort = (value: string | number) => {
  const port = (typeof value === 'string') ? parseInt(value, 10) : NaN;
  if (Number.isNaN(port)) return value;
  if (port >= 0) return port;
  return false;
};

export default {};
