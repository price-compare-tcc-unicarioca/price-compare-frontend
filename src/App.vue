<template>
  <app-promoter />
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        InCart
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{name: 'home'}" class="nav-link" active-class="active">
              <font-awesome-icon icon="house" :fixedWidth="true" />
              Home
            </router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link :to="{name: 'list-companies'}" class="nav-link" active-class="active">
              <font-awesome-icon icon="cart-shopping" :fixedWidth="true" />
              Supermarkets
            </router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link :to="{name: 'import-sheet'}" class="nav-link" active-class="active">
              <font-awesome-icon icon="file-import" :fixedWidth="true" />
              Import Sheet
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="navbar-item dropdown" v-if="isAuthenticated">
            <a class="nav-link dropdown-toggle" href="#" id="navbarUserDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <font-awesome-icon icon="user" :fixedWidth="true" />
              {{ authenticatedUser.firstName }} {{ authenticatedUser.lastName }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarUserDropdown">
              <li>
                <a class="dropdown-item" href="#" @click="signOut">
                  <font-awesome-icon icon="right-from-bracket" :fixedWidth="true" />
                  Signout
                </a>
              </li>
            </ul>
          </li>
          <li class="navbar-item" v-else>
            <router-link :to="{name: 'sign-in'}" class="nav-link" active-class="active">
              <font-awesome-icon icon="right-to-bracket" :fixedWidth="true" />
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
import AppPromoter from '@/components/AppPromoter.vue'
import { useStore } from 'vuex'
import { computed } from 'vue-demi'
export default {
  components: {
    ToastContainer,
    AppPromoter
  },
  setup () {
    const store = useStore()
    const signOut = () => {
      store.dispatch('authentication/signOut')
    }

    return {
      isAuthenticated: computed(() => store.getters['authentication/isAuthenticated']),
      authenticatedUser: computed(() => store.getters['authentication/getAuthenticatedUser']),
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
