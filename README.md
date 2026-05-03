# MITA — Machine Intelligence Thinking Assistant
### Como colocar online na Vercel (passo a passo)

---

## Estrutura do projeto

```
mita-vercel/
├── api/
│   └── chat.js        ← servidor que esconde sua chave da API
├── public/
│   └── index.html     ← interface da MITA
├── vercel.json        ← configuração da Vercel
├── package.json
└── README.md
```

---

## Passo 1 — Criar conta na Vercel

1. Acesse **https://vercel.com**
2. Clique em **Sign Up**
3. Entre com sua conta do **GitHub** (recomendado)

---

## Passo 2 — Subir o projeto no GitHub

1. Acesse **https://github.com/new**
2. Crie um repositório chamado `mita-assistant`
3. Deixe como **Public** ou **Private** (tanto faz)
4. Clique em **Create repository**

Depois, no seu computador, abra o terminal dentro da pasta `mita-vercel` e rode:

```bash
git init
git add .
git commit -m "MITA v2.0 - primeiro deploy"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/mita-assistant.git
git push -u origin main
```

> Substitua `SEU_USUARIO` pelo seu usuário do GitHub.

---

## Passo 3 — Importar na Vercel

1. Acesse **https://vercel.com/new**
2. Clique em **Import Git Repository**
3. Selecione o repositório `mita-assistant`
4. Clique em **Import**
5. Não mude nada nas configurações
6. Clique em **Deploy**

---

## Passo 4 — Adicionar sua chave da API (OBRIGATÓRIO)

Esta é a parte mais importante. Sem ela, a MITA não funciona.

1. No painel da Vercel, clique no projeto
2. Clique em **Settings** (no menu superior)
3. Clique em **Environment Variables** (no menu lateral)
4. Adicione:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** sua chave (começa com `sk-ant-...`)
5. Clique em **Save**
6. Vá em **Deployments** e clique em **Redeploy** para aplicar

> Sua chave fica **escondida no servidor**. Ninguém no HTML ou no navegador consegue vê-la.

---

## Passo 5 — Acessar a MITA online

Após o deploy, a Vercel dará um link tipo:

```
https://mita-assistant.vercel.app
```

Esse link funciona em qualquer dispositivo, em qualquer lugar do mundo. 🎉

---

## Como obter sua chave da API Anthropic

1. Acesse **https://console.anthropic.com**
2. Crie uma conta ou faça login
3. Vá em **API Keys**
4. Clique em **Create Key**
5. Copie a chave (ela aparece só uma vez)

---

## Atualizar a MITA depois

Se você quiser modificar o código e atualizar o site:

```bash
git add .
git commit -m "Atualização"
git push
```

A Vercel detecta automaticamente e faz o novo deploy em ~1 minuto.

---

## Dúvidas frequentes

**Por que preciso do servidor?**
O navegador bloqueia chamadas diretas à API por segurança. O servidor (`api/chat.js`) age como intermediário e esconde sua chave.

**Posso usar domínio próprio?**
Sim! Na Vercel, vá em Settings > Domains e adicione seu domínio.

**É gratuito?**
O plano gratuito da Vercel suporta projetos pessoais sem problemas. A API Anthropic cobra por uso (tokens).
