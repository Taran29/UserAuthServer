import express from 'express'
import { User } from '../models/user.js'
import auth from '../middlewares/auth.js'
import _ from 'lodash'

const router = express.Router()

router.put('/:id', auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name
      }
    })
  } catch (ex) {
    return res.status(502).send({
      message: 'Cannot connect to the server. Please try again later'
    })
  }

  return res.status(200).send({
    message: 'Name updated successfully',
  })
})

export default router
