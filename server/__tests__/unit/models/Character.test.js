const Character = require('../../../models/Character');
const db = require('../../../database/connect');
const request = require('supertest');
const app = require('../../../app');

//ORDER OF THE TESTS MATTER
describe.skip('Character', () => {
  describe('update', () => {
    it('Updates the character', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            character_id: 4,
            story_id: 2,
            character_name: 'Eva',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
        ],
      });
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
        ],
      });

      //not static so need an instance
      const character = await Character.getOneById(4);
      const updatedCharacter = await character.update({
        story_id: 2,
        character_name: 'WALLE',
        description: 'Fearless warrior',
        image_url: 'eva.jpg',
      });
      expect(updatedCharacter).toBeInstanceOf(Character); // Check if it's an instance of the Skill class.
      expect(updatedCharacter.character_name).toBe('WALLE');
    });

    it('throws an error', async () => {
      const newCharacterData = {
        story_id: 2,
        character_name: 'WALLE',
        description: 'Fearless warrior',
        image_url: 'eva.jpg',
      };

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance

      try {
        const getCharacterById = await Character.getOneById(42);
        const updatedCharacter = await getCharacterById.update(
          newCharacterData
        );
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to update character.');
      }
    });
  });

  describe('destroy', () => {
    it('Deletes a character', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
        ],
      });
      //not static so need an instance

      const character = await Character.getOneById(1);
      const deletedCharacter = await character.destroy();
      expect(deletedCharacter).toBeInstanceOf(Character);
      expect(deletedCharacter.description).toBe('Fearless warrior');
    });
    it('Fails to delete character', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance
      try {
        const character = await Character.getOneById(1);
        const deletedCharacter = await character.destroy();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe(
          'Unable to delete character from character table.'
        );
      }
    });
  });

  describe('getAll', () => {
    it('resolves with Character on successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
        ],
      });

      const characters = await Character.getAll();
      expect(characters).toHaveLength(3);
      expect(characters[0]).toHaveProperty('character_id');
      expect(characters[1]).toHaveProperty('character_id');
      expect(characters[2]).toHaveProperty('character_id');
    });

    it('should throw an Error on db query error', async () => {
      // jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      try {
        await Character.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No character available.');
      }
    });
  });

  describe('getOneById', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
        ],
      });

      const character = await Character.getOneById(1);
      expect(character).toHaveProperty('story_id');
      expect(character).toHaveProperty('character_name');
      expect(character).toHaveProperty('description');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
        ],
      });

      try {
        await Character.getOneById(1);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate character.');
      }
    });
  });

  describe('create', () => {
    //jest.mock("../../../database/connect");
    it('creates a new character and returns it', async () => {
      // Create a mock data object
      const newCharacterData = {
        chapter_name: 'Chapter 6',
        act_number: 3,
        initial_prompt: 'Facing the unknown...',
      };

      // Mock the database query
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            character_id: 4,
            story_id: 2,
            character_name: 'WALLE',
            description: 'Fearless warrior',
            image_url: 'eva.jpg',
          },
        ],
      });

      // Call the create function and await the result.
      const createdCharacter = await Character.create(newCharacterData);

      // Expectations:
      expect(createdCharacter).toBeInstanceOf(Character);
      expect(createdCharacter.character_id).toBe(4);
    });
  });
});
