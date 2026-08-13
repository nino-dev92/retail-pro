let sequence = 0;

const generateSKU = (name: string) => {
  sequence++;

  const prefix = name.trim().replace(/\s+/g, "").toUpperCase().slice(0, 3);

  return `${prefix}-${String(sequence).padStart(3, "0")}`;
};

export default generateSKU;
