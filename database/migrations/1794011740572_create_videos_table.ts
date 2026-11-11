import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'videos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('public_id', 11).notNullable().unique()
      table.integer('user_id').references('users.id').onDelete('CASCADE').notNullable()
      table.string('title', 100).notNullable()
      table.text('description', 'longtext').nullable()
      table.string('video_path').notNullable()
      table.string('thumbnail_path').notNullable()
      table.integer('views').notNullable().defaultTo(0)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}