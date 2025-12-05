import {Page, Locator} from '@playwright/test';

//2 Generar clase RegisterPage
export class LoginPage {
    readonly page: Page; //Generar una instancia - page es una variable - Page es una clase
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){ //4 El constructor inicializa los elementos
        this.page = page; //Inicializamos page
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByTestId('boton-login');
    }

    async visitarPaginaLogin() { //6 ->Metodo
        await this.page.goto('http://localhost:3000/login');
        await this.page.waitForLoadState('networkidle');

    }

    async completarFormularioLogin(usuario: {email: string, contraseña: string}) {
        await this.emailInput.fill(usuario.email);
        await this.passwordInput.fill(usuario.contraseña);

    }

    async hacerClickBotonLogin(){
        await this.loginButton.click();
        
    }

    async completarYHacerClickBotonLogin(usuario: {email: string, contraseña: string}){
        await this.completarFormularioLogin(usuario);
        await this.hacerClickBotonLogin();
    }

}