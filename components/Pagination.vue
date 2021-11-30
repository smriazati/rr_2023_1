<template>
  <nav ref="pagination" class="pagination" :class="back ? 'back-btn' : ''">
    <nuxt-link :to="link" class="wrapper">
      <h3 v-if="!back">Next section</h3>
      <h3 v-else>Previous section</h3>
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

  animation: slideIn 0.8s ease-in forwards;
  bottom: 25vh;
  right: 30px;
  color: #fff;
  text-align: center;

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
  }

  h3 {
    color: #fff;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 14px;
  }

  a {
    // box-shadow: 0 0 30px #091502d6;
    background: $gray;
    transition: 0.3s ease background;
    &:hover {
      background: $forest;
    }
    // overflow: hidden;
    @media (min-width: $mobile-bp) {
      border-radius: 15px;
    }
    min-width: 300px;

    min-height: 10vh;
    max-height: 15vh;

    @media (max-height: 800px) {
      max-height: 300px;
    }
    // // hover FX
    // transition: 0.3s ease all;
    // * {
    //   position: relative;
    // }
    // &:before {
    //   content: "";
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 200%;
    //   height: 100%;
    //   background: $forest;
    //   transition: 0.9s ease-out all;
    //   transform: translateX(-100%);
    //   @media (min-width: $mobile-bp) {
    //     border-radius: 15px;
    //   }
    //   overflow: hidden;
    // }

    // &:hover {
    //   // background: $gray;
    //   &:before {
    //     transform: translateX(0%);
    //   }
    // }
  }
  *:hover {
    text-decoration: none;
  }

  .cta {
    display: flex;
    justify-content: center;

    > .icon {
      margin-left: 15px;
      animation: arrowBounce 0.9s ease-in alternate infinite;
    }
  }
}

.pagination.back-btn {
  left: 30px;
  right: unset;
  .cta {
    flex-direction: row-reverse;
    > .icon {
      margin-right: 15px;
      margin-left: unset;
      animation: arrowBounceFlipped 0.9s ease-in alternate infinite;
    }
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
@media (min-width: $mobile-bp) {
  .resistance .pagination {
    bottom: 45vh;
  }

  .occupation-talkback .pagination {
    bottom: 75px;
  }

  .intro-stories-individual .pagination {
    bottom: 100px;
  }

  .aftermath-stories-individual .pagination {
    bottom: 100px;
  }

  .resistance-talkback .pagination {
    bottom: 100px;
  }
}

// .pagination mobile positions
@media (max-width: $mobile-bp) {
  .occupation .pagination,
  .resistance .pagination {
    position: fixed;
  }
}
</style>