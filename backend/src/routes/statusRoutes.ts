import statusController from "../controllers/statusController";
import express from 'express'

const statusRouter = express.Router()

statusRouter.get('/', statusController.getStatuses)
statusRouter.get('/:id', statusController.getStatus)
statusRouter.post('/', statusController.createStatus)
statusRouter.delete('/:id', statusController.deleteStatus)
statusRouter.put('/:id', statusController.updateStatus)

export default statusRouter