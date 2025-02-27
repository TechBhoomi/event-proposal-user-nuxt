<template>
  <div class="w-full container-fluid">
    <section>
      <h1 class="text-3xl p-2 font-bold font-lexend text-center">
        Our Hiring Partners
      </h1>
    </section>
    <div class="scroll-container">
      <div class="scroll-content">
        <div 
          v-for="(partner, index) in [...partners, ...partners]" 
          :key="index" 
          class="partner-button"
        >
          {{ partner }}
        </div>
      </div>
    </div>
  </div>    
</template>

<script setup>
import { ref } from "vue";

const partners = ref([
  "Acuvate", "Concentrix", "Epsilon", "HCL", "LF Soft Indra", 
  "HDFC Bank", "L&T", "Sony", "XPressBees", "Accenture", "Kotak"
]);
</script>

<style scoped>
.container-fluid {
  overflow: hidden;
  padding: 0;
  margin: 0;
  height: 150px;
}

/* Scrolling Wrapper */
.scroll-container {
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px; 
}

/* Scrolling Content */
.scroll-content {
  display: flex;
  gap: 16px;
  min-width: 100%;
  animation: continuous-scroll 20s linear infinite;
}

/* Partner Buttons */
.partner-button {
  font-weight: bold;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px solid #ff7f2a;
  background-color: #ffcc99;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  min-width: 150px;
  text-align: center;
}

/* Continuous Scrolling Animation */
@keyframes continuous-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .scroll-content {
    animation: continuous-scroll 7s linear infinite;
  }
  
  .partner-button {
    font-size: 0.9rem;
    padding: 8px 16px;
    min-width: 120px;
  }
}
</style>
