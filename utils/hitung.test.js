import { tambah, kurang, kali, bagi } from './hitung.js';

test('menambahkan 2 + 3 = 5', () => {
  expect(tambah(2, 3)).toBe(5);
});

test('mengurangkan 5 - 2 = 3', () => {
  expect(kurang(5, 2)).toBe(3);
});

test('mengalikan 4 * 3 = 12', () => {
  expect(kali(4, 3)).toBe(12);
});

test('membagi 10 / 2 = 5', () => {
  expect(bagi(10, 2)).toBe(5);
});

test('membagi dengan nol harus error', () => {
  expect(() => bagi(10, 0)).toThrow("Tidak bisa bagi dengan nol");
});
