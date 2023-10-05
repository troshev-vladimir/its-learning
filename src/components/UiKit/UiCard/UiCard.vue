<template>
  <article
    class="ui-card shadow-2"
    :class="{ 'ui-card--selected': props.selected }"
  >
    <h1 class="text-h2 q-mb-md" v-html="props.title"></h1>
    <p class="text-body2 q-mb-md">
      {{ description }}
    </p>
    <ul class="adventages q-mb-lg">
      <li v-for="(item, idx) in items" :key="idx" class="text-body2 list-item">
        {{ item }}
      </li>
    </ul>

    <div
      v-for="(criteria, idx) in criterias"
      :key="idx"
      class="criteria text-body2 q-mb-md"
    >
      <span class="criteria__name q-mr-sm" v-html="criteria.name"></span>
      <span class="text-body2" v-html="criteria.value"></span>
    </div>

    <ui-button size="sm" text-class="text-white" @click="emit('select')"
      >выбрать</ui-button
    >
  </article>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const emit = defineEmits(["select"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  criterias: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.ui-card {
  background-color: var(--q-secondary);
  border-radius: 16px;
  padding: 24px;

  .list-item::before {
    background-color: var(--q-accent);
  }

  .criteria {
    display: flex;
    flex-wrap: wrap;
  }

  &--selected {
    background-color: #fff;

    .list-item::before {
      background-color: var(--q-secondary);
    }
  }

  * {
    color: currentColor;
  }
}
</style>
