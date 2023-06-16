<template>
  <article class="rounded-lg bg-white text-primary q-pa-lg shadow-2">
    <h2 class="text-h2 q-mb-lg">Выберите удобную форму оплаты курса:</h2>
    <p class="text-body1 q-mb-md">
      Рассрочка от Академии 1С программирования ITS Education
    </p>
    <p class="text-body2 q-mb-lg">
      Сможете в любой момент закончить обучение и не платить за дальнейшее
      прохождение курса если поймете что программирование не для вас
    </p>

    <UiItem button-text="ОФОРМИТЬ" class="q-mb-lg">
      <span>{{ store.state.tariff.programValue.months }} мес. </span>
      <template #lableRight>
        <span>
          <span class="text-bold">{{
            store.state.tariff.programValue.price
          }}</span>
          руб./мес.</span
        >
      </template>
    </UiItem>

    <div
      class="etire-curse bg-primary text-white q-pa-lg rounded-lg q-mb-lg relative-position"
    >
      <h2 class="text-h2 q-mb-md">Оплатить курс целиком</h2>
      <p class="text-body2 q-mb-md text-white">
        Получите дополнительный блок продвинутой программы
        <span class="text-bold">19 VIP</span> абсолютно бесплатно
      </p>
      <UiItem button-text="КУПИТЬ">
        <span>
          <span class="text-bold">{{ store.state.tariff.totalPrice }}</span>
          руб.
        </span>
      </UiItem>
      <icon-base width="120" height="120" class="absolute benefits">
        <BenefitsImage></BenefitsImage
      ></icon-base>
    </div>

    <div class="d-flex justify-between items-center">
      <p class="text-body2 q-mr-md">
        Или вы можете выбрать другую программу обучения вручную при помощи наших
        специалистов, просто напишите нам:
      </p>
      <div class="d-flex">
        <a href="/" target="_blank" class="social-media">
          <q-icon size="40px" color="primary" name="fab fa-vk"> </q-icon>
        </a>
        <a href="/" target="_blank" class="q-ml-md social-media">
          <q-icon
            size="40px"
            color="primary"
            name="fab fa-telegram-plane"
          ></q-icon>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
import BenefitsImage from "@/components/UiKit/IconBase/icons/BenefitsImage.vue";
</script>

<style lang="scss" scoped>
.benefits {
  top: -20px;
  right: -20px;
}
.social-media {
  &:hover i {
    transition: all ease 0.2s;
    opacity: 0.7;
  }
}
</style>
