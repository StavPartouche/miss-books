import {eventBus} from '../services/event-bus-service.js'

export default {
    template: `
        <section v-if="msg" class="user-msg">
            <p>{{msg}}</p>
            <button @click="msg=null">x</button>
        </section>
    `,
    data() {
        return {
            msg: null
        }
    },
    created(){
        eventBus.$on('show-msg', msg => {
            this.msg = msg
        })
    },
    updated(){
        setTimeout(() => {
            this.msg = null
            console.log('done');
        }, 3000)
    }
}