const Responses = require('./API_Responses');

const stationeryItems = [
    { id: 1, name: 'Notebook', price: 2.50 },
    { id: 2, name: 'Pen', price: 1.00 },
    { id: 3, name: 'Pencil', price: 0.50 },
    { id: 4, name: 'Eraser', price: 0.25 },
    { id: 5, name: 'Stapler', price: 5.00 }
];

exports.handler = async (event) => {
    console.log('event', event);
    
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    const bakeryItem = stationeryItems.find(item => item.id == ID);

    if (bakeryItem) {
        return Responses._200(bakeryItem);
    }

    return Responses._400({ message: 'no matching ID in data' });
};
