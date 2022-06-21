<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    text() {
      return this.title.toUpperCase();
    }
  }
}
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem ;
  display: inline-block;
  
}

.productor {
  background-color: #135eae;
  color: white;
}

.tecnico {
  background-color: #165405;
  color: white;
}

.aplicador {
  background-color: #8b9d78;
  color: white;
}

.distribuidor {
  background-color: #7c6552;
  color: white;
}

.operario {
  background-color: #78959d;
  color: white;
}
</style>