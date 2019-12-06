import db from '../dbConfig';


interface ModelTemplateArg {
  tableName: string,
  preprocessData?: (data) => any,
  processResult?: (result) => any,
}

export const basicModelTemplate = <T>({
  tableName,
  preprocessData = async (data) => data,
  processResult = async (result) => result,
}: ModelTemplateArg) => {
  interface GetArg {
    id?: number;
  }

  const get = ({ id }: GetArg = {}) => ((id === undefined)
    ? db(tableName)
      .then((data) => (data !== undefined ? data.map(processResult) : undefined))
    : db(tableName)
      .where('id', id)
      .first()
      .then((data) => (data !== undefined ? processResult(data) : undefined))
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
