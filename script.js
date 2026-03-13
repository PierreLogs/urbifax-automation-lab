// El "async" antes de (e) es OBLIGATORIO para usar await adentro
document.getElementById("leadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const mensaje = document.getElementById("mensaje");

  // Captura de datos
  const datos = {
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    presupuesto: document.getElementById("presupuesto").value,
    fecha: new Date().toISOString(),
  };

  // ... (tu validación de +51)
  if (!datos.telefono || !datos.telefono.startsWith("+51")) {
    mensaje.textContent = "⚠️ Por favor, usa el formato internacional (+51)";
    mensaje.style.display = "block"; // Forzamos visibilidad
    mensaje.classList.add("text-red-600"); // Aseguramos color de error
    mensaje.classList.remove("hidden");
    return;
  }

  const WEBHOOK_URL =
    "https://hook.us2.make.com/rr7iimdmp6v7h8inh5ndv2vmuntoyr3f";

  try {
    // Aquí es donde el 'async' de arriba permite usar este 'await'
    const respuesta = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (respuesta.ok) {
      console.log("Datos enviados correctamente");
      mensaje.textContent = "¡Enviado al CRM de Urbifrax!";
      mensaje.className = "mt-4 text-center text-sm text-green-600";
      mensaje.classList.remove("hidden");
      document.getElementById("leadForm").reset();
    }
  } catch (error) {
    mensaje.textContent = "Error en la conexión";
    console.error("Error", error);
  }
});
