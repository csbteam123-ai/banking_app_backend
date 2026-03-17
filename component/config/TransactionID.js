function generateTransactionID() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  const random = Math.floor(Math.random() * 900000) + 100000; // 6 digit

  return `TXN-${year}${month}${day}-${hour}${minute}${second}-${random}`;
}

module.exports = generateTransactionID;