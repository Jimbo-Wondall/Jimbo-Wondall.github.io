<template>
  <div class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/projects">Projects</router-link>
    <router-link to="/apiaccess">API Access</router-link>
    <router-link to="/game">Game</router-link>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 30px;
  padding: 10px 20px;
  background-color: transparent;
  pointer-events: auto;
  z-index: 10;
  justify-content: space-around;
}

a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}
</style>

