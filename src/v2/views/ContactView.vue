<script setup>
// Contato: o formulário monta a mensagem e abre o WhatsApp (mesma lógica do site atual).
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGsap, gsap } from '../composables/motion'
import { SERVICE_IDS, BASE, CITIES, waLink, PHONE_DISPLAY, INSTAGRAM_URL, INSTAGRAM_HANDLE, EMAIL } from '../data/site'
import { IMAGES } from '../data/portfolio'
import PageHeader from '../components/shared/PageHeader.vue'
import Icon from '../components/shared/Icon.vue'

const { t } = useI18n()
const root = ref(null)
const form = reactive({ name: '', phone: '', service: '', message: '' })
const errors = reactive({ name: false, phone: false, service: false })
const sent = ref(false)
const cities = [BASE.name, ...CITIES.map((c) => c.name)].sort((a, b) => a.localeCompare(b, 'pt'))
const serviceLabel = computed(() => (form.service === 'outro' ? t('contact.form.serviceOther') : form.service ? t(`services.items.${form.service}.title`) : ''))

function maskPhone(e) {
  const d = e.target.value.replace(/\D/g, '').slice(0, 11)
  let out = d
  if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`
  form.phone = out
}

function submit() {
  errors.name = form.name.trim().length < 2
  errors.phone = form.phone.replace(/\D/g, '').length < 10
  errors.service = !form.service
  if (errors.name || errors.phone || errors.service) {
    root.value.querySelector('.hr-field.err input, .hr-field.err select')?.focus()
    return
  }
  const lines = [
    t('contact.form.waTitle'),
    '',
    `${t('contact.form.waName')} ${form.name.trim()}`,
    `${t('contact.form.waPhone')} ${form.phone}`,
    `${t('contact.form.waService')} ${serviceLabel.value}`
  ]
  if (form.message.trim()) lines.push(`${t('contact.form.waMessage')} ${form.message.trim()}`)
  sent.value = true
  window.open(waLink(lines.join('\n')), '_blank', 'noopener')
}

useGsap(root, () => {
  gsap.from('.hr-contact > *', { y: 50, duration: 1.1, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.hr-contact', start: 'top 85%' } })
})
</script>

<template>
  <div ref="root">
    <PageHeader :eyebrow="t('contact.eyebrow')" :title-html="t('contact.title')" :lead="t('contact.subtitle')" :image="IMAGES.portals.contato" code="/contato" />
    <section class="hr-wrap" style="padding-bottom: clamp(80px, 10vw, 150px)">
      <div class="hr-contact">
        <form class="hr-form" novalidate @submit.prevent="submit">
          <h2 class="hr-h3">{{ t('v2.contact.form') }}</h2>
          <div class="hr-form-row">
            <div class="hr-field" :class="{ err: errors.name }">
              <label for="hr-name">{{ t('contact.form.nameLabel') }}</label>
              <input id="hr-name" v-model="form.name" type="text" autocomplete="name" :placeholder="t('contact.form.namePlaceholder')" :aria-invalid="errors.name" @input="errors.name = false" />
              <span v-if="errors.name" class="msg">{{ t('contact.form.nameError') }}</span>
            </div>
            <div class="hr-field" :class="{ err: errors.phone }">
              <label for="hr-phone">{{ t('contact.form.phoneLabel') }}</label>
              <input id="hr-phone" :value="form.phone" type="tel" inputmode="tel" autocomplete="tel" :placeholder="t('contact.form.phonePlaceholder')" :aria-invalid="errors.phone" @input="maskPhone($event); errors.phone = false" />
              <span v-if="errors.phone" class="msg">{{ t('contact.form.phoneError') }}</span>
            </div>
          </div>
          <div class="hr-field" :class="{ err: errors.service }">
            <label for="hr-service">{{ t('contact.form.serviceLabel') }}</label>
            <select id="hr-service" v-model="form.service" :aria-invalid="errors.service" @change="errors.service = false">
              <option value="" disabled>{{ t('contact.form.serviceSelect') }}</option>
              <option v-for="id in SERVICE_IDS" :key="id" :value="id">{{ t(`services.items.${id}.title`) }}</option>
              <option value="outro">{{ t('contact.form.serviceOther') }}</option>
            </select>
            <span v-if="errors.service" class="msg">{{ t('contact.form.serviceError') }}</span>
          </div>
          <div class="hr-field">
            <label for="hr-message">{{ t('contact.form.messageLabel') }}</label>
            <textarea id="hr-message" v-model="form.message" :placeholder="t('contact.form.messagePlaceholder')"></textarea>
          </div>
          <button class="hr-btn hr-btn-mint hr-btn-lg" type="submit" style="justify-self: start"><Icon name="chat" />{{ t('contact.form.submit') }}</button>
          <p v-if="sent" class="ok" role="status">{{ t('contact.form.success') }}</p>
          <p v-else class="hint">{{ t('contact.form.hint') }}</p>
        </form>

        <div class="grid gap-8 content-start">
          <div class="grid gap-3">
            <span class="hr-eyebrow">{{ t('v2.contact.channels') }}</span>
            <div class="hr-channels">
              <a class="hr-channel" :href="waLink(t('waMessages.contactFallback'))" target="_blank" rel="noopener">
                <span class="ic"><Icon name="chat" /></span><div><span class="hr-mono">{{ t('contact.channels.whatsapp') }}</span><strong>{{ PHONE_DISPLAY }}</strong></div>
              </a>
              <a class="hr-channel" :href="INSTAGRAM_URL" target="_blank" rel="noopener">
                <span class="ic"><Icon name="instagram" /></span><div><span class="hr-mono">{{ t('contact.channels.instagram') }}</span><strong>{{ INSTAGRAM_HANDLE }}</strong></div>
              </a>
              <a class="hr-channel" :href="`mailto:${EMAIL}`">
                <span class="ic"><Icon name="mail" /></span><div><span class="hr-mono">{{ t('contact.channels.email') }}</span><strong>{{ EMAIL }}</strong></div>
              </a>
            </div>
          </div>
          <div class="grid gap-3">
            <span class="hr-eyebrow">{{ t('contact.coverage.label') }}</span>
            <div class="hr-chips">
              <span v-for="c in cities" :key="c" class="hr-chip">{{ c }}</span>
            </div>
            <p class="hr-lead" style="font-size: .95rem">{{ t('contact.coverage.more') }}</p>
            <RouterLink class="hr-btn hr-btn-ghost" to="/sobre" style="justify-self: start"><Icon name="globe" />{{ t('v2.coverage.eyebrow').replace('/ ', '') }}</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
