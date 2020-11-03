import { myRouter } from './routes.js'
import appHeader from './cmp/app-header.cmp.js'
import userMsg from './cmp/user-msg.cmp.js'

const options = {
    el: '#app',
    router: myRouter,
    template:`
        <section class="main">
            <app-header></app-header>
            <main>
                <router-view></router-view>
            </main>
            <user-msg />
        </section>
    `,
    components:{
        appHeader,
        userMsg
    }
}





const app = new Vue(options)