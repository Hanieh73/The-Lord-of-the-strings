const db = require('../database/connect');

class Game {
  constructor(data) {
    this.game_id = data.game_id;
    this.user_id = data.user_id;
    this.state = data.state;
    this.difficulty = data.difficulty;
    this.score = data.score;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async getAll() {
    const response = await db.query('SELECT * from Game');
    if (response.rows.length === 0) {
      throw new Error('No games available.');
    }
    return response.rows.map((g) => new Game(g));
  }

  static async getAllByUser(user_id) {
    const response = await db.query('SELECT * from Game WHERE user_id = $1 ;', [
      user_id,
    ]);
    if (response.rows.length === 0) {
      throw new Error('No games available.');
    }
    return response.rows.map((g) => new Game(g));
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM Game WHERE game_id = $1;', [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate game.');
    }

    return new Game(response.rows[0]);
  }

  static async getAllByScore() {
    const response = await db.query(
      'SELECT * from Game ORDER BY score DESC Limit 100'
    );
    if (response.rows.length === 0) {
      throw new Error('No games available.');
    }
    return response.rows.map((g) => new Game(g));
  }

  static async create(data) {
    const date = new Date().toDateString();
    const { user_id, state, difficulty } = data;
    const response = await db.query(
      'INSERT INTO Game (user_id, state, difficulty, score, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [user_id, state, difficulty, 0, date, date]
    );

    return new Game(response.rows[0]);
  }

  async update(data) {
    const { score } = data;
    const date = new Date().toDateString();
    const response = await db.query(
      'UPDATE Game SET updated_at = $1 WHERE game_id = $2 RETURNING *;',
      [date, this.game_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to update game.');
    }
    return new Game(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM Game WHERE game_id = $1 RETURNING *;',
      [this.game_id]
    );
    if (response.rows.length != 1) {
      throw new Error('Unable to delete game from game table.');
    }
    return new Game(response.rows[0]);
  }
}

module.exports = Game;
