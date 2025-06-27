const myLibrary = []

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
  const theHobbit = new Book(title, author, pages, read, uuid)
  //console.log(theHobbit.info())
  myLibrary.push(theHobbit)
}

addBookToLibrary('The Hobbit', 'J.R.R Tolkein', 295, 'not read')
console.log(myLibrary)

const tableBody = document.querySelector('.table-body')
const tableRow = document.createElement('tr')
const renderBook = function () {
  if (!myLibrary.length) {
    const tableData = document.createElement('td')
    tableData.textContent = 'There are no books to show yet...'
    tableRow.appendChild(tableData)
    tableData.colSpan = '6'
    tableBody.appendChild(tableRow)
  }

  addBookToDom()
}

const addBookToDom = function () {
  return myLibrary.forEach((book, index) => {
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

    tableRow.appendChild(idData)
    tableRow.appendChild(titleData)
    tableRow.appendChild(authorData)
    tableRow.appendChild(pagesData)
    tableRow.appendChild(readData)

    tableBody.appendChild(tableRow)
  })
}

renderBook()
