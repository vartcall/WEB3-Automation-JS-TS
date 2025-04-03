# ⚙️ 01 - Установка окружения для Web3 разработки

[← Вернуться к основному README](../../README.md)

## 🧱 все необходимое

- ✅ Node.js (LTS версия)
- ✅ Git
- ✅ VS Code (или другой редактор)
- ✅ Расширения для VS Code
- ✅ Metamask
- ✅ Telegram (для чатов, гайдов и ботов) [подписаться!](https://t.me/code_vartcall)

---

## 🚀 Установка step by step

### 1. Node.js

👉 [https://nodejs.org](https://nodejs.org)

- Скачиваем **LTS версию** (на момент написания — v22.14.0)
- После установки проверь:

```bash
node -v
npm -v
```

### 2. Git

👉 [https://git-scm.com](https://git-scm.com/)

- Используется для клонирования репозиториев и контроля версий

### 3. Редактор VS Code

👉 [https://code.visualstudio.com](https://code.visualstudio.com/)

### 4. Мощные расширения VS Code:

- **ESLint**
- **Prettier**
- **Solidity** (от Juan Blanco)
- **GitLens**
- **Path Intellisense**

---

## 🔐 Кошельки и тестовые сети

### 5. Metamask

👉 [https://metamask.io](https://metamask.io/)

- Расширение для Chrome/Brave/Firefox
- Создаем кошелёк, **запиши seed-фразу**, настраиваем пароль

### 6. Добавляем сети через [Chainlist](https://chainlist.org/)

- Например: Ethereum, Sepolia, Polygon Mumbai и т.д.

### 7. Получаем тестовые токены:

- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Polygon Mumbai Faucet](https://faucet.polygon.technology/)

---

## 🧰 Установка библиотек (если хочешь писать код локально)

```bash
npm init -y
npm install ethers
npm install -D typescript ts-node @types/node
```

📌 Также ты можешь установить некоторые инструменты **глобально**, чтобы они были доступны из любого проекта:

```bash
npm install -g typescript ts-node hardhat
```

> Это удобно, если часто работаешь с TypeScript и Web3 CLI-инструментами.

---

## ⚙️ Инициализация TypeScript (по желанию)

```bash
npx tsc --init
```

`tsconfig.json` можем скопировать отсюда 👉 [пример конфига](https://www.typescriptlang.org/tsconfig)

---

## 🧠 Полезные ресурсы

- [Ethers.js Docs](https://docs.ethers.org/v6/)
- [Solidity by Example](https://solidity-by-example.org/)
- [Speed Run Ethereum](https://speedrunethereum.com/)
- [Hardhat Documentation](https://hardhat.org/hardhat-runner/docs/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Foundry Book](https://book.getfoundry.sh/)
- [Awesome Web3 Dev (GitHub)](https://github.com/ahmet/awesome-web3)
- [Awesome Web3 Dev (Part 2)](https://github.com/useWeb3/awesome-web3)

---

Готово! ПРОДОЛЖАЕМ GRIND!! 🚀
