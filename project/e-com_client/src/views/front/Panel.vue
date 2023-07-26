<script setup>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
</script>

<template>
  <div>
    <Header />
    <main class="container">
      <table>
        <thead>
          <tr>
            <th colSpan="3">Mon panier</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>image</div>
              <div>Nom du produit</div>
            </td>
            <td><strong>55.99€</strong></td>
            <td>
              <div class="btn-group flex jce">
                <button class="btn btn-danger">Retirer</button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>image</div>
              <div>Nom du produit</div>
            </td>
            <td><strong>55.99€</strong></td>
            <td>
              <div class="btn-group flex jce">
                <button class="btn btn-danger">Retirer</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex jce">

        <button class="btn-primary">Valider mon panier</button>
      </div>
    </main>
    <Footer />
  </div>
  <section>
    <!-- <div v-if="!cartItems.length">Votre panier est vide</div>
        <ul v-else>
          <li v-for="item in cartItems" :key="item.id">
            {{ item.name }} - {{ item.price }} € - Quantité: {{ item.quantity }}
            <button @click="removeFromCart(item)">Retirer du panier</button>
          </li>
        </ul>
        <button @click="validateCart" v-if="cartItems.length">Valider le panier</button> -->
  </section>
</template>

<style scoped>
.banner-item {
  color: #000000;
}

strong{
  font-weight: bold;
}

.banner-item:hover {
  color: #F6931C;
}

s {
  color: rgb(156, 164, 172);
}

.last-article {
  color: red;
}

main{
  height: calc(100vh - 96px);
}
</style>