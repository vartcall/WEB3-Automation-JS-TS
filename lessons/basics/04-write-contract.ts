// 04-write-contract.ts
//
// 📦 Скрипт для отправки ERC20-токенов с помощью ethers.js (v6)
// 🛠 Используется сеть Sepolia и переменные из .env
// 🔐 Подписывается кошельком через приватный ключ
// ✅ Проверяет баланс, decimals и отправляет токены
//
// ---------------------------------------------------------
// 🧪 УСТАНОВКА:
// 1. Установи зависимости:
//    npm install ethers dotenv
//
// 2. Создай файл `.env` в корне проекта со следующими значениями:
//
//    RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
//    PRIVATE_KEY=0x...             // Приватный ключ от testnet-кошелька
//    TOKEN_ADDRESS=0x...           // Адрес контракта ERC20-токена в Sepolia
//    RECEIVER=0x...                // Кому отправляем токены
//    AMOUNT=0.01                   // Сколько токенов отправить (целым числом)
//
// ---------------------------------------------------------
// 🚀 ЗАПУСК СКРИПТА:
//    npx tsx 04-write-contract.ts
//    или
//    ts-node 04-write-contract.ts
// ---------------------------------------------------------

import { config } from "dotenv";
import { Contract, Wallet, JsonRpcProvider, parseUnits } from "ethers";

config(); // Загружаем переменные из .env

// Получаем данные из .env
const { RPC_URL, PRIVATE_KEY, TOKEN_ADDRESS, RECEIVER, AMOUNT } = process.env;

// Проверка, что все переменные есть
if (!RPC_URL || !PRIVATE_KEY || !TOKEN_ADDRESS || !RECEIVER || !AMOUNT) {
  console.error("❌ Проверь .env: одна или несколько переменных отсутствуют");
  process.exit(1);
}

// Подключение к провайдеру и создание кошелька
const provider = new JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

// Минимальный ABI для взаимодействия с ERC20 токеном
const ERC20_ABI = [
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function decimals() public view returns (uint8)",
  "function balanceOf(address owner) external view returns (uint256)",
];

const token = new Contract(TOKEN_ADDRESS, ERC20_ABI, wallet);

async function main() {
  try {
    console.log("🔍 Получаем decimals токена...");
    const decimals = await token.decimals();

    if (!AMOUNT) {
      throw new Error("AMOUNT is undefined. Please check your .env file.");
    }
    const amountParsed = parseUnits(AMOUNT, decimals);
    console.log(
      `🚀 Отправляем ${AMOUNT} токенов (${amountParsed.toString()} в минимальных единицах)`
    );

    const balance = await token.balanceOf(wallet.address);
    console.log("💰 Баланс токена:", balance.toString());

    if (balance < amountParsed) {
      throw new Error("Недостаточно токенов на балансе для перевода");
    }

    console.log(`💰 Баланс отправителя: ${balance.toString()}`);
    console.log(`💰 Баланс получателя: ${RECEIVER}`);
    console.log(`💰 Сумма перевода: ${amountParsed.toString()}`);
    console.log("📝 Подготовка транзакции...");

    const tx = await token.transfer(RECEIVER, amountParsed);
    console.log(`📦 Транзакция отправлена: ${tx.hash}`);
    console.log("⏳ Ожидание подтверждения...");

    const receipt = await tx.wait();
    console.log("✅ Транзакция подтверждена!");
    console.log(`🔗 Хэш: ${receipt.transactionHash}`);
  } catch (err: any) {
    console.error("❌ Ошибка при выполнении транзакции:");
    console.error(err.message || err);
  }
}

main();
