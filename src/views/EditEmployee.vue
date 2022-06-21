<template>
  <section>
    <side-nav></side-nav>
    <div class="title">
      <font-awesome-icon icon="users" size="1x" />
      <h1>Editar empleado</h1>
    </div>
    <form @submit.prevent="updateEmployee">
      <section class="form-section">
        <register-card class="form-card">
          <div>
            <label for="firstname">Nombre</label>
            <input type="text" v-model="employeeInfo.firstName" />
          </div>
          <div>
            <label for="lastname">Apellido</label>
            <input type="text" v-model="employeeInfo.lastName" />
          </div>
          <div>
            <label for="company">Empresa</label>
            <input type="text" v-model="employeeInfo.company" />
          </div>
          <div>
            <label for="rate">Coste/h</label>
            <input type="number" v-model="employeeInfo.rate" />
          </div>
          <div>
            <label for="email">Email</label>
            <input
              type="email"
              v-model="employeeInfo.email"            />
          </div>
          <div>
            <h3>Areas</h3>
            <div>
              <input
                type="checkbox"
                id="productor"
                value="productor"
                v-model="employeeInfo.areas"
              />
              <label for="productor">Productor</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="tecnico"
                value="tecnico"
                v-model="employeeInfo.areas"
              />
              <label for="tecnico">Técnico</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="aplicador"
                value="aplicador"
                v-model="employeeInfo.areas"
              />
              <label for="aplicador">Aplicador</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="distribuidor"
                value="distribuidor"
                v-model="employeeInfo.areas"
              />
              <label for="distribuidor">Distribuidor</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="operario"
                value="operario"
                v-model="employeeInfo.areas"
              />
              <label for="operario">Operario</label>
            </div>
          </div>
          <div class="button">
            <base-button class="main">Actualiza empleado</base-button>
          </div>
        </register-card>
      </section>
    </form>
  </section>
</template>

<script>
import employeesColRef from "../firebase.js";
import { getDoc, doc, setDoc } from "firebase/firestore";
export default {
  data() {
    return {
      selectedEmployee: {},
      employeeId: null,
      docRef: null,
      employeeInfo: {
        firstName: null,
        lastName: null,
        company: null,
        rate: null,
        email: null,
        areas: [],
      },
    };
  },

  methods: {

    async getEmployee() {
      let employeeRef = doc(employeesColRef, this.employeeId);
      this.docRef = employeeRef;
      let employee = await getDoc(this.docRef);
      let employeeData = employee.data();
      this.employeeInfo.firstName = employeeData.firstName;
      this.employeeInfo.lastName = employeeData.lastName;
      this.employeeInfo.company = employeeData.company;
      this.employeeInfo.rate = employeeData.rate;
      this.employeeInfo.email = employeeData.email;
      this.employeeInfo.areas = employeeData.areas;
    },
    async updateEmployee() {
      await setDoc(this.docRef, this.employeeInfo);
      alert(
        `The employee with ID of ${this.employeeId} has been updated successfully!`
      );
      this.$router.push("/");
    },
        created() {
      let employeeId = this.$route.params.employeeId;
      this.employeeId = employeeId;
      this.getEmployee();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
}

.title h1 {
  font-weight: 700;
  font-size: 1.5rem;
  padding: 1rem;
}
.form-section {
  display: flex;
  flex-direction: row;
}

.form-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
}

.form-label h2 {
  padding: 0.5rem 0rem;
  font-size: 1.2rem;
  font-weight: 400;
}

.form-label p {
  font-size: 1rem;
  font-weight: 300;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-size: 15px;
  padding-top: 5px;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: none;
  border-radius: 30px;
  height: 2rem;
  padding-left: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

input:focus,
textarea:focus {
  background-color: #e5e6cf;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.button {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
</style>