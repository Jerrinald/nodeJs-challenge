<script setup>
</script>

<template>
    <section class="extra-section">
        <h2>Témoignages de Clients</h2>
        <div class="testimonial-grid flex fdc gap-10">
            <!-- Exemple de témoignage client -->
            <div class="testimonial-item">
                <i>Jean Dupont</i>
                <p>"J'adore ce site ! Les produits sont de qualité et le service client est excellent."</p>
            </div>
            <div class="testimonial-item">
                <i>Marie Martin</i>
                <p>"Livraison rapide et emballage soigné. Je recommande ce site sans hésitation !"</p>
            </div>
            <div class="testimonial-item">
                <i>Marie Martin</i>
                <p>"Livraison rapide et emballage soigné. Je recommande ce site sans hésitation !"</p>
            </div>
            <div class="testimonial-item">
                <i>Marie Martin</i>
                <p>"Livraison rapide et emballage soigné. Je recommande ce site sans hésitation !"</p>
            </div>
            <div class="testimonial-item">
                <i>Marie Martin</i>
                <p>"Livraison rapide et emballage soigné. Je recommande ce site sans hésitation !"</p>
            </div>
            <div class="testimonial-item">
                <i>Marie Martin</i>
                <p>"Livraison rapide et emballage soigné. Je recommande ce site sans hésitation !"</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
h2 {
    margin-bottom: 20px;
}

.testimonial-item {
    border-radius: 5px;
    background-color: rgb(156, 164, 172);
    padding: 10px;
}

i{
    font-weight: bold;
}

.testimonial-grid{
    max-height: 300px;
    overflow-y:  auto;
}
</style>