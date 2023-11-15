const Progress = require('../../../models/Progress');
const db = require('../../../database/connect');
const request = require('supertest');
const app = require('../../../app');

//ORDER OF THE TESTS MATTER
describe('Progress', () => {
  describe('update', () => {
    it('Updates the progress', async () => {
      const newProgressData = {
        stats: 'Agility',
        branch_route: '1a,2a,3b',
        score: 21341,
        additional_data: [2, 5, 9, 10],
      };
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            progress_id: 42,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a,3b',
            score: 21341,
            additional_data: [2, 5, 9, 10],
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 42,
            game_id: 42,
            ...newProgressData,
          },
        ],
      });
      //not static so need an instance
      const progress = await Progress.getOneById(42);
      const updatedProgress = await progress.update(newProgressData);
      expect(updatedProgress).toBeInstanceOf(Progress); // Check if it's an instance of the Skill class.
      expect(updatedProgress.score).toBe(21341);
    });

    it('throws an error', async () => {
      const newProgressData = {
        stats: 'Agility',
        branch_route: '1a,2a,3b',
        score: 21341,
        additional_data: [2, 5, 9, 10],
      };

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            progress_id: 42,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a,3b',
            score: 21341,
            additional_data: [2, 5, 9, 10],
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance

      try {
        const getProgressById = await Progress.getOneById(42);
        const updatedProgress = await getProgressById.update(newProgressData);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to update progress.');
      }
    });
  });

  describe('destroy', () => {
    it('Deletes a progress', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            progress_id: 42,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a,3b',
            score: 21341,
            additional_data: [2, 5, 9, 10],
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            progress_id: 42,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a,3b',
            score: 21341,
            additional_data: [2, 5, 9, 10],
          },
        ],
      });
      //not static so need an instance

      const progress = await Progress.getOneById(42);
      const deletedProgress = await progress.destroy();
      expect(deletedProgress).toBeInstanceOf(Progress);
      expect(deletedProgress.stats).toBe('Agility');
    });
    it('Fails to delete progress', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            progress_id: 42,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a,3b',
            score: 21341,
            additional_data: [2, 5, 9, 10],
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance
      try {
        const progress = await Progress.getOneById(42);
        const deletedProgress = await progress.destroy();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe(
          'Unable to delete progress from progress table.'
        );
      }
    });
  });

  describe('getAll', () => {
    it('resolves with Progress on successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            progress_id: 42,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a,3b',
            score: 21341,
            additional_data: [2, 5, 9, 10],
          },
          {
            progress_id: 42,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a,3b',
            score: 21341,
            additional_data: [2, 5, 9, 10],
          },
          {
            progress_id: 42,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a,3b',
            score: 21341,
            additional_data: [2, 5, 9, 10],
          },
        ],
      });

      const progresss = await Progress.getAll();
      expect(progresss).toHaveLength(3);
      expect(progresss[0]).toHaveProperty('progress_id');
    });

    it('should throw an Error on db query error', async () => {
      // jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      try {
        await Progress.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No progress available.');
      }
    });
  });

  describe('getOneById', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            progress_id: 42,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a,3b',
            score: 21341,
            additional_data: [2, 5, 9, 10],
          },
        ],
      });

      const progress = await Progress.getOneById(42);
      expect(progress).toHaveProperty('stats');
      expect(progress).toHaveProperty('branch_route');
      expect(progress).toHaveProperty('game_id');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            progress_id: 42,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a,3b',
            score: 21341,
            additional_data: [2, 5, 9, 10],
          },
          {
            progress_id: 38,
            game_id: 4,
            stats: 'Agility',
            branch_route: '1b,2b,3b',
            score: 334532,
            additional_data: [2, 5, 9, 10],
          },
          {
            progress_id: 22,
            game_id: 42,
            stats: 'Agility',
            branch_route: '1a,2a',
            score: 1212,
            additional_data: [2, 5, 9, 10],
          },
        ],
      });

      try {
        await Progress.getOneById(3);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate progress.');
      }
    });
  });

  describe('create', () => {
    //jest.mock("../../../database/connect");
    it('creates a new progress and returns it', async () => {
      // Create a mock data object
      const newProgressData = {
        stats: 'none',
        branch_route: 'none',
        score: 0,
        additional_data: [],
      };

      // Mock the database query
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            id: 42,
            game_id: 42,
            ...newProgressData,
          },
        ],
      });

      // Call the create function and await the result.
      const createdProgress = await Progress.create({ game_id: 42 });

      // Expectations:
      expect(createdProgress).toBeInstanceOf(Progress);
      expect(createdProgress.game_id).toBe(42);
    });
  });
});
