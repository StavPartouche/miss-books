export default {
    template: `
        <section>
                <input type="text" placeholder="Search by name" v-model="filterBy.byBookName" @input="emitFilter"/>
                <input type="number" placeholder="From price" v-model.number="filterBy.fromPrice" @input="emitFilter"/>
                <input type="number" placeholder="To price" v-model.number="filterBy.toPrice" @input="emitFilter"/>
                <select  v-model="filterBy.coin" @change="emitFilter">
                    <option>ILS</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>ALL</option>
                </select>
                <hr/>
        </section>
    `,
    data(){
        return{
            filterBy: {
                byBookName: '',
                fromPrice: 0,
                toPrice: 1000,
                coin: 'ALL'
            }
        }
    },
    methods:{
        emitFilter(){
            this.$emit('filtered', this.filterBy)
            console.log(this.filterBy.toPrice);
        }
    }
}