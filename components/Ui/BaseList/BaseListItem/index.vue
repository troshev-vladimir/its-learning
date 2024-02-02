<template>
  <li class="base-list-item">
    <div class="base-list-item__content">
      <slot name="icon">
        <ClientOnly>
          <font-awesome-icon
            v-if="icon"
            class="base-list-item__icon"
            :class="[iconColor]"
            :icon="icon"
          />
        </ClientOnly>
      </slot>
      <slot></slot>
    </div>
    <slot name="list"></slot>
  </li>
</template>

<script lang="ts" setup>
interface Props {
  icon: string | string[]
  iconColor: string
}
withDefaults(defineProps<Props>(), {
  iconColor: 'text-gray-300',
})
</script>

<style lang="scss">
ol {
  list-style-type: none;
  counter-reset: item;
  margin: 0;
  padding: 0;
}

ol > li {
  display: table;
  counter-increment: item;
  margin-bottom: 8px;
}

ol > li:before {
  content: counters(item, '.') '. ';
  display: table-cell;
  padding-right: 8px;
}

li ol > li {
  margin: 0;
}

li ol > li:before {
  content: counters(item, '.') ' ';
}

.base-list-item {
  margin-bottom: 4px;
  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  > .base-list {
    margin-left: 16px;
  }

  &__icon {
    font-size: 16px;
  }
}
</style>
