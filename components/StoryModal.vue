<template>
  <div
    ref="wrapper"
    class="modal-wrapper"
    tabindex="0"
    @keydown.esc="closeModal"
  >
    <div class="flat close-button" @click="closeModal()">
      <p class="visually-hidden">Close</p>
      <div class="icon icon-close"></div>
    </div>
    <div class="story-container">
      <div ref="textWrapper" class="text-wrapper">
        <nuxt-content :document="content.text" />
        <button
          class="inline-close-button bright centered"
          @click="closeModal()"
        >
          <span>Back to the map</span
          ><SystemIcon type="arrow" color="light" :width="25" />
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
.modal-container {
  display: flex;
  position: fixed;
  z-index: 113;
  top: 0;
  left: 0;
  animation: fadeIn 0.3s ease forwards;
  justify-content: center;
  height: calc(100% - 54px);

  @media (max-width: $mobile-bp) {
    height: 100%;
    height: 100vh;
  }

  &:not(.transparent) {
    background: rgba(0, 0, 0, 0.8);
  }

  width: 100%;

  .close-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9;

    &:hover {
      cursor: pointer;
    }
  }

  .modal-wrapper {
    position: relative;
    z-index: 11;
  }
}

.modal-wrapper {
  &:not(.transparent) {
    background: black;
  }

  // background: black;
  color: white;

  &:not(.full-width) {
    width: 1280px;
    max-width: 1280px;
    padding: 100px 30px;
  }

  &.full-width {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  border: 0;
  outline: 0;

  @media (max-width: 1280px) {
    width: 90%;
    max-width: 90%;
  }

  height: 100%;
  overflow-y: scroll;

  h1,
  h2,
  h3 {
    text-align: center;
  }
}

.wrapper:focus {
  outline: 0;
  border: none;
}

@media (max-width: $mobile-bp) and (orientation: landscape) {
  .story-container .image-wrapper figure {
    // max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    img {
      flex: 0 0 400px;
      object-fit: contain;
      overflow: hidden;
    }
  }
}

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

  @media (max-width: $mobile-bp) {
    display: flex;
    flex-direction: column;
  }
}
</style>