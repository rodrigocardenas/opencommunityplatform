# 🌍 Open Community Platform (OCP)

**Empoderando comunidades rurales mediante datos territoriales estratégicos.**

OCP es una plataforma diseñada para cerrar la brecha digital y estructural en zonas rurales, facilitando la recopilación y análisis de datos locales para el desarrollo sostenible. Este repositorio contiene el prototipo funcional evolucionado desde una tesis magistral hacia un ecosistema moderno de software cívico.

Acerca de OCP
Transformando la desconexión estructural en territorios rurales

🎯
Nuestra Visión
OCP es una plataforma tecnológica sin ánimo de lucro diseñada para transformar la desconexión estructural en zonas rurales. Facilitamos la recopilación, análisis y activación de datos locales para impulsar el desarrollo sostenible de comunidades.

✨
Propuesta de Valor
Combinamos un enfoque holístico que integra tecnología cívica accesible, análisis de datos territorial estratégico, innovación social con impacto comunitario, alianzas con entidades públicas y ONGs, y evaluación del impacto social más allá de retornos monetarios.

🗺️
Datos Territoriales
Nuestro enfoque se centra en la recopilación, análisis y activación de datos locales. Proporcionamos información estratégica y accionable que empodera a las comunidades para tomar decisiones informadas sobre su propio desarrollo.

🔐
Modelo Open Source
Creemos en la transparencia y la accesibilidad. OCP opera bajo un modelo open source que garantiza que todas las comunidades puedan beneficiarse de esta tecnología sin barreras de entrada económicas.

Por Qué OCP
Una plataforma integral para impulsar cambios positivos en tu comunidad

📊
Datos en Tiempo Real
Visualiza métricas clave y KPIs de tus proyectos comunitarios con dashboards intuitivos y actualizados.

🗺️
Mapeo Interactivo
Localiza iniciativas, recursos y participantes en tu área con mapas dinámicos e integración geoespacial.

📈
Seguimiento de Progreso
Monitorea cada fase de tus proyectos con timelines visuales, indicadores de estado y reportes detallados.

🤝
Colaboración Transparente
Gestiona equipos, asigna responsabilidades y mantén a todos alineados en objetivos comunes.
---

## 🛠️ Stack Tecnológico (Modern Monolith)

Para este prototipo, se ha seleccionado un stack de alta demanda laboral y alto rendimiento:

- **Backend:** [Laravel 11](https://laravel.com) (PHP 8.3+)
- **Frontend:** [React](https://reactjs.org) con [TypeScript](https://www.typescriptlang.org/)
- **Comunicación:** [Inertia.js](https://inertiajs.com/) (El "Pegamento" entre Laravel y React)
- **UI & Estilos:** [Tailwind CSS](https://tailwindcss.com) + [Shadcn/ui](https://ui.shadcn.com/)
- **Base de Datos:** [Mysql, MariaDB]
- **Entorno Local:** [Laragon]

---

## 📁 Estructura del Proyecto

- `app/`: Lógica de negocio y modelos.
- `resources/js/`: Componentes de React, páginas de Inertia y lógica de frontend.
- `resources/html/`: **[IMPORTANTE]** Aquí residen los prototipos originales en HTML/CSS/JS. Se utilizan como referencia base para la migración de UI a React.
- `database/migrations/`: Estructura de datos.

---

## 🚀 Instalación Local

1. **Clonar el repositorio:**
   ```bash
   git clone <tu-repo>
   cd ocp
   