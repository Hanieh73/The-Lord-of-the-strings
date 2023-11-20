const Game = require('../../../models/Game');
const db = require('../../../database/connect');
const request = require('supertest');
const app = require('../../../app');

//ORDER OF THE TESTS MATTER
describe.skip('Game', () => {
  describe('update', () => {
    it('Updates the game', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-13',
          },
        ],
      });
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });

      //not static so need an instance
      const game = await Game.getOneById(12);
      const updatedGame = await game.update({ score: 100 });
      expect(updatedGame).toBeInstanceOf(Game); // Check if it's an instance of the Skill class.
      expect(updatedGame.updated_at).toBe('2023-11-14');
    });

    it('throws an error', async () => {
      const newGameData = {};

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance

      try {
        const getGameById = await Game.getOneById(42);
        const updatedGame = await getGameById.update(newGameData);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to update game.');
      }
    });
  });

  describe('destroy', () => {
    it('Deletes a game', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });
      //not static so need an instance

      const game = await Game.getOneById(12);
      const deletedGame = await game.destroy();
      expect(deletedGame).toBeInstanceOf(Game);
      expect(deletedGame.difficulty).toBe('easy');
    });
    it('Fails to delete game', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance
      try {
        const game = await Game.getOneById(42);
        const deletedGame = await game.destroy();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Unable to delete game from game table.');
      }
    });
  });

  describe('getAll', () => {
    it('resolves with Game on successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
          {
            game_id: 13,
            user_id: 7,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
          {
            game_id: 14,
            user_id: 112,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });

      const games = await Game.getAll();
      expect(games).toHaveLength(3);
      expect(games[0]).toHaveProperty('game_id');
    });

    it('should throw an Error on db query error', async () => {
      // jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      try {
        await Game.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No games available.');
      }
    });
  });

  describe('getOneById', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });

      const game = await Game.getOneById(12);
      expect(game).toHaveProperty('state');
      expect(game).toHaveProperty('difficulty');
      expect(game).toHaveProperty('created_at');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
          {
            game_id: 13,
            user_id: 7,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
          {
            game_id: 14,
            user_id: 112,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });

      try {
        await Game.getOneById(3);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate game.');
      }
    });
  });

  describe('getAllByUser', () => {
    it('resolves with 1 or more record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });

      const game = await Game.getAllByUser(12);
      expect(game[0]).toHaveProperty('state');
      expect(game[0]).toHaveProperty('difficulty');
      expect(game[0]).toHaveProperty('created_at');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });

      try {
        await Game.getAllByUser(3);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No games available.');
      }
    });
  });

  describe('getAllByScore', () => {
    it('resolves with 1 or more record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 12,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
          {
            game_id: 16,
            user_id: 1,
            state: 'in-progress',
            difficulty: 'easy',
            score: 10,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });

      const game = await Game.getAllByScore();
      expect(game[0]).toHaveProperty('state');
      expect(game[0]).toHaveProperty('difficulty');
      expect(game[0]).toHaveProperty('created_at');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });

      try {
        await Game.getAllByUser(3);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No games available.');
      }
    });
  });

  describe('create', () => {
    //jest.mock("../../../database/connect");
    it('creates a new game and returns it', async () => {
      // Create a mock data object
      const newGameData = {
        user_id: 112,
        state: 'in-progress',
        difficulty: 'easy',
        score: 100,
      };

      // Mock the database query
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            game_id: 14,
            user_id: 112,
            state: 'in-progress',
            difficulty: 'easy',
            score: 100,
            created_at: '2023-11-14',
            updated_at: '2023-11-14',
          },
        ],
      });

      // Call the create function and await the result.
      const createdGame = await Game.create(newGameData);

      // Expectations:
      expect(createdGame).toBeInstanceOf(Game);
      expect(createdGame.game_id).toBe(14);
    });
  });
});
