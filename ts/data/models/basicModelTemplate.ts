import db from '../dbConfig';


interface ModelTemplateArg<T> {
  tableName: string,
  keyColumnName?: string,
  preprocessData?: (data: T) => any,
  processResult?: (result) => T,
}

export const basicModelTemplate = <T>({
  tableName,
  keyColumnName = 'id',
  preprocessData = (data) => data,
  processResult = (result) => result,
}: ModelTemplateArg<T>) => {
  const get = (getArg: T = {} as T) => (db(tableName)
    .where(getArg)
    .then((data) => (data !== undefined ? data.map(processResult) : undefined))
  );


  interface InsertArg {
    item: T,
  }

  const insert = ({ item }: InsertArg) => (db(tableName)
    .insert(preprocessData(item), keyColumnName)
    .then(([id]) => get({ [keyColumnName]: id } as T))
  );


  interface UpdateArg {
    keyValue: any,
    changes: T,
  }

  const update = ({ keyValue, changes }: UpdateArg) => (db(tableName)
    .where({ [keyColumnName]: keyValue })
    .update(preprocessData(changes))
    .then((count) => (count > 0 ? get({ [keyColumnName]: keyValue } as T) : null))
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
