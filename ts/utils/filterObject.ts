interface FilterObjectProps {
  sourceObject: {
    [key: string]: any,
  },
  filter: Object,
}

interface Accumulator {
  [key: string]: any,
}

export const filterObject = ({ sourceObject, filter }: FilterObjectProps) => Object
  .keys(filter)
  .reduce((acc: Accumulator, key: string) => {
    acc[key] = sourceObject[key];
    return acc;
  }, {});

export default {};
