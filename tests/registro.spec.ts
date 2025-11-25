import { test, expect } from '@playwright/test';

test('TC-1 Verificar elementos visuales en la pagina de registro', async ({ page }) => {
  await page.goto('http://localhost:3000/'); //Esperar a que la pagina cargue completamente
  await expect(page.locator('input[name="firstName"]')).toBeVisible(); // Verificar que el campo de nombre esté visible
  await expect(page.locator('input[name="lastName"]')).toBeVisible(); // Verificar que el campo de apellido esté visible
  await expect(page.locator('input[name="email"]')).toBeVisible(); // Verificar que el campo de email esté visible
  await expect(page.locator('input[name="password"]')).toBeVisible(); // Verificar que el campo de contraseña esté visible
  await expect(page.getByTestId('boton-registrarse')).toBeVisible(); // Verificar que el botón de registrarse esté visible
  
  //await page.waitForTimeout(5000); // Esperar 5 segundos para asegurar que todos los elementos se carguen
  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);
});

test('TC-2 Verificar que el boton de registro se encuentre inhabilitado cuando los campos estan vacios', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled(); // Verificar que el botón de registrarse esté deshabilitado
});

test('TC-3 Verificar que el boton de registro se habilite al completar todos los campos obligatorios', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Heriberto'); // Ingresa un valor en el campo Nombre
  await page.locator('input[name="lastName"]').fill('Ortiz'); // Ingresa un valor en el campo Apellido
  await page.locator('input[name="email"]').fill('heriberto9705@gmail.com'); // Ingresa un valor en el campo email
  await page.locator('input[name="password"]').fill('Galleta8547*'); // Ingresa un valor en el campo password
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled(); // Verificar que el botón de registrarse esté habilitado
});

test('TC-4 Verificar redireccionamiento a pagina de inicio de sesión al hacer clic', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:3000/login');
  await page.waitForTimeout(5000); // Esperar 5 segundos para asegurar que todos los elementos se carguen
});

test('TC-5 Verificar registro exitoso con datos válidos', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Heribert'); // Ingresa un valor en el campo Nombre
  await page.locator('input[name="lastName"]').fill('Orti'); // Ingresa un valor en el campo Apellido
  await page.locator('input[name="email"]').fill('heriberto970'+Date.now().toString()+'@gmail.com'); // Ingresa un valor en el campo email
  await page.locator('input[name="password"]').fill('Galleta8547*'); // Ingresa un valor en el campo password
  await page.getByTestId('boton-registrarse').click(); // Al llenar los campos da click en registrarse/ NO ASERC
  await expect(page.getByText('Registro exitoso')).toBeVisible(); //Valida que se muestre en alguna parte de la pantalla el mensaje de registro exitoso
});

test('TC-6 Verificar que un usuario NO pueda registrarse con un correo existente', async ({ page }) => {
  const email = 'heriberto970'+Date.now().toString()+'@gmail.com';
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Heribert'); // Ingresa un valor en el campo Nombre
  await page.locator('input[name="lastName"]').fill('Orti'); // Ingresa un valor en el campo Apellido
  await page.locator('input[name="email"]').fill(email); // Ingresa un valor en el campo email
  await page.locator('input[name="password"]').fill('Galleta8547*'); // Ingresa un valor en el campo password
  await page.getByTestId('boton-registrarse').click(); // Al llenar los campos da click en registrarse/ NO ASERC
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Heribert'); // Ingresa un valor en el campo Nombre
  await page.locator('input[name="lastName"]').fill('Orti'); // Ingresa un valor en el campo Apellido
  await page.locator('input[name="email"]').fill(email); // Ingresa un valor en el campo email
  await page.locator('input[name="password"]').fill('Galleta8547*'); // Ingresa un valor en el campo password
  await page.getByTestId('boton-registrarse').click(); // Al llenar los campos da click en registrarse/ NO ASERC
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});