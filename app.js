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
    .get( '/users' )
    .rest( {model: User} )
    .profile( {query: 'profile'} )
    .json();

netiam
    .post( '/users' )
    .rest( {model: User} )
    .profile( {query: 'profile'} )
    .json()

netiam
    .get( '/users/:id' )
    .rest( {model: User} )
    .profile( {query: 'profile'} )
    .json();

netiam
    .put( '/users/:id' )
    .rest( {model: User} )
    .profile( {query: 'profile'} )
    .json();

netiam
    .delete( '/users/:id' )
    .rest( {model: User} )
    .json();

server.listen( 3000 );
