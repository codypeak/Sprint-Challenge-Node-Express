const express = require('express');
const port = 8000;
const actions = require('./data/helpers/actionModel');
const projects = require('./data/helpers/projectModel');

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
    const { notes, description, project_id } = req.body;  
    actions
        .insert({ notes, description, project_id })
        .then( response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})

server.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    actions
        .update(id, changes) 
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).send(null);
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" + error});
        })
})

server.delete('/actions/:id', (req, res) => {
    const { id } = req.params;
    actions
        .remove(id)
        .then(count => {
            res.status(200).json(count);  //count????
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
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
});

server.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    projects
        .get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
});

server.get('/projects/:id', (req, res) => {  //projects/actions?
    const { projectId } = req.params;
    projects
        .getProjectActions(projectId)
        .then(projectActions => {
            res.status(200).json(projectActions)
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
});

server.post('/projects', (req, res) => {
    const { name, description } = req.body;
    projects
        .insert({ name, description})
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
});

server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    projects
        .update(id, changes )
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).send(null);
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
});

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    projects
        .remove(id)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})


server.listen(port, () => console.log(`API running on port ${port}`))
