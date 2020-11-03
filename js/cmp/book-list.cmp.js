import bookPreview from './book-preview.cmp.js'

export default {
    props:['books'],
    template:`
        <section class="books-container">
            <h2>Our Books!</h2>
            <ul class="book-list">
                <li v-for="currBook in books" :key="currBook.id">
                    <book-preview :book="currBook" @click.native="bookSelected(currBook.id)"/>
                </li>
            </ul>
        </section>
    `,
    components:{
        bookPreview
    },
    methods: {
        bookSelected(bookId){
            this.$emit('selected', bookId)
        }

    }
}