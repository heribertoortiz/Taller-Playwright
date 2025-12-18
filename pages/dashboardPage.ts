import {Page, Locator} from '@playwright/test';

//2 Generar clase RegisterPage
export class DashboardPage {
    readonly page: Page; //Generar una instancia - page es una variable - Page es una clase
    readonly dashboardTitle: Locator;
    readonly botonAgregarCuenta: Locator;
    readonly botonEnviarDinero: Locator;
    readonly elementosListaTransferencia: Locator;
    readonly elementosListaMontoTransferencia: Locator;

    constructor(page: Page){ //4 El constructor inicializa los elementos
        this.page = page; //Inicializamos page
        this.dashboardTitle = page.getByTestId('titulo-dashboard');
        this.botonAgregarCuenta = page.getByTestId('tarjeta-agregar-cuenta');
        this.botonEnviarDinero = page.getByTestId('boton-enviar');
        this.elementosListaTransferencia = page.locator('[data-testid="descripcion-transaccion"]');
        this.elementosListaMontoTransferencia = page.locator('[data-testid="monto-transaccion"]');
    }

    async visitarPaginaDashboard() {
        await this.page.goto('http://localhost:3000/dashboard');
        await this.page.waitForLoadState('networkidle');

    }
}