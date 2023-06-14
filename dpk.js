const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256;
const TRIVIAL_PARTITION_KEY = "0";

const isString = (value) => typeof value === "string";
const isObject = (value) => typeof value === "object" && value!== null;
const isFunction = (value) => typeof value === "function";

const getPartitionKey = (event) => {
  if (isObject(event) && event.partitionKey) {
    return event.partitionKey;
  }
  return JSON.stringify(event);
};

const hash = (data) => crypto.createHash("sha3-512").update(data).digest("hex");

const getCandidatePartitionKey = (event) => {
  const partitionKey = getPartitionKey(event);
  if (!isString(partitionKey)) {
    return JSON.stringify(partitionKey);
  }
  return partitionKey;
};

const getTruncatedPartitionKey = (partitionKey) => {
  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    return hash(partitionKey);
  }
  return partitionKey;
};

const getDeterministicPartitionKey = (event) => {
  const candidate = getCandidatePartitionKey(event);
  const truncated = getTruncatedPartitionKey(candidate);
  return truncated;
};

module.exports = {
  getDeterministicPartitionKey,
};