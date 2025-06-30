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

Book.prototype.toggleReadStatus = function () {
  this.read = this.read === 'Yes' ? 'No' : 'Yes'
}

function addBookToLibrary(title, author, pages, read) {
  let uuid = crypto.randomUUID()
  const book = new Book(title, author, pages, read, uuid)
  //console.log(theHobbit.info())
  myLibrary.push(book)
}

let tableBody = document.querySelector('.table-body')

const addBookToDom = function () {
  tableBody.innerHTML = ''
  if (myLibrary.length == 0) {
    const tableRow = document.createElement('tr')
    const tableData = document.createElement('td')
    tableData.textContent = 'There are no books to show yet...'
    tableRow.appendChild(tableData)
    tableData.colSpan = '6'
    tableBody.appendChild(tableRow)
  }

  return myLibrary.forEach((book, index) => {
    const { author, id, pages, read, title } = book
    console.log(read)

    const tableRow = document.createElement('tr')

    const authorData = document.createElement('td')
    authorData.textContent = author

    const idData = document.createElement('td')
    idData.textContent = index + 1

    const pagesData = document.createElement('td')
    pagesData.textContent = pages

    const readData = document.createElement('td')
    readData.textContent = read

    let status = read === 'Yes' ? 'green' : 'red'

    readData.classList.add(`toggle-read`)
    readData.classList.add(`${status}`)
    readData.setAttribute('data-book-id', id)

    const titleData = document.createElement('td')
    titleData.textContent = title

    const actionData = document.createElement('td')
    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.classList.add('edit')
    editBtn.setAttribute('data-book-id', id)

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('delete')
    deleteBtn.setAttribute('data-book-id', id)

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
addBookToDom()

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

function handleSubmit(bookId) {
  const formData = new FormData(form)
  const title = formData.get('title')
  const author = formData.get('author')
  const pages = formData.get('pages')
  const read = formData.get('read')
  console.log(read)

  let uuid = crypto.randomUUID()

  if (bookId) {
    const book = myLibrary.find((book) => book.id === bookId)
    if (book) {
      book.title = title
      book.author = author
      book.pages = pages
      book.read = read
    }
  } else {
    addBookToLibrary(title, author, pages, read, uuid)
  }

  addBookToDom()
  dialog.close()
  form.reset()
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  handleSubmit(form.getAttribute('data-edit-id'))
  form.removeAttribute('data-edit-id')
})

tableBody.addEventListener('click', (e) => {
  const bookId = e.target.getAttribute('data-book-id')
  // Delete Book
  if (e.target.classList.contains('delete')) {
    // console.log(e.target);
    myLibrary = myLibrary.filter((book) => book.id !== bookId)
    addBookToDom()
  }

  //edit book
  if (e.target.classList.contains('edit')) {
    console.log(e.target)
    const { title, author, pages, read, id } = myLibrary.filter(
      (book) => book.id === bookId
    )[0]
    document.querySelector('#title').value = title
    document.querySelector('#author').value = author
    document.querySelector('#pages').value = pages
    document.querySelector('#read').value = read

    form.setAttribute('data-edit-id', bookId)
    dialog.showModal()
  }

  if (e.target.classList.contains(`toggle-read`)) {
    const book = myLibrary.find((book) => book.id === bookId)
    if (book) {
      book.toggleReadStatus()
      addBookToDom()
    }
  }
})

// const readButton = document.querySelector('.toggle-read')

// readButton.addEventListener('click', (e) => {
//   console.log("ysdfsdf");

// })
