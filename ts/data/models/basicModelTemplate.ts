import db from '../dbConfig';


interface ModelTemplateArg<T> {
  tableName: string,
  preprocessData?: (data: T) => any,
  processResult?: (result) => T,
}

export const basicModelTemplate = <T>({
  tableName,
  preprocessData = (data) => data,
  processResult = (result) => result,
}: ModelTemplateArg<T>) => {

  const get = (getArg: T | { id: number } = {} as T) => (db(tableName)
    .where(getArg)
    .then((data) => (data !== undefined ? data.map(processResult) : undefined))
  );


  interface InsertArg {
    item: T,
  }

  const insert = ({ item }: InsertArg) => (db(tableName)
    .insert(preprocessData(item), 'id')
    .then(([id]) => get({ id }))
  );


  interface UpdateArg {
    id: number,
    changes: T,
  }

  const update = ({ id, changes }: UpdateArg) => (db(tableName)
    .where('id', id)
    .update(preprocessData(changes))
    .then((count) => (count > 0 ? get({ id }) : null))
  );


  interface RemoveArg {
    id: number,
  }

  const remove = ({ id }: RemoveArg) => (db(tableName)
    .where('id', id)
    .del()
  );

  return {
    get,
    insert,
    update,
    remove,
  };
};

export default {};
