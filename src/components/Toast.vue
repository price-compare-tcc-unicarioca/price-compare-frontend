<template>
  <div :class="['toast', 'align-items-center', 'text-bg-warning', 'border-0', {show}]" role="alert" aria-live="assertlive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        <slot></slot>
      </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" @click="close"></button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue-demi'

export default {
  name: 'SimpleToast',
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
