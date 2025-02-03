<!-- pages/index.vue -->
<script setup>
import { useRouter } from "vue-router";
import "../assets/css";
const router = useRouter();
const defaultUuid = "enter-valid-uuid"; // Replace with your default UUID

router.push(`/${defaultUuid}`);
</script>
