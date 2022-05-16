<template>
  <div :class="['toast', {show}]" role="alert" aria-live="assertlive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">{{ title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" @click="close"></button>
    </div>
    <div class="toast-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue-demi'

export default {
  name: 'SimpleToast',
  props: {
    title: {
      type: String,
      default: 'Info'
    }
  },
  setup (props, { emit }) {
    const show = ref(true)
    const close = () => {
      show.value = false
      emit('closed', true)
    }

    onMounted(() => {
      setTimeout(() => {
        close()
      }, 15000)
    })

    return {
      show,
      close
    }
  }
}
</script>
