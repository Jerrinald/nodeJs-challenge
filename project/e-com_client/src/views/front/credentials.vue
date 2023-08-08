<template>
    <div>
        <h2>Connexion à l'API externe</h2>
        <form @submit.prevent="login">
            <div>
                <label for="username">Nom d'utilisateur :</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div>
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div>
                <label for="clientId">Client ID :</label>
                <input type="text" id="clientId" v-model="clientId" required />
            </div>
            <div>
                <label for="clientSecret">Client Secret :</label>
                <input type="password" id="clientSecret" v-model="clientSecret" required />
            </div>
            <button type="submit">Se connecter</button>
        </form>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            clientId: "",
            clientSecret: "",
            errorMessage: "",
        };
    },
    methods: {
        async login() {
            try {
                // Remplacez cette partie par l'appel réel à l'API externe pour vous connecter
                // Exemple : const response = await axios.post('url_de_l_api', { username: this.username, password: this.password, clientId: this.clientId, clientSecret: this.clientSecret });
                // Gérez la réponse en conséquence

                // Pour l'exemple, affichons simplement un message de succès
                alert("Connecté avec succès !");
            } catch (error) {
                this.errorMessage = "Erreur lors de la connexion. Veuillez vérifier vos informations d'identification.";
                console.error(error);
            }
        },
    },
};
</script>
  
<style>
.error {
    color: red;
}
</style>
  