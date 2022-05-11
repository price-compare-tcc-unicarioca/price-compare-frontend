<template>
  <div class="home">
    <EANProvider />
  </div>
</template>

<script>
import EANProvider from '@/components/EANProvider.vue'

export default {
  name: 'HomeView',
  components: {
    EANProvider
  },
  setup () {
  }
}
</script>
