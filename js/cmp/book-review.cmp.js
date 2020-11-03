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
            <button @click="onDeleteReview(review.id, book.id)">X</button>
        </section>    
    `,
    methods:{
        onDeleteReview(reviewId, bookId){
            bookService.deleteReview(reviewId, bookId)
                .then(
                    eventBus.$emit('show-msg', 'The review was deleted'),
                     this.$router.push('/book')
                )
        }
    }
}