const Hotel = require('../models/Hotel');

async function getAll() {
    return await Hotel.find({}).lean();
}

async function getById(id) {
    return await Hotel.findById(id).lean();
}

async function create(hotel) {
    return await Hotel.create(hotel);
}

async function update(id, hotel) {
    const existing = await Hotel.findById(id);

    existing.name = hotel.name;
    existing.city = hotel.city;
    existing.imageUrl = hotel.imageUrl;
    existing.rooms = hotel.rooms;

    await existing.save();
}

async function deleteById(id) {

}

async function bookRoom(hotelId, userId) {

}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    bookRoom
};
