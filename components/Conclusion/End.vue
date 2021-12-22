<template>
  <div class="conclusion-ending-slide">
    <div class="bg-image">
      <img src="/icons/tree.svg" alt="Tree icon" />
    </div>
    <div class="text-wrapper centered">
      <p>With this exhibit, we remember what happened.</p>
      <p class="small">
        As you leave the digital exhibit, consider these questions. How are
        people are treated as less-than in your community today? How can we as a
        community prevent intolerance and violence in all of its forms?
      </p>
      <nav>
        <button class="circle-btn bright">
          <nuxt-link to="/">Start over</nuxt-link>
        </button>
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
.conclusion.page .conclusion-ending-slide {
  background: $white;
  padding-top: 400px;
  height: 100vh;
  max-height: 100vh;
  padding-bottom: 25%;

  padding-bottom: 25vh;
  // @media (min-width: $collapse-bp) {
  //   margin-bottom: 54px;
  // }
  position: relative;
  .bg-image {
    opacity: 0.3;

    img {
      filter: grayscale(1) brightness(3);
    }
  }
  .text-wrapper {
    position: relative;
  }
  p {
    color: $gray;
    &.small {
      @include pStyle($gray);
    }
  }
  @media (max-width: 960px) {
    padding-top: 50vh;
    padding-bottom: 60px;

    button.align-left {
      margin: 0 auto;
    }
  }
}
</style>