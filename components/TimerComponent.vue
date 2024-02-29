<template>
  <div v-if="!isExpired" class="timer">
    <div class="image-container">
      <div class="image">
        <img src="@/assets/img/timer.png" alt="timer" />
      </div>
    </div>

    <div class="count">
      <span v-if="string" class="text-body1">{{ string }}</span>
      <span v-else class="text-body1"> {{ hasHours ? '00:' : '' }}00:00 </span>
    </div>
  </div>
  <q-chip
    v-else
    outline
    square
    color="red"
    text-color="white"
    icon="fas fa-hourglass-end"
    label="Время вышло"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, defineEmits } from 'vue'
import moment from 'moment'
let interval: number | undefined

const emit = defineEmits(['timeIsGone'])

const props = withDefaults(
  defineProps<{
    expirationDate?: string | number
    hasHours: boolean
  }>(),
  {
    hasHours: true,
  }
)

const expirationDate = computed(() => {
  return props.expirationDate
})

const string = ref('')
const isExpired = ref(false)

const updateTime = () => {
  if (isExpired.value) {
    window.clearInterval(interval)
    emit('timeIsGone')
    return
  }
  const now = moment()
  const expiration = moment(expirationDate.value)

  if (!expirationDate.value) {
    return
  }
  // get the difference between the moments
  const diff = expiration.diff(now)
  //express as a duration
  const diffDuration = moment.duration(diff)
  // display
  let diffSeconds = diffDuration.seconds().toString()
  let diffMinutes = diffDuration.minutes().toString()
  let diffHour = diffDuration.hours()
  const diffDays = diffDuration.days()

  if (
    diffDuration.seconds() <= 0 &&
    diffDuration.minutes() <= 0 &&
    diffDuration.hours() <= 0 &&
    diffDuration.days() <= 0
  ) {
    emit('timeIsGone')
    isExpired.value = true
  }

  if (diffDays > 0) {
    diffHour = diffDays * 24 + diffHour
  }

  diffSeconds = diffSeconds.length < 2 ? '0' + diffSeconds : diffSeconds
  diffMinutes = diffMinutes.length < 2 ? '0' + diffMinutes : diffMinutes
  const resultHours =
    String(diffHour).length < 2 ? '0' + String(diffHour) : String(diffHour)

  string.value = `${props.hasHours === true ? resultHours + ':' || '00:' : ''}${diffMinutes || '00'}:${
    diffSeconds || '00'
  }`
}

onMounted(() => {
  interval = window.setInterval(() => {
    updateTime()
  }, 1000)
})

onBeforeUnmount(() => {
  window.clearInterval(interval)
})
</script>

<style lang="scss">
.timer {
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  background-color: #fff;

  .image-container {
    padding: 4px 16px;
  }

  .image {
    margin: auto;
    width: 40px;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .count {
    padding: 8px 12px;
    width: 150px;
    color: #000;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      display: block;
      margin: auto;
      width: fit-content;
    }
  }
}
</style>
