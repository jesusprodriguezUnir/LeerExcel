import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

// Define las interfaces aquí
interface EnvironmentConfig {
  key: string;
  value: string;
}

interface Application {
  name: string;
  environments: {
    development: EnvironmentConfig[];
    preproduction: EnvironmentConfig[];
    test: EnvironmentConfig[];
    production: EnvironmentConfig[];
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Configuraciones Aplicaciones Alfa';
// Método para cambiar el título según el nombre de la hoja
  updateTitle(sheetName: string): void {
    this.title = `Configuraciones Aplicaciones Alfa - ${sheetName}`;
  }
  applications: Application[] = []; // Asegúrate de que está correctamente tipada
  excelData: any[] = []; // Variable para almacenar los datos del Excel
  sheetNames: string[] = []; // Variable para almacenar los nombres de las hojas
  selectedSheet: string = ''; // Variable para almacenar la hoja seleccionada



  // Método para manejar el evento de cambio de archivo
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        this.excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      };
      reader.readAsArrayBuffer(file);
    }
  }

// Método para cargar los datos de una hoja específica
loadSheetData(workbook: XLSX.WorkBook, sheetName: string): void {
  const worksheet = workbook.Sheets[sheetName];
  this.excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
}


 // Método para cambiar la hoja seleccionada
 selectSheet(sheetName: string): void {
  this.selectedSheet = sheetName;
  const workbook = XLSX.read(this.excelData, { type: 'array' });
  this.loadSheetData(workbook, sheetName);
}

  // Añade el método toggleEnv aquí
  toggleEnv(appName: string, env: string): void {
    // Lógica para alternar la visibilidad del entorno
  }

  isEnvVisible(appName: string, env: string): boolean {
    // Lógica para determinar si el entorno es visible
    return true; // Valor de retorno de marcador de posición
  }

}
