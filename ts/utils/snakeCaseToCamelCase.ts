interface SnakeCaseToCamelCaseArg {
  string: string;
}

export const snakeCaseToCamelCase = ({ string }: SnakeCaseToCamelCaseArg) => {
  let lastCharWasUnderscore = false;

  return string.split('').reduce((acc, char) => {
    if (char === '_') {
      lastCharWasUnderscore = true;
      return acc;
    }
    acc.push((lastCharWasUnderscore)
      ? char.toUpperCase()
      : char);
    lastCharWasUnderscore = false;
    return acc;
  }, []).join('');
};

export default {};
