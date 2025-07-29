const { FhenixClient, plaintexts } = require("@fhenixprotocol/sdk");
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("https://api.devnet.fhenix.zone");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const contractAddress = "0x...."; // địa chỉ contract bạn đã deploy
  const abi = [
    "function setEncryptedCounter((bytes) value) public",
    "function addToCounter(uint32 _value) public",
    "function getEncryptedCounter() view returns (bytes)"
  ];

  const contract = new ethers.Contract(contractAddress, abi, wallet);

  // Khởi tạo FhenixClient
  const fhe = await FhenixClient.create({ provider });

  // 1. Mã hóa số 100
  const encrypted = await fhe.encrypt32(100);
  console.log("Encrypted:", encrypted.public);

  // 2. Gửi vào contract
  const tx1 = await contract.setEncryptedCounter(encrypted.public);
  await tx1.wait();
  console.log("✅ setEncryptedCounter done");

  // 3. Cộng thêm 23
  const tx2 = await contract.addToCounter(23);
  await tx2.wait();
  console.log("✅ addToCounter done");

  // 4. Lấy kết quả đã mã hóa
  const encResult = await contract.getEncryptedCounter();
  const decrypted = await fhe.decrypt(encResult);
  console.log("🎉 Final Result (Decrypted):", decrypted); // Kết quả: 123
}

main();
