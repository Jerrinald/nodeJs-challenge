<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // Importer useStore pour accéder au store Vuex

const router = useRouter();
const store = useStore(); // Récupérer le store Vuex

// Effectuez la déconnexion lorsque le composant est monté
onMounted(() => {
  logoutUser();
});

// Fonction pour effectuer la déconnexion
async function logoutUser() {
  try {
    // Effectuer un appel API pour déconnecter l'utilisateur du serveur
    // Par exemple, si vous utilisez des tokens JWT, vous pouvez envoyer une demande pour invalider le token côté serveur
    // Remplacez 'http://localhost:3100/logout' par l'URL de votre API de déconnexion
    console.log(localStorage.getItem('token'));
    const response = await fetch('http://127.0.0.1:3100/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // Vérifier si la déconnexion s'est effectuée avec succès
    if (response.ok) {
      // Appeler l'action 'logout' du store pour effectuer la déconnexion
      store.dispatch('logout');

      // Rediriger vers la page d'accueil
      router.push('/');
    } else {
      // En cas d'erreur lors de la déconnexion, afficher un message d'erreur ou effectuer d'autres actions nécessaires
      console.error('Erreur lors de la déconnexion');
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la déconnexion:', error.message);
  }
}
</script>
