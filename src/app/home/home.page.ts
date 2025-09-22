import { Component } from '@angular/core';

interface HistoryItem {
  name: string;
  gender: string;
  height: number;
  country: string;
  convertedHeight: string;
  result: string;
  flag: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  name: string = '';
  gender: string = '';
  height: number | null = null; // siempre en cm
  country: string = '';
  result: string | null = null;
  convertedHeight: string = '';
  history: HistoryItem[] = [];

  // Umbrales por país y por sexo (valores aproximados, ajustables)
  thresholds: {
    [country: string]: {
      hombre: { low: number; high: number };
      mujer: { low: number; high: number };
    };
  } = {
    // México (ejemplo que diste)
    mx: { hombre: { low: 163, high: 175 }, mujer: { low: 150, high: 170 } },

    // Estados Unidos / Canada / Australia (similar)
    us: { hombre: { low: 170, high: 184 }, mujer: { low: 156, high: 170 } },
    ca: { hombre: { low: 170, high: 184 }, mujer: { low: 156, high: 170 } },
    au: { hombre: { low: 170, high: 184 }, mujer: { low: 156, high: 170 } },

    // Reino Unido
    uk: { hombre: { low: 170, high: 183 }, mujer: { low: 155, high: 169 } },

    // Europa continental
    de: { hombre: { low: 173, high: 187 }, mujer: { low: 159, high: 173 } },
    fr: { hombre: { low: 168, high: 182 }, mujer: { low: 156, high: 170 } },
    es: { hombre: { low: 167, high: 181 }, mujer: { low: 156, high: 170 } },
    it: { hombre: { low: 168, high: 182 }, mujer: { low: 155, high: 169 } },

    // Asia
    jp: { hombre: { low: 164, high: 178 }, mujer: { low: 151, high: 165 } },
    kr: { hombre: { low: 167, high: 181 }, mujer: { low: 154, high: 168 } },
    cn: { hombre: { low: 165, high: 179 }, mujer: { low: 153, high: 167 } },

    // LatAm / BR
    br: { hombre: { low: 165, high: 179 }, mujer: { low: 153, high: 167 } },

    // India
    in: { hombre: { low: 160, high: 174 }, mujer: { low: 146, high: 160 } },

    // Rusia
    ru: { hombre: { low: 169, high: 183 }, mujer: { low: 157, high: 171 } },
  };

  constructor() {}

  canSubmit(): boolean {
    return !!this.name && !!this.gender && !!this.country &&
      this.height !== null && !isNaN(this.height) && this.height > 0;
  }

  onSubmit() {
    if (!this.canSubmit()) return;

    this.evaluarEstatura();

    // Guardar en historial
    this.history.unshift({
      name: this.name,
      gender: this.gender,
      height: this.height!,
      country: this.country,
      convertedHeight: this.convertedHeight,
      result: this.result!,
      flag: this.getCountryFlag(this.country),
    });
  }

  evaluarEstatura() {
    if (this.height === null || !this.gender) return;

    // Obtener umbral del país; si no existe, usar México como fallback
    const countryThresholds = this.thresholds[this.country] || this.thresholds['mx'];
    const t = countryThresholds[this.gender as 'hombre' | 'mujer'];

    if (!t) {
      // fallback general si por alguna razón no hay t
      this.result = this.height < 160 ? (this.gender === 'hombre' ? 'Bajito' : 'Bajita')
        : (this.height > 175 ? (this.gender === 'hombre' ? 'Alto' : 'Alta') : 'Promedio');
    } else {
      if (this.height < t.low) {
        this.result = this.gender === 'hombre' ? 'Bajito' : 'Bajita';
      } else if (this.height > t.high) {
        this.result = this.gender === 'hombre' ? 'Alto' : 'Alta';
      } else {
        this.result = 'Promedio';
      }
    }

    // Conversión según país (misma función que tenías)
    this.convertedHeight = this.convertHeight(this.height, this.country);
  }

  convertHeight(heightCm: number, country: string): string {
    const cmRounded = Math.round(heightCm);

    const toFeetInches = (cm: number) => {
      const totalInches = Math.round(cm / 2.54);
      const feet = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      return `${feet}' ${inches}" (${cm} cm)`;
    };

    switch (country) {
      case 'us':
      case 'uk':
      case 'ca':
      case 'au':
        return toFeetInches(cmRounded);

      case 'cn':
        return `${(heightCm / 100).toFixed(2)} m (${cmRounded} cm)`;

      default:
        return `${cmRounded} cm`;
    }
  }

  getCountryName(country: string): string {
    switch (country) {
      case 'mx': return 'México';
      case 'us': return 'United States';
      case 'cn': return 'China';
      case 'ca': return 'Canada';
      case 'uk': return 'United Kingdom';
      case 'de': return 'Germany';
      case 'fr': return 'France';
      case 'es': return 'Spain';
      case 'it': return 'Italy';
      case 'jp': return 'Japan';
      case 'kr': return 'South Korea';
      case 'au': return 'Australia';
      case 'br': return 'Brazil';
      case 'in': return 'India';
      case 'ru': return 'Russia';
      default: return 'Desconocido';
    }
  }

  getCountryFlag(country: string): string {
    switch (country) {
      case 'mx': return '🇲🇽';
      case 'us': return '🇺🇸';
      case 'cn': return '🇨🇳';
      case 'ca': return '🇨🇦';
      case 'uk': return '🇬🇧';
      case 'de': return '🇩🇪';
      case 'fr': return '🇫🇷';
      case 'es': return '🇪🇸';
      case 'it': return '🇮🇹';
      case 'jp': return '🇯🇵';
      case 'kr': return '🇰🇷';
      case 'au': return '🇦🇺';
      case 'br': return '🇧🇷';
      case 'in': return '🇮🇳';
      case 'ru': return '🇷🇺';
      default: return '🏳️';
    }
  }
}
