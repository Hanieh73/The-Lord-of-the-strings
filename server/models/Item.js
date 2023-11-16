const db = require('../database/connect');

class Item {
  constructor(data) {
    this.item_id = data.item_id;
    this.story_id = data.story_id;
    this.item_name = data.item_name;
    this.description = data.description;
    this.image_url = data.image_url;
  }

  static async getAll() {
    const response = await db.query('SELECT * from Item');
    if (response.rows.length === 0) {
      throw new Error('No item available.');
    }
    return response.rows.map((g) => new Item(g));
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM Item WHERE item_id = $1;', [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate item.');
    }

    return new Item(response.rows[0]);
  }

  static async create(data) {
    const { story_id, item_name, description, image_url } = data;
    const response = await db.query(
      'INSERT INTO Item (story_id, item_name, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *;',
      [story_id, item_name, description, image_url]
    );

    return new Item(response.rows[0]);
  }

  async update(data) {
    const { story_id, item_name, description, image_url } = data;
    const response = await db.query(
      'UPDATE Item SET story_id = $1, item_name = $2, description = $3, image_url = $4 WHERE item_id = $5 RETURNING *;',
      [story_id, item_name, description, image_url, this.item_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update item.');
    }
    return new Item(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM Item WHERE item_id = $1 RETURNING *;',
      [this.item_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to delete item from item table.');
    }
    return new Item(response.rows[0]);
  }
}

module.exports = Item;
