import { bookService } from '../services/book-service.js'
import {eventBus} from '../services/event-bus-service.js'

export default {
    props: ['review', 'book'], 
    template:`
        <section>
            <h4>{{review.name}}</h4>
            <h5>Rate: {{review.rate}}</h5>
            <p>at: {{review.date}}</p>
            <p>{{review.text}}</p>
            <button @click="deleteReview(review.id, book)">X</button>
        </section>    
    `,
    methods:{
        deleteReview(id, currBook){
            var reviewIdx = currBook.reviews.findIndex(review => review.id === id)
            currBook.reviews.splice(reviewIdx, 1)
            bookService.getBooks()
                .then(books => {
                    var bookIdx = books.findIndex(book => currBook.id === book.id)
                    books[bookIdx].reviews = currBook.reviews
                    bookService.booksToStorage(books)
                    eventBus.$emit('show-msg', 'The review was deleted')
                    this.$router.push('/book')
                })
        }
    }
}