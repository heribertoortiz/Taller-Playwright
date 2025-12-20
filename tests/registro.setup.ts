import { test as setup, expect } from '@playwright/test';
import { BackendUtils } from '../utils/backendUtils';
import { LoginPage } from '../pages/loginPage';
import TestData from  '../data/testData.json';
import { DashboardPage } from '../pages/dashboardPage';
import { ModalCrearCuenta } from '../pages/modalCrearCuenta';
import fs from 'fs/promises'; //Devuelve las promises dentro de un archivo
import path from 'path'; //Ayuda a encontrar archivos dentro de un directorio

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let modalCrearCuenta: ModalCrearCuenta;

//Se genera un archivo de configuración (auth) para almacenar los inicios de sesion de cada usuario, cookies, etc.
const usuarioEnviaAuthFile = 'playwright/.auth/usuarioEnvia.json'; //Usuario que envia la transferencia
const usuarioRecibeAuthFile = 'playwright/.auth/usuarioRecibe.json'; //Usuario que recibe la transferencia
const usuarioEnviaDataFile = 'playwright/.auth/usuarioEnvia.data.json'; //Guardar datos del usuario

setup.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    modalCrearCuenta = new ModalCrearCuenta(page);
    await loginPage.visitarPaginaLogin();
});

setup('Generar usuario que envia dinero', async ({ page, request }) => { //Se crea usuario, logueo, agregar una cuenta, agregar dinero y salir
    const nuevoUsuario = await BackendUtils.crearUsuarioPorAPI(request, TestData.usuarioValido);

    //Guardamos los datos del nuevo usuario para usarlo en el TC-14
    await fs.writeFile(path.resolve(__dirname, '..', usuarioEnviaDataFile), JSON.stringify(nuevoUsuario, null, 2)) //fs: File system nativo de node js


    await loginPage.completarYHacerClickBotonLogin(nuevoUsuario);
    await dashboardPage.botonAgregarCuenta.click();
    await modalCrearCuenta.seleccionarTipoCuenta('Débito');
    await modalCrearCuenta.completarMonto('1000');
    await modalCrearCuenta.botonCrearCuenta.click();
    await expect(page.getByText('Cuenta creada exitosamente')).toBeVisible();
    await page.context().storageState( { path:usuarioEnviaAuthFile }); //Guarda el usuario que envia en el archivo usuarioEnvia.json
});

setup('Crear usuario, Loguear usuario que recibe dinero', async ({ page, request }) => { //Validar inicio de sesion con usuario que recibe dinero
    const nuevoUsuario = await BackendUtils.crearUsuarioPorAPI(request, TestData.usuarioValido, false);
    await loginPage.completarYHacerClickBotonLogin(nuevoUsuario);
    await expect(dashboardPage.dashboardTitle).toBeVisible();
    await page.context().storageState( { path: usuarioRecibeAuthFile } ); //Guarda el usuario que recibe en el archivo usuarioEnvia.json

});
