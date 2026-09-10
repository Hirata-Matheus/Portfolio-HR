<template>
  <div ref="rootEl" class="relative">
    <button
      @click="open = !open"
      class="flex items-center gap-1.5 rounded-full glass px-3 py-2 text-[13.5px] font-medium text-slatey hover:text-white hover:border-mint/40 transition"
      :aria-expanded="open"
      :aria-label="t('header.language')"
    >
      <span class="text-[16px] leading-none">{{ current.flag }}</span>
      <span class="hidden sm:inline">{{ current.code.toUpperCase() }}</span>
      <span class="ms text-[16px]" aria-hidden="true">{{ open ? 'expand_less' : 'expand_more' }}</span>
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-100"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul v-if="open"
          class="absolute right-0 mt-2 w-44 max-h-80 overflow-y-auto rounded-2xl glass bg-ink-950/95 p-1.5 shadow-2xl z-50">
        <li v-for="l in locales" :key="l.code">
          <button
            @click="choose(l.code)"
            :class="[
              'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13.5px] font-medium transition text-left',
              l.code === current.code ? 'bg-mint/15 text-mint' : 'text-slate-200 hover:bg-white/5 hover:text-white'
            ]"
          >
            <span class="text-[16px] leading-none">{{ l.flag }}</span>
            <span>{{ l.label }}</span>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { locales, setLocale } from '../i18n'

const { t, locale } = useI18n()
const open = ref(false)
const rootEl = ref(null)

const current = computed(() => locales.find(l => l.code === locale.value) || locales[0])

function choose(code) {
  setLocale(code)
  open.value = false
}

function onClickOutside(e) {
  if (rootEl.value && !rootEl.value.contains(e.target)) open.value = false
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>
