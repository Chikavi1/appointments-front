import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  curp: string = '';

constructor(private apiService:ApiService){

}

isCurp(curp: string): boolean {
  const re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
  const validado = curp.match(re);

  if (!validado) {
    return false;
  }

  function digitoVerificador(curp17: string): number {
    const diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let lngSuma = 0.0;
    let lngDigito = 0.0;
    for (let i = 0; i < 17; i++) {
      lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
    }
    lngDigito = 10 - (lngSuma % 10);
    if (lngDigito === 10) return 0;
    return lngDigito;
  }

  if (Number(validado[2]) !== digitoVerificador(validado[1])) {
    return false;
  }
  return true;
}

onSubmit(){
  if (this.curp.length >= 18) {
    if(!this.isCurp(this.curp)){
      alert('La CURP ingresada no es válida. Por favor, ingrese una CURP válida.')
      return;
    }

    const appointmentData = {
      curp: this.curp,
      date: new Date().toISOString()
    };

    this.apiService.createAppointment(appointmentData).subscribe(response => {
        alert(response.message);
        this.resetData();
      },
      error => {
        alert(error.error.error);
        console.error('Error al crear la cita:', error.error.error);
      }
    );
  }
}

onInputChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  this.curp = input.value.toUpperCase();
}



resetData(){
  this.curp = '';
}

}
