import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


interface DataItem {
  [key: string]: any;
}

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  formDate!: UntypedFormGroup;
  data: DataItem[] = []; // Variable para almacenar los datos de la tabla
  columns: any[] = []; // Variable para especificar las columnas de la tabla
  // dataTable:any

  constructor(private servicio: ApiService, private fb: UntypedFormBuilder, private datePipe: DatePipe){
   
  }

  ngOnInit(): void {
    this.formDate = this.fb.group({
      fechaInicio: [null, [Validators.required]],
      fechaFinal: [null, [Validators.required]],
      informe: [null, [Validators.required]]
    })
  }


  onSubmit(){
    if (this.formDate.valid) {
      console.log('submit', this.formDate.value);
  
      let data = this.formDate.value;
      let opcion = data.informe;
      let FechaInicio = data.fechaInicio ? this.datePipe.transform(data.fechaInicio, 'yyyy-MM-dd') : '';
      let FechaFinal = data.fechaFinal ? this.datePipe.transform(data.fechaFinal, 'yyyy-MM-dd') : '';
      
      console.log('Formatos de las Fehcas ', FechaInicio ,FechaFinal);
      


      if (FechaInicio && FechaFinal) {
        this.servicio.obtenerHistoricos(opcion, FechaInicio, FechaFinal).subscribe({
          next: response => {
            const rawData = response;

            // Generar columnas basadas en las claves de los datos
            this.columns = Object.keys(rawData[0]).map(key => ({
              title: key,
              key: key
            }));

          // Copiar los datos sin modificar
            this.data = [...rawData];
              console.log('RESULTADO:', response);
          },
          error: error => {
            // Manejar los errores
            console.error(error);
          }
        });
      }
    } else {
      Object.values(this.formDate.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
