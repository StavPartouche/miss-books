import {bookService} from '../services/book-service.js'
import { utilService } from '../services/util-service.js'
import reviewAdd from '../cmp/review-add.cmp.js'
import bookReview from '../cmp/book-review.cmp.js'

export default {
    template:`
        <section v-if="book" class="book-details" >
            <div class="details">
                <img class="book-img-details" :src="imgUrl"/>
                <div>
                     <img src="img/sale.jpg" v-if="isBookOnSale"/>
                     <h2>{{book.title}}</h2>
                     <h4>{{readLength}}</h4>
                     <h4 v-if="shouldShowAge">{{bookAge}}</h4>
                     <h5 :class="priceColor">{{book.listPrice.amount}} {{book.listPrice.currencyCode}}</h5>
                     <p>{{book.description}}</p>
                </div>
            </div>
                <review-add :book="book"></review-add>
                <ul class="book-review" v-if="reviews">
                    <li v-for="currReview in reviews">
                        <book-review :review="currReview" :book="book"/>
                        <hr/>
                    </li>
                </ul>
        </section>
    `,
    components:{
        reviewAdd,
        bookReview
    },
    data(){
        return{
            isModalOpen: true,
            book: null,
            reviews: null
        }
    },
    computed: {
        readLength(){
            if(this.book.pageCount > 500) return 'Long Reading';
            else if(this.book.pageCount > 200) return 'Decent Reading';
            else return 'Short Reading'
        },
        bookAge(){
            if(new Date().getFullYear() - this.book.publishedDate >= 10) return 'Veteran Book';
            else if(new Date().getFullYear() - this.book.publishedDate <= 1) return 'New';
        },
        priceColor(){
            return { red : this.book.listPrice.amount > 150,
                     green : this.book.listPrice.amount < 20}
        },
        isBookOnSale(){
            return this.book.listPrice.isOnSale
        },
        shouldShowAge(){
            return (new Date().getFullYear() - this.book.publishedDate > 1 && new Date().getFullYear() - this.book.publishedDate < 10)
        },
        imgUrl(){
            return this.book.thumbnail
        }
        
    },
    created(){
        const id = this.$route.params.bookId
        bookService.getById(id)
            .then(book => {
                this.book = book
                this.reviews = book.reviews
            })    
    }

}

