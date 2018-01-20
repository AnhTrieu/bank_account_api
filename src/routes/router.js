let express = require('express')
let router = express.Router()
let ctrl = require('../controller/controller')

// Read routes
router.get('/:id', ctrl.getAccount)
router.get('/:id/transacts', ctrl.getAllTransactions)
router.get('/:id/transacts/:trasactId', ctrl.getTransaction)
// Create routes
router.post('/', ctrl.openAccount)
router.post('/:id/transacts', ctrl.addTransaction)
// Update routes
router.patch('/:id', ctrl.editAccount)
router.patch('/:id/transacts/:transactId', ctrl.editTransaction)
// Destroy routes
router.delete('/:id', ctrl.closeAccount)
router.delete('/:id/transacts/:transactId', ctrl.removeTransaction)

module.exports = router