import { Component, OnInit } from '@angular/core';
import { ExcelReaderService } from 'src/app/services/excel-reader.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './app-configuracion.component.html',
  styleUrls: ['./app-configuracion.component.css']
})
export class AppConfiguracionComponent implements OnInit {
  configuraciones: any = {};

  constructor(private excelReaderService: ExcelReaderService) { }

  ngOnInit(): void {
    // Aquí se debería cargar el archivo Excel
    const file = new File([""], "configuraciones.xlsx"); // Reemplazar con el archivo real
    this.excelReaderService.readExcelFile(file).then((data: any) => {
      this.configuraciones = data;
    });
  }
}
