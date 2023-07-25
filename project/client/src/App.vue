<template>
  <div class="app">
    <header>
      <nav class="navbar">
        <ul class="nav-items">
          <li class="nav-item">
            <router-link to="/">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">Produit</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">À Propos</router-link>
          </li>
        </ul>
        <ul class="nav-items">
          <li class="nav-item">
            <router-link to="/register">Inscription</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login">Connexion</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<style scoped>

    header {
      background-color: #333;
      color: #fff;
      padding: 1rem;
      margin-bottom: 20px;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .nav-items {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .nav-item:hover {
      background-color: #555;
    }
</style>
