<script setup>
import PlanInfo from '@/components/PlanInfo.vue'
</script>

<template>
  <main>
    <PlanInfo v-bind:plan_id="$route.params.id"/>
    </main>
</template>