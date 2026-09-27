export function formatPrice(price: number, currency: string) {
  const symbol = currency === "USD" ? "US$" : currency;
  return `${symbol} ${price.toLocaleString("es-AR")}`;
}
