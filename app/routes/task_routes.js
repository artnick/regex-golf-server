var ObjectID = require('mongodb').ObjectID;

const separator = '&';

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
    const keys = Object.keys(req.body);
    const task = {};
    keys.forEach( (key) => {
      if(key == 'match' || key == 'nomatch')
        task[key] = req.body[key].split(separator);
      else
        task[key] = req.body[key];
    });

    db.collection('tasks').insert(task, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};