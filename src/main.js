import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

//components:
import BaseCard from "./components/ui/BaseCard.vue";
import RegisterCard from "./components/ui/RegisterCard.vue";
import AuthCard from "./components/ui/AuthCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";
import SideNav from "./components/layout/SideNav.vue";

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate} from '@fortawesome/free-solid-svg-icons';

library.add(faUsers, faPlus, faTrash, faPen, faArrowsRotate);

const app = createApp(App);
app.use(router);
app.use(store);

//fontawesome
app.component('font-awesome-icon', FontAwesomeIcon);



//components:
app.component('base-card', BaseCard);
app.component('register-card', RegisterCard);
app.component('auth-card', AuthCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('side-nav', SideNav);

app.mount('#app');
