// import {googleService} from '../services/google-service.js'
import {bookService} from '../services/book-service.js'
import {eventBus} from '../services/event-bus-service.js'


export default {
    props: ['book'],
    template:`
            <form class="review-form" @submit.prevent="onAddReview(review, book.id)">
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
        onAddReview(review, bookId){
            bookService.addReview(review, bookId)
                .then(
                    bookService.logData(),
                    eventBus.$emit('show-msg', 'Your book review was submited'),
                    this.$router.push('/book')
                    )
        }
    }
}