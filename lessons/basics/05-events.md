# 👻 Урок 05: События в смарт-контрактах

[← Вернуться к основному README](../../README.md)

## 🔗 ЗАДАЧА

Научиться отслеживать **события (events)**, которые отправляются из смарт-контрактов, используя `ethers.js`.

---

## 🎯 ЧТО ТАКОЕ события?

События - механизм логирования в смарт-контрактах. Они:

- не изменяют состояние блокчейна
- записываются в лог транзакции (недоступен из других контрактов, только из вне)
- используются для оповещения фронтенда о том, что что-то произошло

Примеры:

- `Transfer(address indexed from, address indexed to, uint amount)` - в токенах
- `Deposit(address user, uint amount)` - в DeFi-протоколах

---

## 🧩 Где используются события?

- Отслеживание транзакций (токенов, NFT и т.д.)
- В логике интерфейса: обновить баланс, показать нотификацию
- Для работы с `The Graph`, логерами, бэкендами

---

## 🔐 Как слушать события с ethers.js

Есть два способа:

### 1. **Подписка на новые события (реальное время)**

```ts
contract.on("Transfer", (from, to, amount, event) => {
  console.log(`📡 Перевод: ${from} → ${to}, сумма: ${amount.toString()}`);
});
```

### 2. **Чтение прошедших событий (история блоков)**

Иногда нужно не "слушать в реальном времени", а получить **все события за прошлый период**. Для этого используется `contract.queryFilter(...)`.

```ts
// Фильтр всех Transfer событий к определённому адресу

const transferEvent = contract.getEvent("Transfer");
const filter = transferEvent.filter("0xFromAddress", null);
const events = await contract.queryFilter(filter, fromBlock, toBlock);

for (const event of events) {
  const { args, transactionHash } = event;
  console.log(
    `📜 Исторический перевод: ${args?.from} → ${
      args?.to
    }, сумма: ${args?.amount.toString()}`
  );
  console.log(
    `🔗 Транзакция: https://sepolia.etherscan.io/tx/${transactionHash}`
  );
}
```

---

### 3. **Ограничение количества событий**

Если ты ищешь события из большого диапазона блоков, можно ограничить результат:

```ts
const logs = await contract.queryFilter(filter, fromBlock, toBlock);

// Берем последние 5 событий
const lastEvents = logs.slice(-5);
```

---

### 4. 🎯 Фильтрация по `indexed` параметрам

Можно фильтровать только те параметры, которые объявлены как `indexed` в самом событии:

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);
```

```ts
const transferEvent = contract.getEvent("Transfer");
const filter = transferEvent.filter("0xFromAddress", null);
const events = await contract.queryFilter(filter, fromBlock, toBlock);

for (const event of events) {
  console.log(
    `🎯 Фильтрованный перевод: ${event.args?.from} → ${event.args?.to}`
  );
}
```

> ❗️ Параметры без `indexed` (например, `amount`) фильтровать нельзя — их можно только прочитать из `event.args`.

---

### 5. 🚫 Удаление подписки на событие

Если больше не нужно слушать событие — можно удалить обработчик через `.off()`:

```ts
function handleTransfer(from, to, amount) {
  console.log(`➡️ ${from} → ${to}, сумма: ${amount.toString()}`);
}

contract.on("Transfer", handleTransfer); // Подписка
contract.off("Transfer", handleTransfer); // Удаление
```

---

### 6. 🔂 Однократная подписка (`once`)

Если тебе нужно поймать **только первое событие**, используй `.once()`:

```ts
contract.once("Transfer", (from, to, amount) => {
  console.log(`✅ Получен первый перевод: ${from} → ${to}`);
});
```

---

### 7. 🎨 Кастомные события

Контракты могут объявлять свои события, например:

```solidity
event NFTMinted(address indexed user, uint256 tokenId, string uri);
```

Слушать такие события можно точно так же:

```ts
contract.on("NFTMinted", (user, tokenId, uri) => {
  console.log(`🖼 NFT #${tokenId} сминчен для ${user}`);
  console.log(`🔗 URI: ${uri}`);
});
```

> 🔍 Аргументы приходят в том же порядке, как в Solidity, и также доступны через `event.args`.

---

## 🛠 ДАЛЕЕ - реализация в коде

В файле [`05-events.ts`](./05-events.ts) мы:

- Подключим WebSocket-провайдер
- Подпишемся на `Transfer(...)` через `.on(...)`
- Прочитаем историю событий через `queryFilter(...)`
- Логически соединим всё в одном удобном скрипте

> Это пригодится для создания бэкенд-ботов, realtime-UI, алертов, логеров и всего, что зависит от активности в сети.
