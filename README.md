![Web3 Automation](./banner.png)

![Node.js](https://img.shields.io/badge/Node.js-20%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-%F0%9F%94%A5-blue)
![Ethers.js](https://img.shields.io/badge/ethers.js-v6-purple)
![Hardhat](https://img.shields.io/badge/Hardhat-smart--contracts-orange)
![Foundry](https://img.shields.io/badge/Foundry-fast--builds-9cf)
![dotenv](https://img.shields.io/badge/dotenv-env--config-lightgrey)

![DeFi](https://img.shields.io/badge/DeFi-automation-green)
![Airdrop](https://img.shields.io/badge/Airdrop-farming-ff69b4)
![Automation](https://img.shields.io/badge/Web3--Bots-OnFire-red)
![Tenderly](https://img.shields.io/badge/Tenderly-simulation-blueviolet)
![TheGraph](https://img.shields.io/badge/TheGraph-data--indexing-lightblue)

# WEB3 Automation - JavaScript & TypeScript

🧠 Добро пожаловать в мой **личный сборник Web3-автоматизаций** на чистом JavaScript и TypeScript.

Здесь:

- 🔧 рабочие шаблоны
- ⚙️ инструменты для взаимодействия с блокчейнами
- 🧱 скрипты на ethers.js
- 🚀 примеры запуска, отправки транзакций, работы с контрактами и не только

Этот репозиторий - лаборатория 🔬, где я собираю и структурирую **весь мой практический опыт по Web3-автоматизации**. Всё, что ты видишь - написано вручную, проверено в бою и оформлено по красоте.

---

## 📦 Структура проекта

```bash
📁 WEB3-Automation-JS-TS
└── 📁 lessons/           # все уроки и материалы по Web3 JS/TS
    ├── 📁 introduction/    # вводные материалы и документация
    │   ├── 00-links.md     # полезные ссылки, доки, тулзы
    │   ├── 01-setup.md     # установка окружения
    │   ├── 02-tools.md     # инструменты для работы
    │   ├── 03-glossary.md  # глоссарий терминов Web3
    │   └── 05-airdrops.md  # автоматизация фарминга airdrop'ов
    ├── 📁 basics/          # база: транзакции, кошельки, провайдеры
    ├── 📁 advanced/        # продвинутые вещи: подписи, мультисиги, боты, безопасность
    └── 📁 examples/        # практические кейсы: дашборды, боты, трекеры
```

> _База находится в `lessons/introduction/` — начнинаем с неё первым делом._

````
## ⚙️ Установка и запуск

### 1. Клонируй репозиторий

```bash
git clone https://github.com/yourname/WEB3-Automation-JS-TS.git
cd WEB3-Automation-JS-TS
````

> 💡 **Рекомендуется использовать Node.js LTS версии 20.x**
>
> Node.js 18+ также поддерживается, но **20.x — оптимален для стабильности и совместимости с Web3-инструментами** (`ethers.js`, `ts-node`, `dotenv`, и пр.)

### 2. Установи зависимости (если нужно)

```bash
npm install
```

### 3. Запусти скрипт

Пример запуска TypeScript-файла:

```bash
npx ts-node lessons/basics/sendTx.ts
```

---

## 🔥 Что внутри

- Настройка `ethers.js v6` с провайдерами и подписантами
- Работа с `.env`, приватными ключами, RPC и Gas
- Подключение к контрактам, вызов функций, события
- Скрипты для мультисигов, подписи сообщений, raw-транзакций
- Отправка токенов и ETH, симуляция через Tenderly
- Настройка окружения, VS Code, MetaMask и прочее
- ⚔️ Фокус на безопасность: front-running, MEV, phishing, rug pull

---

## 🛠 Используемые технологии

- `TypeScript`, `JavaScript`
- `ethers.js v6`
- `Node.js`, `ts-node`
- `dotenv`, `IPFS`, `RPC`
- optionally: `Hardhat`, `Foundry`, `Tenderly`

---

## 🧭 Полезные ссылки

- 📄 [00-links.md](./lessons/introduction/00-links.md) - гайды, доки, тулзы
- ⚙️ [01-setup.md](./lessons/introduction/01-setup.md) - установка окружения
- 🧰 [02-tools.md](./lessons/introduction/02-tools.md) - список мощных Web3-инструментов
- 📘 [03-glossary.md](./lessons/introduction/03-glossary.md) - глоссарий терминов Web3/DeFi/NFT
- 🧠 [04-airdrops.md](./lessons/introduction/04-airdrops.md) - автоматизация фарминга airdrop'ов

---

## 🧠 Для кого это

- для себя, чтобы ничего не забыть 😅
- для Web3-разработчиков, кто хочет структурировать свой подход
- для тех, кто автоматизирует: airdrop-боты, арбитраж, чекеры, сканеры
- для тех, кто **уже пишет на ethers.js или только начал**

---

## 📬 Контакты

- Telegram-канал: [@code_vartcall](https://t.me/code_vartcall)
- Вопросы, предложения, pull requests — welcome!

---

> Продолжаем Web3 гринд!
