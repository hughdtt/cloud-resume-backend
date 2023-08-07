const CosmosClient = require("@azure/cosmos").CosmosClient;

module.exports = async function (context, req) {
    const endpoint = process.env.COSMOS_ENDPOINT;
    const key = process.env.COSMOS_KEY;
    const databaseId = "PageCounters";
    const containerId = "ViewCount";

    const client = new CosmosClient({ endpoint, key });
    const container = client.database(databaseId).container(containerId);
    const itemId = "1";

    // Increment viewCount by 1
    const { resource: item } = await container.item(itemId).read();
    item.viewCount++;
    await container.item(itemId).replace(item);

    // Retrieve the item
    const { resource: retrievedItem } = await container.item(itemId).read();

    context.res = {
        body: retrievedItem
    };
};