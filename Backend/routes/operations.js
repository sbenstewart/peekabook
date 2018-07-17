const handleError = require('../helpers').handleError

//Inserts student into database if PeekaBookId not known
async function resolveStudent(student, connection) {
  return new Promise((resolve, reject) => {
    if(student.peekabookid) {
      resolve(student.peekabookid);
    }
     else {
      //Insert into Student
      var query = 'insert into Student SET ?'; 
      var data = {
        Name: student.name,
        Contact: student.contact, 
        Department: student.dept, 
        Year: student.year, 
        Locality: student.locality
      };
      connection.query(query, data, (err, result) => {
        if(err) {
          return reject(err);
        }
        resolve(result.insertId);
      });
    }
  });
}

//Insert Book into Database if not already present
async function resolveBook(book, connection) {
  return new Promise((resolve, reject) => {
    var query = 'select * from Book where Isbn = ' + connection.escape(book.isbn);
    connection.query(query, (err, books, result) => {
      if(err) {
        return reject(err);
      }
      if(books.length >= 1) {
        return resolve(book.isbn);
      } else {
        //Insert into Book
        var query = 'insert into Book SET ?'; 
        var data = {
          Name: book.name,
          Author: book.author, 
          Isbn: book.isbn, 
        };
        connection.query(query, data, (err, result) => {
          if(err) {
            return reject(err);
          }
          resolve(book.isbn);
        });
      }
    });    
  });
};


exports.postTransaction = function(req,res){
  if(!req.body.student || !req.body.books || req.body.books.length == 0) {
    handleError('Request not contains all fields', 400, 'Invalid Request', res);
    return;
  }
  req.getConnection(async function(err, connection) {
    try {

      //Using async/await to execute inserts of Student and all Books in Parallel
      //Kindly don't try to understand this piece of code now, Sukin :)

      var promises = [];
      promises.push(resolveStudent(req.body.student, connection));
      for(var index in req.body.books) {
        promises.push(resolveBook(req.body.books[index], connection));
      }
      const results = await Promise.all(promises); //Run all insert operations in parallel
      //At this point: Peekabookid is in results[0] followed by isbn numbers.

      //Insert all Transactions
      const query = 'insert into Transaction (Peekabookid, Isbn, BookCondition) values ?'; 
      const data = [];
      for(var index in req.body.books) {
        data.push([results[0], req.body.books[index].isbn, req.body.books[index].condition]);
      }
      connection.query(query, [data], (err) => {
        connection.release();
        if(err) {
          handleError(err, 500, 'Database Error', res);
          return;
        }
        res.json({'message': 'Added ' + req.body.books.length + ' books'});
      });
    } catch(err) {
      handleError(err, 500, 'Database Error', res);
    }
    
  });
};

exports.getStudent = function(req,res){
  if(!req.query.contact) {
    handleError('Contact not in request', 400, 'Invalid Request', res);
    return;
  }
  req.getConnection( (err, connection) => {
    if(err) {
      handleError(err, 500, 'Server Error', res);
      return;
    }
    const query = 'select Peekabookid, Name, Contact, Department, Year, Locality from Student where Contact = ' + connection.escape(req.query.contact);
    connection.query(query, (err, students, fields) => {
      connection.release();
      if(err) {
        handleError(err, 500, 'Database Error', res);
        return;
      }
      (students.length > 0)? res.json(students[0]) : res.json({'result': 'No Student found'});
    });
  });
};


exports.getBook = function(req,res){
  if(!req.query.isbn) {
    handleError('ISBN not in request', 400, 'Invalid Request', res);
    return;
  }
  req.getConnection( (err, connection) => {
    if(err) {
      handleError(err, 500, 'Server Error', res);
      return;
    }
    const query = 'select Name, Author, Isbn from Book where Isbn = ' + connection.escape(req.query.isbn);
    connection.query(query, (err, books, fields) => {
      connection.release();
      if(err) {
        handleError(err, 500, 'Database Error', res);
        return;
      }
      (books.length > 0)? res.json(books[0]) : res.json({'result': 'No books found'});
    });
  });
  
};
