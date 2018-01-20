let model = require('../model/model')

// Read routes
function getAccount(req, res, next) {
  let id = req.params.id
  let account = model.getAccount(id)

  res.status(200).json({
    data: account
  })
}

function getAllTransactions(req, res, next) {
  let id = req.params.id
  let transactions = model.getAllTransactions(id)
  res.status(200).json({
    data: transactions
  })
}

function getTransaction(req, res, next) {
  let id = req.params.id
  let transactId = req.params.transactId
  let transaction = model.getTransaction(id, transactId)

  res.status(200).json({
    data: transactions
  })
}

// Create routes
function openAccount(req, res, next) {
  let name = req.body.name
  let bank = req.body.bank
  let description = req.body.description

  if (!name || !bank || !description) return next({
    status: 400,
    message: 'One or more inputs are missing.'
  })

  let account = model.openAccount(name, bank, description)

  res.status(201).json({
    data: account
  })
}

function addTransaction(req, res, next) {
  let id = req.params.id
  let title = req.body.title
  let amount = req.body.amount
  let pending = req.body.pending

  if (!title || !amount || !pending) return next({
    status: 400,
    message: 'One or more inputs are missing.'
  })

  let transaction = model.addTransaction(id, title, amount, pending)

  res.status(201).json({
    data: transaction
  })
}

// Update routes
function editAccount(req, res, next) {
  let id = req.params.id
  let name = req.body.name
  let bank = req.body.bank
  let description = req.body.description

  if (!name || !bank || !description) return next({
    status: 400,
    message: 'One or more inputs are missing.'
  })

  let account = model.editAccount(id, name, bank, description)

  res.status(200).json({
    data: account
  })
}

function editTransaction(req, res, next) {
  let id = req.params.id
  let transactId = req.params.transactId
  let title = req.body.title
  let amount = req.body.amount
  let pending = req.body.pending

  if (!title || !amount || !pending) return next({
    status: 400,
    message: 'One or more inputs are missing'
  })

  let transaction = model.editTransaction(id, transactId, title, amount, pending)

  res.status(200).json({
    data: transaction
  })
}

// Destroy routes
function closeAccount(req, res, next) {
  let id = req.params.id
  model.closeAccount(id)

  res.status(204).json()
}

function removeTransaction(req, res, next) {
  let id = req.params.id
  let transactId = req.params.transactId

  model.removeTransaction(id, transactId)

  res.status(204).json()
}

module.exports = {
  getAccount,
  getAllTransactions,
  getTransaction,
  openAccount,
  addTransaction,
  editAccount,
  editTransaction,
  closeAccount,
  removeTransaction
}