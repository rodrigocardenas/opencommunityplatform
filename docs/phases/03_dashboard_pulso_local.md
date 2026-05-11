# 📊 Fase 3: Dashboard "Pulso Local"

**Objetivo:** Desarrollar el panel de indicadores para visualizar métricas territoriales clave.

## Tareas

- [ ] **Análisis de Requerimientos Visuales:**
  - Estudiar los gráficos presentes en el HTML original para entender qué datos se necesitan mostrar.

- [ ] **Implementación de Gráficos:**
  - Implementar los gráficos en la vista `resources/js/Pages/PulsoLocal/Index.tsx`.
  - *Mejora propuesta:* En lugar de Tremor (cuyo soporte y enfoque ha cambiado), utilizar **Recharts** o los nuevos **Shadcn Charts** (que están basados internamente en Recharts) para mantener una consistencia visual perfecta con el resto de componentes de la UI y reducir el peso del bundle.

- [ ] **Backend de Analítica:**
  - Implementar métodos en controladores (ej. `AnalyticsController`) para obtener los datos agregados.
  - Crear consultas en Eloquent y Raw SQL para resumir datos por comunidad, categoría de desafío o evolución en el tiempo.
  - Transmitir la data procesada al frontend mediante Inertia.
  - *Mejora propuesta:* Implementar un sistema de caché nativo de Laravel (`Cache::remember`) para estas consultas de analítica pesadas. Los datos del dashboard no suelen necesitar actualización en tiempo real (milisegundos), y cachearlos por 15-30 minutos reducirá significativamente la carga de la base de datos a medida que el proyecto crezca.
