const express = require('express');
const port = 8000;
const actions = require('../data/helpers/actionModel');
const projects = require('../data/helpers/projectModel');

const server = express();
server.use(express.json());

//ACTION ENDPOINTS
server.get('/actions', (req, res) => {
    actions
        .get()
        .then(actionList => {
            res.status(200).json(actionList);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})

server.get('/actions/:id', (req, res) => {
    const { id } = req.params;
    actions 
        .get(id)
        .then(action => {
            res.status(200).json(id);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})

server.post('/actions', (req, res) => {
    const { type } = req.body;  //naming convention?
    actions
        .insert({ type })
        .then( response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})

server.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    const { changes } = req.body;
    actions
        .update(id, {changes} )  //both dynamic? 
        .then(response => {
            if (response === 0) {
                res.status(404).send(null);  //???????
            } else {
                actions.find(id).then(action => {   //actions.find or something.find????
                    res.status(200).json(action);
                })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})

server.delete('/actions/:id', (req, res) => {
    const { id } = req.params;
    actions
        .remove(id)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
})


//PROJECT ENDPOINTS
server.get('/projects', (req, res) => {
    projects
        .get()
        .then(projectList => {
            res.status(200).json(projectList);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
})

server.get('/projects/:id', (req, res) => {
    const { projectId } = req.params;
    projects
        .get(projectId)
        .then(projectActions => {
            res.status(200).json(projectActions)
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
});


server.listen(port, () => console.log(`API running on port ${port}`));
