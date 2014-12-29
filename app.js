'use strict';

var express    = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    app        = express(),
    server     = require( 'http' ).createServer( app ),
    netiam     = require( 'netiam' )( app ),
    User       = require( './models/user' );

// Database
require( './modules/db' );

app.enable( 'trust proxy' );
app.use( bodyParser.json() );

// Error handling
app.use( function( err, req, res, next ) {
    res
        .status( 500 )
        .json( {
            code:    500,
            status:  'INTERNAL SERVER ERROR',
            message: err.message,
            data:    err.stack
        } );
} );

netiam
    .get( '/users' )
    .rest( {model: User} )
    .profile( {query: 'profile'} )
    //.json();

netiam
    .post( '/users' )
    .rest( {model: User} )
    .profile( {query: 'profile'} )
    .json();

netiam
    .get( '/users/:id' )
    .rest( {model: User} )
    .profile( {query: 'profile'} )
    .transform( function() {
        var body = this.body();
        body.password = undefined;
        this.body( body );
    } )
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

// Catch all
app.use( function( req, res ) {
    res
        .json( {
            code:    404,
            status:  'DOCUMENT NOT FOUND'
        } );
} );

server.listen( 3000 );
