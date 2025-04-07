/**
 * 🚀 Урок 02: Отправка транзакции через Wallet + Provider (Ethers.js v6)
 *
 * 🎯 Цель:
 *   Этот скрипт показывает, как программно отправить ETH на другой адрес,
 *   используя приватный ключ, провайдер и EIP-1559 модель комиссии.
 *
 * 📦 Что делает:
 *   1. Подключается к Ethereum-сети через JSON-RPC провайдер (Infura, Alchemy, Ankr и др.)
 *   2. Создаёт Wallet из приватного ключа и подписывает транзакцию
 *   3. Получает актуальные значения газа через provider.getFeeData()
 *   4. Расчитывает maxFeePerGas с запасом (baseFee + priorityFee + буфер)
 *   5. Отправляет 0.01 ETH на указанный адрес
 *   6. Дожидается подтверждения и выводит информацию о блоке
 *   7. Показывает баланс до и после отправки
 *
 * 🧱 Требования:
 *   - Node.js ≥ 20.0
 *   - Ethers.js v6
 *   - .env файл с переменными:
 *
 *     RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
 *     PRIVATE_KEY=0xabc123... (ваш приватный ключ, с которого отправляем)
 *     RECEIVER=0x... (адрес получателя, НЕ совпадающий с вашим)
 *
 * 📦 Установка зависимостей:
 *   npm install ethers dotenv
 *
 * ⚙️ Запуск:
 *   npx ts-node 02-send-tx.ts
 *
 * ❗ Важно:
 *   - Убедись, что на кошельке есть ETH (в сети Sepolia или другой)
 *   - Если указанный RECEIVER = YOUR_ADDRESS, будет ошибка estimateGas
 *   - Если maxFeePerGas < baseFee, транзакция не пройдёт (EIP-1559 логика)
 *
 * 📚 Полезное:
 *   - https://docs.ethers.org/v6/
 *   - https://eips.ethereum.org/EIPS/eip-1559
 *   - https://sepoliafaucet.com/
 */

import { config } from "dotenv";
import {
  Wallet,
  JsonRpcProvider,
  formatUnits,
  parseEther,
  parseUnits,
} from "ethers";

config(); // Загружаем .env

// Проверка переменных
if (!process.env.RPC_URL || !process.env.PRIVATE_KEY || !process.env.RECEIVER) {
  throw new Error(
    "❌ Проверь, что .env содержит RPC_URL, PRIVATE_KEY и RECEIVER"
  );
}

// Создаём провайдер и кошелёк
const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  console.log("🔌 Подключено к провайдеру:", await provider.getNetwork());

  const receiver = process.env.RECEIVER;

  // Баланс до
  const balanceBefore = await provider.getBalance(wallet.address);
  console.log(`💰 Баланс до: ${formatUnits(balanceBefore, "ether")} ETH`);

  // Получаем комиссии
  const feeData = await provider.getFeeData();
  const priority = feeData.maxPriorityFeePerGas!;
  const baseFee = feeData.gasPrice!; // gasPrice в EIP-1559 = baseFee

  // maxFee = baseFee + priority + небольшой буфер
  const maxFee = baseFee + priority + parseUnits("1", "gwei"); // +1 gwei буфер

  console.log("📡 Комиссии:");
  console.log("  ➤ maxFeePerGas:", formatUnits(maxFee, "gwei"), "gwei");
  console.log("  ➤ priorityFee :", formatUnits(priority, "gwei"), "gwei");

  // Подготавливаем и отправляем транзакцию
  const tx = await wallet.sendTransaction({
    to: receiver,
    value: parseEther("0.01"),
    maxFeePerGas: maxFee,
    maxPriorityFeePerGas: priority,
  });

  console.log("📤 Транзакция отправлена:", tx.hash);

  // Ожидаем майнинга
  const receipt = await tx.wait();
  if (receipt) {
    console.log("✅ Подтверждена в блоке:", receipt.blockNumber);
  } else {
    console.error("❌ Ошибка: Receipt is null");
  }

  // Баланс после
  const balanceAfter = await provider.getBalance(wallet.address);
  console.log(`💸 Баланс после: ${formatUnits(balanceAfter, "ether")} ETH`);
}

main().catch((err) => {
  console.error("❌ Ошибка:", err);
});
