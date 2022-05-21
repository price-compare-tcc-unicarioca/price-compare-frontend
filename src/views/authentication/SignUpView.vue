<template>
  <div class="container">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link :to="{name: 'sign-in'}" role="button">Sign in</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Sign up</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-sm-6">
        <in-cart-input
          id="first-name"
          type="text"
          label="First name"
          v-model="firstName"
          :validation="v$.firstName" />
      </div>
      <div class="col-sm-6">
        <in-cart-input
          id="last-name"
          type="text"
          label="Last name"
          v-model="lastName"
          :validation="v$.lastName" />
      </div>
      <div class="col-12 mt-3 mb-3">
        <in-cart-input
          id="email"
          type="email"
          label="E-mail address"
          v-model="email"
          :validation="v$.email" />
      </div>
      <div class="col-sm-6">
        <in-cart-input
          id="password"
          type="password"
          label="Password"
          v-model="password"
          :validation="v$.password" />
        <password-meter :password="password" v-show="password && password.length > 0" />
      </div>
      <div class="col-sm-6">
        <in-cart-input
          id="confirm-password"
          type="password"
          label="Confirm password"
          v-model="confirmPassword"
          :validation="v$.confirmPassword" />
      </div>
    </div>
    <div class="mt-2 text-end">
      <router-link to="/sign-in" class="btn" role="button">Login</router-link>
      <button class="btn btn-secondary" type="button" :disabled="v$.$invalid" @click="signup">Sign Up</button>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import PasswordMeter from 'vue-simple-password-meter'
import { ref } from 'vue-demi'
import { useStore } from 'vuex'

import InCartInput from '@/components/InCartInput.vue'

export default {
  components: {
    PasswordMeter,
    InCartInput
  },
  validations () {
    return {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        minLength: minLength(6),
        required
      },
      confirmPassword: {
        sameAsPassword: sameAs(this.password),
        required
      }
    }
  },
  setup () {
    const store = useStore()

    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const signup = (e) => {
      store.dispatch('authentication/signUp', {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      })

      e.preventDefault()
    }

    return {
      v$: useVuelidate(),
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      signup
    }
  }
}
</script>
