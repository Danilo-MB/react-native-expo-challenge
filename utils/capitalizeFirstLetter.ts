export function capitalizeFirstLetter(text?: string): string {
  if (typeof text !== 'string' || text.length === 0 || !text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}
