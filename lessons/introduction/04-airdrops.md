# 🧠 автоматизация airdrop'ов софт

_собрал основные инструменты, которые помогут автоматизировать взаимодействие с протоколами, чтобы повысить шансы на получение airdrop._

[← Вернуться к основному README](../../README.md)

---

## 🧑‍💻 Языки программирования

| Язык                        | Когда использовать                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------- |
| **TypeScript / JavaScript** | Лучший выбор для взаимодействия с EVM через `ethers.js`, идеально подходит для фронта и бэкенда       |
| **Python**                  | Отличен для быстрого написания скриптов, парсинга CSV, API-запросов и бэкенда (`web3.py`, `requests`) |
| **Go**                      | Удобен для high-performance скриптов и работы с большим количеством аккаунтов                         |
| **Shell / Bash**            | Используется для запуска cron-задач, работы с proxy и системными скриптами                            |
| **Rust**                    | Подходит для кастомных CLI-инструментов и сложных сетевых задач (используется реже, но мощно)         |

---

## 🧰 Категории и инструменты

| Цель                            | Инструменты                                                                                   | Описание                                              |
| ------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Работа с кошельками**         | `ethers.js`, `web3.py`, `dotenv`, `csv`                                                       | Создание и импорт HD-кошельков, работа с приватниками |
| **Взаимодействие с блокчейном** | `ethers.js`, `viem`, `web3.py`, ABI                                                           | Отправка транзакций, вызов функций контрактов         |
| **Работа с API**                | `axios`, `requests`, `1inch API`, `The Graph`, `Snapshot.box`                                 | Вызов REST/GraphQL API для чеков, свапов, голосования |
| **Прокси и анонимизация**       | `proxychains`, `socks`, `BrightData`, `Oxylabs`                                               | Использование разных IP для каждого аккаунта          |
| **Планирование**                | `cron`, `schedule`, `random-sleep`, `setTimeout`                                              | Запуск действий по времени или с задержками           |
| **Фронт-автоматизация**         | `puppeteer`, `playwright`, `selenium`                                                         | Клик по кнопкам, если нет API                         |
| **Мониторинг газа и цен**       | `ethgasstation`, `provider.estimateGas()`, `contract.estimateGas.<method>()`, `CoinGecko API` | Отправка транзакций при оптимальном gas/цене          |
| **Логгирование и трекинг**      | `winston`, `pino`, `console.log`, Telegram-бот                                                | Сохранение статусов действий и ошибок                 |
| **Чтение/запись файлов**        | `fs`, `csv-parser`, `pandas`                                                                  | Импорт/экспорт адресов, кошельков, логов              |

---

## 🔄 Что можно автоматизировать

| Активность           | Примеры                               |
| -------------------- | ------------------------------------- |
| Бриджинг             | Stargate, Orbiter, LayerZero          |
| Свапы                | Uniswap, SyncSwap, 1inch              |
| Минт NFT             | zkSync mint, Linea drops              |
| Делегирование        | Arbitrum, Optimism, EigenLayer        |
| Деплой контрактов    | Простые контракты в zkSync/Scroll     |
| Голосование          | Snapshot.box, DAO-сервисы             |
| Проверка eligibility | Snapshot, Graph, кастомные JSON-файлы |
| Трекер газ/цен       | Мониторинг перед отправкой            |

---

# 📁 Структура проекта: автоматизация airdrop'ов

## Корень проекта (`airdrop-farmer/`)

- `.env` - Конфигурация: приватные ключи, RPC-эндпоинты, токены и т.п.
- `wallets.csv` - Список адресов и приватников
- `README.md` - Документация проекта

## `proxies/`

- `proxylist.txt` - Список IP-прокси (socks/http)

## `accounts/`

- `accounts.json` - Данные аккаунтов: адреса, статусы, прокси, теги
- `balances.csv` - Балансы по токенам

## `configs/`

- `projects.json` - Настройки dApps и контрактов
- `settings.json` - Тайминги, паузы, активные действия
- `thresholds.json` - Минимальные балансы для запуска действий

## `scripts/` - Основные скрипты

- `bridge.ts`, `mintNFT.ts`, `swap.ts`, `vote.ts`, `restake.ts`, `deployContract.ts`
- `checkEligibility.py` - проверка возможности участия

## `utils/` - Вспомогательные модули

- `getSigner.ts`, `getGas.ts`, `sleep.ts`, `logger.ts`, `randomizer.ts`

## `logs/`

- `tx.log`, `errors.log`, `success.csv`, `gasUsage.json`

## `notifiers/`

- `telegramBot.js`, `statusReport.ts`, `emailSender.py`

## `analytics/`

- `airdropCandidates.ts`, `scoreCalculator.ts`, `activityMap.json`

## `schedulers/`

- `dailyTasks.ts`, `randomizedRun.ts`

## `contracts/` - Смарт-контракты (для кастомных тестов или дропов)

- `MerkleAirdrop.sol`, `MinimalProxy.sol`
- `deploy.js` - Скрипт деплоя

## `keystore/` - Безопасное хранение

- `wallet1.json`, `wallet2.json`
- `decrypt.ts`

## `web/` - (опционально) веб-интерфейс

- `index.html`, `stats.js`, `api/`

## `dashboards/` - Метрики и экспорт

- `metrics.json`, `exportToGoogleSheets.ts`, `charts.ipynb`

## `integrations/`

- `defillamaAdapter.ts`, `zksyncBridgeStatus.ts`, `airdropsApi.ts`

## `cli/`

- `run.ts`, `start.ts`, `run --account`, `run --daily`, `run --vote`

## `tests/`

- `testBridge.ts`, `testMint.ts`, `testGas.ts`, `mockData.ts`

## `docs/`

- `setup.md`, `security.md`, `faq.md`, `roadmap.md`

# 🔗 Полезные ссылки и ресурсы

## 📚 Документация библиотек

- [ethers.js (TypeScript)](https://docs.ethers.org/v6/) - работа с EVM, кошельками и контрактами
- [web3.py (Python)](https://web3py.readthedocs.io/en/stable/) - Python-альтернатива для EVM
- [viem](https://viem.sh/docs/getting-started) - современный typesafe-инструмент для EVM (альтернатива ethers)
- [dotenv](https://www.npmjs.com/package/dotenv) - управление секретами и переменными среды
- [pandas](https://pandas.pydata.org/docs/) - обработка CSV, табличных данных (Python)
- [axios](https://axios-http.com/docs/intro) / [requests](https://docs.python-requests.org/en/latest/) - работа с HTTP API

---

## 💡 API и сервисы

- [Snapshot.org](https://docs.snapshot.org/) - голосование, делегирование (для DAO)
- [The Graph](https://thegraph.com/docs/) - децентрализованная индексация данных с контрактов
- [CoinGecko API](https://www.coingecko.com/en/api) - цены токенов в реальном времени
- [ETH Gas Station](https://ethgasstation.info/) - данные по gas (альтернатива: [Blocknative](https://www.blocknative.com/gas-estimator))
- [1inch API](https://docs.1inch.io/docs/aggregation-protocol/introduction/) - для свапов и анализа маршрутов
- [DefiLlama API](https://defillama.com/docs/api) - TVL, протоколы, статистика

---

## 🧪 Тестовые сети

- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Goerli Faucet](https://faucet.quicknode.com/goerli)
- [zkSync Faucet](https://portal.zksync.io/faucet)
- [Linea Faucet](https://faucet.linea.build/)

---

## ⚙️ Требования для запуска

- Node.js >= 18 (рекомендуется LTS 20.x)
- npm или pnpm (для запуска TypeScript-скриптов)
- Python 3.10+ (если используются Python-модули)
- Установленные зависимости:
  - `npm install` - для TypeScript/JavaScript
  - `pip install -r requirements.txt` - для Python
- RPC-ключи от Infura, Alchemy, Blast и т.п.
- Аккаунты и приватники в `wallets.csv` или `keystore/`
- Рабочие прокси (socks5 / http) в `proxies/proxylist.txt`

## 🚀 Быстрый старт

```bash
# 1. Установка зависимостей
npm install
pip install -r requirements.txt

# 2. Копируем .env и заполни его
cp .env.example .env

# 3. Запускаем фарминг-скрипт (пример)
npm run start:zkSync

# 4. Проверяем логи
cat logs/success.csv
```

## 🔍 Где искать новые потенциальные дропы

- [https://defillama.com/airdrops](https://defillama.com/airdrops)
- [https://x.com](https://x.com)
- [https://airdrops.io/](https://airdrops.io/)
- [https://mirror.xyz](https://mirror.xyz) - блоги и гайды по фарму
- [https://x.com/its_airdrop](https://x.com/its_airdrop) - Twitter-бот по airdrop

## 🧠 Лучшие практики фарминга

- 🔁 Не повторяем действия один-в-один на всех аккаунтах
- 🧅 Использовать разные IP (прокси) для каждого кошелька
- 🧠 Разнообразие действий (время, объём, порядок)
- 💾 Ведем лог всех транзакций и событий
- 🧪 Прогоняем на тестнете, если не уверены
- ⛽ Всегда проверяем `gas price` перед отправкой
