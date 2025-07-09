export const enumToOptions = <T extends Record<string, string | number>>(
  enumObject: T,
  labelTransform?: (key: string) => string
) => {
  return Object.keys(enumObject)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: enumObject[key].toString(),
      label: labelTransform
        ? labelTransform(key)
        : key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
    }));
};

export const parseEnum = <T extends Record<string, string | number>>(
  enumObject: T,
  value: string
): T[keyof T] => {
  const numValue = parseInt(value);
  if (Object.values(enumObject).includes(numValue)) {
    return numValue as T[keyof T];
  }
  throw new Error(`Invalid enum value: ${value}`);
};
