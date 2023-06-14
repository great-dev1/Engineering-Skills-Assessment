const crypto = require("crypto");
const { deterministicPartitionKey } = require("./deterministicPartitionKey");

describe("deterministicPartitionKey", () => {
  it("should return a string", () => {
    const event = { id: 123 };
    const result = deterministicPartitionKey(event);
    expect(typeof result).toBe("string");
  });

  it("should return a deterministic partition key based on the event data", () => {
    const event = { id: 123 };
    const result1 = deterministicPartitionKey(event);
    const result2 = deterministicPartitionKey(event);
    expect(result1).toBe(result2);
  });

  it("should return a partition key that is at most 256 characters long", () => {
    const event = { id: 123 };
    const result = deterministicPartitionKey(event);
    expect(result.length).toBeLessThanOrEqual(256);
  });

  it("should return a partition key that is not longer than 256 characters", () => {
    const event = { id: 123 };
    const result = deterministicPartitionKey(event);
    expect(result.length).toBeLessThanOrEqual(256);
  });

  it("should return a partition key that is a valid hexadecimal string", () => {
    const event = { id: 123 };
    const result = deterministicPartitionKey(event);
    expect(/^[0-9a-fA-F]+$/.test(result)).toBe(true);
  });

  it("should return a partition key that is different from the trivial partition key", () => {
    const event = { id: 123 };
    const result = deterministicPartitionKey(event);
    expect(result).not.toBe("0");
  });

  it("should return a partition key that is different from the event data", () => {
    const event = { id: 123 };
    const result = deterministicPartitionKey(event);
    expect(result).not.toBe(JSON.stringify(event));
  });

  it("should return a partition key that is different from the hashed event data", () => {
    const event = { id: 123 };
    const result = deterministicPartitionKey(event);
    expect(result).not.toBe(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"));
  });

  it("should return a partition key that is different from the hashed truncated event data", () => {
    const event = { id: 123 };
    const result = deterministicPartitionKey(event);
    const truncated = result.length > 256? crypto.createHash("sha3-512").update(result).digest("hex") : result;
    expect(truncated).not.toBe(crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex"));
  });
});