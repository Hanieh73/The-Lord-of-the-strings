const Item = require('../../../models/Item');
const db = require('../../../database/connect');
const request = require('supertest');
const app = require('../../../app');

//ORDER OF THE TESTS MATTER
describe.skip('Item', () => {
  describe('update', () => {
    it('Updates the item', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
        ],
      });
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
        ],
      });

      //not static so need an instance
      const item = await Item.getOneById(4);
      const updatedItem = await item.update({
        story_id: 2,
        item_name: 'Nuclear bomb',
        description: 'Very strong item',
        image_url: 'bomb.jpg',
      });
      expect(updatedItem).toBeInstanceOf(Item); // Check if it's an instance of the Skill class.
      expect(updatedItem.item_name).toBe('Nuclear bomb');
    });

    it('throws an error', async () => {
      const newItemData = {
        story_id: 2,
        item_name: 'Nuclear bomb',
        description: 'Very strong item',
        image_url: 'bomb.jpg',
      };

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance

      try {
        const getItemById = await Item.getOneById(42);
        const updatedItem = await getItemById.update(newItemData);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to update item.');
      }
    });
  });

  describe('destroy', () => {
    it('Deletes a item', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
        ],
      });
      //not static so need an instance

      const item = await Item.getOneById(1);
      const deletedItem = await item.destroy();
      expect(deletedItem).toBeInstanceOf(Item);
      expect(deletedItem.description).toBe('Very strong item');
    });
    it('Fails to delete item', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
        ],
      });

      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [],
      });
      //not static so need an instance
      try {
        const item = await Item.getOneById(1);
        const deletedItem = await item.destroy();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Unable to delete item from item table.');
      }
    });
  });

  describe('getAll', () => {
    it('resolves with Item on successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
        ],
      });

      const items = await Item.getAll();
      expect(items).toHaveLength(3);
      expect(items[0]).toHaveProperty('item_id');
      expect(items[1]).toHaveProperty('item_id');
      expect(items[2]).toHaveProperty('item_id');
    });

    it('should throw an Error on db query error', async () => {
      // jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

      try {
        await Item.getAll();
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('No item available.');
      }
    });
  });

  describe('getOneById', () => {
    it('resolves with 1 record when successful', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
        ],
      });

      const item = await Item.getOneById(1);
      expect(item).toHaveProperty('story_id');
      expect(item).toHaveProperty('item_name');
      expect(item).toHaveProperty('description');
    });

    it('should throw an error (length of respose != 1)', async () => {
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
        ],
      });

      try {
        await Item.getOneById(1);
      } catch (err) {
        expect(err).toBeDefined();
        expect(err.message).toBe('Unable to locate item.');
      }
    });
  });

  describe('create', () => {
    //jest.mock("../../../database/connect");
    it('creates a new item and returns it', async () => {
      // Create a mock data object
      const newItemData = {
        chapter_name: 'Chapter 6',
        act_number: 3,
        initial_prompt: 'Facing the unknown...',
      };

      // Mock the database query
      jest.spyOn(db, 'query').mockResolvedValueOnce({
        rows: [
          {
            item_id: 4,
            story_id: 2,
            item_name: 'Nuclear bomb',
            description: 'Very strong item',
            image_url: 'bomb.jpg',
          },
        ],
      });

      // Call the create function and await the result.
      const createdItem = await Item.create(newItemData);

      // Expectations:
      expect(createdItem).toBeInstanceOf(Item);
      expect(createdItem.item_id).toBe(4);
    });
  });
});
