/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import 'vuetify/styles'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'



const app = createApp(App)

registerPlugins(app)
// global variable
app.config.globalProperties.$API_URL = "https://dev-api.clue.io/api/";
app.config.globalProperties.$ANONYMOUS_EMAIL = "clue_demo@clue.io";
app.config.globalProperties.$ANONYMOUS_PWD="clue_anonymous";
app.config.globalProperties.$USER_KEY = '';
app.config.globalProperties.$PROJECT_RESOURCES = {};


app.mount('#app')
