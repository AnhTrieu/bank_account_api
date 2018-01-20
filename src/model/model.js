let path = 'src/db/data.json'
let fs = require('fs')
let data = JSON.parse(fs.readFileSync(path, 'utf-8'))
let uuid = require('uuid/v4')

// Read routes
function getAccount(id) {
  return data.accounts.find(account => account.id === id)
}

function getAllTransactions(id) {
  let account = data.accounts.find(account => account.id === id)
  return account.transactions
}

function getTransaction(id, transactId) {
  let account = data.accounts.find(account => account.id === id)
  return account.transactions.find(transaction => transaction.id === transactId)
}

// Create routes
function openAccount(name, bank, description) {
  let id = uuid()

  let account = {
    id,
    name,
    bank,
    description,
    transactions: []
  }
  data.accounts.push(account)
  fs.writeFileSync(path, JSON.stringify(data))

  return account
}

function addTransaction(id, title, amount, pending) {
  let transaction = {
    id: uuid(),
    title,
    amount,
    pending
  }

  let idx = data.accounts.findIndex(account => account.id === id)
  data.accounts[idx].transactions.push(transaction)
  fs.writeFileSync(path, JSON.stringify(data))

  return transaction
}

// Update routes
function editAccount(id, name, bank, description) {
  let idx = data.accounts.findIndex(account => account.id === id)
  data.accounts[idx].name = name
  data.accounts[idx].bank = bank
  data.accounts[idx].description = description
  fs.writeFileSync(path, JSON.stringify(data))

  return data.accounts[idx]
}

function editTransaction(id, transactId, title, amount, pending) {
  let transaction = {
    id: transactId,
    title,
    amount,
    pending
  }
  let idx = data.accounts.findIndex(account => account.id === id)
  let transactIdx = data.accounts[idx].transactions.findIndex(transaction => transaction.id === transactId)
  data.accounts[idx].transactions[transactIdx] = transaction
  fs.writeFileSync(path, JSON.stringify(data))

  return transaction
}

// Destroy routes
function closeAccount(id) {
  let idx = data.accounts.findIndex(account => account.id === id)

  data.accounts.splice(idx, 1)
  fs.writeFileSync(path, JSON.stringify(data))
}

function removeTransaction(id, transactId) {
  let idx = data.accounts.findIndex(account => account.id === id)
  let transactIdx = data.accounts[idx].transactions.findIndex(transaction => transaction.id === transactId)
  console.log(idx, transactIdx);
  data.accounts[idx].transactions.splice(transactIdx, 1)
  fs.writeFileSync(path, JSON.stringify(data))
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