'use strict';

var express    = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    app        = express(),
    server     = require( 'http' ).createServer( app ),
    netiam     = require( 'netiam' )( app ),
    User       = require( './models/user' );

// Database
require( './modules/db' );

app.use( bodyParser.json() );

netiam
    .get( '/users', {model: User} )
    .rest()
    .json();

netiam
    .post( '/users', {model: User} )
    .rest()
    .json()

netiam
    .get( '/users/:id', {model: User} )
    .rest()
    .json();

netiam
    .put( '/users/:id', {model: User} )
    .rest()
    .json();

netiam
    .delete( '/users/:id', {model: User} )
    .rest()
    .json();

server.listen( 3000 );
