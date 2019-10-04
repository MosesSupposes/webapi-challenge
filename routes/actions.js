const express = require('express')
const actionModel = require('../data/helpers/actionModel')
const withCatch = require('../data/helpers/withCatch')
const respondWithError = require('../data/helpers/respondWithError')

const router = express.Router()

router.get('/', async function (req, res) {
    const [err, actions] = await withCatch(actionModel.get())
    if (err || !actions) respondWithError(res, 404, "There are no actions yet. Add a new action and try again.")
    else res.status(200).json(actions)
})

router.get('/:action_id', async function(req, res) {
    const [err, action] = await withCatch(actionModel.get(req.params.action_id))
    if (err || !action) respondWithError(res, 404, "Couldn't find the action with the specified id.")
    else res.status(200).json(action)
})

router.post('/', async function (req, res) {
    const [err, action] = await withCatch(actionModel.insert(req.body))
    if (err) respondWithError(res, 500, {
        message: "We ran into an error when attempting to add the action to the database. Maybe some fields were missing? Try again.",
        error: err
    })
    else res.status(200).json(action)
})

router.put('/:action_id', async function(req, res) {
    const id = req.params.action_id,
    changes = req.body,
    [err, action] = await withCatch(actionModel.update(id, changes))

    if (err) respondWithError(res, 500, {
        message: "We ran into an error when attempting to update the action in the database. Maybe some fields were missing? Try again.",
        error: err
    })
    else res.status(200).json(action)
})

router.delete('/:action_id', async function (req, res) {
    const id = req.params.action_id,
    [err] = await withCatch(actionModel.remove(id))
    if (err) respondWithError(res, 500, "We ran into an error when attempting to delete the specified action.")
    else res.status(200).json({message: "Successfully deleted the action with the id of " + id})
})

module.exports = router