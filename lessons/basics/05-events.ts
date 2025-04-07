/**
 * 📘 Урок: 05-events.ts
 * 🎯 Цель: Подписка на события Transfer токена ERC20 в реальном времени и чтение истории переводов.
 *
 * 📡 Используем WebSocket-провайдер от Infura для работы с Ethereum Mainnet.
 * 🪙 Работаем с контрактом ERC20 — читаем его name, decimals и события Transfer.
 *
 * ✅ Что умеет этот скрипт:
 *   - Подключается по WebSocket к Ethereum Mainnet через Infura
 *   - Получает имя и количество знаков после запятой токена (decimals)
 *   - Подписывается на события Transfer и выводит их в реальном времени
 *   - Загружает историю переводов на заданный адрес с авто-дроблением диапазона блоков
 *
 * 🧾 Настройки берутся из .env:
 * INFURA_ID=вставь_сюда_твой_INFURA_ID
 * CONTRACT_ADDRESS=адрес_контракта_ERC20_токена (например, USDT: 0xdAC17F958D2ee523a2206206994597C13D831ec7)
 * RECEIVER_ADDRESS=адрес_получателя (например, 0x28C6c06298d514Db089934071355E5743bf21d60)
 *
 * 📦 Установка зависимостей:
 *   npm install ethers dotenv
 *
 * 🚀 Запуск:
 *   ts-node 05-events.ts
 *
 * 💡 ОПЫТ:
 *   - Используем только проверенные токены (USDC, DAI, USDT и т.д.)
 *   - Убедиться, что WebSocket-ключ Infura не превышает лимиты подключений
 */

import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

// 🧠 Настройки из .env
const INFURA_ID = process.env.INFURA_ID!;
const CONTRACT_ADDRESS = ethers.getAddress(process.env.CONTRACT_ADDRESS!);
const RECEIVER_ADDRESS = ethers.getAddress(process.env.RECEIVER_ADDRESS!);
const WEBSOCKET_URL = `wss://mainnet.infura.io/ws/v3/${INFURA_ID}`;

// 🔧 ABI — только событие Transfer
const ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function name() view returns (string)",
  "function decimals() view returns (uint8)",
];

async function main() {
  console.log("🔌 Подключение к WebSocket:", WEBSOCKET_URL);
  const provider = new ethers.WebSocketProvider(WEBSOCKET_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  // 🎓 Инфо о токене
  const name = await contract.name();
  const decimals = await contract.decimals();
  console.log(`📦 Контракт: ${CONTRACT_ADDRESS}`);
  console.log(`🪙 Токен: ${name}, Decimals: ${decimals}`);
  console.log(`👂 Слушаем события Transfer...`);

  // 📡 Реальное время
  contract.on("Transfer", async (from, to, value, event) => {
    const amount = ethers.formatUnits(value, decimals);

    // Получаем хеш транзакции через raw log
    const txHash =
      (event as any).log?.transactionHash ||
      (event as any).transactionHash ||
      "(не найден)";

    console.log(`📡 Новый перевод:`);
    console.log(`   From: ${from}`);
    console.log(`   To:   ${to}`);
    console.log(`   Amount: ${amount} ${name}`);
    console.log(`   Tx: https://etherscan.io/tx/${txHash}`);
    console.log("-----------");
  });

  // 🕓 История событий (с авто-дроблением по блокам)
  const latestBlock = await provider.getBlockNumber();
  const fromBlock = latestBlock - 2000;

  const filter = contract.filters.Transfer(null, RECEIVER_ADDRESS);
  const events = await safeQueryFilter(
    contract,
    filter,
    fromBlock,
    latestBlock,
    250
  );

  console.log(`\n📚 История переводов на ${RECEIVER_ADDRESS}:`);
  for (const e of events) {
    const args = (e as ethers.EventLog).args;
    const tx = (e as ethers.EventLog).transactionHash;
    const amount = ethers.formatUnits(args.value, decimals);
    console.log(`➡️ ${args.from} → ${args.to}, сумма: ${amount} ${name}`);
    console.log(`🔗 https://etherscan.io/tx/${tx}`);
  }
}

// 🔧 Автоматическое разбиение блоков
async function safeQueryFilter(
  contract: ethers.Contract,
  filter: ethers.EventFilter | ethers.DeferredTopicFilter,
  from: number,
  to: number,
  initialStep = 250
): Promise<ethers.EventLog[]> {
  const events: ethers.EventLog[] = [];
  let current = from;

  while (current <= to) {
    let step = initialStep;
    let success = false;

    while (!success && step >= 1) {
      const end = Math.min(current + step - 1, to);
      console.log(`🔍 Чтение блоков ${current} → ${end}`);

      try {
        const logs = await contract.queryFilter(
          filter as ethers.ContractEventName,
          current,
          end
        );
        events.push(...(logs as ethers.EventLog[]));
        current = end + 1;
        success = true;
      } catch (err: any) {
        const isTooManyResults = err?.error?.message?.includes(
          "more than 10000 results"
        );
        if (isTooManyResults) {
          console.warn(
            `⚠️ Слишком много логов. Пробуем шаг: ${step} → ${Math.floor(
              step / 2
            )}`
          );
          step = Math.floor(step / 2);
        } else {
          console.error("❌ Неизвестная ошибка:", err);
          break;
        }
      }
    }

    if (!success) {
      console.warn(
        `⚠️ Пропускаем блоки ${current} → ${Math.min(
          current + step - 1,
          to
        )} из-за ошибки.`
      );
      current += step;
    }
  }

  return events;
}

main().catch((err) => {
  console.error("❌ Ошибка:", err);
});
