/**
 * Currency and checkout URL utilities
 */

export function formatEuro(value: number): string {
  const parts = value.toFixed(2).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = parts[1];
  return `${integerPart},${decimalPart} €`;
}

export function formatEuroText(value: number): string {
  const parts = value.toFixed(2).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalPart = parts[1];
  return `${integerPart},${decimalPart} Euros`;
}

export function calculateDiscount(currentPrice: number, originalPrice: number) {
  const hasDisc = originalPrice > currentPrice;
  const pct = hasDisc ? Math.round((1 - currentPrice / originalPrice) * 100) : 0;
  const savings = hasDisc ? Number((originalPrice - currentPrice).toFixed(2)) : 0;
  const perDay = Number((currentPrice / 21).toFixed(2));

  return {
    hasDisc,
    pct,
    savings,
    perDay,
  };
}

export function buildCheckoutUrl(
  baseUrl: string,
  searchQuery?: string,
  externalReference?: string
): string {
  try {
    const url = new URL(baseUrl);
    const query = new URLSearchParams(
      searchQuery || (typeof window !== 'undefined' ? window.location.search : '')
    );

    const utmKeys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'src',
      'sck',
    ];

    for (const key of utmKeys) {
      const val = query.get(key);
      if (val) {
        url.searchParams.set(key, val);
      }
    }

    if (
      externalReference &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(externalReference)
    ) {
      url.searchParams.set('external_reference', externalReference);
    }

    return url.toString();
  } catch {
    return baseUrl;
  }
}
