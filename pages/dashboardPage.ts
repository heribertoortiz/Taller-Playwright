import {Page, Locator} from '@playwright/test';

//2 Generar clase RegisterPage
export class DashboardPage {
    readonly page: Page; //Generar una instancia - page es una variable - Page es una clase
    readonly dashboardTitle: Locator;

    constructor(page: Page){ //4 El constructor inicializa los elementos
        this.page = page; //Inicializamos page
        this.dashboardTitle = page.getByTestId('titulo-dashboard');
    }

    async visitarPaginaDashboard() {
        await this.page.goto('http://localhost:3000/dashboard');
        await this.page.waitForLoadState('networkidle');

    }
}