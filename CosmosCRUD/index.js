const CosmosClient = require("@azure/cosmos").CosmosClient;

module.exports = async function (context, req) {
    const endpoint = process.env.COSMOS_DB_ENDPOINT;
    const key = process.env.COSMOS_DB_CONNECTION_STRING;
    const databaseId = "myDatabase";
    const containerId = "myContainer";
    //TODO: header check for once view update per day

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