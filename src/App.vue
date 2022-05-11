<template>
  <div>
    <nav class="navbar navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img id="incart-nav-logo" src="./assets/logo.png" class="d-inline-block align-text-top" alt="logo" />
        </a>
      </div>
    </nav>
    <div id="page-content" class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
#incart-nav-logo {
  height: 26px;
}

#page-content {
  margin-top: 20px;
}
</style>
