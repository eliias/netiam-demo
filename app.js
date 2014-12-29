'use strict';

var express = require( 'express' ),
    app     = express(),
    server  = require( 'http' ).createServer( app ),
    netiam  = require( 'netiam' )( app ),
    User    = require( './models/user' );

// Database
require( './modules/db' );

netiam
    .get( '/users' )
    .rest( {
        model:       User,
        idAttribute: '_id'
    } )
    .json();

netiam
    .get( '/users/:id' )
    .rest( {
        model:       User,
        idAttribute: '_id'
    } )
    .json();

server.listen( 3000 );
