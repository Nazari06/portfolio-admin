import { createApp } from 'vue'
import App from './App.vue'
import routes from "./routes/route";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"


const app = createApp(App)
app.use(routes)
app.mount('#app')