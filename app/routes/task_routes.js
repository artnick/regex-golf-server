var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  //read task
  app.get('/task/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('tasks').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  //create task
  app.post('/task', (req, res) => {
    const task = { 
    	match: req.body.match.split('&'), 
    	nomatch: req.body.nomatch.split('&')
    };
    db.collection('tasks').insert(task, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};