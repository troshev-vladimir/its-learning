export function formatNumber(number: number) {
  return String(number).replace(/(.)(?=(\d{3})+$)/g, "$1 ");
}
