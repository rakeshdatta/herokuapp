
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'CMPE 281 Lab' });
};
