window.PDFIGNOVA_PAYMENT = {
  provider: 'Lemon Squeezy',
  price: '12 €',
  checkoutUrl: ''
};

document.addEventListener('DOMContentLoaded', () => {
  const config = window.PDFIGNOVA_PAYMENT;
  const buttons = document.querySelectorAll('[data-buy-license]');
  const notices = document.querySelectorAll('[data-payment-status]');

  buttons.forEach((button) => {
    if (config.checkoutUrl) {
      button.href = config.checkoutUrl;
      button.target = '_blank';
      button.rel = 'noopener';
    } else {
      button.href = '#checkout-pendiente';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('checkout-pendiente')?.scrollIntoView({behavior:'smooth', block:'center'});
      });
    }
  });

  notices.forEach((notice) => {
    notice.textContent = config.checkoutUrl
      ? 'Pago seguro disponible mediante Lemon Squeezy.'
      : 'El sistema de cobro está preparado. Falta conectar la URL final de checkout de Lemon Squeezy.';
  });
});
