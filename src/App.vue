<template>
  <div class="app-container">
    <div class="app-frame">
      <div class="app-window">
        <router-view />
      </div>
    </div>
    <Navbar />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
    components: {
        Navbar,
    },
};
</script>

<style>
@font-face {
  font-family: 'AudioNugget';
  src: url('@/assets/fonts/AudioNugget.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'GoldenGirdle';
  src: url('@/assets/fonts/Golden Girdle.otf') format('opentype');
  font-style: normal;
}

@font-face {
    font-family: 'Kabisat';
    src: url('@/assets/fonts/Kabisat Demo-ItalicTall.ttf') format('truetype');
    font-style: normal;
    font-weight: normal;
}

@font-face {
  font-family: 'Acidic';
  src: url('@/assets/fonts/Acidic.TTF') format('truetype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'Cyrivendell';
  src: url('@/assets/fonts/Cyrivendell.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'DIGIFIT';
  src: url('@/assets/fonts/DIGIFIT.TTF') format('truetype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'Dodopop';
  src: url('@/assets/fonts/DodopopRegular.otf') format('opentype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'FALCON';
  src: url('@/assets/fonts/FALCON.TTF') format('truetype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'HOPALOPE';
  src: url('@/assets/fonts/HOPALOPE TRIAL.otf') format('opentype');
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: 'HOPALOPE';
  src: url('@/assets/fonts/HOPALOPE BUBBLE TRIAL.otf') format('opentype');
  font-style: bubble;
  font-weight: normal;
}

@font-face {
  font-family: 'Hybrid';
  src: url('@/assets/fonts/Hybrid_b.ttf') format('truetype');
  font-style: bold;
  font-weight: normal;
}

@font-face {
  font-family: 'Hybrid';
  src: url('@/assets/fonts/hybrid_o.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}

html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: black;
    font-family: 'AudioNugget', sans-serif;
}

.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.app-frame {
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-window {
  width: 100%;
  height: 100%;
  max-height: 85vh;
  background-color: #f9f9f9;
  border: 2px solid black;
  border-radius: 20px;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
