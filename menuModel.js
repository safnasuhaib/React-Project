const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    MenuList: [{
        SectionName: {
            type: String,
            required: [true, 'Section name is required'],
        },
        SectionOrder: {
            type: Number,
            required: [true, 'Section Order is required'],
        },
        MenuItem: [{
            MenuId: {
                type: Number,
                required: [true, 'MenuId is required'],
            },
            Price: {
                type: Number,
                required: [true, 'Price is required'],
            },
            Item: {
                type: String,
                required: [true, 'Item is required'],
            },
            CategoryName: String,
            Type: {
                type: String,
                required: [true, 'Type is required'],
            },
            Heighlightdescription: String,
            ImageUrl: {
                type: String,
                required: [true, 'ImageUrl is required'],
            },
            OfferHihglight: Number,
            OfferDescription: String,
            ContainerCharge: {
                type: Number,
            },
            Available: Number,
            isRecommendedItem: Boolean,
            RecommendedImageUrl:String,
            isVisible: Boolean,
        }]
    }]
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
