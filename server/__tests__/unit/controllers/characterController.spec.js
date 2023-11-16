const CharacterController = require('../../../controllers/characterController');
const Character = require('../../../models/Character');
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

describe.skip('Character Controller', () => {
  describe('index', () => {
    it('successfully gets Characters and displays the 200 status code', async () => {
      const mockCharacters = [
        new Character({
          character_id: 10,
          story_id: 5,
          character_name: 'Jasmine',
          description: 'Sneaky rogue',
          image_url: 'jasmine.jpg',
        }),
        new Character({
          character_id: 10,
          story_id: 5,
          character_name: 'Jasmine',
          description: 'Sneaky rogue',
          image_url: 'jasmine.jpg',
        }),
        new Character({
          character_id: 10,
          story_id: 5,
          character_name: 'Jasmine',
          description: 'Sneaky rogue',
          image_url: 'jasmine.jpg',
        }),
      ];
      // Mock the Character.getAll method to resolve with mockCharacters
      jest.spyOn(Character, 'getAll').mockResolvedValue(mockCharacters);
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await CharacterController.index(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockCharacters);
    });

    it('fails to gets Characters and displays the 500 status code and error message', async () => {
      jest
        .spyOn(Character, 'getAll')
        .mockRejectedValue(new Error('No characters available.'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await CharacterController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'No characters available.',
      });
    });
  });

  describe('show', () => {
    it('gets id from params and successfully gets Character, displaying the 200 status code', async () => {
      const mockCharacters = new Character({
        character_id: 10,
        story_id: 5,
        character_name: 'Jasmine',
        description: 'Sneaky rogue',
        image_url: 'jasmine.jpg',
      });

      // Mock the Character.getAll method to resolve with mockCharacters
      jest.spyOn(Character, 'getOneById').mockResolvedValue(mockCharacters);
      const req = {
        params: { id: '12' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await CharacterController.show(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockCharacters);
    });

    it('fails to gets Characters and displays the 404 status code', async () => {
      jest
        .spyOn(Character, 'getOneById')
        .mockRejectedValue(new Error('Unable to locate character.'));

      const req = {
        params: { id: '999' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await CharacterController.show(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to locate character.',
      });
    });
  });

  describe('create', () => {
    it('successfully creates Character and displays the 201 status code', async () => {
      const newCharacterData = {
        story_id: 5,
        character_name: 'Jasmine',
        description: 'Sneaky rogue',
        image_url: 'jasmine.jpg',
      };

      const mockCreatedCharacter = new Character({
        character_id: 22, // Adjust the Character_id as needed
        ...newCharacterData,
      });

      jest.spyOn(Character, 'create').mockResolvedValue(mockCreatedCharacter);

      const req = {
        body: newCharacterData,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await CharacterController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockCreatedCharacter);
    });

    it('fails to create Character and displays the 400 status code', async () => {
      jest
        .spyOn(Character, 'create')
        .mockRejectedValue(new Error('Invalid data'));

      // Create a mock request object with invalid data (e.g., missing required fields)
      const req = {
        body: {},
      };

      // Create a mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await CharacterController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });

  //habe not done fail routes of Character model, only Progress model
  describe('update', () => {
    it('successfully updates Character and displays the 200 status code', async () => {
      const updatedCharacterData = {
        story_id: 5,
        character_name: 'Jasmine',
        description: 'Sneaky rogue',
        image_url: 'jasmine.jpg',
      };

      const mockCharacter = new Character({
        character_id: 10,
        story_id: 5,
        character_name: 'steve',
        description: 'Sneaky steve',
        image_url: 'steve.jpg',
      });

      const mockUpdatedCharacter = new Character({
        character_id: 10,
        story_id: 5,
        character_name: 'Jasmine',
        description: 'Sneaky rogue',
        image_url: 'jasmine.jpg',
      });

      jest.spyOn(Character, 'getOneById').mockResolvedValue(mockCharacter);
      jest
        .spyOn(mockCharacter, 'update')
        .mockResolvedValue(mockUpdatedCharacter);

      const req = {
        params: { id: '1' },
        body: updatedCharacterData,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await CharacterController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedCharacter);
    });

    it('ID not found so fails to updates Character and displays the 404 status code', async () => {
      jest
        .spyOn(Character, 'getOneById')
        .mockRejectedValue(new Error('Character not found'));

      const req = {
        params: { id: '999' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await CharacterController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Character not found' });
    });

    it('fails to updates Character and displays the 404 status code', async () => {
      const mockExistingCharacter = new Character({
        character_id: 10,
        story_id: 5,
        character_name: 'Jasmine',
        description: 'Sneaky rogue',
        image_url: 'jasmine.jpg',
      });

      jest
        .spyOn(Character, 'getOneById')
        .mockResolvedValue(mockExistingCharacter);

      jest
        .spyOn(mockExistingCharacter, 'update')
        .mockRejectedValue(new Error('Unable to update Character.'));

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await CharacterController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to update Character.',
      });
    });
  });

  describe('destroy', () => {
    it('successfully deletes Character and displays the 204 status code', async () => {
      const mockCharacter = new Character({
        character_id: 21,
        story_id: 5,
        character_name: 'Jasmine',
        description: 'Sneaky rogue',
        image_url: 'jasmine.jpg',
      });

      jest.spyOn(Character, 'getOneById').mockResolvedValue(mockCharacter);
      jest.spyOn(mockCharacter, 'destroy').mockResolvedValue(mockCharacter);

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      };

      await CharacterController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
    });

    it('fails to delete Character and displays the 404 status code', async () => {
      jest
        .spyOn(Character, 'getOneById')
        .mockRejectedValue(new Error('Character not found'));

      const req = {
        params: { id: '999' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
        json: jest.fn(),
      };

      await CharacterController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Character not found' });
    });
  });
});
