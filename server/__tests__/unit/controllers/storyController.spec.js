const StoryController = require('../../../controllers/storyController');
const Story = require('../../../models/Story');
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

describe.skip('Story Controller', () => {
  describe('index', () => {
    it('successfully gets Stories and displays the 200 status code', async () => {
      const mockStories = [
        new Story({
          story_id: 1,
          chapter_name: 'Chapter 1',
          act_number: 1,
          initial_prompt: 'Once upon a time...',
        }),
        new Story({
          story_id: 1,
          chapter_name: 'Chapter 1',
          act_number: 1,
          initial_prompt: 'Once upon a time...',
        }),
        new Story({
          story_id: 1,
          chapter_name: 'Chapter 1',
          act_number: 1,
          initial_prompt: 'Once upon a time...',
        }),
      ];
      // Mock the Story.getAll method to resolve with mockStories
      jest.spyOn(Story, 'getAll').mockResolvedValue(mockStories);
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await StoryController.index(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockStories);
    });

    it('fails to gets Stories and displays the 500 status code and error message', async () => {
      jest
        .spyOn(Story, 'getAll')
        .mockRejectedValue(new Error('No stories available.'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await StoryController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'No stories available.' });
    });
  });

  describe('show', () => {
    it('gets id from params and successfully gets Story, displaying the 200 status code', async () => {
      const mockStories = new Story({
        story_id: 12,
        chapter_name: 'Chapter 1',
        act_number: 1,
        initial_prompt: 'Once upon a time...',
      });

      // Mock the Story.getAll method to resolve with mockStories
      jest.spyOn(Story, 'getOneById').mockResolvedValue(mockStories);
      const req = {
        params: { id: '12' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await StoryController.show(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockStories);
    });

    it('fails to gets Stories and displays the 404 status code', async () => {
      jest
        .spyOn(Story, 'getOneById')
        .mockRejectedValue(new Error('Unable to locate story.'));

      const req = {
        params: { id: '999' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await StoryController.show(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to locate story.',
      });
    });
  });

  describe('create', () => {
    it('successfully creates Story and displays the 201 status code', async () => {
      const newStoryData = {
        chapter_name: 'Chapter 6',
        act_number: 3,
        initial_prompt: 'Facing the unknown...',
      };

      const mockCreatedStory = new Story({
        story_id: 22, // Adjust the Story_id as needed
        ...newStoryData,
      });

      jest.spyOn(Story, 'create').mockResolvedValue(mockCreatedStory);

      const req = {
        body: newStoryData,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await StoryController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockCreatedStory);
    });

    it('fails to create Story and displays the 400 status code', async () => {
      jest.spyOn(Story, 'create').mockRejectedValue(new Error('Invalid data'));

      // Create a mock request object with invalid data (e.g., missing required fields)
      const req = {
        body: {},
      };

      // Create a mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await StoryController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });

  //habe not done fail routes of Story model, only Progress model
  describe('update', () => {
    it('successfully updates Story and displays the 200 status code', async () => {
      const updatedStoryData = {
        chapter_name: 'Chapter 6',
        act_number: 3,
        initial_prompt: 'Facing the unknown...',
      };

      const mockStory = new Story({
        story_id: 1,
        chapter_name: 'Chapter 1',
        act_number: 1,
        initial_prompt: 'Once upon a time...',
      });

      const mockUpdatedStory = new Story({
        story_id: 1,
        chapter_name: 'Chapter 6',
        act_number: 3,
        initial_prompt: 'Facing the unknown...',
      });

      jest.spyOn(Story, 'getOneById').mockResolvedValue(mockStory);
      jest.spyOn(mockStory, 'update').mockResolvedValue(mockUpdatedStory);

      const req = {
        params: { id: '1' },
        body: updatedStoryData,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await StoryController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedStory);
    });

    it('ID not found so fails to updates Story and displays the 404 status code', async () => {
      jest
        .spyOn(Story, 'getOneById')
        .mockRejectedValue(new Error('Story not found'));

      const req = {
        params: { id: '999' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await StoryController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Story not found' });
    });

    it('fails to updates Story and displays the 404 status code', async () => {
      const mockExistingStory = new Story({
        story_id: 1,
        chapter_name: 'Chapter 1',
        act_number: 1,
        initial_prompt: 'Once upon a time...',
      });

      jest.spyOn(Story, 'getOneById').mockResolvedValue(mockExistingStory);

      jest
        .spyOn(mockExistingStory, 'update')
        .mockRejectedValue(new Error('Unable to update Story.'));

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await StoryController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to update Story.',
      });
    });
  });

  describe('destroy', () => {
    it('successfully deletes Story and displays the 204 status code', async () => {
      const mockStory = new Story({
        story_id: 1,
        chapter_name: 'Chapter 1',
        act_number: 1,
        initial_prompt: 'Once upon a time...',
      });

      jest.spyOn(Story, 'getOneById').mockResolvedValue(mockStory);
      jest.spyOn(mockStory, 'destroy').mockResolvedValue(mockStory);

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      };

      await StoryController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
    });

    it('fails to delete Story and displays the 404 status code', async () => {
      jest
        .spyOn(Story, 'getOneById')
        .mockRejectedValue(new Error('Story not found'));

      const req = {
        params: { id: '999' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
        json: jest.fn(),
      };

      await StoryController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Story not found' });
    });
  });
});
