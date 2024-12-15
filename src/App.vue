<template>
    <div id="app">
        <Navbar />
        <router-view /> <!-- Displays the component for the current route -->
        <Footer />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
    components: {
        Navbar,
        Footer,
    },
};
</script>

<style>
/* Add global styles here */
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f9f9f9;
}
</style>
