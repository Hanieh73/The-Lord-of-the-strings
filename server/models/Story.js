const db = require('../database/connect');

class Story {
  constructor(data) {
    this.story_id = data.story_id;
    this.chapter_name = data.chapter_name;
    this.act_number = data.act_number;
    this.initial_prompt = data.initial_prompt;
  }

  static async getAll() {
    const response = await db.query('SELECT * from Story');
    if (response.rows.length === 0) {
      throw new Error('No story available.');
    }
    return response.rows.map((g) => new Story(g));
  }

  static async getOneById(id) {
    const response = await db.query(
      'SELECT * FROM Story WHERE story_id = $1;',
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to locate story.');
    }

    return new Story(response.rows[0]);
  }

  static async create(data) {
    const { chapter_name, act_number, initial_prompt } = data;
    const response = await db.query(
      'INSERT INTO Story (chapter_name, act_number, initial_prompt) VALUES ($1, $2, $3) RETURNING *;',
      [chapter_name, act_number, initial_prompt]
    );

    return new Story(response.rows[0]);
  }

  async update(data) {
    const { chapter_name, act_number, initial_prompt } = data;
    const response = await db.query(
      'UPDATE Story SET chapter_name = $1, act_number = $2, initial_prompt = $3 WHERE story_id = $4 RETURNING *;',
      [chapter_name, act_number, initial_prompt, this.story_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update story.');
    }
    return new Story(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM Story WHERE story_id = $1 RETURNING *;',
      [this.story_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to delete story from story table.');
    }
    return new Story(response.rows[0]);
  }
}

module.exports = Story;
