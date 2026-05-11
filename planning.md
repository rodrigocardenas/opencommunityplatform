Roadmap de Funcionalidades
[ ] Módulo Desafíos: Registro y mapeo de necesidades comunitarias.

[ ] Pulso Local: Dashboard de indicadores territoriales.

[ ] Antenas Comunitarias: Directorio de puntos de conexión.

[ ] Ruta del Cambio: Visualización del progreso de proyectos.

`plan_de_accion.md` (Tu hoja de ruta técnica)

Este documento define los pasos para convertir esos archivos en `resources/html` en una aplicación React funcional.

```markdown
# 📋 Plan de Acción: Implementación de OCP (Fase 1)

**Objetivo:** Transformar los mockups estáticos en un prototipo funcional (MVP) utilizando el stack React + Laravel, priorizando la visualización de datos territoriales.

---

## 🧱 Fase 1: Cimientos y Layout (Semana 1)
*Meta: Tener el contenedor de la aplicación y la navegación principal.*

- [ ] **Configuración de Shadcn/ui:** Instalar componentes base (Buttons, Cards, Navbars).
- [ ] **Maquetación del Master Layout:** 
  - Tomar la estructura y estilos de las vistas en html (separar en componentes):
  - La aplicacion tiene un admin y un cliente. EL admin esta en `resources/html prototype/ocp-puente-datos.html`.  el cliente esta en los demás html `resources/html prototype/desafios-del-pueblo-module.html`,
  - Crear el componente `Layout.tsx` en `resources/js/Layouts/`.
  - Implementar Sidebar responsive y Header.
- [ ] **Base de Datos Inicial:** 
  - Definir tabla `communities` (nombre, descripción, ubicación `POINT`).

## 📍 Fase 2: Módulo "Desafíos del Pueblo" (Semana 2)
*Meta: CRUD básico y visualización en mapa.*

- [ ] **Migración de UI:**
  - Convertir el mockup de "Desafíos" en una página React (`resources/js/Pages/Desafios/Index.tsx`).
  - Dividir en componentes: `DesafioCard`, `DesafioFilter`.
- [ ] **Lógica de Datos:**
  - Crear modelo `Challenge`.
  - Implementar `ChallengeController` (index, store).
- [ ] **Integración de Mapas:**
  - Instalar `react-leaflet` o `maplibre-gl`.
  - Mostrar los desafíos en un mapa interactivo usando las coordenadas
## 📊 Fase 3: Dashboard "Pulso Local" (Semana 3)
*Meta: Visualización de indicadores.*

- [ ] **Migración de UI:**
  - Analizar los gráficos en el HTML original.
  - Implementar gráficos usando **Tremor** o **Recharts** en la página `PulsoLocal/Index.tsx`.
- [ ] **Backend de Analítica:**
  - Crear queries en Laravel (usando Eloquent y Raw SQL) que resuman datos por comunidad.
  - Pasar datos al frontend vía Inertia.

## 🤝 Fase 4: Registro y Colaboración (Semana 4)
*Meta: Flujo de usuario e interacciones.*

- [ ] **Refactor de Autenticación:** Personalizar las vistas de Laravel Breeze para que coincidan con la estética de OCP.
- [ ] **Formularios Dinámicos:** Implementar el "Asistente de Proyectos" (Inicia Proyecto) usando el hook `useForm` de Inertia.

---

## 🛠️ Notas de Implementación
- **UI de Referencia:** No reinventar el diseño; si el HTML de `resources/html` ya funciona, copiar las clases de Tailwind directamente al componente React.
- **TypeScript:** Mantener interfaces claras para todos los modelos que vienen de la API (`User`, `Challenge`, `Community`).