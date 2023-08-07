const myFunction = require('../CosmosCRUD/index');
const { CosmosClient } = require('@azure/cosmos');

jest.mock('@azure/cosmos');

describe('Azure Function', () => {
  let context;
  let req;

  beforeEach(() => {
    context = {
      res: {}
    };
    req = {};

    CosmosClient.prototype.database = jest.fn().mockReturnValue({
      container: jest.fn().mockReturnValue({
        item: jest.fn().mockReturnValue({
          read: jest.fn().mockResolvedValue({ resource: { viewCount: 5 } }),
          replace: jest.fn().mockResolvedValue()
        })
      })
    });
  });

  it('increments the view count and retrieves the item', async () => {
    await myFunction(context, req);

    expect(CosmosClient.prototype.database).toHaveBeenCalledWith('PageCounters');
    expect(CosmosClient.prototype.database().container).toHaveBeenCalledWith('ViewCount');
    expect(CosmosClient.prototype.database().container().item().read).toHaveBeenCalledTimes(2);
    expect(CosmosClient.prototype.database().container().item().replace).toHaveBeenCalledWith({ viewCount: 6 });
    expect(context.res.body).toEqual({ viewCount: 6 });
  });
});