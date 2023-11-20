const ItemController = require('../../../controllers/itemController');
const Item = require('../../../models/Item');
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

describe.skip('Item Controller', () => {
  describe('index', () => {
    it('successfully gets Items and displays the 200 status code', async () => {
      const mockItems = [
        new Item({
          item_id: 10,
          story_id: 5,
          item_name: 'Bomb',
          description: 'explodes booooooom!',
          image_url: 'bomb.jpg',
        }),
        new Item({
          item_id: 10,
          story_id: 5,
          item_name: 'Bomb',
          description: 'explodes booooooom!',
          image_url: 'bomb.jpg',
        }),
        new Item({
          item_id: 10,
          story_id: 5,
          item_name: 'Bomb',
          description: 'explodes booooooom!',
          image_url: 'bomb.jpg',
        }),
      ];
      // Mock the Item.getAll method to resolve with mockItems
      jest.spyOn(Item, 'getAll').mockResolvedValue(mockItems);
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await ItemController.index(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it('fails to gets Items and displays the 500 status code and error message', async () => {
      jest
        .spyOn(Item, 'getAll')
        .mockRejectedValue(new Error('No items available.'));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ItemController.index(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'No items available.',
      });
    });
  });

  describe('show', () => {
    it('gets id from params and successfully gets Item, displaying the 200 status code', async () => {
      const mockItems = new Item({
        item_id: 10,
        story_id: 5,
        item_name: 'Bomb',
        description: 'explodes booooooom!',
        image_url: 'bomb.jpg',
      });

      // Mock the Item.getAll method to resolve with mockItems
      jest.spyOn(Item, 'getOneById').mockResolvedValue(mockItems);
      const req = {
        params: { id: '12' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await ItemController.show(req, res);

      // Expectations
      expect(res.status).toHaveBeenCalledWith(200); // Should set status code to 200
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it('fails to gets Items and displays the 404 status code', async () => {
      jest
        .spyOn(Item, 'getOneById')
        .mockRejectedValue(new Error('Unable to locate item.'));

      const req = {
        params: { id: '999' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ItemController.show(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to locate item.',
      });
    });
  });

  describe('create', () => {
    it('successfully creates Item and displays the 201 status code', async () => {
      const newItemData = {
        story_id: 5,
        item_name: 'Bomb',
        description: 'explodes booooooom!',
        image_url: 'bomb.jpg',
      };

      const mockCreatedItem = new Item({
        item_id: 22, // Adjust the Item_id as needed
        ...newItemData,
      });

      jest.spyOn(Item, 'create').mockResolvedValue(mockCreatedItem);

      const req = {
        body: newItemData,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await ItemController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockCreatedItem);
    });

    it('fails to create Item and displays the 400 status code', async () => {
      jest.spyOn(Item, 'create').mockRejectedValue(new Error('Invalid data'));

      // Create a mock request object with invalid data (e.g., missing required fields)
      const req = {
        body: {},
      };

      // Create a mock response object
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await ItemController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: 'Invalid data' });
    });
  });

  //habe not done fail routes of Item model, only Progress model
  describe('update', () => {
    it('successfully updates Item and displays the 200 status code', async () => {
      const updatedItemData = {
        story_id: 5,
        item_name: 'Bomb',
        description: 'explodes booooooom!',
        image_url: 'bomb.jpg',
      };

      const mockItem = new Item({
        item_id: 10,
        story_id: 5,
        item_name: 'steve',
        description: 'minecraft steve',
        image_url: 'steve.jpg',
      });

      const mockUpdatedItem = new Item({
        item_id: 10,
        story_id: 5,
        item_name: 'Bomb',
        description: 'explodes booooooom!',
        image_url: 'bomb.jpg',
      });

      jest.spyOn(Item, 'getOneById').mockResolvedValue(mockItem);
      jest.spyOn(mockItem, 'update').mockResolvedValue(mockUpdatedItem);

      const req = {
        params: { id: '1' },
        body: updatedItemData,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ItemController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedItem);
    });

    it('ID not found so fails to updates Item and displays the 404 status code', async () => {
      jest
        .spyOn(Item, 'getOneById')
        .mockRejectedValue(new Error('Item not found'));

      const req = {
        params: { id: '999' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await ItemController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item not found' });
    });

    it('fails to updates Item and displays the 404 status code', async () => {
      const mockExistingItem = new Item({
        item_id: 10,
        story_id: 5,
        item_name: 'Bomb',
        description: 'explodes booooooom!',
        image_url: 'bomb.jpg',
      });

      jest.spyOn(Item, 'getOneById').mockResolvedValue(mockExistingItem);

      jest
        .spyOn(mockExistingItem, 'update')
        .mockRejectedValue(new Error('Unable to update Item.'));

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await ItemController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Unable to update Item.',
      });
    });
  });

  describe('destroy', () => {
    it('successfully deletes Item and displays the 204 status code', async () => {
      const mockItem = new Item({
        item_id: 21,
        story_id: 5,
        item_name: 'Bomb',
        description: 'explodes booooooom!',
        image_url: 'bomb.jpg',
      });

      jest.spyOn(Item, 'getOneById').mockResolvedValue(mockItem);
      jest.spyOn(mockItem, 'destroy').mockResolvedValue(mockItem);

      const req = {
        params: { id: '21' }, // Assuming 'id' is a string, just like it comes from request params
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      };

      await ItemController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.end).toHaveBeenCalled();
    });

    it('fails to delete Item and displays the 404 status code', async () => {
      jest
        .spyOn(Item, 'getOneById')
        .mockRejectedValue(new Error('Item not found'));

      const req = {
        params: { id: '999' },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
        json: jest.fn(),
      };

      await ItemController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Item not found' });
    });
  });
});
