import crypto from "crypto";

const genetateSKU = (name: string) => {
  return `${name.trim().toUpperCase()}-${crypto.randomUUID()}`;
};

export default genetateSKU;
