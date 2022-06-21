<template>
  <section>
    <side-nav></side-nav>
    <div class="title">
      <font-awesome-icon icon="users" size="1x" />
      <h1>Crear empleado</h1>
    </div>
    <form @submit.prevent="createEmployee">
      <section class="form-section">
        <register-card class="form-card">
          <div class="form-control" :class="{ invalid: !firstName.isValid }">
            <label for="firstname">Nombre</label>
            <input
              type="text"
              v-model="firstName.val"
              @blur="clearValidity('firstName')"
            />
            <p v-if="!firstName.isValid">👀 El nombre no puede estar vacío</p>
          </div>
          <div class="form-control" :class="{ invalid: !lastName.isValid }">
            <label for="lastname">Apellido</label>
            <input
              type="text"
              v-model="lastName.val"
              @blur="clearValidity('lastName')"
            />
            <p v-if="!lastName.isValid">🧐 El apellido no puede estar vacío</p>
          </div>
          <div class="form-control" :class="{ invalid: !company.isValid }">
            <label for="company">Empresa</label>

            <input
              type="text"
              v-model="company.val"
              @blur="clearValidity('company')"
            />
            <p v-if="!company.isValid">
              📋 Completa el nombre de la empresa para continuar
            </p>
          </div>
          <div class="form-control" :class="{ invalid: !rate.isValid }">
            <label for="rate">Coste/h</label>

            <input
              type="number"
              v-model="rate.val"
              @blur="clearValidity('rate')"
            />
            <p v-if="!rate.isValid">🤑 El coste tiene que ser mayor que 0</p>
          </div>
          <div class="form-control" :class="{ invalid: !email.isValid }">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="email.val"
              @blur="clearValidity('email')"
            />
            <p v-if="!email.isValid">📫 No recibirás spam</p>
          </div>
          <div class="form-control" :class="{ invalid: !areas.isValid }">
            <h3>Areas</h3>
            <div>
              <input
                type="checkbox"
                id="productor"
                value="productor"
                v-model="areas.val"
                @blur="clearValidity('areas')"
              />
              <label for="productor">Productor</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="tecnico"
                value="tecnico"
                v-model="areas.val"
                @blur="clearValidity('areas')"
              />
              <label for="tecnico">Técnico</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="aplicador"
                value="aplicador"
                v-model="areas.val"
                @blur="clearValidity('areas')"
              />
              <label for="aplicador">Aplicador</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="distribuidor"
                value="distribuidor"
                v-model="areas.val"
                @blur="clearValidity('areas')"
              />
              <label for="distribuidor">Distribuidor</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="operario"
                value="operario"
                v-model="areas.val"
                @blur="clearValidity('areas')"
              />
              <label for="operario">Operario</label>
            </div>
            <p v-if="!areas.isValid">
              🎉 Tienes que seleccionar almenos un area
            </p>
          </div>
          <p v-if="!formIsValid">
            Upss... Soluciona los problemas marcados y vuelve a enviarlo.
          </p>
          <div class="button">
            <base-button class="main">Crear empleado</base-button>
          </div>
        </register-card>
      </section>
    </form>
  </section>
</template>

<script>
import employeesColRef from "../firebase.js";
import { addDoc } from "firebase/firestore";
export default {
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      company: {
        val: "",
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      email: {
        val: null,
        isValid: true,
      },

      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.company.val === "") {
        this.company.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (!this.email.val || this.email.val === "") {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    async createEmployee() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      const formData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        company: this.company.val,
        rate: this.rate.val,
        areas: this.areas.val,
        email: this.email.val,
      };
      console.log("Creating Document");
      const addedDoc = await addDoc(employeesColRef, formData);
      alert("Document created successfully!");
      console.log(addedDoc);
      this.$router.push("/employees");
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

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
