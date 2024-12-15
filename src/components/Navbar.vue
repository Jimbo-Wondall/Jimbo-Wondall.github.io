<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/projects">Projects</router-link></li>
            <li><router-link to="/apiaccess">API Access</router-link></li>
            <li><router-link to="/game">Game</router-link></li>
        </ul>
    </nav>
</template>

<style>
nav {
    background-color: #2196f3;
    color: white;
    padding: 10px;
}

ul {
    list-style: none;
    display: flex;
    gap: 15px;
    margin: 0;
    padding: 0;
}

li {
    margin: 0;
}

a {
    color: white;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
