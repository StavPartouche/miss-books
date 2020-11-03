import { bookService } from '../services/book-service.js'
import bookList from '../cmp/book-list.cmp.js'
import bookDetails from './book-details.cmp.js'
import bookFilter from '../cmp/book-filter.cmp.js'
import addBook from '../cmp/add-book.cmp.js'

export default {
    template: `
        <section class="book-app container">
            <add-book />
            <book-filter @filtered="setFilter"></book-filter>
            <book-list :books="booksToShow" @selected="selectBook"></book-list>
        </section>
    `,
    components:{
        bookDetails,
        bookFilter,
        bookList,
        addBook
    },
    data() {
        return {
            books: [],
            filterBy: null,
            selectedBook: null,
        }
    },
    methods: {
        selectBook(bookId){
            const idx = this.books.findIndex(book => book.id === bookId);
            this.selectedBook = this.books[idx]
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const txt = this.filterBy.byBookName.toLowerCase();
            const fromPrice = this.filterBy.fromPrice
            const toPrice = this.filterBy.toPrice
            const coin = this.filterBy.coin
            return this.books.filter(book => {
                if(coin === "ALL"){
                    return (book.title.toLowerCase().includes(txt) &&
                    book.listPrice.amount >= fromPrice &&
                    book.listPrice.amount <= toPrice)
                }else {
                    return (book.title.toLowerCase().includes(txt) &&
                     book.listPrice.amount >= fromPrice &&
                     book.listPrice.amount <= toPrice &&
                     book.listPrice.currencyCode === coin)
                }
            })
        }
    },
    created(){
        bookService.getBooks()
            .then(books => this.books = books)
    }
}