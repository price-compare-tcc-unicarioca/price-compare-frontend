<template>
  <div class="container">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Sign in</li>
      </ol>
    </nav>
    <form id="sign-in-form" class="vertical-middle" @submit="signIn">
      <in-cart-input
        class="mb-3"
        type="email"
        label="E-mail address"
        v-model="email"
        :validation="v$.email" />

      <in-cart-input
        type="password"
        label="Password"
        v-model="password"
        :validation="v$.password" />

      <div class="mt-2 text-end">
          <router-link to="/sign-up" class="btn btn-light" role="button">
            Sign Up
          </router-link>
          <button type="submit" class="btn btn-primary" :disabled="v$.$invalid">
            Login
          </button>
      </div>
    </form>
  </div>
</template>
<script>
import { email, required } from '@vuelidate/validators'
import { ref } from 'vue-demi'
import useVuelidate from '@vuelidate/core'
import { useStore } from 'vuex'

import InCartInput from '@/components/InCartInput.vue'

export default {
  components: {
    InCartInput
  },
  validations () {
    return {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  setup () {
    const store = useStore()

    const email = ref(null)
    const password = ref(null)
    const signIn = (e) => {
      store.dispatch('authentication/signIn', {
        email: email.value,
        password: password.value
      })

      e.preventDefault()
    }

    return {
      v$: useVuelidate(),
      email,
      password,
      signIn
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
