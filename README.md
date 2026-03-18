## Configuración del Escenario de Automatización (Middleware)

Para que este laboratorio funcione como una solución de grado empresarial, se integra con **Make.com (Integromat)**. El flujo de automatización sigue esta lógica técnica:

### 1. Webhook Entry Point (Custom Webhook)
*   **Protocolo:** HTTP POST.
*   **Data Structure:** El webhook está configurado para determinar dinámicamente la estructura del JSON enviado desde `script.js`.
*   **Response:** Retorna un código de estado `200 OK` inmediatamente para liberar el hilo del frontend.

### 2. Procesamiento y Transformación (Sugerido)
Aunque el script envía datos planos, el flujo de automatización en el backend permite:
*   **Validación Extendida:** Verificación del formato de teléfono mediante módulos de Regex en el cloud.
*   **Enrutamiento Inteligente:** Si el `presupuesto` es > S/. 50,000, el lead se marca como "Prioridad Alta".

### 3. Destino de Datos (CRM/Google Sheets)
El escenario está diseñado para conectar con:
*   **Google Sheets:** Registro histórico de cada solicitud con timestamp.

---

## 🛠️ Mejoras Técnicas Implementadas
*   **Capa de Seguridad:** Implementación de encabezados `Content-Type: application/json` para asegurar la compatibilidad con el servidor de destino.
*   **UX Determinística:** Uso de `reset()` en el formulario tras una respuesta exitosa (`respuesta.ok`), evitando envíos duplicados de leads.
*   **Estandarización Temporal:** Uso de `new Date().toISOString()` para garantizar que la zona horaria sea consistente en el CRM, independientemente de la ubicación del cliente.

## 📈 Roadmap de Escalabilidad
- [ ] Implementar **reCAPTCHA v3** para prevenir spam en el webhook está pendiente.
- [ ] Añadir **Loading States** (Spinners) en el botón mientras `await fetch` está pendiente.
- [ ] Integrar **Sentry** para el monitoreo de errores en la captura de leads está pendiente.
