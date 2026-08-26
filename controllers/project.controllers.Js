const Project = require('../models/projects.model');

exports.getProjects = (req, res) => {
    try {
        const projects = Project
        .find({}, 'title description')
        .sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProject = (req, res) => {
    const projectId = req.params.id;
    Project.findById(projectId)
        .then(project => {
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};
