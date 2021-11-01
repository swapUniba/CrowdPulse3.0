const mongoose = require('mongoose')

const AnalyzedTweetTemplate = new mongoose.Schema({
    raw_text:{
        type:String
    },
    author_id:{
        type:String
    },
    author_name:{
        type:String
    },
    author_username:{
        type:String
    },
    created_at:{
        type:String
    },
    possibly_sensitive:{
        type:Boolean
    },
    complete_text:{
        type:Boolean
    },
    twitter_context_annotations:{
        type:Array
    },
    referenced_tweets:{
        type:Array
    },
    twitter_entities:{
        type:Object
    },
    metrics:{
        type:Object
    },
    processed:{
        type:Boolean
    },
    sentiment:{
        type:Object
    },
    tags:{
        type:Object
    },
    spacy:{
        type:Object
    },
})

module.exports = mongoose.model('Atweets',AnalyzedTweetTemplate)