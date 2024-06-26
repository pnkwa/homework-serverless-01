const Responses = require('./API_Responses');
const Dynamo = require('./Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const item = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!item) {
        return Responses._400({ message: 'Failed to get item by ID' });
    }

    return Responses._200({ item });
};