'use strict';

var express = require( 'express' ),
    app     = express(),
    server  = require( 'http' ).createServer( app ),
    netiam  = require( 'netiam' )( app );

netiam
    .get( '/' )
    .custom( function( resource, req, res ) {
        resource.data = {
            'Hello': 'World!'
        };
    } )
    .json();

server.listen( 3000 );
