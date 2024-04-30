let allBooks = []
const emptyBookList = document.querySelector("#emptyBookList")
const fields = document.querySelector("input")
const modal = document.querySelector("#myModal")
const modalTitle = document.querySelector("#modalTitle")
const synopsis = document.querySelector("#synopsis")
const txtSynopsis = document.querySelector("#txtSynopsis")
const btnRegister = document.querySelector("#btnRegister")
const btnSearch = document.querySelector("#btnSearch")

function findBook() {
    return allBooks.findIndex((elem) => elem.bookName === (event.target.parentNode.className))
}

function showSynopsis(event) {
    if (event.target.id === "btnSynopsis") {
        modalTitle.innerHTML = `Sinopse do livro "${allBook[findbook()].bookName}"`
        txtSynopsis.innerHTML = allBooks[findBook()].synopsis
        modal.style.display = "block"
    }
}

function showError(bookName) {
    const contentModel = document.querySelector("#contentModel")
    modalTitle.innerHTML = `Livro "${bookName}" não encontrado! :c`
    txtSynopsis.innerHTML = ""
    contentModel.style.width = "50%"
    modal.style.display = "block"
}

function closeModal(event) {
    modal.style.display = "none"
}

function closeModalWindow(event) {
    if (event.target === modal) {
        modal.style.display = "none" 
    }
}

function clearFields() {
    fields.forEach(function (elem) {
        elem.value = ""
    })
    synopsis.value = ""
}

function createCard(bookCard, bookName, bookAuthor, numberOfPages, bookCover) {
    bookCard.className = bookName
    bookCard.innerHTML = `
    <p id="bookTitle">${bookName}</p>
    <img scr="${bookCover}">
    Autor: ${bookAuthor}
    Páginas: ${numberOfPages}
    <button id="btnSynopsis">Sinopse</button>
    <button id="btnRemove">Remover</button>
    `
}

function appendElements(divSelect, bookCard) {
    const btnCloseModal = document.querySelector("#btnCloseModal")
    divSelect.append(bookCard)
    divSelect.addEventListener("click", showSynopsis)
    btnCloseModal.addEventListener("click", closeModal)
    window.addEventListener("click", closeModalWindow)
}

function removeCard(parentDiv) {
    return function remove(event) {
        if (event.target.id === "btnRemove") {
            parentDiv.removeChild(event.target.parentNode)
            if (allBooks.splice(findBook(), 1)) {
                alert (`Livro "${event.target.parentNode.className}" removido com sucesso!`)
            }
        }
    }
}

function registerBook() {
    const listOfAllBooks = document.querySelector("#ListOfAllBooks")
    const bookName = document.querySelector("#bookName").value
    const bookAuthor = document.querySelector("#bookAuthor").value
    const numberOfPages = Number(document.querySelector("#numberOfPages").value)
    const bookCover = document.querySelector("#bookCover").value

    event.preventDefault()
    allBooks.push(
        {
            bookName,
            bookAuthor,
            numberOfPages,
            bookCover,
            synopsis: synopsis.value
        })

    emptyBookList.remove()
    const bookCard = document.createElement("div")

    createCard(bookCard, bookName, bookAuthor, numberOfPages, bookCover)
    appendElements(listOfAllBooks, bookCard)

    const remove = removeCard(listOfAllBooks)
    listOfAllBooks.addEventListener("click", remove)

    clearFields()
}

function searchBook() {
    const bookNameSearch = document.querySelector("#bookNameSearch").value
    const listOfBooksSearch = document.querySelector("#listofBooksSearch")
    const foundBooks = document.querySelector("#foundBooks")
    const bookCard = document.createElement("div")

    foundBooks.innerHTML = ""
    listOfBooksSearch.append(foundBooks)

    const findBook = allBooks.filter(elem => elem.bookName === bookNameSearch)

    if (findBook.length !== 0) {
        findBook.forEach(elem => {
            createCard(bookCard, elem.bookName, elem.bookAuthor, elem.numberOfPages, elem.bookCover)
            appendElements(foundBooks, bookCard)
        } )
    } else {
        showError(bookNameSearch)
    }

    const remove = removeCard(foundBooks)
    listOfBooksSearch.addEventListener("click", remove)

    clearFields()
}

btnRegister.addEventListener("click", registerBook)
btnSearch.addEventListener("click", searchBook)