import test from 'node:test';
import assert from 'node:assert/strict';
import { formatEuro, formatEuroText, calculateDiscount, buildCheckoutUrl } from './currency';

test('formatEuro formats numbers with comma and euro symbol', () => {
  assert.equal(formatEuro(9.23), '9,23 €');
  assert.equal(formatEuro(46.22), '46,22 €');
  assert.equal(formatEuro(1234.56), '1.234,56 €');
});

test('formatEuroText formats numbers with comma and Euros word', () => {
  assert.equal(formatEuroText(9.23), '9,23 Euros');
  assert.equal(formatEuroText(46.22), '46,22 Euros');
});

test('calculateDiscount computes discount percent and savings correctly', () => {
  const result = calculateDiscount(9.23, 46.22);
  assert.equal(result.hasDisc, true);
  assert.equal(result.pct, 80);
  assert.equal(result.savings, 36.99);
  assert.ok(result.perDay > 0);
});

test('buildCheckoutUrl preserves UTM parameters and handles checkout link', () => {
  const checkoutUrl = 'https://pay.clickpayon.com/904f4d31-d9cf-4aba-8404-7eecfe5fa888';
  const withUtm = buildCheckoutUrl(checkoutUrl, '?utm_source=facebook&utm_campaign=blackfriday');
  assert.ok(withUtm.includes('utm_source=facebook'));
  assert.ok(withUtm.includes('utm_campaign=blackfriday'));
  assert.ok(withUtm.startsWith('https://pay.clickpayon.com/904f4d31-d9cf-4aba-8404-7eecfe5fa888'));
});
