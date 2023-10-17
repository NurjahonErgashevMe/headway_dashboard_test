function mask(phoneNumber: string): string {
  const countryCode = phoneNumber.slice(0, 3);
  const areaCode = phoneNumber.slice(3, 5);
  const firstPart = phoneNumber.slice(5, 8);
  const secondPart = phoneNumber.slice(8, 10);
  const thirdPart = phoneNumber.slice(10);

  return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
}

export default mask