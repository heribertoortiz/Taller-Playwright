import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/registerPage';
import TestData from  '../data/testData.json';

let registerPage: RegisterPage;

//beforeEach: Se ejecuta antes de CADA test
test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  await registerPage.visitarPaginaRegistro();
});

test('TC-1 Verificar elementos visuales en la pagina de registro', async ({ page }) => { //5
  await expect(registerPage.firstNameInput).toBeVisible(); // Verificar que el campo de nombre esté visible
  await expect(registerPage.lastNameInput).toBeVisible(); // Verificar que el campo de apellido esté visible
  await expect(registerPage.emailInput).toBeVisible(); // Verificar que el campo de email esté visible
  await expect(registerPage.passwordInput).toBeVisible(); // Verificar que el campo de contraseña esté visible
  await expect(registerPage.registerButton).toBeVisible(); // Verificar que el botón de registrarse esté visible
});

test('TC-2 Verificar que el boton de registro se encuentre inhabilitado cuando los campos estan vacios', async ({ page }) => {
  await expect(registerPage.registerButton).toBeDisabled(); // Verificar que el botón de registrarse esté deshabilitado
});

test('TC-3 Verificar que el boton de registro se habilite al completar todos los campos obligatorios', async ({ page }) => {
  await registerPage.completarFormularioRegistro(TestData.usuarioValido); //Se llama el metodo completarFormularioRegistro
  await expect(registerPage.registerButton).toBeEnabled(); // Verificar que el botón de registrarse esté habilitado
});

test('TC-4 Verificar redireccionamiento a pagina de inicio de sesión al hacer clic', async ({ page }) => {
  await registerPage.hacerClickBotonLogin(); //Se llama el metodo hacerClickBotonLogin
  await expect(page).toHaveURL('http://localhost:3000/login');
});

test('TC-5 Verificar registro exitoso con datos válidos', async ({ page }) => {
  test.step('Completar el formulario de registro con datos válidos', async () => {
    const email = (TestData.usuarioValido.email.split('@')[0]) + Date.now().toString() + '@' + TestData.usuarioValido.email.split('@')[1];
    TestData.usuarioValido.email = email;
    await registerPage.completarYHacerClickBotonRegistro(TestData.usuarioValido); //Se llama el metodo completarYHacerClickBotonRegistro
  });
  await expect(page.getByText('Registro exitoso')).toBeVisible(); //Valida que se muestre en alguna parte de la pantalla el mensaje de registro exitoso
});

test('TC-6 Verificar que un usuario NO pueda registrarse con un correo existente', async ({ page }) => {
  const email = (TestData.usuarioValido.email.split('@')[0]) + Date.now().toString() + '@' + TestData.usuarioValido.email.split('@')[1]; //se agrega el split para separar
  TestData.usuarioValido.email = email;
  await registerPage.completarYHacerClickBotonRegistro(TestData.usuarioValido); //Se llama el metodo completarFormularioRegistro
  await expect(page.getByText('Registro exitoso')).toBeVisible(); //Valida que se muestre en alguna parte de la pantalla el mensaje de registro exitoso
  await registerPage.visitarPaginaRegistro();
  await registerPage.completarYHacerClickBotonRegistro(TestData.usuarioValido); //Se llama el metodo completarFormularioRegistro
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();
});