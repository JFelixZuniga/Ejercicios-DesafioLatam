class Impuesto {
  constructor(monto_bruto_anual, deducciones) {
    this._monto_bruto_anual = monto_bruto_anual;
    this._deducciones = deducciones;
  }
  get monto_bruto_anual() {
    return this._monto_bruto_anual;
  }
  set monto_bruto_anual(nuevo_monto) {
    this._monto_bruto_anual = nuevo_monto;
  }

  get deducciones() {
    return this._deducciones;
  }
  set deducciones(nuevas_deducciones) {
    this._deducciones = nuevas_deducciones;
  }
}

export default Impuesto;
