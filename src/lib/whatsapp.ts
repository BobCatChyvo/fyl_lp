import { useCartStore } from '@/store/useCartStore';

export const generateWhatsAppLink = (phoneNumber: string = '1234567890') => {
  const items = useCartStore.getState().items;
  const total = useCartStore.getState().totalPrice();
  
  if (items.length === 0) return `https://wa.me/${phoneNumber}?text=Hola,%20quisiera%20pedir%20información`;
  
  let message = `¡Hola! Me gustaría realizar un pedido de su pastelería (Procesado por Web App):\n\n`;
  message += `*🛒 MI ORDEN:*\n`;
  
  items.forEach(item => {
    message += `▪ ${item.quantity}x ${item.name} ($${item.price.toFixed(2)})\n`;
  });
  
  message += `\n*💵 Total a pagar:* $${total.toFixed(2)}\n\n`;
  message += `¿Me podrían indicar los métodos de pago y tiempo de entrega por favor?`;

  // Codificamos los caracteres especiales para URLs
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
