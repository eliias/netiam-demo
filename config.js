'use strict';

var _ = require( 'lodash' );

var config = {
    production: {
        mongodb: {
            host:    process.env.DB_PORT_27017_TCP_ADDR || 'localhost',
            port:    process.env.DB_PORT_27017_TCP_PORT || 27017,
            db:      'netiam',
            options: {}
        }
    }

};

config.test = _.merge( {}, config.production, {
    mongodb: {
        host: 'localhost',
        db:   'netiam-test'
    }
} );

// Set env if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Export the correct environment
module.exports = config.hasOwnProperty( process.env.NODE_ENV )
    ? config[process.env.NODE_ENV]
    : config.production;