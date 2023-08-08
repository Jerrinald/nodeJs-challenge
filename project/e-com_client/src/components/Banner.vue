<script setup>
import BannerItem from './BannerItem.vue'
</script>

<template>
    <section class="benner-container">
          <div class="banner-header">Top deal</div>
          <div class="flex jscb gap-10">
            <BannerItem />
          </div>
        </section>
</template>

<style scoped>
.banner-header {
  background-color: rgb(247, 6, 6);
  color: #FFFFFF;
  padding: 8px;
  font-weight: bold;
}
</style>