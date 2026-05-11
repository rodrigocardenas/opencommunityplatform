# 🧱 Fase 1: Cimientos y Layout

**Objetivo:** Transformar los mockups estáticos en un prototipo funcional utilizando React y Laravel, estableciendo la estructura base y la navegación principal.

## Tareas

- [ ] **Configuración Inicial del Entorno frontend:**
  - Instalar dependencias clave: Shadcn/ui, TailwindCSS, lucide-react (iconos).
  - *Mejora propuesta:* Configurar alias de path (`@/`) en `vite.config.js` y `tsconfig.json` para facilitar la importación de componentes y mantener el código limpio.

- [ ] **Configuración de Shadcn/ui:**
  - Instalar componentes base esenciales (Buttons, Cards, Navbars, Inputs).

- [ ] **Maquetación del Master Layout (`Layout.tsx`):**
  - Analizar el HTML base en `resources/html prototype/ocp-puente-datos.html` (Admin) y `resources/html prototype/desafios-del-pueblo-module.html` (Cliente).
  - Crear `resources/js/Layouts/AppLayout.tsx` para la vista pública/clientes y `AdminLayout.tsx` para el panel de administración.
  - Implementar Sidebar responsive y Header superior, adaptando las clases de Tailwind originales a los componentes de Shadcn.

- [ ] **Base de Datos Inicial:**
  - Crear migración y modelo para la tabla `communities`.
  - Definir campos: `name`, `description`, `location` (tipo POINT).
  - *Mejora propuesta:* Añadir campos `slug` (para URLs amigables y SEO), `status` (activa/inactiva) para mejor gestión, y timestamps completos.
