# 🏋️‍♂️ NEO-STRONG | E-Commerce Fitness

¡Bienvenido a **NEO-STRONG**! Este es un proyecto de comercio electrónico en desarrollo enfocado en el mundo del entrenamiento pesado, el powerlifting, la hipertrofia y la suplementación deportiva premium.

Este desarrollo forma parte de la pre-entrega para el programa **<Talento Tech />**.

---

## 🚀 Estado del Proyecto

Actualmente, la aplicación se encuentra en su fase de **maquetación y desarrollo Frontend**. Cuenta con una interfaz moderna, limpia y componentes interactivos optimizados.

### ✨ Características actuales:

- **Marquesina Infinita (`MarqueeTags`):** Animación fluida con etiquetas del mundo fitness cargadas dinámicamente desde un archivo JSON.
- **Formulario de Contacto Funcional:** Conectado directamente a la API de EmailJS para recibir consultas reales en tiempo de ejecución de manera segura.
- **Diseño Ultra-Moderno:** Estética oscura ("Dark Mode") orientada al público de fuerza bruta, utilizando tipografías imponentes y transiciones fluidas.

---

## 🛠️ Tecnologías Utilizadas

- **React.js** (Vite) - Estructura de componentes y SPA.
- **Tailwind CSS** - Estilos nativos y animaciones customizadas.
- **EmailJS** - Integración serverless para el procesamiento seguro de formularios de contacto.

---

## 💻 Instalación y Uso Local

Si querés clonar el repositorio y correrlo en tu máquina, seguí estos pasos:

1.  **Clonar el repositorio:**

    ```bash
    git clone [https://github.com/eduardoe92/Neo-Strong.git](https://github.com/eduardoe92/Neo-Strong.git)
    ```

2.  **Instalar las dependencias:**

    ```bash
    cd Neo-Strong
    npm install
    ```

3.  **Configurar las Variables de Entorno:**

    Creá un archivo .env.local en la raíz del proyecto y configurá tus llaves de EmailJS (guíate con el archivo .env.example incluido):

    ```bash
    VITE_EMAILJS_SERVICE_ID=tu_service_id
    
    VITE_EMAILJS_TEMPLATE_ID=tu_template_id
    
    VITE_EMAILJS_PUBLIC_KEY=tu_public_key 4
    ```

4.  **Correr el servidor de desarrollo:**

    ```bash
    npm run dev
    ```
