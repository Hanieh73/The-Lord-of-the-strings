const db = require('../database/connect');

class Character {
  constructor(data) {
    this.character_id = data.character_id;
    this.story_id = data.story_id;
    this.character_name = data.character_name;
    this.description = data.description;
    this.image_url = data.image_url;
  }

  static async getAll() {
    const response = await db.query('SELECT * from Character');
    if (response.rows.length === 0) {
      throw new Error('No character available.');
    }
    return response.rows.map((g) => new Character(g));
  }

  static async getOneById(id) {
    const response = await db.query(
      'SELECT * FROM Character WHERE character_id = $1;',
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to locate character.');
    }

    return new Character(response.rows[0]);
  }

  static async create(data) {
    const { story_id, character_name, description, image_url } = data;
    const response = await db.query(
      'INSERT INTO Character (story_id, character_name, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *;',
      [story_id, character_name, description, image_url]
    );

    return new Character(response.rows[0]);
  }

  async update(data) {
    const { story_id, character_name, description, image_url } = data;
    const response = await db.query(
      'UPDATE Character SET story_id = $1, character_name = $2, description = $3, image_url = $4 WHERE character_id = $5 RETURNING *;',
      [story_id, character_name, description, image_url, this.character_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update character.');
    }
    return new Character(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM Character WHERE character_id = $1 RETURNING *;',
      [this.character_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to delete character from character table.');
    }
    return new Character(response.rows[0]);
  }
}

module.exports = Character;
