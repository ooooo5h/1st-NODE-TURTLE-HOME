const errorHandler = (err, res) => {
    console.log(err);
    return res.status(err.status || 500).json({ message : err.message || "SERVER_ERROR"}); 
}

module.exports = {
    errorHandler
}