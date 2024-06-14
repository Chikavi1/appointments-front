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
  this.apiService.getAppointments().subscribe(response => {
    console.log(response);
  },err => {
    console.log(err);
  });
}

onSubmit() {
  if (this.curp.length >= 18) {
    const appointmentData = {
      curp: this.curp,
      date: new Date().toISOString()
    };

    console.log(appointmentData);

    // Llama al método del servicio para crear la cita
    this.apiService.createAppointment(appointmentData).subscribe(response => {
        alert('Cita creada');
        this.resetData();
      },
      error => {
        alert('Error al crear cita: '+JSON.stringify(error));
        console.error('Error al crear la cita:', error);
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
