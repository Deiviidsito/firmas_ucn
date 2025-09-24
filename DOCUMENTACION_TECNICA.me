# Documentación Técnica - Generador de Firmas UCN

## 1. Información General del Proyecto

### 1.1 Descripción
Sistema web para generar firmas institucionales de la Universidad Católica del Norte (UCN) compatible con Gmail y otros clientes de correo electrónico.

### 1.2 Tecnologías Utilizadas
- **Frontend Framework**: React 18.3.1 con TypeScript
- **Build Tool**: Vite 7.1.3
- **Estilos**: TailwindCSS 3.4.1
- **Iconografía**: Lucide React 0.344.0
- **Gestión de Estado**: Custom Hook con useState
- **APIs**: ResizeObserver para dimensionamiento dinámico

### 1.3 Estructura del Proyecto
```
firmas_ucn/
├── src/
│   ├── App.tsx                    # Aplicación principal
│   ├── main.tsx                   # Punto de entrada
│   ├── index.css                  # Estilos globales
│   ├── components/
│   │   ├── Header.tsx             # Encabezado institucional
│   │   ├── SignatureForm.tsx      # Formulario de datos
│   │   ├── SignaturePreview.tsx   # Vista previa de firma
│   │   ├── CopyButton.tsx         # Botón de copia
│   │   └── InstructionsModal.tsx  # Modal de instrucciones
│   └── hooks/
│       └── useSignatureGenerator.ts # Lógica de negocio
├── public/                        # Recursos estáticos
├── package.json                   # Dependencias
├── vite.config.ts                # Configuración de Vite
├── tailwind.config.js            # Configuración de Tailwind
└── tsconfig.json                 # Configuración TypeScript
```

## 2. Componentes del Sistema

### 2.1 App.tsx - Componente Principal
**Responsabilidad**: Layout principal y coordinación de componentes

**Características**:
- Diseño responsive con sidebar en desktop y stack en mobile
- Gestión del estado global de la aplicación
- Implementación de breakpoints para adaptabilidad

**Código Clave**:
```typescript
const [formData, setFormData] = useState<SignatureData>({
  nombre: '',
  titulo: '',
  email: '',
  telefono: '',
  // ... más campos
});
```

### 2.2 Header.tsx - Encabezado Institucional
**Responsabilidad**: Branding y acceso a ayuda

**Características**:
- Logo institucional responsive
- Botón de instrucciones con modal
- Colores institucionales UCN

**Funcionalidades**:
- Modal de instrucciones con video tutorial
- Responsive design para móviles y desktop
- Botón verde esmeralda para ayuda

### 2.3 SignatureForm.tsx - Formulario de Datos
**Responsabilidad**: Captura de información del usuario

**Características**:
- Interface con pestañas (Datos Personales / Enlaces Académicos)
- Validación de campos requeridos
- Diseño adaptativo sidebar/horizontal

**Campos del Formulario**:
- **Datos Personales**: Nombre, título, email, teléfono
- **Enlaces Académicos**: ORCID, ResearchGate, Google Scholar, etc.

### 2.4 SignaturePreview.tsx - Vista Previa
**Responsabilidad**: Mostrar firma generada en tiempo real

**Características**:
- Simulación de interfaz Gmail
- Actualización en tiempo real
- Logo adaptatativo según contenido
- Botón de copia integrado

### 2.5 InstructionsModal.tsx - Sistema de Ayuda
**Responsabilidad**: Guiar al usuario en el proceso

**Características**:
- 4 pasos detallados del proceso
- Video tutorial de YouTube integrado
- Consejos y tips adicionales
- Modal responsive

### 2.6 useSignatureGenerator.ts - Hook Personalizado
**Responsabilidad**: Lógica de negocio y generación HTML

**Funciones Principales**:
- Generación de HTML optimizado para email
- Construcción de tabla con estilos inline
- Gestión del estado de la aplicación
- Validación de datos

## 3. Características Técnicas

### 3.1 Diseño Responsive
- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: sm, md, lg definidos en Tailwind
- **Componentes Adaptativos**: Sidebar → Stack en mobile

### 3.2 Generación de HTML
```html
<table style="font-family: Arial, sans-serif; border-collapse: collapse;">
  <tr>
    <td style="vertical-align: top; padding-right: 20px;">
      <img src="logo.png" alt="UCN" style="height: auto; max-height: 80px;">
    </td>
    <td style="vertical-align: top;">
      <!-- Información del usuario -->
    </td>
  </tr>
</table>
```

### 3.3 Compatibilidad de Email
- Uso de tablas para máxima compatibilidad
- Estilos inline para evitar problemas de CSS
- Optimización para Gmail, Outlook, Apple Mail

### 3.4 Gestión de Estado
```typescript
interface SignatureData {
  nombre: string;
  titulo: string;
  email: string;
  telefono: string;
  orcid?: string;
  researchGate?: string;
  googleScholar?: string;
  // ... más campos
}
```

## 4. Instalación y Configuración

### 4.1 Prerrequisitos
- Node.js >= 18.0.0
- npm >= 9.0.0 o yarn >= 1.22.0
- Git

### 4.2 Instalación Local
```bash
# Clonar repositorio
git clone https://github.com/Deiviidsito/firmas_ucn.git
cd firmas_ucn

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
```

### 4.3 Configuración de Desarrollo
```bash
# Servidor de desarrollo
npm run dev          # Puerto 5173 por defecto

# Build de producción
npm run build        # Genera dist/

# Preview de producción
npm run preview      # Vista previa del build
```

## 5. Despliegue y Hosting

### 5.1 Opciones de Hosting Recomendadas
- **Vercel**: Integración automática con GitHub
- **Netlify**: Deploy continuo desde repositorio
- **GitHub Pages**: Hosting gratuito para proyectos públicos

### 5.2 Proceso de Deploy en Vercel
1. Conectar repositorio GitHub
2. Configurar build command: `npm run build`
3. Directorio de output: `dist`
4. Deploy automático en cada push

### 5.3 Variables de Entorno
```env
# No se requieren variables de entorno específicas
# Todas las configuraciones están en código
```

## 6. Mantenimiento y Soporte

### 6.1 Tareas de Mantenimiento Regulares
- **Actualización de dependencias**: Mensual
- **Revisión de compatibilidad**: Trimestral
- **Backup de código**: Automático via Git

### 6.2 Logs y Monitoreo
- Errores de JavaScript en consola del navegador
- Analytics de uso (si se implementa)
- Reportes de usuarios sobre problemas

### 6.3 Resolución de Problemas Comunes

**Problema**: Firma no se ve correctamente en Outlook
- **Solución**: Verificar estilos inline y uso de tablas
- **Código**: Revisar `generateSignatureHTML()` en useSignatureGenerator.ts

**Problema**: Logo muy grande o pequeño
- **Solución**: Ajustar CSS del logo en el HTML generado
- **Código**: Modificar estilos de imagen en la función de generación

**Problema**: Campos no se actualizan
- **Solución**: Verificar binding de useState en formulario
- **Código**: Revisar eventos onChange en SignatureForm.tsx

### 6.4 Contacto de Soporte Técnico
- **Desarrollador Principal**: [Nombre del desarrollador]
- **Email de Soporte**: soporte.firmas@ucn.cl
- **Repositorio**: https://github.com/Deiviidsito/firmas_ucn

## 7. Roadmap y Futuras Mejoras

### 7.1 Características Planificadas
- Sistema de plantillas múltiples
- Integración con directorio institucional
- Generación de firmas en lote
- API para integración con otros sistemas

### 7.2 Optimizaciones Técnicas
- Implementación de Service Workers
- Caché de recursos estáticos
- Optimización de imágenes
- Tests automatizados

## 8. Anexos

### 8.1 Dependencias del Proyecto
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "~5.6.2",
  "vite": "^7.1.3",
  "tailwindcss": "^3.4.1",
  "lucide-react": "^0.344.0"
}
```

### 8.2 Scripts Disponibles
```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

### 8.3 Configuración de Tailwind
```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ucnnav: '#120955'
      }
    }
  }
}
```

---

**Documento generado**: 24 de septiembre de 2025
**Versión**: 1.0
**Autor**: Equipo de Desarrollo UCN