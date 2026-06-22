<template>
  <section id="contato" class="relative py-24 sm:py-32 overflow-hidden">
    <div class="absolute -left-40 bottom-0 w-[36rem] h-[36rem] rounded-full bg-mint/8 blur-[120px] pointer-events-none"></div>
    <div class="max-w-container mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">

      <!-- Info -->
      <div>
        <div v-reveal>
          <span class="font-mono text-[12px] tracking-[0.3em] uppercase text-mint">/ Contato</span>
          <h2 class="mt-4 font-display font-bold text-white text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight">
            Vamos tirar seu projeto do chão
          </h2>
          <p class="mt-5 text-[17px] text-slate-300/80 leading-relaxed max-w-md">
            Conte o que você precisa capturar. Respondemos rápido com as melhores opções para o seu objetivo.
          </p>
        </div>

        <div class="mt-9 space-y-3">
          <a v-for="(ch, i) in channels" :key="ch.label"
             v-reveal="120 + i * 80"
             :href="ch.href" :target="ch.ext ? '_blank' : '_self'" rel="noopener"
             class="flex items-center gap-3 sm:gap-4 glass rounded-2xl px-4 py-3.5 sm:p-4 hover:border-mint/40 hover:bg-mint/[.03] transition group overflow-hidden">
            <span class="shrink-0 grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 text-mint border border-white/8 group-hover:bg-mint group-hover:text-ink-950 transition">
              <span class="ms text-[22px] sm:text-[24px]">{{ ch.icon }}</span>
            </span>
            <span class="min-w-0 flex-1">
              <span class="block text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-slatey/70">{{ ch.label }}</span>
              <span class="block text-[14px] sm:text-[15.5px] font-semibold text-white truncate">{{ ch.value }}</span>
            </span>
            <span class="ms shrink-0 text-[18px] text-slatey/40 group-hover:text-mint group-hover:translate-x-1 transition">north_east</span>
          </a>
        </div>
      </div>

      <!-- Form -->
      <div v-reveal="200">
        <form @submit.prevent="submitForm" class="glass rounded-3xl p-5 sm:p-9" novalidate>
          <div class="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <div class="sm:col-span-2">
              <label for="f-nome" class="block text-[13px] font-semibold text-slate-200 mb-2">Nome</label>
              <input id="f-nome" v-model.trim="form.nome" type="text" autocomplete="name" placeholder="Seu nome"
                     class="field w-full rounded-xl bg-white/[.03] border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slatey/40" />
              <p v-if="errors.nome" class="mt-1.5 text-[12.5px] text-rose-400 flex items-center gap-1">
                <span class="ms text-[15px]">error</span>{{ errors.nome }}
              </p>
            </div>
            <div>
              <label for="f-tel" class="block text-[13px] font-semibold text-slate-200 mb-2">Telefone / WhatsApp</label>
              <input id="f-tel" v-model.trim="form.tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="(00) 00000-0000"
                     class="field w-full rounded-xl bg-white/[.03] border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slatey/40" />
              <p v-if="errors.tel" class="mt-1.5 text-[12.5px] text-rose-400 flex items-center gap-1">
                <span class="ms text-[15px]">error</span>{{ errors.tel }}
              </p>
            </div>
            <div>
              <label for="f-serv" class="block text-[13px] font-semibold text-slate-200 mb-2">Tipo de serviço</label>
              <div class="relative">
                <select id="f-serv" v-model="form.servico"
                        class="field w-full appearance-none rounded-xl bg-white/[.03] border border-white/10 px-4 py-3 text-[15px] text-white pr-10">
                  <option value="" disabled class="bg-ink-800">Selecione…</option>
                  <option v-for="s in services" :key="s.title" :value="s.title" class="bg-ink-800">{{ s.title }}</option>
                  <option value="Outro" class="bg-ink-800">Outro</option>
                </select>
                <span class="ms text-[20px] text-slatey absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
              </div>
              <p v-if="errors.servico" class="mt-1.5 text-[12.5px] text-rose-400 flex items-center gap-1">
                <span class="ms text-[15px]">error</span>{{ errors.servico }}
              </p>
            </div>
            <div class="sm:col-span-2">
              <label for="f-msg" class="block text-[13px] font-semibold text-slate-200 mb-2">Mensagem</label>
              <textarea id="f-msg" v-model.trim="form.msg" rows="4" placeholder="Conte sobre seu projeto, data e local…"
                        class="field w-full rounded-xl bg-white/[.03] border border-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slatey/40 resize-none"></textarea>
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-full justify-center mt-6 py-4 text-[15.5px]">
            <span class="ms text-[20px]">send</span> Enviar orçamento
          </button>
          <p class="mt-3.5 text-center text-[12.5px] text-slatey/60">
            Ao enviar, você será direcionado ao WhatsApp com a mensagem pronta.
          </p>

          <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0 translate-y-1">
            <div v-if="sent" class="mt-4 flex items-center gap-2 rounded-xl bg-mint/10 border border-mint/30 px-4 py-3 text-[13.5px] text-mint">
              <span class="ms fill text-[18px]">check_circle</span> Tudo certo! Abrindo o WhatsApp com seu pedido…
            </div>
          </Transition>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { channels, services, waLink } from '../data/constants.js'

const form   = reactive({ nome: '', tel: '', servico: '', msg: '' })
const errors = reactive({ nome: '', tel: '', servico: '' })
const sent   = ref(false)

function submitForm() {
  errors.nome    = form.nome ? '' : 'Informe seu nome.'
  errors.tel     = form.tel && form.tel.replace(/\D/g, '').length >= 8 ? '' : 'Informe um telefone válido.'
  errors.servico = form.servico ? '' : 'Selecione um serviço.'
  if (errors.nome || errors.tel || errors.servico) return

  const msg =
    `*Novo orçamento — HR Drone*\n\n` +
    `*Nome:* ${form.nome}\n` +
    `*Telefone:* ${form.tel}\n` +
    `*Serviço:* ${form.servico}\n` +
    (form.msg ? `*Mensagem:* ${form.msg}` : '')

  sent.value = true
  setTimeout(() => window.open(waLink(msg), '_blank'), 700)
}
</script>
