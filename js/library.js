let main_div = document.getElementById('main');
let modal = document.getElementById('modal');
let details = document.getElementById('details');
let content = document.getElementById('details-content');
let icons = ['Book Clouds.png', 'Book Moon.png', 'Book Star.png'];
let my_library = [new Book('Thus Spoke Zarathustra', 'Friedrich Nietzsche', 352, false), new Book('White Nights', 'Fyodor Dostoevsky', 58, true), new Book('Metamorphosis', 'Franz Kafka', 102, true)];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return ('Title: ' + title + '\nAuthor: ' + author + '\nPages: ' + pages + '\nRead: ' + read);
}

function addBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;

    if (title && author && pages != '') {
        let new_book = new Book(title, author, pages, read);
        my_library.push(new_book);

        librarySet();
        loadBooks();
        clearModal();
    } else {
        alert('Please fill all the information about the book you want to add.')
    }
}

function loadBooks() {
    libraryGet();
    main.innerText = '';
    for (let i = 0; i < my_library.length; i++) {
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        let img = document.createElement('img');
        let btn = document.createElement('button');
        div.className = 'book-card';
        h2.innerText = my_library[i].title;
        img.src = './images/' + icons[Math.floor(Math.random() * icons.length)];
        btn.innerText = 'Details';
        btn.setAttribute('data-index', i);
        btn.className = 'btn-card';
        div.appendChild(h2);
        div.appendChild(img);
        div.appendChild(btn);
        main_div.appendChild(div);
    }

    let btn_card = document.querySelectorAll('#main .book-card button');
    btn_card.forEach(element => {
        element.addEventListener('click', function () {
            showDetails(this.dataset.index);
        })
    });
}

function showModal() {
    modal.style.display = 'flex';
}

function showDetails(index) {
    let book = my_library[index];
    let title = document.createElement('h2');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let read = document.createElement('input');
    let p = document.createElement('p');
    let del = document.createElement('button');

    title.innerText = book.title;
    author.innerText = 'Author: ' + book.author;
    pages.innerText = 'Pages: ' + book.pages;
    read.type = 'checkbox';
    if (book.read === true) {
        read.checked = true;
    } else {
        read.checked = false;
    }
    read.disabled = true;

    p.innerText = 'Have you read the book? ';
    p.appendChild(read);

    del.innerText = 'Delete book?'
    del.onclick = function () {
        my_library.splice(index, 1);
        clearDetails();
        librarySet();
        loadBooks();
    }

    content.appendChild(title);
    content.appendChild(author);
    content.appendChild(pages);
    content.appendChild(p);
    content.appendChild(del)

    details.style.display = 'flex';
}

function librarySet() {
    localStorage.setItem('books', JSON.stringify(my_library));
}

function libraryGet() {
    if (localStorage.getItem('books') !== null) {
        my_library = JSON.parse(localStorage.getItem('books'));
    }
}

function clearModal() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) {
        clearModal();
    } else if (event.target == details) {
        clearDetails();
    }
}

function clearDetails() {
    details.style.display = 'none';
    content.innerText = '';
}

loadBooks();
