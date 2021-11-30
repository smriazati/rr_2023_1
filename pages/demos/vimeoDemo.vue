<template>
  <div class="test">
    <VimeoComponent vidId="650434630" />
  </div>
</template>

<script>
// https://github.com/dobromir-hristov/vue-vimeo-player

export default {
  data() {
    return {
      options: {
        controls: false,
        loop: false,
        autoplay: true,
        muted: true,
      },
    };
  },
};
</script>
