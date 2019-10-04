function respondWithError(res={}, statusCode=500, errObj={}) {
    res.status(statusCode).json(errObj)
}

module.exports = respondWithError