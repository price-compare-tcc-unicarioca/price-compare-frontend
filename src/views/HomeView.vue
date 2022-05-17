<template>
  <div class="home">
    <ean-provider @search-requested="onSearchRequested" />
  </div>
</template>

<script>
import EanProvider from '@/components/EanProvider.vue'

export default {
  components: {
    EanProvider
  },
  setup () {
    const onSearchRequested = (ean) => {
      console.log(ean)
    }

    return {
      onSearchRequested
    }
  }
}
</script>
