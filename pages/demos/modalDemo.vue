<template>
  <div class="modal-container">
    <StoryModal :content="page" @close-modal="closeModal" />
  </div>
</template>
<script>
export default {
  async asyncData({ $content }) {
    const page = await $content("02/chumot_house").fetch();
    return {
      page,
    };
  },
  methods: {
    closeModal() {},
  },
};
</script>
