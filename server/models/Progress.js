const db = require('../database/connect');

class Progress {
  constructor(data) {
    this.progress_id = data.progress_id;
    this.game_id = data.game_id;
    this.story_id = data.story_id;
    this.saved_chat = data.saved_chat;
    this.score = data.score;
    this.items = data.items;
  }

  static async getAll() {
    const response = await db.query('SELECT * from Progress');
    if (response.rows.length === 0) {
      throw new Error('No progress available.');
    }
    return response.rows.map((g) => new Progress(g));
  }
  static async getOneByProgressId(id) {
    const response = await db.query(
      'SELECT * FROM Progress WHERE progress_id = $1;',
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to locate progress.');
    }

    return new Progress(response.rows[0]);
  }

  static async getLatestOneByGameId(id) {
    const response = await db.query(
      'SELECT * FROM Progress WHERE game_id = $1 ORDER BY progress_id DESC Limit 1;',
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to locate progress.');
    }

    return new Progress(response.rows[0]);
  }

  static async getAllByGameId(id) {
    const response = await db.query(
      'SELECT * FROM Progress WHERE game_id = $1;',
      [id]
    );
    if (response.rows.length === 0) {
      throw new Error('No progress available.');
    }
    return response.rows.map((g) => new Progress(g));
  }

  static async create(game_id, data) {
    const response = await db.query(
      'INSERT INTO Progress (game_id, story_id, saved_chat, score, items) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [
        game_id,
        data.story_id,
        '',
        0,
        ['NOTHING HERE, MAKE SURE TO CHANGE BEFORE DEPLOY'],
      ]
    );

    return new Progress(response.rows[0]);
  }

  async update(data) {
    const { saved_chat, score, items } = data;
    const response = await db.query(
      'UPDATE Progress SET saved_chat = $1, score = $2, items = $3 WHERE game_id = $4 AND story_id = $5 RETURNING *;',
      [saved_chat, score, items, this.game_id, this.story_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update progress.');
    }
    return new Progress(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM Progress WHERE game_id = $1 AND story_id = $2 RETURNING *;',
      [this.game_id, this.story_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to delete progress from progress table.');
    }
    return new Progress(response.rows[0]);
  }
}

module.exports = Progress;
