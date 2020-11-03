import { bookService } from '../services/book-service.js'
import { googleService } from '../services/google-service.js'
import { eventBus } from '../services/event-bus-service.js'

export default {
    template: `
    <section v-if="googleData">
        <input type="text" placeholder="Search Book" v-model="text" @change="getResults" />
        <ul v-if="results.length > 0">
            <template class="results-list" v-for="result in results">
                <li>{{result.volumeInfo.title}}</li>
                <button @click="onAddBook(result)">+</button>
            </template>
        </ul>
    </section>        
    `,
    data() {
        return {
            googleData: null,
            results: [],
            text: ''
        }
    },
    methods: {
        getResults() {
            if(this.text === ''){
                this.results = []
            }else {
                this.results = this.googleData.items.filter(book => book.volumeInfo.title.toLowerCase().includes(this.text))
            }
            console.log(this.results)
        },
        onAddBook(book){
            bookService.addGoogleBook(book)
                .then(
                    this.results = [],
                    this.text = '',
                    eventBus.$emit('show-msg', `${book.volumeInfo.title} was added!`)
                    )
                .catch(err => eventBus.$emit('show-msg', err))
        }
    },
    created() {
        googleService.getGoogleData()
            .then(res => this.googleData = res)
    },
}