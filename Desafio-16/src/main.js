import Cliente from "./cliente.js";
import Impuesto from "./impuesto.js";

let impuesto = new Impuesto(1000, 200);
console.log(
  `EL Monto Bruto Anual es: ${impuesto._monto_bruto_anual}, Las Deducciones son: ${impuesto._deducciones}`
);

let c1 = new Cliente("ClienteUno", impuesto);
console.log(`Impuesto de ${c1.nombre}: ${c1.calcularImpuesto()}`);
