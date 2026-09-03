export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: string): string {
  return price;
}

export function getAvailabilityLabel(status: string): string {
  const map: Record<string, string> = {
    'available': 'Disponible',
    'on-order': 'Sur commande',
    'limited': 'Stock limité',
  };
  return map[status] || status;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    'Nouvelle': 'bg-blue-100 text-blue-800',
    'À traiter': 'bg-yellow-100 text-yellow-800',
    'Devis envoyé': 'bg-purple-100 text-purple-800',
    'Confirmée': 'bg-indigo-100 text-indigo-800',
    "En cours d'importation": 'bg-orange-100 text-orange-800',
    'Livrée': 'bg-green-100 text-green-800',
    'Annulée': 'bg-red-100 text-red-800',
  };
  return map[status] || 'bg-gray-100 text-gray-800';
}

export function generateId(): string {
  return `QR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`;
}
