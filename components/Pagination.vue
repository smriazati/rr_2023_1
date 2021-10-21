<template>
  <nav ref="pagination" class="pagination">
    <nuxt-link :to="link" class="wrapper">
      <h3>Next section</h3>
      <span class="cta" :to="link"
        >{{ message }} <IconArrow class="icon-light"
      /></span>
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isCollapsed: false,
    };
  },
  mounted() {
    const ref = this.$refs.pagination;
    if (ref) {
      // this.dragElement(this.$refs.pagination);
    }
  },
  methods: {
    dragElement(elmnt) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

      const draggableItemWidth = 300;
      const draggableItemHeight = elmnt.offsetHeight;
      elmnt.onmousedown = dragMouseDown;

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:

        if (
          e.clientX < window.innerWidth - draggableItemWidth &&
          e.clientX > 0
        ) {
          pos1 = pos3 - e.clientX;
          pos3 = e.clientX;
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }

        if (
          e.clientY < window.innerHeight - draggableItemHeight &&
          e.clientY > 0
        ) {
          pos2 = pos4 - e.clientY;
          pos4 = e.clientY;
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        }

        // set the element's new position:
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    },
  },
};
</script>

<style lang="scss">
@keyframes slideIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes arrowBounce {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(15px);
  }
}

.pagination {
  // cursor: move; /* fallback if grab cursor is unsupported */
  // cursor: grab;
  // cursor: -moz-grab;
  // cursor: -webkit-grab;

  // /* (Optional) Apply a "closed-hand" cursor during drag operation. */
  // &:active {
  //   cursor: grabbing;
  //   cursor: -moz-grabbing;
  //   cursor: -webkit-grabbing;
  // }
  position: fixed;
  animation: slideIn 0.8s ease-in forwards;
  bottom: 25vh;
  right: 30px;
  // background: #000;
  color: #fff;
  text-align: center;
  min-width: 300px;
  min-height: 10vh;
  max-height: 15vh;
  z-index: 111;
  border-radius: 15px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  // border: 2px solid white;
  .wrapper {
    display: flex;

    flex-direction: column;
    padding: 15px;
  }
  transition: 0.2 ease-out all;
  &:hover {
    border-bottom-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  a,
  a * {
    background: transparent;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  .cta {
    display: flex;
    justify-content: center;
    > .icon {
      margin-left: 15px;
      animation: arrowBounce 0.9s ease-in alternate infinite;
    }
  }
  h3 {
    text-transform: uppercase;
    font-weight: 300;
    font-size: 14px;
  }
}
</style>
