import { camelCaseToSnakeCase } from './camelCaseToSnakeCase';


interface ConvertObjectCamelToSnakeArg {
  obj: {},
}

export const convertObjectCamelToSnake = ({ obj }: ConvertObjectCamelToSnakeArg) => Object
  .keys(obj).reduce((acc, key) => {
    acc[camelCaseToSnakeCase({ string: key })] = obj[key];
    return acc;
  }, {});

export default {};
