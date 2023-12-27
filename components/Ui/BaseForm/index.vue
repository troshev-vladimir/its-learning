
<template>
  <form @submit.prevent class="base-form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
const slots = defineSlots<{
  default(): any;
}>();

let form = ref({});

const onLoad = async () => {
  await nextTick();
  let defaultSlot = slots.default()[0];
  // propsNames = defaultSlot.children
  //   .map((el: any) => el.props?.map((elem: any) => elem.name))
  //   .flat();
  console.log(defaultSlot);
  // console.log(propsNames);

  // propsNames.forEach((el: string) => {
  //   if (el && el.length > 0 && typeof el == "string") form.value[el] = "";
  // });
};

onLoad();
</script>

<style lang="scss">
.base-form {
  padding: 24px;
  background: $white;
  border-radius: 16px;
}
</style>