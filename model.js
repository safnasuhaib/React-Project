var mongoose = require('mongoose'); 
  
var menuSchema = new mongoose.Schema({  
    SectionName:String,
    SectionOrder:Number,
    MenuId:Number,
    Price:Number,
    Item:String,
    CategoryName:String,
    Type:String,
    Heighlightdescription:String,
    ImageUrl:String,
    OfferHihglight:Number,
    OfferDescription:String,
    ContainerCharge:Number,
    Available:Number,
    isRecommendedItem: Boolean,
    RecommendedImageUrl:String,
    isVisible: Boolean,
}); 
  
module.exports = new mongoose.model('samplemenu', menuSchema);