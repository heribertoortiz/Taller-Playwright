import {Page, Locator} from '@playwright/test';

export class ModalCrearCuenta {
    readonly page: Page;
    readonly tipoCuentaDropdown: Locator;
    readonly montoInput: Locator;
    readonly botonCancelar: Locator;
    readonly botonCrearCuenta: Locator;

    constructor(page: Page){
        this.page = page;
        this.tipoCuentaDropdown = page.getByRole('combobox', { name: 'Tipo de cuenta *' });
        this.montoInput = page.getByRole('spinbutton', { name: 'Monto inicial *' });
        this.botonCancelar = page.getByTestId('boton-cancelar-crear-cuenta');
        this.botonCrearCuenta = page.getByTestId('boton-crear-cuenta');
    }

    async seleccionarTipoCuenta (tipoCuenta: string){
        await this.tipoCuentaDropdown.click();
        await this.page.getByRole('option', { name: tipoCuenta }).click();
    }
    
    async completarMonto(monto: string){
        await this.montoInput.fill(monto);
    }

}