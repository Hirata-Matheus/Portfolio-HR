<script setup>
import { useI18n } from 'vue-i18n'
import { PAGES, LOGO_SRC, waLink, PHONE_DISPLAY, INSTAGRAM_URL, INSTAGRAM_HANDLE, EMAIL } from '../../data/site'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="hr-footer">
    <div class="hr-wrap">
      <div class="hr-foot-grid">
        <div class="grid gap-4 content-start">
          <RouterLink to="/" class="hr-brand"><img :src="LOGO_SRC" alt="" width="36" height="36" />HR DRONE</RouterLink>
          <p>{{ t('footer.description') }}</p>
        </div>
        <div>
          <h4 class="hr-eyebrow">{{ t('footer.navTitle') }}</h4>
          <ul>
            <li><RouterLink to="/">{{ t('nav.inicio') }}</RouterLink></li>
            <li v-for="p in PAGES" :key="p.id"><RouterLink :to="p.path">{{ t(`nav.${p.id}`) }}</RouterLink></li>
          </ul>
        </div>
        <div>
          <h4 class="hr-eyebrow">{{ t('footer.contactTitle') }}</h4>
          <ul>
            <li><a :href="waLink(t('waMessages.generic'))" target="_blank" rel="noopener" :aria-label="t('footer.waAria')">{{ PHONE_DISPLAY }}</a></li>
            <li><a :href="INSTAGRAM_URL" target="_blank" rel="noopener" :aria-label="t('footer.instaAria')">{{ INSTAGRAM_HANDLE }}</a></li>
            <li><a :href="`mailto:${EMAIL}`" :aria-label="t('footer.emailAria')">{{ EMAIL }}</a></li>
          </ul>
        </div>
      </div>
      <div class="hr-foot-bottom hr-mono">
        <span>© {{ year }} HR Drone · {{ t('footer.rights') }}</span>
        <span>{{ t('footer.tagline') }}</span>
      </div>
    </div>
  </footer>
</template>
