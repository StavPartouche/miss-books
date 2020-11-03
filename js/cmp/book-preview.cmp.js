export default {
    props:['book'],
    template:`
        <section class="book-card">
            <img class="book-img" :src="imgUrl" />
            <h4>{{book.title}}</h4>
            <h5>{{book.listPrice.amount}} {{book.listPrice.currencyCode}}</h5>
            <router-link :to="'/book/' +book.id " exact>Details</router-link>
        </section>
    `,
    computed: {
        imgUrl(){
            return this.book.thumbnail
        }
    }
}