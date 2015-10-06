var async = require('async');
var express = require('express');
var bodyParser = require('body-parser');
var r = require('rethinkdb');

var config = require(__dirname + '/config.js');

var google = require('googleapis');

var app = express();


//For serving the index.html and all the other front-end assets.
app.use(express.static(__dirname + '/static'));

app.use(bodyParser.json());

//The REST routes for lines.
app.route('/lines')
  .get(listLines)
  .post(createLine);

app.route('/lines/:id')
  .get(getLine)
  .put(updateLine)
  .delete(deleteLine);

//If we reach this middleware the route could not be handled and must be unknown.
app.use(handle404);

//Generic error handling middleware.
app.use(handleError);


/*
 * Retrieve all lines.
 */
function listLines(req, res, next) {
  r.table('lines').orderBy({index: 'createdAt'}).run(req.app._rdbConn, function(err, cursor) {
    if(err) {
      return next(err);
    }

    //Retrieve all the lines in an array.
    cursor.toArray(function(err, result) {
      if(err) {
        return next(err);
      }

      res.json(result);
    });
  });
}

/*
 * Insert a new line.
 */
function createLine(req, res, next) {
  var line = req.body;
  line.createdAt = r.now();

  console.dir(line);

  r.table('lines').insert(line, {returnChanges: true}).run(req.app._rdbConn, function(err, result) {
    if(err) {
      return next(err);
    }

    res.json(result.changes[0].new_val);
  });
}

/*
 * Get a specific line.
 */
function getLine(req, res, next) {
  var lineId = req.params.id;

  r.table('lines').get(lineId).run(req.app._rdbConn, function(err, result) {
    if(err) {
      return next(err);
    }

    res.json(result);
  });
}

/*
 * Update a line.
 */
function updateLine(req, res, next) {
  var line = req.body;
  var lineId = req.params.id;

  r.table('lines').get(lineId).update(line, {returnChanges: true}).run(req.app._rdbConn, function(err, result) {
    if(err) {
      return next(err);
    }

    res.json(result.changes[0].new_val);
  });
}

/*
 * Delete a line.
 */
function deleteLine(req, res, next) {
  var lineId = req.params.id;

  r.table('lines').get(lineId).delete().run(req.app._rdbConn, function(err, result) {
    if(err) {
      return next(err);
    }

    res.json({success: true});
  });
}

/*
 * Page-not-found middleware.
 */
function handle404(req, res, next) {
  res.status(404).end('not found');
}

/*
 * Generic error handling middleware.
 * Send back a 500 page and log the error to the console.
 */
function handleError(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({err: err.message});
}

/*
 * Store the db connection and start listening on a port.
 */
function startExpress(connection) {
  app._rdbConn = connection;
  app.listen(config.express.port);
  console.log('Listening on port ' + config.express.port);
}






/*
 * Connect to rethinkdb, create the needed tables/indexes and then start express.
 */
async.waterfall([
  function connect(callback) {
    r.connect(config.rethinkdb, callback);
  },
  function createDatabase(connection, callback) {
    //Create the database if needed.
    r.dbList().contains(config.rethinkdb.db).do(function(containsDb) {
      return r.branch(
        containsDb,
        {created: 0},
        r.dbCreate(config.rethinkdb.db)
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function createTable(connection, callback) {
    //Create the table if needed.
    r.tableList().contains('lines').do(function(containsTable) {
      return r.branch(
        containsTable,
        {created: 0},
        r.tableCreate('lines')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function createIndex(connection, callback) {
    //Create the index if needed.
    r.table('lines').indexList().contains('createdAt').do(function(hasIndex) {
      return r.branch(
        hasIndex,
        {created: 0},
        r.table('lines').indexCreate('createdAt')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function waitForIndex(connection, callback) {
    //Wait for the index to be ready.
    r.table('lines').indexWait('createdAt').run(connection, function(err, result) {
      callback(err, connection);
    });
  }
], function(err, connection) {
  if(err) {
    console.error(err);
    process.exit(1);
    return;
  }

  startExpress(connection);
});