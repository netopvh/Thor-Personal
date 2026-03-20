/**
 * Máscara de telefone brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 * Mobile: 11 dígitos | Fixo: 10 dígitos
 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 2) {
    return digits ? `(${digits}` : '';
  }
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}
