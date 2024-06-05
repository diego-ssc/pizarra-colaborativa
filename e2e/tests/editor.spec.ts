import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const userSuffix = new Date().getTime().toString()

  const username = `e2e-${userSuffix}`
  const email = `e2e-${userSuffix}@mail.com`

  await page.goto('http://localhost:8080/');
  await page.getByRole('button', { name: 'Regístrate' }).click();
  await page.getByLabel('Nombre de usuario').click();
  await page.getByLabel('Nombre de usuario').fill(username);
  await page.getByLabel('Nombre de usuario').press('Tab');
  await page.getByLabel('Correo electrónico').fill(email);
  await page.getByLabel('Correo electrónico').press('Tab');
  await page.getByLabel('Contraseña', { exact: true }).fill('12345678');
  await page.getByLabel('Confirmar contraseña').click();
  await page.getByLabel('Confirmar contraseña').fill('12345678');
  await page.getByRole('button', { name: 'Registrarse' }).click();
  await expect(page.getByRole('link', { name: 'Nueva pizarra' })).toBeVisible();
  await page.getByRole('link', { name: 'Nueva pizarra' }).click();
  await page.getByRole('button', { name: 'Crear pizarra' }).click();
  await expect(page.getByText('Select V Straight C Frame F Present Note N Pen P Eraser E Shape S Text T Image')).toBeVisible();
  await page.getByRole('link').click();
  await page.getByRole('link', { name: 'Pizarra sin título Fecha' }).click();
  await expect(page.getByText('Select V Straight C Frame F Present Note N Pen P Eraser E Shape S Text T Image')).toBeVisible();
});
