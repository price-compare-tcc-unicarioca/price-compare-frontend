<template>
  <nav class="navbar navbar-expand-sm bg-light mb-3">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        InCart
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="list-companies" class="nav-link" active-class="active" v-if="isAuthenticated">Supermercados</router-link>
          <router-link to="/import-sheet" class="nav-link" active-class="active" v-if="isAuthenticated">Importar planilha</router-link>
        </div>
      </div>
      <div class="d-flex">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link" @click="signOut">
              <font-awesome-icon icon="right-from-bracket" />
              Sign out
            </a>
          </li>
          <li class="nav-item" v-else>
            <router-link to="sign-in" class="nav-link" active-class="active">
              <font-awesome-icon icon="right-to-bracket" />
              Sign in
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
  <toast-container />
</template>

<script>
import ToastContainer from '@/components/ToastContainer.vue'
import { useStore } from 'vuex'
import { computed } from 'vue-demi'
export default {
  components: {
    ToastContainer
  },
  setup () {
    const store = useStore()
    const signOut = () => {
      store.dispatch('authentication/signOut')
    }

    return {
      isAuthenticated: computed(() => store.getters['authentication/isAuthenticated']),
      signOut
    }
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
}

h1, h2 {
  text-transform: uppercase;
  padding-bottom: 3px;
}

.hmin-100 {
  min-height: 100%;
}
</style>
