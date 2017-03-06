module.exports = function(app, db) {
  app.post('/tasks', (req, res) => {
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