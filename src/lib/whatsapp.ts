import { useCartStore } from '@/store/useCartStore';

export const generateWhatsAppLink = (phoneNumber: string = '1234567890') => {
  const items = useCartStore.getState().items;
  const total = useCartStore.getState().totalPrice();
  
  // Generamos un ID de pedido único basado en la fecha y un número aleatorio
  const orderId = `ORD-${new Date().getTime().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

  if (items.length === 0) return `https://wa.me/${phoneNumber}?text=Hola,%20quisiera%20pedir%20información`;
  
  let message = `*✨ NUEVO PEDIDO — FYL PASTELERÍA ✨*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*🆔 Orden de Compra:* #${orderId}\n`;
  message += `*🕒 Fecha:* ${new Date().toLocaleDateString('es-MX')}\n\n`;
  
  message += `*🛒 DETALLE DEL PEDIDO:*\n`;
  
  items.forEach(item => {
    message += `• ${item.quantity}x ${item.name}\n`;
    message += `  (Subtotal: $${(item.price * item.quantity).toFixed(2)})\n`;
  });
  
  message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*💰 TOTAL ESTIMADO:* $${total.toFixed(2)}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `¿Me podrían confirmar si tienen disponibilidad y los datos para el pago? ¡Gracias!`;

  console.log('📝 NOTA DE PEDIDO GENERADA:', message);

  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
