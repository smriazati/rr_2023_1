<template>
  <nav ref="pagination" class="pagination" :class="back ? 'back-btn' : ''">
    <div class="tree-icon">
      <img src="/tree.svg" alt="" />
    </div>
    <nuxt-link :to="link" class="wrapper">
      <h3 v-if="!back" class="subheadline">Next section</h3>
      <h3 v-else class="subheadline">Previous section</h3>
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
    back: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isCollapsed: false,
    };
  },
};
</script>
<style lang='scss'>
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

@keyframes arrowBounceFlipped {
  from {
    transform: translateX(0px) rotate(180deg);
  }

  to {
    transform: translateX(-15px) rotate(180deg);
  }
}

.pagination {
  overflow: hidden;
  position: fixed;
  z-index: 130;
  border-radius: 5px;
  animation: slideIn 0.8s ease-in forwards;
  bottom: 100px;
  right: 30px;
  color: #fff;
  text-align: center;

  background: $gray;
  transition: 0.3s ease all;
  &:hover {
    background: $white;
  }

  .tree-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    text-align: left;
    img {
      margin-right: auto;
      height: 100%;
      object-fit: contain;
      object-position: left center;
      position: absolute;
      left: -17%;
      filter: grayscale(1);
    }
  }

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
    z-index: 5;
  }

  h3 {
    color: #fff;
  }

  a {
    background: $gray;
    transition: 0.3s ease background;
    &:hover {
      background: rgba($white, 0.8);
      color: $gray;
      * {
        color: $gray;
      }
      .icon-arrow {
        filter: grayscale(1) invert(0);
      }
    }

    min-width: 300px;
    min-height: 10vh;
    max-height: 15vh;

    @media (max-height: 800px) {
      max-height: 300px;
    }

    *:hover {
      text-decoration: none;
    }

    .cta {
      display: flex;
      justify-content: center;
      font-size: 22px;

      > .icon {
        margin-left: 15px;
        width: 30px;
        animation: arrowBounce 0.9s ease-in alternate infinite;
      }
    }
  }

  &.back-btn {
    left: 30px;
    right: unset;
    .tree-icon {
      left: unset;
      right: 0;
      img {
        left: unset;
        right: -47px;
      }
    }
    .cta {
      flex-direction: row-reverse;
      > .icon {
        margin-right: 15px;
        margin-left: unset;
        animation: arrowBounceFlipped 0.9s ease-in alternate infinite;
      }
    }
  }
}
// .pagination mobile positions
@media (max-width: $mobile-bp) {
  .occupation .pagination,
  .resistance .pagination {
    position: fixed;
  }
}
// .pagination mobile
@media (max-width: $mobile-bp) {
  .pagination {
    display: flex;
    position: relative;
    align-items: center;
    bottom: 0px !important;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;

    .wrapper {
      margin: 0 auto;
    }

    h3 {
      display: none;
    }
  }
}

// pagination custom positions
// @media (min-width: $mobile-bp) {
//   .occupation-talkback .pagination {
//     bottom: 75px;
//   }

//   .intro-stories-individual .pagination {
//     bottom: 100px;
//   }

//   .aftermath-stories-individual .pagination {
//     bottom: 100px;
//   }

//   .resistance-talkback .pagination {
//     bottom: 100px;
//   }
// }
</style>