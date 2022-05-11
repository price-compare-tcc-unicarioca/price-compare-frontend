<template>
  <div class="about">
    <h1>Sign up</h1>
    <hr>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="first-name" class="form-label">First name</label>
          <input id="first-name"
                  type="text"
                  :class="{'form-control': true, 'is-invalid': v$.firstName.$invalid && v$.firstName.$dirty}"
                  placeholder="John"
                  required
                  @blur="v$.firstName.$touch"
                  v-model="firstName">
          <div v-if="v$.firstName.required.$invalid && v$.firstName.$dirty" class="invalid-feedback">
            Required field
          </div>
        </div>
        <div class="form-group">
          <label for="last-name" class="form-label">Last name</label>
          <input id="last-name"
                  type="text"
                  :class="{'form-control': true, 'is-invalid': v$.lastName.$invalid && v$.lastName.$dirty}"
                  placeholder="Snow"
                  required
                  @blur="v$.lastName.$touch"
                  v-model="lastName">
          <div v-if="v$.lastName.required.$invalid && v$.lastName.$dirty" class="invalid-feedback">
            Required field
          </div>
        </div>
        <div class="form-group">
          <label for="email" class="form-label">E-mail</label>
          <input id="email"
                  type="text"
                  :class="{'form-control': true, 'is-invalid': v$.email.$invalid && v$.email.$dirty}"
                  placeholder="name@example.com"
                  required
                  @blur="v$.email.$touch"
                  v-model="email">
          <div v-if="v$.email.required.$invalid && v$.email.$dirty" class="invalid-feedback">
            Required field
          </div>
          <div v-if="v$.email.email.$invalid && v$.email.$dirty" class="invalid-feedback">
            Must be a valid e-mail
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input id="password"
                  type="password"
                  :class="{'form-control': true, 'is-invalid': v$.password.$invalid && v$.password.$dirty}"
                  @blur="v$.password.$touch"
                  v-model="password">
          <password-meter :password="password" v-show="password && password.length > 0" />
          <div v-if="v$.password.required.$invalid && v$.password.$dirty" class="invalid-feedback">
            Required field
          </div>
          <div v-if="v$.password.minLength.$invalid && v$.password.$dirty" class="invalid-feedback">
            Must be at least 6 characters
          </div>
        </div>
        <div class="form-group">
          <label for="confirm-password" class="form-label">Confirm password</label>
          <input id="confirm-password"
                  type="password" :class="{'form-control': true, 'is-invalid': v$.confirmPassword.$invalid && v$.confirmPassword.$dirty}"
                  @blur="v$.confirmPassword.$touch"
                  v-model="confirmPassword">
          <div v-if="v$.confirmPassword.required.$invalid && v$.confirmPassword.$dirty" class="invalid-feedback">
            Required field
          </div>
          <div v-if="v$.confirmPassword.sameAsPassword.$invalid && v$.confirmPassword.$dirty" class="invalid-feedback">
            Must be the same value at the password
          </div>
        </div>
      </div>
      <div class="col-12 mt-2 text-end">
        <button class="btn btn-secondary" type="button" :disabled="v$.$invalid" @click="signup">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import PasswordMeter from 'vue-simple-password-meter'
import { ref } from 'vue-demi'

export default {
  components: {
    PasswordMeter
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
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const signup = () => {
      console.log({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      })
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
