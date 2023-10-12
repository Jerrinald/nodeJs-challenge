<template>
    <div class="home ">
        <div>
            <div class="">
                <h2>Contact </h2>
                <form >
                  <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email">
                  </div>

                  <div>
                    <label for="password">Nom:</label>
                    <input type="password" id="password" >
                  </div>

                  <div>
                    <label for="password">Suject:</label>
                    <input type="text" id="suject">
                  </div>
                  <button type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
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