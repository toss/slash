export function isAge(ageInput: string): boolean {
  if (!/^\d*$/.test(ageInput)) {
    return false;
  }

  return Number(ageInput) > 0;
}
