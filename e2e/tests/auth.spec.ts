import { test, expect } from '@playwright/test';

test('register and then login', async ({ page }) => {
  const userSuffix = new Date().getTime().toString()

  const username = `auth-${userSuffix}`
  const email = `auth-${userSuffix}@mail.com`

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
  await page.getByRole('button', { name: 'Cerrar sesión' }).click();
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByLabel('Correo electrónico').click();
  await page.getByLabel('Correo electrónico').fill(email);
  await page.getByLabel('Correo electrónico').press('Tab');
  await page.getByLabel('Contraseña').fill('12345678');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await expect(page.getByRole('link', { name: 'Nueva pizarra' })).toBeVisible();
  await expect(page.getByPlaceholder('Buscar...')).toBeVisible();
  await expect(page.getByPlaceholder('Buscar...')).toBeEmpty();
});
