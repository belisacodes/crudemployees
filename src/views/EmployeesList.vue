<template>
  <side-nav></side-nav>
  <the-header></the-header>
  <div class="home">
    <section>
      <base-card>
        <div class="add">
          <base-button link to="/create-employee" class="main">
            <font-awesome-icon icon="plus" /> Crear</base-button
          >
        </div>
        <div class="title">
          <font-awesome-icon icon="users" size="2x" />
          <h1>Empleados</h1>
          <p>Aquí estan todos los trabajadores</p>
        </div>
        <div class="container">
          <table class="bordered">
            <thead class="header">
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Empresa</th>
                <th>Coste</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody class="list-group">
              <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.firstName }}</td>
                <td>{{ employee.lastName }}</td>
                <td>{{ employee.company }}</td>
                <td>{{ employee.rate }}</td>
                <td>{{ employee.email }}</td>
                <td>
                  <base-button class="button">
                    <router-link :to="{ path: `/employee/${employee.id}` }"
                      ><font-awesome-icon icon="pen" color="white"
                    /></router-link>
                  </base-button>
                  <base-button class="button">
                    <a href="#" @click="deleteEmployee(employee.id)">
                      <font-awesome-icon icon="trash" color="white" />
                    </a>
                  </base-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </base-card>
    </section>
  </div>
</template>

<script>
import SideNav from "../components/layout/SideNav.vue";
import TheHeader from "../components/layout/TheHeader.vue";

import employeesColRef from "../firebase.js";
import { getDocs, doc, deleteDoc } from "firebase/firestore";
export default {
  name: "EmployeesList",
  components: {
    SideNav,
    TheHeader,
  },
  data() {
    return {
      employees: [],
      selectedDoc: null,
    };
  },
  methods: {
    async fetchEmployees() {
      let employeesSnapShot = await getDocs(employeesColRef);
      let employees = [];
      employeesSnapShot.forEach((employee) => {
        let employeeData = employee.data();
        employeeData.id = employee.id;
        employees.push(employeeData);
      });
      console.log(employees);
      this.employees = employees;
    },
    async deleteEmployee(employeeId) {
      let employeeRef = doc(employeesColRef, employeeId);
      await deleteDoc(employeeRef);
      alert("Employee deleted successully!");
      this.$router.go();
    },
  },

  created() {
    this.fetchEmployees();
  },
};
</script>

<style scoped>
.add {
  display: flex;
  justify-content: flex-end;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
}

.title h1 {
  font-weight: 700;
  font-size: 1.5rem;
  padding: 1rem;
}

.title p {
  font-weight: 400;
  font-size: 1rem;
}
.container {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
}

thead {
  border-radius: 30px;
}
table {
  border-spacing: 0;
  width: 90%;
}

.bordered {
  border: solid #ccc 1px;
  border-radius: 6px;
}

.bordered {
  border: solid #ccc 1px;
  border-radius: 6px;
}

.bordered tr:hover {
  background: #fbf8e9;
}

.bordered th {
  padding: 10px;
  text-align: center;
  font-size: 0.9rem;
  text-transform: uppercase;
  background-color: #092e23;
  color: white;
  font-weight: 400;
}

.type {
  margin-right: 5px;
}
td {
  font-size: 0.8rem;
  text-align: center;
  padding: 10px;
}
li {
  display: flex;
}
ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.button {
  background-color: #608c80;
  color: white;
}
</style>
