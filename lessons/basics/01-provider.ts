/**
 * 🧪 Урок 01 — Provider (Технический разбор)
 *
 * как технически работает подключение к Ethereum-сети через провайдер.
 *
 * 📦 Что устанавливаем:
 *   npm install ethers dotenv
 *   npm install --save-dev ts-node typescript @types/node
 *
 * 🧱 tsconfig.json (если ещё не создан):
 *   npx tsc --init
 *
 * ✏️ Обязательно создай файл .env в той же папке:
 *
 *   RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
 *   ADDRESS=0x742d35Cc6634C0532925a3b844Bc454e4438f44e
 *
 * 🔧 Как запускать:
 *   npx ts-node 01-provider.ts
 *   или (если установлено глобально)
 *   ts-node 01-provider.ts
 *
 * 📌 Что делает этот файл:
 *   - Подключается к RPC (Ethereum mainnet)
 *   - Получает номер блока
 *   - Получает инфу о сети
 *   - Получает цену газа
 *   - Получает баланс выбранного адреса
 *
 * ⚠️ Возможные ошибки:
 *   - Если RPC_URL не указан → ошибка при запуске
 *   - Если указан только Infura ID → будет ошибка "unsupported protocol"
 *     ➜ Убедись, что RPC_URL начинается с https://
 */

import { JsonRpcProvider, formatUnits } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

// ✅ Проверка: есть ли RPC_URL
if (!process.env.RPC_URL) {
  throw new Error("⛔️ RPC_URL не найден в .env");
}

const provider = new JsonRpcProvider(process.env.RPC_URL);

async function main() {
  console.log("🔌 Подключаемся к провайдеру...");

  // 1. Номер блока
  const block = await provider.getBlockNumber();
  console.log("📦 Текущий блок:", block);

  // 2. Информация о сети
  const network = await provider.getNetwork();
  console.log("🌐 Сеть:", network.name, `(chainId: ${network.chainId})`);

  // 3. Цена газа
  const feeData = await provider.getFeeData();
  console.log(
    "⛽️ Цена газа:",
    feeData.gasPrice
      ? `${formatUnits(feeData.gasPrice, "gwei")} Gwei`
      : "недоступна"
  );

  // 4. Баланс адреса
  const address = process.env.ADDRESS;
  if (address) {
    const balance = await provider.getBalance(address);
    console.log(`💰 Баланс ${address}: ${formatUnits(balance, "ether")} ETH`);
  } else {
    console.log("ℹ️ Адрес не указан в .env (ADDRESS=...)");
  }
}

main().catch((err) => {
  console.error("❌ Ошибка при выполнении:", err);
});
