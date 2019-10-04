function respondWithError(res={}, statusCode=500, err={}) {
    const defaultErrorMsg = "There was trouble processing your request"
    if (typeof err === 'object' || typeof err === 'string') {
        (typeof err === 'object') &&
            (!Object.keys(err).length )
                ? res.status(statusCode).json({error: defaultErrorMsg}) 
                : res.status(statusCode).json(err)
        (typeof err === 'string') &&
            res.status(statusCode).json({error: err})
    } else {
        res.status(statusCode).json({error: defaultErrorMsg})
    }
}

module.exports = respondWithError