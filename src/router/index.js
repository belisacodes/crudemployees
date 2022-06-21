import { createRouter, createWebHistory } from "vue-router";

import AddEmployee from "../views/AddEmployee.vue";
import EmployeesList from "../views/EmployeesList.vue";

import EditEmployee from "../views/EditEmployee.vue";

import NotFound from "../views/NotFound.vue";
import UserAuth from "../views/UserAuth.vue";
// import store from "../store/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/auth" },
    { path: "/auth", component: UserAuth },

    {
      path: "/employees",
      component: EmployeesList,
      meta: { requiresAuth: true },
    },

    {
      path: "/employee/:employeeId",
      component: EditEmployee,
      props: true,
    },

    {
      path: "/create-employee",
      component: AddEmployee,
      meta: { requiresAuth: true },
    },

    { path: "/:notFound(.*)", component: NotFound },
  ],
});

// router.beforeEach(function (to, _, next) {
//   if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
//     next("/auth");
//   } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
//     next("/employees");
//   } else {
//     next();
//   }
// });

export default router;
