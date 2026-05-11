# 🤝 Fase 4: Registro y Colaboración

**Objetivo:** Habilitar flujos de usuarios, creación de perfiles y formularios interactivos para el registro de iniciativas.

## Tareas

- [ ] **Refactorización de Autenticación:**
  - Revisar las vistas generadas por Laravel Breeze (asumiendo stack de React + Inertia).
  - Personalizar los componentes de autenticación (Login, Register, Forgot Password) para que se alineen estéticamente con el diseño de OCP, utilizando los componentes de Shadcn/ui instalados en la Fase 1.
  - *Mejora propuesta:* Implementar un sistema de roles básicos (ej. `admin`, `community_leader`, `member`). Se puede usar el paquete `spatie/laravel-permission` o un simple campo `role` en la tabla `users` para controlar el acceso al `AdminLayout` vs `AppLayout`.

- [ ] **Asistente de Proyectos (Formularios Dinámicos):**
  - Convertir el formulario HTML "Inicia Proyecto" a React.
  - Implementar el hook `useForm` de Inertia.js para el manejo de estado del formulario, envío asíncrono y visualización interactiva de los errores de validación de Laravel.
  - *Mejora propuesta:* Si el formulario de proyecto tiene muchos campos, dividirlo en un "Wizard" (formulario multi-paso) en React. Esto mejora drásticamente la experiencia de usuario y aumenta la tasa de finalización, especialmente en conexiones lentas o móviles.

- [ ] **Notificaciones UI:**
  - *Mejora propuesta:* Integrar un sistema de notificaciones "Toast" (disponible directamente en Shadcn/ui - `sonner` o `toast`) para dar retroalimentación visual al usuario en acciones clave (ej. "Desafío creado exitosamente", "Error de inicio de sesión").
