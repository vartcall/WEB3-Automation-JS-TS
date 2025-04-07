/**
 * 🔍 03-read-contract.ts - Чтение данных из смарт-контракта (view-функции)
 *
 * 📘 Цель:
 *   - Подключиться к контракту ERC-20
 *   - Прочитать публичные данные (name, symbol, decimals, totalSupply, balanceOf)
 *   - Показать, как использовать минимальный ABI и Contract в Ethers.js v6
 *
 * 🧱 Требования:
 *   - Node.js + TypeScript
 *   - Установленные библиотеки:
 *       npm install ethers dotenv
 *       npm install -D ts-node typescript @types/node
 *
 * 📁 .env должен содержать:
 *   RPC_URL=https://sepolia.infura.io/v3/KEY
 *   TOKEN_ADDRESS=0x...          // адрес контракта ERC20
 *   USER_ADDRESS=0x...           // адрес пользователя (кошелёк)
 *
 * 🚀 Как запускать:
 *   npx ts-node 03-read-contract.ts
 *
 * 💡 Что будет выведено:
 *   - Название и тикер токена
 *   - Кол-во десятичных знаков
 *   - Total supply токена
 *   - Баланс выбранного адреса
 *
 * 🔐 Безопасно:
 *   - Не требует приватного ключа
 *   - Не отправляет транзакций
 *   - Не тратит газ (только RPC-запросы)
 *
 * 📦 Подходит для:
 *   - Ботов, аналитики, дашбордов
 *   - Тестов и обучения работе с контрактами
 */

import { config } from "dotenv";
import { JsonRpcProvider, Contract, formatUnits } from "ethers";

config(); // Загружаем .env

// Проверка переменных
if (
  !process.env.RPC_URL ||
  !process.env.TOKEN_ADDRESS ||
  !process.env.USER_ADDRESS
) {
  throw new Error(
    "❌ Убедись, что .env содержит RPC_URL, TOKEN_ADDRESS и USER_ADDRESS"
  );
}

const provider = new JsonRpcProvider(process.env.RPC_URL);

// Минимальный ABI для чтения данных из ERC20
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];

const tokenAddress = process.env.TOKEN_ADDRESS;
const userAddress = process.env.USER_ADDRESS;

async function main() {
  console.log("🔌 Подключаемся к провайдеру:", await provider.getNetwork());

  const token = new Contract(tokenAddress, abi, provider);

  // Читаем информацию о токене
  const [name, symbol, decimals, supply] = await Promise.all([
    token.name(),
    token.symbol(),
    token.decimals(),
    token.totalSupply(),
  ]);

  console.log(`\n📘 Токен: ${name} (${symbol})`);
  console.log(`🧮 Десятичные: ${decimals}`);
  console.log(`📦 Общий supply: ${formatUnits(supply, decimals)} ${symbol}`);

  // Читаем баланс пользователя
  const balance = await token.balanceOf(userAddress);
  console.log(
    `💰 Баланс ${userAddress}: ${formatUnits(balance, decimals)} ${symbol}\n`
  );
}

main().catch((err) => {
  console.error("❌ Ошибка:", err);
});
