<template>
  <div
    ref="wrapper"
    class="modal-wrapper"
    tabindex="0"
    @keydown.esc="closeModal"
  >
    <div class="flat close-button" @click="closeModal()">
      <span class="visually-hidden">Close</span
      ><span class="icon icon-close">X</span>
    </div>
    <div class="text-wrapper constrained">
      <nuxt-content :document="content" />
      <button class="inline-close-button bright centered" @click="closeModal()">
        <span>Explore the map</span><IconArrow />
      </button>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const wrapper = this.$refs.wrapper;

    if (wrapper) {
      wrapper.focus();
      console.log("focusing");
    }
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

