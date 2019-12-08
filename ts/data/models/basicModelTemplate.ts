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
  interface GetArg {
    id?: number;
  }

  const get = (getArg?: T | GetArg) => ((getArg === undefined)
    ? db(tableName)
      .then((data) => (data !== undefined ? data.map(processResult) : undefined))
    : db(tableName)
      .where(getArg)
      .first()
      .then((data) => (data !== undefined ? processResult(data) : undefined))
  );


  interface InsertArg {
    item: T,
  }

  const insert = ({ item }: InsertArg) => (db(tableName)
    .insert(preprocessData(item), 'id')
    .then(async ([id]) => get({ id }))
  );


  interface UpdateArg {
    id: number,
    changes: T,
  }

  const update = ({ id, changes }: UpdateArg) => (db(tableName)
    .where('id', id)
    .update(preprocessData(changes))
    .then(async (count) => (count > 0 ? get({ id }) : null))
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
