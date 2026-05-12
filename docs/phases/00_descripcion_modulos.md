A continuación, se presenta un *prompt* detallado para implementar cada módulo, describiendo exhaustivamente sus elementos y funcionamiento con un enfoque en la funcionalidad móvil y sin incluir referencias a las tecnologías de desarrollo.

### **1. Diagnóstico Territorial Participativo (Pulso Local)**

**Propósito:** Crear una herramienta para la recopilación de información local y la evaluación territorial continua, permitiendo visualizar el estado de la comunidad.

**Elementos y Función:**

1.  **Formulario de Recopilación Comunitario:**
      * Una interfaz simplificada, **optimizada para uso en dispositivos móviles**, que permita a los habitantes ingresar datos sobre su comunidad (ej. infraestructura, servicios, problemáticas).
      * El sistema debe permitir que los usuarios ingresen datos incluso **sin conectividad** y sincronizarlos automáticamente cuando la conexión se restablezca.
2.  **Base de Datos Territorial:**
      * Un repositorio centralizado que almacene los datos ingresados por los usuarios junto con información sociodemográfica y de capacidades locales preexistentes.
3.  **Generador Automático de Evaluación FODA:**
      * Un componente lógico que procese la información recopilada para identificar automáticamente las Fortalezas, Oportunidades, Debilidades y Amenazas del territorio.
4.  **Dashboard de Visualización en Tiempo Real:**
      * Una vista principal que muestre el estado actual de la zona.
      * Debe incluir visualizaciones claras y de fácil lectura de los resultados FODA.
      * Debe mostrar mapas interactivos que permitan localizar los desafíos urgentes georreferenciados (con capacidad de cacheo para uso móvil).
      * Incluir un diseño de **"Modo Kiosco"** con botones grandes para facilitar la entrada de datos a usuarios con baja alfabetización digital.

### **2. Sistema de Gamificación Social Colaborativa (Desafíos del Pueblo)**

**Propósito:** Implementar un sistema de motivación no monetizada para fomentar la contribución constante de datos de alto valor y la participación activa de los ciudadanos en retos locales.

**Elementos y Función:**

1.  **Registro de Misiones Comunitarias:**
      * Una sección donde se definen, visualizan y gestionan los desafíos locales activos (ej. encuestas de salud, limpieza de espacios).
      * Debe permitir a los usuarios registrar su participación y el cumplimiento del reto, a menudo aceptando una prueba visual o un informe simple.
2.  **Sistema de Puntos y Recompensas Simbólicas:**
      * Un motor que otorgue puntos o insignias por completar misiones y aportar datos.
      * Las recompensas deben ser beneficios locales y simbólicos (reconocimientos, acceso a capacitaciones gratuitas, etc.), sin involucrar dinero o tokens.
3.  **Mecanismo de Recompensa Lúdica:**
      * Un sistema visual simple y animado que simule la "apertura de cajas de recompensa simbólicas" al alcanzar un hito o completar una misión, reforzando la motivación.
4.  **Tabla de Clasificación (Leaderboard):**
      * Una vista móvil que muestre la clasificación de los usuarios o grupos con más puntos/insignias para promover una competencia amistosa.
5.  **Indicador de Impacto Comunitario:**
      * Asegurar que la participación genere métricas cuantificables sobre el compromiso y capital social, que puedan ser usadas por las entidades públicas para evaluar la eficacia de sus iniciativas de movilización ciudadana.

### **3. IA Local Contextual y Alertas Predictivas (Antenas Comunitarias)**

**Propósito:** Proporcionar a las entidades públicas una herramienta de gestión proactiva mediante la anticipación de riesgos territoriales y la optimización de recursos.

**Elementos y Función:**

1.  **Motor de Análisis Predictivo:**
      * Un sistema de lógica avanzada que utiliza datos locales e históricos para identificar patrones y predecir posibles riesgos sociales o climáticos (ej. migración, sequía, abandono escolar).
2.  **Gestión de Alertas y Notificaciones:**
      * Una estructura que almacene y active notificaciones de riesgo generadas por el motor predictivo para alertar a gestores municipales y líderes comunitarios.
3.  **Servicio de Contextualización y Recomendación:**
      * Un servicio que permita a los usuarios (municipales) ingresar consultas en lenguaje natural y recibir a cambio recomendaciones contextualizadas y estructuradas, optimizando la toma de decisiones.
4.  **Dashboard de Alertas (Mobile First):**
      * Una interfaz de gestión simplificada para móvil que muestre las predicciones de riesgos con un sistema de semáforo simple (colores rojo, amarillo, verde) para indicar el nivel de urgencia y facilitar la comprensión inmediata.

### **4. Interoperabilidad con Datos Públicos y APIs de ONGs (Puente de Datos)**

**Propósito:** Centralizar y hacer accesible información relevante de fuentes externas (públicas y de ONGs) para facilitar la identificación y comunicación transparente de oportunidades.

**Elementos y Función:**

1.  **Conector de Fuentes Externas:**
      * Un mecanismo que gestione la conexión y la transferencia de datos desde fuentes de información pública (ej. censos, catastro) y sistemas de organizaciones aliadas.
      * Debe ser flexible para manejar diferentes estructuras de datos y asegurar un manejo robusto de errores de conexión.
2.  **Sistema de Sincronización Programada:**
      * Una función que actualice periódicamente los datos relevantes (ej. convocatorias de financiamiento, actualizaciones de censos) y los almacene internamente.
3.  **Almacén de Oportunidades:**
      * Un repositorio dedicado a guardar, clasificar y permitir la búsqueda de las oportunidades de financiamiento externas.
4.  **Vista de Oportunidades (Mobile First):**
      * Una interfaz optimizada para móvil que filtre y presente las oportunidades de financiamiento de forma clara y accesible. Cada oportunidad debe mostrar título, resumen, entidad convocante y enlace.
      * La interfaz debe incluir una función de búsqueda sencilla y etiquetas para que el usuario pueda encontrar rápidamente información relevante para su comunidad.

### **5. Incubadora de Proyectos Comunitarios (Inicia Tu Proyecto)**

**Propósito:** Servir como una incubadora de ideas para que los habitantes propongan y gestionen microproyectos, promoviendo la colaboración local y la transparencia en la gestión de fondos públicos.

**Elementos y Función:**

1.  **Flujo de Creación de Propuestas (Mobile First):**
      * Una secuencia de formularios simplificados y visuales, diseñados para móvil, que permitan a cualquier habitante enviar su propuesta de microproyecto.
2.  **Mecanismo de Colaboración:**
      * Un sistema que permita a otros usuarios registrar su apoyo a una propuesta, ya sea con tiempo, recursos materiales o difusión (simulando un *crowdfunding* territorial simbólico).
3.  **Transparencia de Fondos Municipales:**
      * Una sección que haga pública y accesible la información sobre la gestión y adjudicación de fondos municipales. Debe mostrar los estados de postulación, licitación y los fondos adjudicados a los proyectos.
4.  **Registro de Proyectos y Colaboraciones:**
      * Un componente para rastrear el progreso de las iniciativas y la colaboración recibida, generando datos sobre el dinamismo emprendedor local.
5.  **Vista de Propuestas Públicas:**
      * Una interfaz móvil optimizada que muestre de forma transparente el estado de todas las propuestas, los fondos adjudicados (si aplica) y un resumen del apoyo recibido por cada proyecto.

### **6. Evaluación Participativa del Impacto (Ruta del Cambio)**

**Propósito:** Proporcionar un sistema de seguimiento transparente y colaborativo para los proyectos comunitarios, facilitando la rendición de cuentas y la evaluación continua del impacto social.

**Elementos y Función:**

1.  **Estructura de Gestión de Proyectos:**
      * Un componente que permita estructurar los proyectos previamente creados en Metas y Tareas para su seguimiento.
2.  **Sistema de Asignación de Roles:**
      * Una función para asignar roles claros a los actores comunitarios involucrados en el proyecto (ej. coordinador, colaborador, fiscalizador).
3.  **Interfaz de Seguimiento de Progreso (Mobile First):**
      * Una interfaz de gestión móvil donde los usuarios puedan actualizar el progreso de las tareas de manera simple.
      * Debe incluir la capacidad de adjuntar evidencia (como fotos) para demostrar la finalización de una tarea.
4.  **Visualización del Avance:**
      * Mostrar el progreso del proyecto utilizando indicadores visuales claros, como barras de progreso, para una comprensión inmediata del estado del proyecto.
5.  **Mecanismo de Rendición de Cuentas:**
      * Una función que permita a las entidades públicas acceder a los datos de progreso en tiempo real y generar reportes de rendición de cuentas de manera transparente y continua.
