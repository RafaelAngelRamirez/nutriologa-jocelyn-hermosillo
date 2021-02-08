export interface Paciente {
  _id: number;
  nombre: string;
  fechaDeNacimiento: Date;
  // true es mujer
  sexo: boolean;

  celular: string;

  metasDelPaciente: string[];

  condicionActual: {
    embarazo: boolean;
    dm: boolean;
    ht: boolean;
    dl: boolean;
    au: boolean;
    ca: boolean;
    cv: boolean;
    otra: string;
    problemasGastroIntestinales: {
      estrenimiento: boolean;
      diarrea: boolean;
      alergias: boolean;
      vomito: boolean;
      colitis: boolean;
      gastritis: boolean;
      nauseas: boolean;
      agruras: boolean;
      distencionAbdominal: boolean;
      otro: string;
    };
  };

  actividadFisica: {
    tipo: string;
    frecuenciaSemana: number;
    tiempoMinutos: number;
    intensidad: number;
  };

  habitosAlimentarios: {
    r24h: {
      desayuno: string[];
      colacionM: string[];
      comida: string[];
      colacionV: string[];
      cena: string[];
    };

    tiemposDeComida: {
      desayuno: string[];
      colacionM: string[];
      comida: string[];
      colacionV: string[];
      cena: string[];
    };
  };

  datosAntropometricos: DatosAntropometricos[];
}

export interface DatosAntropometricos {
  peso: number;
  // talla es la estatura
  talla: number;
  circunferenciaCintura: number;
  circunferenciaAbdomen: number;
  circunferenciaCadera: number;
  masaMuscular: number;
  porcentajeDeGrasa: number;
  porcentajeDeAgua: number;
  fecha: Date;
}
