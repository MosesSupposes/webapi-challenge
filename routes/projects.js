const express = require('express')
const projectModel = require('../data/helpers/projectModel')
const withCatch = require('../data/helpers/withCatch')
const respondWithError = require('../data/helpers/respondWithError')


const router = express.Router()

router.get('/', async function(req, res) {
    const [err, projects] = await withCatch(projectModel.get())
    if (err || !projects) respondWithError(res, 404, "There are no projects yet. Add a new project and try again.")
    else res.status(200).json(projects)
})

router.get('/:project_id', async function(req, res) {
    const [err, project] = await withCatch(projectModel.get(req.params.project_id))
    if (err || !project) respondWithError(res, 404, "The project with the id of " + req.params.project_id + " does not exist.")
    else res.status(200).json(project)
})

router.post('/', async function(req, res) {
    const [err, project] = await withCatch(projectModel.insert(req.body))
    if (err) respondWithError(res, 400, {
        message: "Trouble inserting the specified project into the database.  Maybe you forgot some fields? Try again.", 
        error: err
    })
    else res.status(201).json(project)
})

router.put('/:project_id', async function(req, res) {
    const id = req.params.project_id, 
    changes = req.body,
    [err, project] = await withCatch(projectModel.update(id, changes))

    if (err) respondWithError(res, 500, {
        message: "We ran into an error when attempting to update the specified project. Maybe you forgot some fields? Try again.",
        error: err
    })
    else res.status(200).json(project)
})

router.delete('/:project_id', async function (req, res) {
    const [err] = await withCatch(projectModel.remove(req.params.project_id))
    if (err) respondWithError(res, 500, "We ran into an error when attempting to delete the specified project.")
    else res.status(200).json({message: "Successfully deleted the project with the id of " + req.params.id})
})

module.exports = router