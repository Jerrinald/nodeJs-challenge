<template>
  <!DOCTYPE html>
  <!-- En-tête du site -->
  <header>
    <h1>Ma Boutique en Ligne</h1>
    <nav>
      <!-- Menu de navigation (par exemple: Accueil, Produits, Panier, Connexion, etc.) -->
      <ul>
        <li><a href="#">Accueil</a></li>
        <li><a href="/products">Produits</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/">Panier</a></li>
        <li><a href="#">Connexion</a></li>
      </ul>
    </nav>
  </header>

  <!-- Contenu principal de la page d'accueil -->
  <main>
    <section class="banner">
      <!-- Bannière promotionnelle ou image attrayante -->
      <img src="banner.jpg" alt="Bannière promotionnelle">
    </section>

    <section class="featured-products">
      <!-- Produits vedettes ou en promotion -->
      <h2>Produits Vedettes</h2>
      <div class="product-grid">
        <!-- Exemple de produit avec image, nom et prix -->
        <div class="product-item">
          <img src="product1.jpg" alt="Produit 1">
          <h3>Nom du Produit 1</h3>
          <p>Prix : 25€</p>
        </div>

        <div class="product-item">
          <img src="product2.jpg" alt="Produit 2">
          <h3>Nom du Produit 2</h3>
          <p>Prix : 30€</p>
        </div>

        <!-- Ajoutez plus de produits vedettes ici -->
      </div>
    </section>

    <!-- Section supplémentaire (peut-être des témoignages de clients, des catégories de produits, etc.) -->
    <section class="extra-section">
      <h2>Témoignages de Clients</h2>
      <div class="testimonial-grid">
        <!-- Exemple de témoignage client -->
        <div class="testimonial-item">
          <p>"J'adore ce site ! Les produits sont de qualité et le service client est excellent."</p>
          <p>- Jean Dupont</p>
        </div>

        <div class="testimonial-item">
          <p>"Livraison rapide et emballage soigné. Je recommande ce site sans hésitation !"</p>
          <p>- Marie Martin</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
// Vous pouvez ajouter du code logique ici si nécessaire
</script>

<style scoped>
/* Vos styles CSS pour la page d'accueil ici */
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-center  {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
