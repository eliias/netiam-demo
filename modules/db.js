'use strict';

var mongoose = require( 'mongoose' ),
    config = require( '../config' ),
    db = mongoose.connect(
        'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.db,
        config.mongodb.options
    );

module.exports = db;