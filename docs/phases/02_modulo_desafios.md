# 📍 Fase 2: Módulo "Desafíos del Pueblo"

**Objetivo:** Implementar el primer módulo interactivo para el registro, listado y visualización geográfica de desafíos comunitarios.

## Tareas

- [ ] **Migración de UI:**
  - Convertir el mockup estático de "Desafíos" en una vista de React (`resources/js/Pages/Desafios/Index.tsx`).
  - Modularizar la interfaz en componentes más pequeños: `DesafioCard.tsx`, `DesafioFilter.tsx` para fomentar la reutilización.

- [ ] **Lógica de Datos y Backend:**
  - Crear el modelo y migración `Challenge` (Desafío).
  - *Mejora propuesta:* La tabla debe incluir `title`, `description`, `category`, `status` (pendiente, en progreso, resuelto), `community_id`, `user_id` (quien reporta) y `location` (POINT). Se deben definir llaves foráneas correctamente.
  - Implementar `ChallengeController` con los métodos `index` y `store`.
  - Crear Form Requests en Laravel para la validación estricta de datos de entrada.

- [ ] **Integración de Mapas:**
  - Instalar biblioteca de mapas.
  - *Mejora propuesta:* Utilizar `react-leaflet` por su ligereza y facilidad de integración con OpenStreetMap (ideal para un proyecto open source sin coste por API de mapas).
  - Implementar un componente de mapa interactivo que pinte pines en base a las coordenadas de los desafíos.
  - Añadir soporte para popups o tooltips en los pines con información resumida del desafío y un enlace para ver los detalles completos.
