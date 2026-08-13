const generateSKU = (name: string, sequence: number) => {
  const prefix = name.trim().replace(/\s+/g, "").toUpperCase().slice(0, 3);

  const digits = String(sequence).padStart(3, "0");

  return `${prefix}-${digits}`;
};

export default generateSKU;
