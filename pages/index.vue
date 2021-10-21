<template>
  <div :class="name">
    <div class="wrapper">
      <div class="image-wrapper">
        <img
          src="/images/01/bgimg.jpg"
          alt="Painting of figure walking into a forest"
        />
      </div>
      <div class="text-wrapper-container flex-col">
        <ExhibitLogo />
        <div class="text-wrapper center light flex-col">
          <h1 class="visually-hidden h3 collapsed-mb">
            Remembering Resistance
          </h1>
          <h2 class="h1 collapsed-mb">The Tuchyn Uprising</h2>
          <button><nuxt-link to="/1/">Enter Here</nuxt-link></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "home",
    };
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .exhibit-logo {
    margin-bottom: 30px;
  }
  .wrapper {
    background: #000;
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    .image-wrapper {
      width: 100%;
      height: 100vh;
      max-height: 100vh;
      max-width: 100vw;
      position: fixed;
      top: 0;
      left: 0;
      overflow: hidden;
      * {
        width: 100%;
        height: 100%;
      }
      img {
        object-fit: cover;
        transform: scale(3);
        opacity: 0.1;
        filter: blur(5px);
      }
    }
    .text-wrapper-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

