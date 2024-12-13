export function validateTheme(theme: string): string | null {
  if (!theme.trim()) {
    return 'Theme is required';
  }
  if (theme.length < 3) {
    return 'Theme must be at least 3 characters long';
  }
  if (theme.length > 100) {
    return 'Theme must be less than 100 characters';
  }
  return null;
}