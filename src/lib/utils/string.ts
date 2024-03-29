export const isSafeToParse = (v: string): boolean => {
  try {
    JSON.parse(v);
  } catch (err: unknown) {
    return false;
  }

  return true;
};

export const encode = (str: string): string =>
  Buffer.from(str).toString("base64");

export const decode = (str: string): string =>
  Buffer.from(str, "base64").toString("ascii");
