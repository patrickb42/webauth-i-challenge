import * as Knex from 'knex';

const makeUserCredentialsTable = async (knex: Knex) => (knex
  .schema.createTable('user_credentials', (tbl) => {
    tbl.increments('user_id');
    tbl.string('username', 128)
      .unique()
      .notNullable();
    tbl.string('hashed_password')
      .notNullable();
  })
);

export async function up(knex: Knex): Promise<any> {
  await makeUserCredentialsTable(knex);
}

export async function down(knex: Knex): Promise<any> {
  return (knex.schema
    .dropTableIfExists('user_credentials')
  );
}
