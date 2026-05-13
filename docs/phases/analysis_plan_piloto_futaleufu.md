# Análisis de Factibilidad: Plan Piloto Futaleufú en OCP

Este documento evalúa la capacidad actual de la **Open Community Platform (OCP)** para ejecutar el plan piloto propuesto para la comuna de Futaleufú, identificando las fortalezas del sistema y las funcionalidades pendientes.

## 1. Evaluación de Capacidades Actuales

| Funcionalidad Requerida | Estado | Implementación Técnica Actual |
| :--- | :---: | :--- |
| **Identificación de Problemas** | ✅ | Módulo de **Desafíos** totalmente funcional (Reporte -> Desafío). |
| **Antenas Comunitarias** | ✅ | Sistema de reportes especializados (Ambiental, Infraestructura, Social) operativo. |
| **Transparencia y Gestión** | ✅ | Portal de Probidad y Timeline de Proyectos funcional en el backend. |
| **Gamificación (Puntos/Rankings)** | ✅ | Base de datos preparada con sistema de puntos y lógica de recompensas iniciada. |
| **Captura de Evidencia** | ✅ | Formularios con soporte para fotos (cámara) y GPS integrados. |
| **Análisis de Brechas (Gaps)** | ✅ | Motor de "Puente de Datos" que compara necesidades locales vs recursos externos. |

---

## 2. Lo que Falta (Brechas de Desarrollo)

Para que el plan de Futaleufú sea 100% ejecutable, se requieren las siguientes expansiones:

### A. Catálogo de Servicios Turísticos y Productivos
*   **Requerimiento**: Que guías, artesanos y alojamientos registren su oferta.
*   **Estado Actual**: OCP está enfocado en "Problemas/Proyectos" comunitarios, no en un "Marketplace" B2C.
*   **Acción necesaria**: Crear un nuevo módulo de **"Directorio de Emprendimiento Local"** que permita perfiles comerciales.

### B. Funcionalidad Offline (PWA)
*   **Requerimiento**: Uso en zonas con conectividad limitada.
*   **Estado Actual**: La plataforma requiere conexión activa para sincronizar con Laravel.
*   **Acción necesaria**: Implementar un *Service Worker* para transformar la web en una **Progressive Web App (PWA)** que permita guardar reportes localmente (IndexDB) y subirlos al detectar señal.

### C. Sistema de Votación y Priorización
*   **Requerimiento**: "Los vecinos votarían por las prioridades".
*   **Estado Actual**: Existe el botón de "Apoyar", pero no una lógica de presupuesto participativo o votación formal.
*   **Acción necesaria**: Implementar un módulo de **Votación Vinculante** para desafíos.

### D. Conexión Directa Turista-Proveedor
*   **Requerimiento**: "Contactar directamente a los proveedores".
*   **Estado Actual**: No existe sistema de mensajería interna.
*   **Acción necesaria**: Integrar un botón de **"Contactar por WhatsApp"** o chat interno en las fichas de servicios.

---

## 3. Conclusión de Factibilidad

El sistema actual cubre el **70% de las necesidades de gestión comunitaria** (Desafíos, IA Preventiva, Transparencia). Sin embargo, para cumplir el objetivo de **"Visibilización Turística"**, OCP debe evolucionar de una herramienta de *gestión de crisis* a una de *promoción económica*.

### Recomendación de Próximos Pasos:
1.  **Priorizar PWA**: Es vital para la geografía de Futaleufú.
2.  **Módulo de Directorio**: Crear una extensión del modelo `User` o un modelo `Business` para la oferta local.
3.  **Votación Formal**: Añadir a la tabla de desafíos un estado de "Votación Abierta".
