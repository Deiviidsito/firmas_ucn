# 📧 Generador de Firmas UCN

> Sistema web para generar firmas de correo electrónico personalizadas para la Universidad Católica del Norte

![DISC Logo](https://disc.cl/user/themes/quark/images/logo/disc.svg)

## 🚀 Descripción

El **Generador de Firmas UCN** es una aplicación web moderna y responsiva desarrollada con React y TypeScript que permite a los funcionarios y académicos de la Universidad Católica del Norte generar firmas de correo electrónico profesionales y estandarizadas de manera fácil y rápida.

### ✨ Características Principales

- **🎨 Interfaz Moderna**: Diseño responsivo con TailwindCSS y colores institucionales UCN
- **📱 Mobile First**: Optimizado para dispositivos móviles, tablets y desktop
- **⚡ Tiempo Real**: Vista previa instantánea de la firma mientras escribes
- **📋 Copia Fácil**: Un clic para copiar la firma al portapapeles
- **🎓 Múltiples Posiciones**: Soporte para agregar múltiples cargos académicos/profesionales
- **📚 Ayuda Integrada**: Tutorial en video y guía paso a paso
- **🌐 Compatible**: Funciona perfectamente con Gmail, Outlook y otros clientes de correo

## 🛠️ Tecnologías

```json
{
  "frontend": "React 18.3.1 + TypeScript",
  "build": "Vite 7.1.3",
  "styling": "TailwindCSS 3.4.1",
  "icons": "Lucide React 0.344.0",
  "deployment": "Vercel/Netlify Ready"
}
```

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Deiviidsito/firmas_ucn.git
   cd firmas_ucn
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🏗️ Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de la build
npm run lint         # Ejecutar ESLint
```

## 📁 Estructura del Proyecto

```
firmas_ucn/
├── 📄 README.md
├── 📦 package.json
├── ⚙️ vite.config.ts
├── 🎨 tailwind.config.js
├── 📝 tsconfig.json
├── 🌐 index.html
└── 📂 src/
    ├── 🎯 main.tsx
    ├── 📱 App.tsx
    ├── 🎨 index.css
    ├── 🧩 components/
    │   ├── 📋 CopyButton.tsx
    │   ├── 🏛️ Header.tsx
    │   ├── 📝 SignatureForm.tsx
    │   ├── 👁️ SignaturePreview.tsx
    │   └── ❓ InstructionsModal.tsx
    └── 🔧 hooks/
        └── ⚡ useSignatureGenerator.ts
```

## 🎮 Uso

### 1. **Completar Información Personal**
   - Nombre completo
   - Correo electrónico institucional
   - Teléfono (opcional)

### 2. **Agregar Información Académica**
   - Posición/Cargo principal
   - Departamento/Facultad
   - Enlaces adicionales (sitio web, ORCID, etc.)

### 3. **Múltiples Posiciones (Opcional)**
   - Usar el botón "+" para agregar cargos adicionales
   - Útil para académicos con múltiples afiliaciones

### 4. **Copiar y Usar**
   - Vista previa en tiempo real
   - Un clic en "Copiar Firma" 
   - Pegar en tu cliente de correo

## 🎨 Personalización

### Colores Institucionales UCN
```css
:root {
  --ucn-primary: #120955;    /* Azul UCN */
  --ucn-secondary: #ffffff;   /* Blanco */
  --ucn-accent: #10b981;     /* Verde esmeralda */
}
```

### Modificar Estilos
Los estilos están definidos en:
- `src/index.css` - Estilos globales
- `tailwind.config.js` - Configuración de TailwindCSS
- Componentes individuales - Clases de Tailwind

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Subir carpeta 'dist' a Netlify
```

### Servidor Propio
```bash
npm run build
# Servir carpeta 'dist' con nginx/apache
```

## 🐛 Solución de Problemas

### Problema: La firma no se copia
**Solución**: Verificar permisos del navegador para acceso al portapapeles

### Problema: Logo no se muestra
**Solución**: Verificar conexión a internet (logo cargado desde ucn.cl)

### Problema: Responsive no funciona
**Solución**: Limpiar caché del navegador y recargar

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### 📋 Guidelines de Contribución
- Seguir las convenciones de TypeScript
- Mantener responsividad en todos los dispositivos
- Escribir tests para nuevas funcionalidades
- Actualizar documentación cuando sea necesario

## 📊 Arquitectura Técnica

### Componentes Principales

| Componente | Propósito | Estado |
|------------|-----------|--------|
| `App.tsx` | Layout principal y responsividad | ✅ |
| `SignatureForm.tsx` | Formulario con tabs y validación | ✅ |
| `SignaturePreview.tsx` | Vista previa estilo Gmail | ✅ |
| `useSignatureGenerator.ts` | Lógica de negocio y generación HTML | ✅ |
| `InstructionsModal.tsx` | Sistema de ayuda con video | ✅ |

### Flujo de Datos
```
Usuario Input → useSignatureGenerator → Validación → HTML Generation → Preview + Copy
```

## 👥 Equipo de Desarrollo

- **Desarrollo**: [Deiviidsito](https://github.com/Deiviidsito)
- **Diseño**: Comunicación DISC

---

<div align="center">

**🎓 Universidad Católica del Norte**  
*Generador de Firmas UCN v1.0*

![UCN](https://img.shields.io/badge/UCN-2024-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178c6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-06b6d4?style=for-the-badge&logo=tailwindcss)

</div>
