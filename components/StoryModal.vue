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
    <div class="story-container">
      <div ref="textWrapper" class="text-wrapper">
        <nuxt-content :document="content.text" />
        <button
          class="inline-close-button bright centered"
          @click="closeModal()"
        >
          <span>Back to the map</span><IconArrow />
        </button>
      </div>
      <div ref="imageWrapper" class="image-wrapper">
        <nuxt-content :document="content.images" />
      </div>
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
    }
    this.showTitlesAsCaption();
    this.initLightbox();
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    initLightbox() {
      const boxes = document.querySelectorAll('[data-lightbox="true"]');
      if (!boxes) {
        return;
      }
      // console.log(boxes);
      boxes.forEach((box) => {
        box.classList.add("hover-cursor");
        box.addEventListener("click", () => {
          // console.log(e, box);
          box.classList.toggle("lightbox-expanded");
        });
      });
    },
    showTitlesAsCaption() {
      const ref = this.$refs.imageWrapper;
      if (!ref) {
        return;
      }
      // console.log("ref", ref);
      const imgs = Array.from(ref.querySelectorAll("img:not(.icon)"));
      if (!imgs) {
        return;
      }
      // console.log("imgs", imgs);
      imgs.forEach((img) => {
        const figure = document.createElement("figure");

        const parent = img.parentElement;
        parent.dataset.lightbox = "true";
        figure.appendChild(img);
        const title = img.title;
        if (title) {
          const caption = document.createElement("figcaption");
          caption.innerHTML = title;
          figure.appendChild(caption);
        }
        parent.appendChild(figure);
      });
    },
  },
};
</script>

<style lang="scss">
.story-container {
  display: grid;
  max-width: 1000px;
  margin: 0 auto;
  grid-template-columns: minmax(200px, 50ch) 2fr;
  // @media (min-width: 1280px) {
  //   grid-template-columns: 1fr 2fr;
  // }
  grid-gap: 30px;
  .image-wrapper {
    figure {
      margin-bottom: 30px;
    }
  }
}
</style>