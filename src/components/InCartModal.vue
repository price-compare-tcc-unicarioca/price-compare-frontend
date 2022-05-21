<template>
  <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="title"></slot>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot v-if="isOpen"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import { onMounted, ref } from 'vue-demi'

export default {
  props: {
    id: String
  },
  setup (props, { emit }) {
    const modal = ref(null)
    const isOpen = ref(false)
    const bootstrapModal = ref(null)

    const show = () => {
      bootstrapModal.value?.show()
    }

    const hide = () => {
      bootstrapModal.value?.hide()
    }

    const toggle = () => {
      bootstrapModal.value?.toggle()
    }

    onMounted(() => {
      bootstrapModal.value = new Modal(modal.value, {
        keyboard: false
      })

      modal.value.addEventListener('shown.bs.modal', () => {
        isOpen.value = true
        emit('opened')
      })

      modal.value.addEventListener('hidden.bs.modal', () => {
        isOpen.value = false
        emit('closed')
      })
    })

    return {
      modal,
      isOpen,
      show,
      hide,
      toggle
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
