export const formatPrice = (price) => {
    var formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      });
    return formatter.format(price);
}