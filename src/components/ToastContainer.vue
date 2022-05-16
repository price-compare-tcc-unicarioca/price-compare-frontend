<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <template v-for="({ title, payload }) in toasts" :key="payload">
      <Toast :title="title" @closed="onClosed(title)">
        {{ payload }}
      </Toast>
    </template>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
import { computed } from 'vue-demi'
import { useStore } from 'vuex'

export default {
  components: {
    Toast
  },
  setup () {
    const store = useStore()
    const onClosed = (title) => {
      store.commit('toast/clearToast', title)
    }

    return {
      toasts: computed(() => store.state.toast.toasts),
      onClosed
    }
  }
}
</script>
