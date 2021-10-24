<template>
  <div class="talkback">
    <div class="text-wrapper left">
      <h1>Talkback</h1>
      <nuxt-content :document="data" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.talkback {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .text-wrapper {
    text-align: center;
    &.left {
      p {
        text-align: left;
      }
    }
  }
}
</style>
