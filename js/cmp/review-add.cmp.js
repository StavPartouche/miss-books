import {utilService} from '../services/util-service.js'
import {bookService} from '../services/book-service.js'
import {eventBus} from '../services/event-bus-service.js'

export default {
    props: ['book'],
    template:`
            <form class="review-form" @submit.prevent="onSubmit(book.id)">
                <input type="text" placeholder="Enter Name" v-model="review.name"/>
                <div class="rate">
                    <p>Rate:</p>
                    <select name="rates" v-model="review.rate">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <input type="date" v-model="review.date"/>
                <textarea v-model="review.text">Enter text here...</textarea>
                <button>Submit Review</button>
            </form>   
    `,
    data(){
        return {
            review:{
                name: '',
                rate: null,
                date: '',
                text:''
            }
        }
    },
    methods:{
        onSubmit(bookId){
            this.review.id = utilService.makeId()
            bookService.getBooks()
                .then(books => {
                    var tempBooks = books
                    var idx = tempBooks.findIndex(book => book.id === bookId);
                    if(!tempBooks[idx].reviews){
                        tempBooks[idx].reviews = []
                    }
                    tempBooks[idx].reviews.push(this.review);
                    bookService.booksToStorage(tempBooks)
                    eventBus.$emit('show-msg', 'Your book review was submited')
                    this.$router.push('/book')
                })
        }
    }
}