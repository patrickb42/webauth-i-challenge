import { snakeCaseToCamelCase } from './snakeCaseToCamelCase';


interface ConvertObjectSnakeToCamel {
  obj: {},
}

export const convertObjectSnakeToCamel = ({ obj }: ConvertObjectSnakeToCamel) => Object
  .keys(obj).reduce((acc, key) => {
    acc[snakeCaseToCamelCase({ string: key })] = obj[key];
    return acc;
  }, {});

export default {};
