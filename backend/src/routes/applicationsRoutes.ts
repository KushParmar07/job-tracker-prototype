import applicationsController from "../controllers/applicationsController";
import express from 'express'

const applicationsRouter = express.Router()

applicationsRouter.get('/', applicationsController.getApplications)
applicationsRouter.get('/:id', applicationsController.getApplication)
applicationsRouter.post('/', applicationsController.createApplication)
applicationsRouter.delete('/:id', applicationsController.deleteApplication)
applicationsRouter.put('/:id', applicationsController.updateApplication)

export default applicationsRouter