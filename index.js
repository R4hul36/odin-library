const myLibrary = []

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error('You should use the "new" operator to call the constructor')
  }
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function () {
    return `${this.title} by ${this.author}, ${pages}, ${read} yet.`
  }
}

console.log(theHobbit.info())

function addBookToLibrary(title, author, pages, read) {
  const theHobbit = new Book('The Hobbit', 'J.R.R Tolkein', 295, 'not read')

  myLibrary.push(theHobbit)
}
