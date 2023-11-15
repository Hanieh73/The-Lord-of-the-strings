const db = require('../database/connect');

class Progress {
  constructor(data) {
    this.progress_id = data.progress_id;
    this.game_id = data.game_id;
    this.stats = data.stats;
    this.branch_route = data.branch_route;
    this.score = data.score;
    this.additional_data = data.additional_data;
  }

  static async getAll() {
    const response = await db.query('SELECT * from Progress');
    if (response.rows.length === 0) {
      throw new Error('No progress available.');
    }
    return response.rows.map((g) => new Progress(g));
  }

  static async getOneById(id) {
    const response = await db.query(
      'SELECT * FROM Progress WHERE game_id = $1;',
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to locate progress.');
    }

    return new Progress(response.rows[0]);
  }

  static async create(game_id) {
    const response = await db.query(
      'INSERT INTO Progress (game_id, stats, branch_route, score, additional_data) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [game_id, 'none', 'none', 0, [5, 6, 7]]
    );

    return new Progress(response.rows[0]);
  }

  async update(data) {
    const { stats, branch_route, score, additional_data } = data;
    const response = await db.query(
      'UPDATE Progress SET stats = $1, branch_route = $2, score = $3, additional_data = $4 WHERE game_id = $5 RETURNING *;',
      [stats, branch_route, score, additional_data, this.game_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update progress.');
    }
    return new Progress(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM Progress WHERE game_id = $1 RETURNING *;',
      [this.game_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to delete progress from progress table.');
    }
    return new Progress(response.rows[0]);
  }
}

module.exports = Progress;
