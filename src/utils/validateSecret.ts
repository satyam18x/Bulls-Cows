export function validateSecret(secret: string): string | null {
  if (secret[0] === '0') {
    return 'Secret cannot start with 0.';
  }

  const digits = secret.split('');
  const unique = new Set(digits);
  if (unique.size !== digits.length) {
    return 'All digits must be unique. No repeats allowed.';
  }

  return null; // valid
}