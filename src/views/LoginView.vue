<template>
  <div class="container">
    <h1>Login</h1>
    <hr>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="email" class="form-label">E-mail</label>
          <input id="email" type="text" class="form-control" placeholder="name@example.com">
        </div>
        <div class="form-group">
          <label for="pass" class="form-label">Password</label>
          <input id="pass" type="password" class="form-control">
        </div>
      </div>
    </div>
    <div class="row mt-2 justify-content-end">
      <div class="col-auto">
        <router-link to="/signup" class="btn btn-light">
          Signup
        </router-link>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  </div>
</template>
