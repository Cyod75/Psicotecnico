# Psicotécnico · Tropa y Marinería — Simulador

Simulador web de exámenes psicotécnicos para el acceso a Tropa y Marinería del Ejército de España.

Aplicación estática (HTML + CSS + JavaScript puro) diseñada mobile-first y optimizada para iPhone.

## 🚀 Cómo usar

### Opción 1: Abrir directamente
Haz doble clic en `index.html` para abrirlo en tu navegador.

### Opción 2: Desplegar en GitHub Pages

1. **Crea un repositorio en GitHub** (público o privado)
2. **Sube los archivos** del proyecto:
   ```bash
   git init
   git add .
   git commit -m "Simulador Psicotécnico"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
3. **Activa GitHub Pages**:
   - Ve a **Settings** → **Pages**
   - En **Source**, selecciona **Deploy from a branch**
   - Elige la rama `main` y la carpeta `/ (root)`
   - Pulsa **Save**
4. **Accede** a tu app en `https://TU_USUARIO.github.io/TU_REPO/`

## 📋 Contenido

- **3 tests completos** de 35 preguntas cada uno (7 módulos × 5 preguntas)
- **1 test aleatorio** generado dinámicamente
- **7 módulos**: Verbal, Espacial, Percepción, Numérico, Mecánico, Memoria, Abstracto
- **Modo simulacro** con temporizador
- **Modo práctica** con explicaciones inmediatas
- **Modo oscuro** automático y manual
- **Persistencia** con localStorage

## 📱 Características

- Diseño mobile-first optimizado para iPhone
- Interfaz limpia y profesional
- Corrección automática con desglose por módulo
- Revisión de respuestas con filtros
- Fase de memorización con temporizador
- Mapa de navegación de preguntas
- Atajos de teclado (flechas, teclas 1-4)

## ⚠️ Aviso

Este simulador es una herramienta de entrenamiento no oficial.
Las preguntas son originales y no reproducen exámenes oficiales.
