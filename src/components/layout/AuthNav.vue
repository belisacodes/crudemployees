<template>
  <header>
    <nav>
      <img src="./logo.png" alt="" />
      <p>
        ¿No tienes cuenta?
        <router-link to="/register" class="router"
          >Regístrate gratis</router-link
        >
      </p>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #092e23;
}

header a {
  text-decoration: none;
  font-weight: 600;
  color:#092e23
}

header nav {
  width: 90%;
  margin: auto;
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
