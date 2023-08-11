<template>
    <div class="login-container">
        <h2>Connexion à l'API externe</h2>
        <form @submit.prevent="login" class="login-form">

            <div class="form-group">
                <label for="clientId">Client ID :</label>
                <input type="text" id="clientId" v-model="clientId" required />
            </div>

            <div class="form-group">
                <label for="clientSecret">Client Secret :</label>
                <input type="password" id="clientSecret" v-model="clientSecret" required />
                <button type="button" @click="toggleClientSecretVisibility">
                    {{ showClientSecret ? "Cacher" : "Afficher" }}
                </button>
                <div v-if="showClientSecret">
                    <p>Client Secret: {{ clientSecret }}</p>
                </div>
            </div>
            <button type="submit" class="login-button">Se connecter</button>
        </form>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <div v-if="credentialsExist">
            <p>Les crédentials existent déjà. Vous pouvez les mettre à jour :</p>
            <button @click="updateCredentials" class="update-button">Mettre à jour</button>
        </div>
        <div v-else>
            <p>Aucun crédential n'existe. Veuillez les renseigner :</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            clientId: "",
            clientSecret: "",
            errorMessage: "",
            credentialsExist: false,
            credentialsId: 1,
            showClientSecret: false,
        };
    },
    async mounted() {
        try {
            const response = await fetch(`http://localhost:3100/credential/1`);
            if (response.status === 200) {
                this.credentialsExist = true;
                const credentials = await response.json();
                this.clientId = credentials.clientId;
                this.clientSecret = credentials.clientSecret;
            }
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        toggleClientSecretVisibility() {
            this.showClientSecret = !this.showClientSecret;
        },
        async login() {
            try {
                if (this.credentialsExist) {
                    await this.updateCredentials();
                } else {
                    const response = await fetch('http://localhost:3100/credential', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: this.credentialsId,
                            clientId: this.clientId,
                            clientSecret: this.clientSecret
                        }),
                    });

                    if (response.status === 200) {
                        this.credentialsExist = true;
                        alert("Connecté avec succès !");
                    } else {
                        this.errorMessage = "Erreur lors de la connexion. Veuillez vérifier vos informations d'identification.";
                    }
                }
            } catch (error) {
                this.errorMessage = "Erreur lors de la connexion. Veuillez vérifier vos informations d'identification.";
                console.error(error);
            }
        },
        async updateCredentials() {
            try {
                const response = await fetch(`http://localhost:3100/credential/1`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clientId: this.clientId,
                        clientSecret: this.clientSecret
                    }),
                });

                if (response.ok) {
                    alert("Crédentials mis à jour avec succès !");
                } else {
                    this.errorMessage = "Erreur lors de la mise à jour des crédentials. Veuillez vérifier vos informations d'identification.";
                }
            } catch (error) {
                this.errorMessage = "Erreur lors de la mise à jour des crédentials. Veuillez vérifier vos informations d'identification.";
                console.error(error);
            }
        },
    },
};
</script>

<style>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.login-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.3s;
}

.login-button:hover {
    background-color: #0056b3;
}

.update-button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.3s;
}

.update-button:hover {
    background-color: #218838;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
