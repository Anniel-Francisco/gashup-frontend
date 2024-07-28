export function showNotification(message: any) {
  if (Notification.permission === "granted") {
    new Notification("Nuevo mensaje", {
      body: `${message.name}: ${message.message}`,
      icon: message.img,
    });
  }
}

if (Notification.permission !== "denied") {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Permiso de notificación concedido");
    }
  });
}
