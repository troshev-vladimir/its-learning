<template>
  <FeatureCV></FeatureCV>

  <div>
    <UiBaseButton type="primary" size="small">
      <template #left-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка
    </UiBaseButton>
    <UiBaseButton type="secondary" size="small">
      <template #right-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка
    </UiBaseButton>
    <UiBaseButton type="boarded" size="big">
      <template #right-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка
    </UiBaseButton>
    <UiBaseButton
      type="boarded"
      size="small"
      prev-icon="fa-up-right-from-square"
    >
      <template #right-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка1
    </UiBaseButton>
    <UiBaseButton
      type="boarded"
      size="small"
      prev-icon="fa-up-right-from-square"
    >
      <template #right-icon>
        <client-only>
          <font-awesome-icon icon="fa-solid fa-user-astronaut" />
        </client-only>
      </template>
      Базовая кнопка2
    </UiBaseButton>
    <UiBaseButton
      type="external-link"
      size="big"
      to="https://yandex.ru/search/?clid=2353835&text=git+stash+delete&lr=46"
    >
      Базовая ссылка
    </UiBaseButton>
    <UiBaseButton type="link" size="small"> Базовая ссылка </UiBaseButton>
    <!-- <UiBasePopup ref="refBasePopup">
      <template #header> 123 </template>
      <template #default>123</template>
      <template #footer>123</template>
    </UiBasePopup>
    <UiBasePopup ref="refBasePopup2">
      <template #header> asdsad </template>
      <template #default>1asdasd23</template>
      <template #footer>asdasd</template>
    </UiBasePopup> -->
  </div>
</template>

<script setup lang="ts"></script>
