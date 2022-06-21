<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <auth-nav></auth-nav>
    <auth-card class="basecard">
      <h1>Iniciar Sesión</h1>
      <h2>
        Bienvenido 👋🏼 <br />
        inicia sesión y empieza
      </h2>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Correo</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid" class="incorrect">
          ⚠️ El correo o la contraseña es incorrecta, inténtalo de nuevo
        </p>
        <div class="info">
          <div class="form-control, check">
            <input
              type="checkbox"
              id="checkpass"
              name="checkpass"
              value="checkpass"
            />
            <label for="checkpass"> Recordarme</label>
          </div>
          <p>¿Has olvidado tu <br />contraseña?</p>
        </div>
        <base-button class="auth-button">{{ submitButtonCaption }}</base-button>
      </form>
      <div class="or">
        <hr />
        <p>o</p>
        <hr />
      </div>
      <base-button
        type="button"
        mode="flat"
        class="register, auth-button"
        @click="switchAuthMode"
        >{{ switchModeButtonCaption }}</base-button
      >
    </auth-card>
  </div>
</template>

<script>
import AuthNav from "@/components/layout/AuthNav.vue";

export default {
  components: {
    AuthNav,
  },
  emits: ["save-data"],
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Iniciar sesión";
      } else {
        return "Regístrate gratis";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Regístrate gratis";
      } else {
        return "Iniciar sesión";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
        this.$router.replace("/employees");
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
* {
  color: white;
  justify-content: center;
  align-items: center;
}

.basecard {
  min-height: 75vh;
}
h1 {
  text-transform: uppercase;
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #ffe100;
  margin-top: 2rem;
}
h2 {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 26px;
  line-height: 35px;
  margin-bottom: 2rem;
  margin-top: 2rem;
}

.form-control {
  margin: 0.5rem 0;
}
input {
  color: #092e23;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 20px;
  height: 3rem;
  width: 15rem;
  border: none;
  box-shadow: 0 2px 8px rgba(228, 228, 228, 0.3);
}

.form-control label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14;
}
.check {
  display: flex;
  flex-direction: row;
  font-weight: 300;
  font-size: 14px;
  text-align: left;
  margin-bottom: 2rem;
  margin-right: 1rem;
  align-items: space-between;
}

.info {
  display: flex;
  align-content: center;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

p {
  margin-top: 0px;
  font-weight: 200;
  font-size: 14px;
  text-align: left;
}

.incorrect {
  font-weight: 200;
  font-size: 14px;
  text-align: center;
}
input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
}

.auth-button {
  min-width: 12rem;
}

hr {
  /* transform: rotate(90deg); */
  margin: 0 50px;
  padding: 0;
  border: 2px thin white;
  width: 10%;
}

.or {
  display: flex;
  justify-content: center;
  margin: 1rem;
}

.register {
  background-color: white;
}
</style>
