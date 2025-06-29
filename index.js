let myLibrary = []

function Book(title, author, pages, read, id) {
  if (!new.target) {
    throw Error('You should use the "new" operator to call the constructor')
  }
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.id = id
  // this.info = function () {
  //   return `${this.title} by ${this.author}, ${pages}, ${read} yet.`
  // }
}

function addBookToLibrary(title, author, pages, read) {
  let uuid = crypto.randomUUID()
  const book = new Book(title, author, pages, read, uuid)
  //console.log(theHobbit.info())
  myLibrary.push(book)
}

let tableBody = document.querySelector('.table-body')

if (myLibrary.length == 0) {
  const tableRow = document.createElement('tr')
  const tableData = document.createElement('td')
  tableData.textContent = 'There are no books to show yet...'
  tableRow.appendChild(tableData)
  tableData.colSpan = '6'
  tableBody.appendChild(tableRow)
}

const addBookToDom = function () {
  tableBody.innerHTML = ''

  return myLibrary.forEach((book, index) => {
    const tableRow = document.createElement('tr')
    const { author, id, pages, read, title } = book

    const authorData = document.createElement('td')
    authorData.textContent = author

    const idData = document.createElement('td')
    idData.textContent = index + 1

    const pagesData = document.createElement('td')
    pagesData.textContent = pages

    const readData = document.createElement('td')
    readData.textContent = read

    const titleData = document.createElement('td')
    titleData.textContent = title

    const actionData = document.createElement('td')
    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.classList.add('edit')
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('delete')
    actionData.appendChild(editBtn)
    actionData.appendChild(deleteBtn)

    tableRow.appendChild(idData)
    tableRow.appendChild(titleData)
    tableRow.appendChild(authorData)
    tableRow.appendChild(pagesData)
    tableRow.appendChild(readData)
    tableRow.appendChild(actionData)

    tableBody.appendChild(tableRow)
  })
}

const dialog = document.querySelector('dialog')
const addBtn = document.querySelector('.add-btn')
const closeBtn = document.querySelector('.close-btn')
const form = document.querySelector('.form')

addBtn.addEventListener('click', (e) => {
  dialog.showModal()
})

closeBtn.addEventListener('click', () => {
  dialog.close()
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  const title = formData.get('title')
  const author = formData.get('author')
  const pages = formData.get('pages')
  const read = formData.get('read')

  let uuid = crypto.randomUUID()
  console.log(title, author, pages, read)
  addBookToLibrary(title, author, pages, read, uuid)
  addBookToDom()
  console.log(myLibrary)
})
// addBookToDom()
console.log(myLibrary)
