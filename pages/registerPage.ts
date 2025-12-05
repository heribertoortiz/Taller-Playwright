import {Page, Locator} from '@playwright/test'; //1

//2 Generar clase RegisterPage
export class RegisterPage {
    readonly page: Page; //3 Generar una instancia - page es una variable - Page es una clase
    readonly firstNameInput: Locator; //Declaramos los elementos de tipo locator
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerButton: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){ //4 El constructor inicializa los elementos
        this.page = page; //Inicializamos page
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.registerButton = page.getByTestId('boton-registrarse');
        this.loginButton = page.getByTestId('boton-login-header-signup');
    }

    async visitarPaginaRegistro() { //6 ->Metodo
        await this.page.goto('http://localhost:3000/');
        await this.page.waitForLoadState('networkidle');

    }

    async completarFormularioRegistro(usuario: {nombre: string, apellido: string, email: string, contraseña: string}) { //11
        await this.firstNameInput.fill(usuario.nombre);
        await this.lastNameInput.fill(usuario.apellido);
        await this.emailInput.fill(usuario.email);
        await this.passwordInput.fill(usuario.contraseña);

    }

    async hacerClickBotonRegistro(){ //12
        await this.registerButton.click();
        
    }

    async hacerClickBotonLogin(){ //12
        await this.loginButton.click();
        
    }

    async completarYHacerClickBotonRegistro(usuario: {nombre: string, apellido: string, email: string, contraseña: string}){ //13
        await this.completarFormularioRegistro(usuario);
        await this.hacerClickBotonRegistro();
    }

}