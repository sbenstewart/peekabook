module.exports = {
  handleError: (err, statusCode, message, res) => {
    if(process.env.NODE_ENV == 'development') { //Don't log in production
      console.log(err);
    }
    if(err.code == 'ER_DUP_ENTRY') {
      message = 'Duplicate Entry';
    }
    res.status(statusCode).json({ 'error': message});
  }
}