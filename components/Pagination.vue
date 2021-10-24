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
