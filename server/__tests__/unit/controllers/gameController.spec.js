const GameController = require('../../../controllers/gameController');
const Game = require('../../../models/Game');
const Progress = require('../../../models/Progress');
const db = require('../../../database/connect');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();

const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd,
}));
const mockRes = { status: mockStatus };

describe('Game Controller', () => {
  describe('index', () => {
    it('successfully gets Games and displays the 200 status code', async () => {
      const mockGames = [
        new Game({
          game_id: 12,
          user_id: 1,
          state: 'in-progress',
          difficulty: 'easy',
          created_at: '2023-11-14',
          updated_at: '2023-11-14',
        }),
        new Game({
          game_id: 12,
          user_id: 1,
          state: 'in-progress',
          difficulty: 'easy',
          created_at: '2023-11-14',
          updated_at: '2023-11-14',
        }),
        new Game({
          game_id: 12,
          user_id: 1,
          state: 'in-progress',
          difficulty: 'easy',
          created_at: '2023-11-14',
          updated_at: '2023-11-14',
        }),
      ];
      // Mock the Game.getAll method to resolve with mockGames
      jest.spyOn(Game, 'getAll').mockResolvedValue(mockGames);
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await GameController.index(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockGames);
    });

    it('fails to gets Games and displays the 500 status code and error message', async () => {
      jest
        .spyOn(Game, 'getAll')
        .mockRejectedValue(new Error('No games available.'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await GameController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'No games available.' });
    });
  });

  describe('show', () => {
    it('gets id from params and successfully gets Game, displaying the 200 status code', async () => {
      const mockGames = new Game({
        game_id: 12,
        user_id: 1,
        state: 'in-progress',
        difficulty: 'easy',
        created_at: '2023-11-14',
        updated_at: '2023-11-14',
      });

      // Mock the Game.getAll method to resolve with mockGames
      jest.spyOn(Game, 'getOneById').mockResolvedValue(mockGames);
      const req = {
        params: { id: '12' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await GameController.show(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockGames);
    });

    it('fails to gets Games and displays the 404 status code', async () => {
      jest
        .spyOn(Game, 'getOneById')
        .mockRejectedValue(new Error('Unable to locate game.'));

      const req = {
        params: { id: '999' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await GameController.show(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to locate game.',
      });
    });
  });

  describe('showAllForUser', () => {
    it('gets id from params and successfully gets Games, displaying the 200 status code', async () => {
      const mockGames = [
        new Game({
          game_id: 12,
          user_id: 1,
          state: 'in-progress',
          difficulty: 'easy',
          created_at: '2023-11-14',
          updated_at: '2023-11-14',
        }),
        new Game({
          game_id: 12,
          user_id: 1,
          state: 'in-progress',
          difficulty: 'easy',
          created_at: '2023-11-14',
          updated_at: '2023-11-14',
        }),
        new Game({
          game_id: 12,
          user_id: 1,
          state: 'in-progress',
          difficulty: 'easy',
          created_at: '2023-11-14',
          updated_at: '2023-11-14',
        }),
      ];

      // Mock the Game.getAll method to resolve with mockGames
      jest.spyOn(Game, 'getAllByUser').mockResolvedValue(mockGames);
      const req = {
        params: { id: '12' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await GameController.showAllForUser(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockGames);
    });

    it('fails to gets Games and displays the 404 status code', async () => {
      jest
        .spyOn(Game, 'getAllByUser')
        .mockRejectedValue(new Error('Unable to locate games.'));

      const req = {
        params: { id: '999' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await GameController.showAllForUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to locate games.',
      });
    });
  });

  describe('create', () => {
    it('successfully creates Game and displays the 201 status code', async () => {
      const newGameData = {
        user_id: 12,
        state: 'in-progress',
        difficulty: 'easy',
      };

      const mockCreatedGame = new Game({
        game_id: 22, // Adjust the Game_id as needed
        ...newGameData,
      });

      mockCreatedProgress = new Progress({
        progress_id: 12,
        game_id: 12,
        stats: 'none',
        branch_route: '',
        score: 0,
        additional_data: [],
      });

      jest.spyOn(Game, 'create').mockResolvedValue(mockCreatedGame);
      jest.spyOn(Progress, 'create').mockResolvedValue(mockCreatedProgress);

      const req = {
        body: newGameData,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await GameController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        Game: mockCreatedGame,
        Progress: mockCreatedProgress,
      });
    });

    it('fails to create Game and displays the 400 status code', async () => {
      jest.spyOn(Game, 'create').mockRejectedValue(new Error('Invalid data'));

      // Create a mock request object with invalid data (e.g., missing required fields)
      const req = {
        body: {},
      };

      // Create a mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await GameController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });

  //habe not done fail routes of Game model, only Progress model
  describe('update', () => {
    it('successfully updates Game and displays the 200 status code', async () => {
      const updatedGameData = {
        stats: 'Agility',
        branch_route: '1a, 2b, 2c',
        score: 2001,
        additional_data: [],
      };

      const mockGame = new Game({
        Game_id: 21, // Adjust the Game_id as needed
        user_id: 12,
        state: 'in-progress',
        difficulty: 'easy',
        created_at: '2023-01-01',
        updated_at: '2023-01-01',
      });

      const mockUpdatedGame = new Game({
        Game_id: 21, // Adjust the Game_id as needed
        user_id: 12,
        state: 'in-progress',
        difficulty: 'easy',
        created_at: '2023-01-01',
        updated_at: '2023-11-15',
      });

      const mockProgress = new Progress({
        progress_id: 12,
        game_id: 12,
        stats: 'none',
        branch_route: '',
        score: 0,
        additional_data: [],
      });

      mockUpdatedProgress = new Progress({
        progress_id: 12,
        game_id: 12,
        ...updatedGameData,
      });

      jest.spyOn(Game, 'getOneById').mockResolvedValue(mockGame);
      jest.spyOn(mockGame, 'update').mockResolvedValue(mockUpdatedGame);

      jest.spyOn(Progress, 'getOneById').mockResolvedValue(mockProgress);
      jest.spyOn(mockProgress, 'update').mockResolvedValue(mockUpdatedProgress);

      const req = {
        params: { id: '21' },
        body: updatedGameData,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await GameController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Game: mockUpdatedGame,
        Progress: mockUpdatedProgress,
      });
    });

    it('ID not found so fails to updates Game and displays the 404 status code', async () => {
      jest
        .spyOn(Progress, 'getOneById')
        .mockRejectedValue(new Error('Game not found'));

      const req = {
        params: { id: '999' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await GameController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Game not found' });
    });

    it('fails to updates Game and displays the 404 status code', async () => {
      const mockExistingProgress = new Game({
        progress_id: 21,
        game_id: 12,
        stats: 'none',
        branch_route: '',
        score: 0,
        additional_data: [],
      });

      jest
        .spyOn(Progress, 'getOneById')
        .mockResolvedValue(mockExistingProgress);

      jest
        .spyOn(mockExistingProgress, 'update')
        .mockRejectedValue(new Error('Unable to update Game.'));

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await GameController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to update Game.',
      });
    });
  });

  describe('destroy', () => {
    it('successfully deletes Game and displays the 204 status code', async () => {
      const mockGame = new Game({
        Game_id: 21, // Adjust the Game_id as needed
        user_id: 12,
        state: 'in-progress',
        difficulty: 'easy',
        created_at: '2023-01-01',
        updated_at: '2023-01-01',
      });

      const mockProgress = new Progress({
        progress_id: 12,
        game_id: 21,
        stats: 'none',
        branch_route: '',
        score: 0,
        additional_data: [],
      });

      jest.spyOn(Progress, 'getOneById').mockResolvedValue(mockProgress);
      jest.spyOn(Game, 'getOneById').mockResolvedValue(mockGame);
      jest.spyOn(mockProgress, 'destroy').mockResolvedValue(mockProgress);
      jest.spyOn(mockGame, 'destroy').mockResolvedValue(mockGame);

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      };

      await GameController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
    });

    it('fails to delete Game and displays the 404 status code', async () => {
      jest
        .spyOn(Progress, 'getOneById')
        .mockRejectedValue(new Error('Progress not found'));

      const req = {
        params: { id: '999' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
        json: jest.fn(),
      };

      await GameController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Progress not found' });
    });
  });
});
