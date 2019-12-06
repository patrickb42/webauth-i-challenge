interface CamelCaseToSnakeCaseArg {
  string: string;
}

export const camelCaseToSnakeCase = ({ string }: CamelCaseToSnakeCaseArg) => string
  .split('')
  .reduce((acc, char) => {
    if (char === char.toUpperCase()) acc.push('_');
    acc.push(char.toLowerCase());
    return acc;
  }, []).join('');

export default {};
