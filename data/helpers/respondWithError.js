function respondWithError(res={}, statusCode=500, err={}) {
    const defaultErrorMsg = "There was trouble processing your request"
    if (typeof err === 'object' || typeof err === 'string') {
        (typeof err === 'object') &&
            (!Ojbect.keys(err).length )
                ? res.status(statusCode).json(errObj)
                : res.status(statusCode).json({error: defaultErrorMsg}) 
        (typeof err === 'string') &&
            res.status(statusCode).json({error: err})
    } else {
        res.status(statusCode).json({error: defaultErrorMsg})
    }
}

module.exports = respondWithError