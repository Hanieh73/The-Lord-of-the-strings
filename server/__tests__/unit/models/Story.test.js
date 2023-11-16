const Story = require('../../../models/Story');
const db = require('../../../database/connect');
const request = require('supertest');
const app = require('../../../app');

//ORDER OF THE TESTS MATTER
describe.skip('Story', () => {
  describe('update', () => {
    it('Updates the story', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
        ],
      });
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            story_id: 1,
            chapter_name: 'Chapter 7',
            act_number: 3,
            initial_prompt: 'Edited',
          },
        ],
      });

      //not static so need an instance
      const story = await Story.getOneById(1);
      const updatedStory = await story.update({
        chapter_name: 'Chapter 7',
        act_number: 3,
        initial_prompt: 'Edited',
      });
      expect(updatedStory).toBeInstanceOf(Story); // Check if it's an instance of the Skill class.
      expect(updatedStory.initial_prompt).toBe('Edited');
    });

    it('throws an error', async () => {
      const newStoryData = {
        chapter_name: 'Chapter 7',
        act_number: 3,
        initial_prompt: 'Edited',
      };

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Original',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance

      try {
        const getStoryById = await Story.getOneById(42);
        const updatedStory = await getStoryById.update(newStoryData);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to update story.');
      }
    });
  });

  describe('destroy', () => {
    it('Deletes a story', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
        ],
      });
      //not static so need an instance

      const story = await Story.getOneById(1);
      const deletedStory = await story.destroy();
      expect(deletedStory).toBeInstanceOf(Story);
      expect(deletedStory.initial_prompt).toBe('Facing the unknown...');
    });
    it('Fails to delete story', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance
      try {
        const story = await Story.getOneById(1);
        const deletedStory = await story.destroy();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Unable to delete story from story table.');
      }
    });
  });

  describe('getAll', () => {
    it('resolves with Story on successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
        ],
      });

      const storys = await Story.getAll();
      expect(storys).toHaveLength(3);
      expect(storys[0]).toHaveProperty('story_id');
      expect(storys[1]).toHaveProperty('story_id');
      expect(storys[2]).toHaveProperty('story_id');
    });

    it('should throw an Error on db query error', async () => {
      // jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      try {
        await Story.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No story available.');
      }
    });
  });

  describe('getOneById', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
        ],
      });

      const story = await Story.getOneById(1);
      expect(story).toHaveProperty('chapter_name');
      expect(story).toHaveProperty('act_number');
      expect(story).toHaveProperty('initial_prompt');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
          {
            story_id: 1,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
        ],
      });

      try {
        await Story.getOneById(1);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate story.');
      }
    });
  });

  describe('create', () => {
    //jest.mock("../../../database/connect");
    it('creates a new story and returns it', async () => {
      // Create a mock data object
      const newStoryData = {
        chapter_name: 'Chapter 6',
        act_number: 3,
        initial_prompt: 'Facing the unknown...',
      };

      // Mock the database query
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            story_id: 14,
            chapter_name: 'Chapter 6',
            act_number: 3,
            initial_prompt: 'Facing the unknown...',
          },
        ],
      });

      // Call the create function and await the result.
      const createdStory = await Story.create(newStoryData);

      // Expectations:
      expect(createdStory).toBeInstanceOf(Story);
      expect(createdStory.story_id).toBe(14);
    });
  });
});
