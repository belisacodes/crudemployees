<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #ffe100;
  color: #032b28;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  border: none;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #869D96;
  color: white;
}

.flat {
  background-color: white;
  color: #092E23;
  border: none;
}

.main {
  background-color: #092E23;
  color: white;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #869D96;
  color: white;
}
</style>
