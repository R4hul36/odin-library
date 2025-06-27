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

const renderBook = function () {
  let container = document.querySelector('.table-container')

  let table = document.createElement('table')

  if (!myLibrary.length) {
    let infoText = document.createElement('p')
    infoText.textContent = 'There are no books to show yet...'
  }

  myLibrary.forEach((book, index) => {
    const { author, id, pages, read, title } = book
  })
}

renderBook()
