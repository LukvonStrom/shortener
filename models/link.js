/**
 * Created by LukvonStrom on 09.06.2016.
 */
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var shortid = require('shortid');
var config = require('../config.json');
var dateformat = require('dateformat');

var Schema = mongoose.Schema;

var domainValidator = validate({
        validator: 'matches',
        arguments: ['^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$']
});

var linkSchema = new Schema({
    url: {
        type: String,
        required:true,
        unique:true,
        validate: domainValidator
    },
    urlId: {
        type: String
    },
    domain: {
        type: String,
        required:true,
        default: config.domain
    },
    created: {type: Date, default: Date.now}
});

linkSchema.virtual('link').get(function() {
    return this.domain + '/' + this.urlId;
});

linkSchema.virtual('prettyDate').get(function() {
    return dateformat(this.created, "mmmm dS, yyyy");
});

linkSchema.pre('save', function(next) {
    if(this.isNew && this.urlId === 'undefined') {
        this.urlId = shortid.generate();
    }
    return next();
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;