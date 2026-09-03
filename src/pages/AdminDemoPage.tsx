import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Grid3x3,
  FileText,
  ShoppingBag,
  Users,
  MessageSquare,
  Star,
  Globe,
  Settings,
  Clock,
  TrendingUp,
  Menu,
  X,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Plus,
  Search,
  ChevronRight,
  ArrowLeft,
  AlertTriangle,
  Send,
  Filter,
  CheckCircle2,
  Mail,
  Phone,
  Upload,
  DollarSign,
  TrendingDown,
  Receipt,
  FileSpreadsheet,
  UserCog,
  ClipboardList,
  Shield,
  BarChart3,
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { products, categories, demoQuoteRequests, demoMessages } from '../data';
import { getStatusColor } from '../utils';
import { showToast } from '../components/ui/Toast';

const NAV_ITEMS = [
  { id: 'overview', label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: 'products', label: 'Produits', icon: Package },
  { id: 'categories', label: 'Catégories', icon: Grid3x3 },
  { id: 'quotes', label: 'Demandes de devis', icon: FileText },
  { id: 'orders', label: 'Commandes', icon: ShoppingBag },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'testimonials', label: 'Témoignages', icon: Star },
  { id: 'finances', label: 'Finances', icon: DollarSign },
  { id: 'gestion', label: 'Gestion', icon: UserCog },
  { id: 'content', label: 'Contenu du site', icon: Globe },
  { id: 'settings', label: 'Paramètres', icon: Settings },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]['id'];

const CHART_DATA = [
  { month: 'Jan', demandes: 12 },
  { month: 'Fév', demandes: 19 },
  { month: 'Mar', demandes: 15 },
  { month: 'Avr', demandes: 22 },
  { month: 'Mai', demandes: 18 },
  { month: 'Juin', demandes: 25 },
];

const PRODUCT_VIEWS = [187, 143, 98, 76];

const ACTIVITY_ITEMS = [
  { text: 'Nouvelle demande reçue de Rakoto Jean', time: 'Il y a 2h', color: 'bg-blue-500' },
  { text: 'Devis envoyé à Rasoa Marie', time: 'Il y a 5h', color: 'bg-purple-500' },
  { text: 'Commande confirmée par Andry R.', time: 'Hier', color: 'bg-green-500' },
  { text: 'Message reçu de Hery Razakandrato', time: 'Hier', color: 'bg-yellow-500' },
  { text: 'Nouveau produit ajouté : Mini-Ligne Alimentaire', time: 'Il y a 3j', color: 'bg-chm-red' },
  { text: 'Témoignage publié par Nomena R.', time: 'Il y a 4j', color: 'bg-chm-gold' },
];

const FINANCE_ENTRIES = [
  { id: 'REC-001', type: 'income' as const, label: 'Vente — Mini-Ligne Alimentaire', amount: 4500000, date: '2026-09-01', method: 'Virement', status: 'Reçu' },
  { id: 'REC-002', type: 'income' as const, label: 'Vente — Incubateur Semi-Automatique', amount: 2800000, date: '2026-08-28', method: 'Mobile Money', status: 'Reçu' },
  { id: 'REC-003', type: 'income' as const, label: 'Vente — Machine à Emballer', amount: 1200000, date: '2026-08-25', method: 'Espèces', status: 'En attente' },
  { id: 'REC-004', type: 'expense' as const, label: 'Fret maritime — Conteneur 20\'', amount: 3200000, date: '2026-08-30', method: 'Virement', status: 'Payé' },
  { id: 'REC-005', type: 'expense' as const, label: 'Douane & dédouanement', amount: 1850000, date: '2026-08-30', method: 'Virement', status: 'Payé' },
  { id: 'REC-006', type: 'expense' as const, label: 'Location entrepot — Août', amount: 500000, date: '2026-08-01', method: 'Virement', status: 'Payé' },
  { id: 'REC-007', type: 'expense' as const, label: 'Salaires — Août', amount: 2400000, date: '2026-08-31', method: 'Virement', status: 'Payé' },
  { id: 'REC-008', type: 'income' as const, label: 'Vente — Scelleuse Sous-Vide', amount: 870000, date: '2026-08-20', method: 'Mobile Money', status: 'Reçu' },
];

const INVOICES = [
  { id: 'FAC-2026-001', client: 'Rakoto Jean', amount: 4500000, date: '2026-09-01', dueDate: '2026-09-15', status: 'Payée' },
  { id: 'FAC-2026-002', client: 'Rasoa Marie', amount: 2800000, date: '2026-08-28', dueDate: '2026-09-12', status: 'Payée' },
  { id: 'FAC-2026-003', client: 'Andry R.', amount: 1200000, date: '2026-08-25', dueDate: '2026-09-08', status: 'En attente' },
  { id: 'FAC-2026-004', client: 'Hery Razakandrato', amount: 870000, date: '2026-08-20', dueDate: '2026-09-03', status: 'En retard' },
  { id: 'FAC-2026-005', client: 'Nomena R.', amount: 3100000, date: '2026-08-15', dueDate: '2026-08-30', status: 'Payée' },
];

const MONTHLY_REVENUE = [
  { month: 'Avr', revenus: 6200000, depenses: 5100000 },
  { month: 'Mai', revenus: 8400000, depenses: 6300000 },
  { month: 'Juin', revenus: 7100000, depenses: 5800000 },
  { month: 'Juil', revenus: 9500000, depenses: 7200000 },
  { month: 'Août', revenus: 9370000, depenses: 7950000 },
  { month: 'Sep', revenus: 4500000, depenses: 1200000 },
];

const TEAM_MEMBERS = [
  { id: 'TM-001', name: 'Rija Andrianarivelo', role: 'Administrateur', email: 'rija@chinahub.mg', status: 'Actif', lastLogin: '2026-09-03 08:15' },
  { id: 'TM-002', name: 'Hanta Razafindrabe', role: 'Commercial', email: 'hanta@chinahub.mg', status: 'Actif', lastLogin: '2026-09-03 09:30' },
  { id: 'TM-003', name: 'Fifaliana Ranaivoson', role: 'Logistique', email: 'fifaliana@chinahub.mg', status: 'Actif', lastLogin: '2026-09-02 16:45' },
  { id: 'TM-004', name: 'Tojo Rakotomalala', role: 'Comptable', email: 'tojo@chinahub.mg', status: 'Inactif', lastLogin: '2026-08-28 11:00' },
];

const AUDIT_LOG = [
  { id: 'LOG-001', user: 'Rija A.', action: 'Connexion au système', date: '2026-09-03 08:15', ip: '192.168.1.10' },
  { id: 'LOG-002', user: 'Hanta R.', action: 'Devis envoyé à Rasoa Marie', date: '2026-09-03 09:32', ip: '192.168.1.22' },
  { id: 'LOG-003', user: 'Rija A.', action: 'Produit ajouté : Mini-Ligne Alimentaire V2', date: '2026-09-02 14:20', ip: '192.168.1.10' },
  { id: 'LOG-004', user: 'Fifaliana R.', action: 'Commande CONF-2026-012 marquée comme livrée', date: '2026-09-02 11:05', ip: '192.168.1.35' },
  { id: 'LOG-005', user: 'Tojo R.', action: 'Facture FAC-2026-005 créée', date: '2026-08-28 10:00', ip: '192.168.1.18' },
  { id: 'LOG-006', user: 'Rija A.', action: 'Paramètres du site modifiés', date: '2026-08-27 15:40', ip: '192.168.1.10' },
];

const PLACEHOLDER_SECTIONS: Record<string, { icon: React.ReactNode; title: string; description: string }> = {
  categories: {
    icon: <Grid3x3 size={48} className="text-chm-gold" />,
    title: 'Catégories',
    description: 'Gestion des catégories de produits — fonctionnalité en cours de développement.',
  },
  orders: {
    icon: <ShoppingBag size={48} className="text-blue-400" />,
    title: 'Commandes',
    description: 'Suivi et gestion des commandes — fonctionnalité en cours de développement.',
  },
  clients: {
    icon: <Users size={48} className="text-green-400" />,
    title: 'Clients',
    description: 'Base de données clients et historique — fonctionnalité en cours de développement.',
  },
  testimonials: {
    icon: <Star size={48} className="text-chm-gold" />,
    title: 'Témoignages',
    description: 'Gestion des avis et témoignages clients — fonctionnalité en cours de développement.',
  },
  content: {
    icon: <Globe size={48} className="text-blue-400" />,
    title: 'Contenu du site',
    description: 'Édition du contenu public — fonctionnalité en cours de développement.',
  },
  settings: {
    icon: <Settings size={48} className="text-chm-text-light" />,
    title: 'Paramètres',
    description: 'Configuration de l\'administration — fonctionnalité en cours de développement.',
  },
};

function PlaceholderSection({ id }: { id: string }) {
  const info = PLACEHOLDER_SECTIONS[id];
  if (!info) return null;
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">
        {info.icon}
      </div>
      <h2 className="text-2xl font-bold text-chm-charcoal mb-2">{info.title}</h2>
      <p className="text-chm-text-light max-w-md">{info.description}</p>
    </div>
  );
}

function ProductFormPanel({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    status: 'available',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Produit ajouté avec succès (démo)', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-chm-border px-6 py-4">
          <h3 className="text-lg font-bold text-chm-charcoal">Ajouter un produit</h3>
          <button onClick={onClose} className="text-chm-text-light hover:text-chm-charcoal">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-chm-text mb-1">Titre</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              className="w-full rounded-lg border border-chm-border px-3 py-2 text-sm focus:border-chm-red focus:ring-1 focus:ring-chm-red outline-none"
              placeholder="Nom du produit"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-chm-text mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full rounded-lg border border-chm-border px-3 py-2 text-sm focus:border-chm-red focus:ring-1 focus:ring-chm-red outline-none resize-none"
              placeholder="Description du produit"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-chm-text mb-1">Catégorie</label>
              <select
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full rounded-lg border border-chm-border px-3 py-2 text-sm focus:border-chm-red focus:ring-1 focus:ring-chm-red outline-none bg-white"
              >
                <option value="">Choisir...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-chm-text mb-1">Prix</label>
              <input
                type="text"
                value={form.price}
                onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                className="w-full rounded-lg border border-chm-border px-3 py-2 text-sm focus:border-chm-red focus:ring-1 focus:ring-chm-red outline-none"
                placeholder="Sur devis"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-chm-text mb-1">Statut</label>
            <select
              value={form.status}
              onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
              className="w-full rounded-lg border border-chm-border px-3 py-2 text-sm focus:border-chm-red focus:ring-1 focus:ring-chm-red outline-none bg-white"
            >
              <option value="available">Disponible</option>
              <option value="on-order">Sur commande</option>
              <option value="limited">Stock limité</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-chm-text mb-1">Image</label>
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-chm-border rounded-lg hover:border-chm-red transition-colors cursor-pointer">
              <div className="text-center">
                <Upload size={24} className="mx-auto text-chm-text-light mb-1" />
                <span className="text-sm text-chm-text-light">Glisser ou cliquer pour upload</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-chm-border px-4 py-2.5 text-sm font-medium text-chm-text hover:bg-chm-gray transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-chm-red px-4 py-2.5 text-sm font-medium text-white hover:bg-chm-red-dark transition-colors"
            >
              Ajouter le produit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RequestDetailPanel({ request, onClose }: { request: typeof demoQuoteRequests[number]; onClose: () => void }) {
  const product = products.find(p => p.id === request.productId);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-chm-border px-6 py-4">
          <h3 className="text-lg font-bold text-chm-charcoal">Demande {request.id}</h3>
          <button onClick={onClose} className="text-chm-text-light hover:text-chm-charcoal">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-chm-text-light">Client</span>
              <p className="font-medium text-chm-charcoal">{request.name}</p>
            </div>
            <div>
              <span className="text-chm-text-light">Téléphone</span>
              <p className="font-medium text-chm-charcoal">{request.phone}</p>
            </div>
            <div>
              <span className="text-chm-text-light">Ville</span>
              <p className="font-medium text-chm-charcoal">{request.city}</p>
            </div>
            <div>
              <span className="text-chm-text-light">Date</span>
              <p className="font-medium text-chm-charcoal">{request.date}</p>
            </div>
            <div>
              <span className="text-chm-text-light">Produit</span>
              <p className="font-medium text-chm-charcoal">{product?.name || 'N/A'}</p>
            </div>
            <div>
              <span className="text-chm-text-light">Quantité</span>
              <p className="font-medium text-chm-charcoal">{request.quantity}</p>
            </div>
            <div>
              <span className="text-chm-text-light">Statut</span>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
            <div>
              <span className="text-chm-text-light">Contact préféré</span>
              <p className="font-medium text-chm-charcoal capitalize">{request.contactPreference}</p>
            </div>
          </div>
          <div>
            <span className="text-sm text-chm-text-light">Besoins</span>
            <p className="mt-1 text-sm text-chm-charcoal bg-chm-gray rounded-lg p-3">{request.needs}</p>
          </div>
          {request.remark && (
            <div>
              <span className="text-sm text-chm-text-light">Remarque</span>
              <p className="mt-1 text-sm text-chm-charcoal bg-chm-gray rounded-lg p-3">{request.remark}</p>
            </div>
          )}
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-chm-border px-4 py-2.5 text-sm font-medium text-chm-text hover:bg-chm-gray transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboardInner() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof demoQuoteRequests[number] | null>(null);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [quoteStatusFilter, setQuoteStatusFilter] = useState('');

  const closeSidebarMobile = useCallback(() => setSidebarOpen(false), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        setShowProductForm(false);
        setSelectedRequest(null);
        setExpandedMessage(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const filteredProducts = products.filter(p => {
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = !categoryFilter || p.categorySlug === categoryFilter;
    return matchSearch && matchCat;
  });

  const filteredQuotes = demoQuoteRequests.filter(q => {
    return !quoteStatusFilter || q.status === quoteStatusFilter;
  });

  const topProducts = products.slice(0, 4);
  const unreadCount = demoMessages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-chm-gray flex flex-col">
      {/* Top demo banner */}
      <div className="bg-chm-charcoal text-white text-xs sm:text-sm py-2 px-4 flex items-center gap-2">
        <AlertTriangle size={14} className="text-chm-gold shrink-0" />
        <span>Aperçu du tableau de bord administrateur — <span className="text-chm-gold font-medium">Maquette de démonstration</span></span>
      </div>

      {/* Header bar */}
      <header className="bg-white border-b border-chm-border px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-chm-gray text-chm-charcoal"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-chm-red flex items-center justify-center">
              <span className="text-white font-bold text-sm">CH</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-chm-charcoal leading-tight">China Hub Mada</h1>
              <p className="text-[11px] text-chm-text-light leading-tight">Administration</p>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-chm-text-light hover:text-chm-red transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Retour au site</span>
        </Link>
      </header>

      <div className="flex flex-1 relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={closeSidebarMobile}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 lg:top-[57px] left-0 z-50 lg:z-10 h-full lg:h-[calc(100vh-57px)]
            w-64 bg-chm-charcoal text-white flex flex-col
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-4 border-b border-white/10 lg:hidden">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">Navigation</span>
              <button onClick={closeSidebarMobile} className="text-white/60 hover:text-white">
                <X size={18} />
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-3 px-2">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const showBadge = item.id === 'messages' && unreadCount > 0;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); closeSidebarMobile(); }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-colors mb-0.5 relative
                    ${isActive ? 'bg-chm-red text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}
                  `}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {showBadge && (
                    <span className="absolute right-3 bg-chm-gold text-chm-charcoal text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="text-[11px] text-white/40 text-center">v1.0 — Démo</div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 lg:p-6">
          {/* Section header */}
          <div className="mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-chm-charcoal">
              {NAV_ITEMS.find(n => n.id === activeSection)?.label || activeSection}
            </h2>
            <p className="text-sm text-chm-text-light mt-1">
              {activeSection === 'overview' && "Vue d'ensemble de votre activité"}
              {activeSection === 'products' && 'Gestion du catalogue produits'}
              {activeSection === 'quotes' && 'Suivi des demandes de devis'}
              {activeSection === 'messages' && 'Boîte de réception'}
              {activeSection === 'categories' && 'Gestion des catégories'}
              {activeSection === 'orders' && 'Suivi des commandes'}
              {activeSection === 'clients' && 'Gestion de la base clients'}
              {activeSection === 'testimonials' && 'Gestion des témoignages'}
              {activeSection === 'content' && 'Édition du contenu'}
              {activeSection === 'settings' && 'Paramètres système'}
              {activeSection === 'finances' && 'Suivi financier — revenus, dépenses, factures'}
              {activeSection === 'gestion' && 'Équipe, rapports et journal d\'audit'}
            </p>
          </div>

          {/* ========== OVERVIEW ========== */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Package size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-chm-charcoal">{products.length}</p>
                    <p className="text-sm text-chm-text-light">Total Produits</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center shrink-0">
                    <FileText size={22} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-chm-charcoal">5</p>
                    <p className="text-sm text-chm-text-light">Demandes en cours</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <Clock size={22} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-chm-charcoal">3</p>
                    <p className="text-sm text-chm-text-light">Devis à traiter</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <TrendingUp size={22} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-chm-charcoal">Sur devis</p>
                    <p className="text-sm text-chm-text-light">Revenus du mois</p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-base font-bold text-chm-charcoal mb-4">Demandes mensuelles</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CHART_DATA} barCategoryGap="25%">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DD" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B6B6B' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#6B6B6B' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #E5E2DD',
                          borderRadius: '8px',
                          fontSize: '13px',
                        }}
                      />
                      <Bar dataKey="demandes" fill="#B91C1C" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Recent requests table */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-base font-bold text-chm-charcoal mb-4">Dernières demandes</h3>
                  <div className="overflow-x-auto -mx-6 px-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-chm-border">
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Référence</th>
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Client</th>
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Produit</th>
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Qté</th>
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Date</th>
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demoQuoteRequests.slice(0, 5).map(req => {
                          const prod = products.find(p => p.id === req.productId);
                          return (
                            <tr key={req.id} className="border-b border-chm-border last:border-0 hover:bg-chm-gray/50 transition-colors">
                              <td className="py-2.5 font-medium text-chm-charcoal whitespace-nowrap">{req.id}</td>
                              <td className="py-2.5 text-chm-text whitespace-nowrap">{req.name}</td>
                              <td className="py-2.5 text-chm-text max-w-[160px] truncate whitespace-nowrap" title={prod?.name}>{prod?.name || '—'}</td>
                              <td className="py-2.5 text-chm-text">{req.quantity}</td>
                              <td className="py-2.5 text-chm-text-light whitespace-nowrap">{req.date}</td>
                              <td className="py-2.5">
                                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${getStatusColor(req.status)}`}>
                                  {req.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Popular products */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-base font-bold text-chm-charcoal mb-4">Produits populaires</h3>
                  <div className="space-y-3">
                    {topProducts.map((prod, i) => (
                      <div key={prod.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-chm-gray/50 transition-colors">
                        <span className="text-xs font-bold text-chm-text-light w-5 text-center">{i + 1}</span>
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-chm-charcoal truncate">{prod.name}</p>
                          <p className="text-xs text-chm-text-light">{prod.category}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-chm-charcoal">{PRODUCT_VIEWS[i]}</p>
                          <p className="text-[10px] text-chm-text-light">vues</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity timeline */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-base font-bold text-chm-charcoal mb-4">Activité récente</h3>
                <div className="space-y-0">
                  {ACTIVITY_ITEMS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 pb-4 last:pb-0">
                      <div className="relative flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${item.color} shrink-0 mt-1`} />
                        {i < ACTIVITY_ITEMS.length - 1 && (
                          <div className="w-px h-full bg-chm-border absolute top-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-chm-charcoal">{item.text}</p>
                        <p className="text-xs text-chm-text-light mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========== PRODUCTS ========== */}
          {activeSection === 'products' && (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-chm-text-light" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Rechercher..."
                      className="w-full sm:w-64 rounded-lg border border-chm-border pl-9 pr-3 py-2 text-sm focus:border-chm-red focus:ring-1 focus:ring-chm-red outline-none bg-white"
                    />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="rounded-lg border border-chm-border px-3 py-2 text-sm focus:border-chm-red focus:ring-1 focus:ring-chm-red outline-none bg-white"
                  >
                    <option value="">Toutes catégories</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="flex items-center gap-2 rounded-lg bg-chm-red px-4 py-2 text-sm font-medium text-white hover:bg-chm-red-dark transition-colors shrink-0"
                >
                  <Plus size={16} />
                  Ajouter un produit
                </button>
              </div>

              {/* Products table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-chm-gray/60 border-b border-chm-border">
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light">Image</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light">Nom</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light">Catégorie</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light">Prix</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light">Disponibilité</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((prod, i) => (
                        <tr key={prod.id} className={`border-b border-chm-border last:border-0 hover:bg-chm-gray/30 transition-colors ${i % 2 === 1 ? 'bg-chm-gray/20' : ''}`}>
                          <td className="px-4 py-3">
                            <img src={prod.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          </td>
                          <td className="px-4 py-3 font-medium text-chm-charcoal max-w-[220px] truncate">{prod.name}</td>
                          <td className="px-4 py-3 text-chm-text-light">{prod.category}</td>
                          <td className="px-4 py-3 text-chm-charcoal font-medium">{prod.price}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                              prod.availability === 'available' ? 'bg-green-100 text-green-800' :
                              prod.availability === 'on-order' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {prod.availability === 'available' ? 'Disponible' : prod.availability === 'on-order' ? 'Sur commande' : 'Limité'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => showToast(`Modifier "${prod.name}" — démo`, 'info')}
                                className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                                title="Modifier"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => showToast(`Masquer "${prod.name}" — démo`, 'info')}
                                className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 transition-colors"
                                title="Masquer"
                              >
                                <EyeOff size={14} />
                              </button>
                              <button
                                onClick={() => showToast(`Supprimer "${prod.name}" — démo`, 'error')}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredProducts.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-4 py-12 text-center text-chm-text-light">
                            Aucun produit trouvé
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-xs text-chm-text-light">{filteredProducts.length} produit(s) affiché(s)</p>
            </div>
          )}

          {/* ========== QUOTES ========== */}
          {activeSection === 'quotes' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:flex-initial">
                  <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-chm-text-light" />
                  <select
                    value={quoteStatusFilter}
                    onChange={e => setQuoteStatusFilter(e.target.value)}
                    className="w-full sm:w-56 rounded-lg border border-chm-border pl-9 pr-3 py-2 text-sm focus:border-chm-red focus:ring-1 focus:ring-chm-red outline-none bg-white"
                  >
                    <option value="">Tous les statuts</option>
                    <option value="Nouvelle">Nouvelle</option>
                    <option value="À traiter">À traiter</option>
                    <option value="Devis envoyé">Devis envoyé</option>
                    <option value="Confirmée">Confirmée</option>
                    <option value="Livrée">Livrée</option>
                    <option value="Annulée">Annulée</option>
                  </select>
                </div>
                <span className="text-sm text-chm-text-light">{filteredQuotes.length} demande(s)</span>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-chm-gray/60 border-b border-chm-border">
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light whitespace-nowrap">Référence</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light whitespace-nowrap">Client</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light whitespace-nowrap">Téléphone</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light whitespace-nowrap">Produit</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light whitespace-nowrap">Qté</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light whitespace-nowrap">Date</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light whitespace-nowrap">Statut</th>
                        <th className="text-left px-4 py-3 font-medium text-chm-text-light whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQuotes.map(req => {
                        const prod = products.find(p => p.id === req.productId);
                        return (
                          <tr key={req.id} className="border-b border-chm-border last:border-0 hover:bg-chm-gray/30 transition-colors">
                            <td className="px-4 py-3 font-medium text-chm-charcoal whitespace-nowrap">{req.id}</td>
                            <td className="px-4 py-3 text-chm-text whitespace-nowrap">{req.name}</td>
                            <td className="px-4 py-3 text-chm-text-light whitespace-nowrap">{req.phone}</td>
                            <td className="px-4 py-3 text-chm-text max-w-[180px] truncate whitespace-nowrap" title={prod?.name}>{prod?.name || '—'}</td>
                            <td className="px-4 py-3 text-chm-text">{req.quantity}</td>
                            <td className="px-4 py-3 text-chm-text-light whitespace-nowrap">{req.date}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${getStatusColor(req.status)}`}>
                                {req.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => setSelectedRequest(req)}
                                className="flex items-center gap-1.5 rounded-lg bg-chm-gray px-3 py-1.5 text-xs font-medium text-chm-charcoal hover:bg-chm-gray-dark transition-colors"
                              >
                                <Eye size={13} />
                                Voir
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========== MESSAGES ========== */}
          {activeSection === 'messages' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="divide-y divide-chm-border">
                  {demoMessages.map(msg => {
                    const isExpanded = expandedMessage === msg.id;
                    return (
                      <div key={msg.id} className={`${!msg.read ? 'bg-blue-50/40' : ''}`}>
                        <button
                          onClick={() => setExpandedMessage(isExpanded ? null : msg.id)}
                          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-chm-gray/30 transition-colors text-left"
                        >
                          <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full bg-chm-gray flex items-center justify-center">
                              <Mail size={18} className="text-chm-text-light" />
                            </div>
                            {!msg.read && (
                              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-chm-red rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm ${!msg.read ? 'font-bold text-chm-charcoal' : 'font-medium text-chm-charcoal'}`}>{msg.name}</span>
                              <span className="text-xs text-chm-text-light">{msg.date}</span>
                            </div>
                            <p className={`text-sm mt-0.5 truncate ${!msg.read ? 'font-medium text-chm-charcoal' : 'text-chm-text-light'}`}>{msg.subject}</p>
                          </div>
                          <ChevronRight size={16} className={`text-chm-text-light shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 pt-0">
                            <div className="bg-chm-gray rounded-lg p-4">
                              <div className="flex flex-wrap gap-4 text-xs text-chm-text-light mb-3">
                                <span className="flex items-center gap-1"><Mail size={12} /> {msg.email}</span>
                                <span className="flex items-center gap-1"><Phone size={12} /> {msg.phone}</span>
                              </div>
                              <p className="text-sm text-chm-charcoal leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                            </div>
                            <div className="mt-3 flex gap-2">
                              {!msg.read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    showToast(`Message de ${msg.name} marqué comme lu`, 'success');
                                  }}
                                  className="flex items-center gap-1.5 rounded-lg bg-chm-charcoal px-3 py-1.5 text-xs font-medium text-white hover:bg-chm-charcoal/80 transition-colors"
                                >
                                  <CheckCircle2 size={13} />
                                  Marquer comme lu
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showToast(`Réponse envoyée à ${msg.name} — démo`, 'info');
                                }}
                                className="flex items-center gap-1.5 rounded-lg border border-chm-border px-3 py-1.5 text-xs font-medium text-chm-text hover:bg-chm-gray transition-colors"
                              >
                                <Send size={13} />
                                Répondre
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-xs text-chm-text-light">{demoMessages.length} message(s) — {unreadCount} non lu(s)</p>
            </div>
          )}

          {/* ========== FINANCES ========== */}
          {activeSection === 'finances' && (
            <div className="space-y-6">
              {/* KPI cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <ArrowUpRight size={18} className="text-green-600" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+12%</span>
                  </div>
                  <p className="text-2xl font-bold text-chm-charcoal">14 570 000</p>
                  <p className="text-sm text-chm-text-light">Revenus (Ar)</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <ArrowDownRight size={18} className="text-red-500" />
                    </div>
                    <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">+8%</span>
                  </div>
                  <p className="text-2xl font-bold text-chm-charcoal">11 150 000</p>
                  <p className="text-sm text-chm-text-light">Dépenses (Ar)</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Wallet size={18} className="text-blue-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-chm-charcoal">3 420 000</p>
                  <p className="text-sm text-chm-text-light">Bénéfice net (Ar)</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
                      <CreditCard size={18} className="text-yellow-600" />
                    </div>
                    <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">2</span>
                  </div>
                  <p className="text-2xl font-bold text-chm-charcoal">2 070 000</p>
                  <p className="text-sm text-chm-text-light">En attente (Ar)</p>
                </div>
              </div>

              {/* Revenue chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-base font-bold text-chm-charcoal mb-4">Revenus vs Dépenses — 6 derniers mois</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MONTHLY_REVENUE} barCategoryGap="20%">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DD" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B6B6B' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#6B6B6B' }} tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}M`} />
                      <Tooltip
                        formatter={(value) => `${Number(value).toLocaleString('fr-MG')} Ar`}
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E2DD', borderRadius: '8px', fontSize: '13px' }}
                      />
                      <Bar dataKey="revenus" name="Revenus" fill="#16A34A" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="depenses" name="Dépenses" fill="#DC2626" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Mouvements financiers */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-base font-bold text-chm-charcoal mb-4">Mouvements récents</h3>
                  <div className="space-y-3">
                    {FINANCE_ENTRIES.map(entry => (
                      <div key={entry.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-chm-gray/50 transition-colors">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${entry.type === 'income' ? 'bg-green-50' : 'bg-red-50'}`}>
                          {entry.type === 'income'
                            ? <ArrowUpRight size={16} className="text-green-600" />
                            : <ArrowDownRight size={16} className="text-red-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-chm-charcoal truncate">{entry.label}</p>
                          <p className="text-xs text-chm-text-light">{entry.date} — {entry.method}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`text-sm font-bold ${entry.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                            {entry.type === 'income' ? '+' : '-'}{entry.amount.toLocaleString('fr-MG')} Ar
                          </p>
                          <span className={`text-[10px] font-medium ${entry.status === 'Reçu' || entry.status === 'Payé' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {entry.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Factures */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-chm-charcoal">Factures</h3>
                    <button className="flex items-center gap-1.5 rounded-lg bg-chm-red px-3 py-1.5 text-xs font-medium text-white hover:bg-chm-red-dark transition-colors">
                      <Plus size={13} />
                      Nouvelle facture
                    </button>
                  </div>
                  <div className="overflow-x-auto -mx-6 px-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-chm-border">
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Réf.</th>
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Client</th>
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Montant</th>
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Échéance</th>
                          <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {INVOICES.map(inv => (
                          <tr key={inv.id} className="border-b border-chm-border last:border-0 hover:bg-chm-gray/30 transition-colors">
                            <td className="py-2.5 font-medium text-chm-charcoal whitespace-nowrap">{inv.id}</td>
                            <td className="py-2.5 text-chm-text whitespace-nowrap">{inv.client}</td>
                            <td className="py-2.5 text-chm-charcoal font-medium whitespace-nowrap">{inv.amount.toLocaleString('fr-MG')} Ar</td>
                            <td className="py-2.5 text-chm-text-light whitespace-nowrap">{inv.dueDate}</td>
                            <td className="py-2.5">
                              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                                inv.status === 'Payée' ? 'bg-green-100 text-green-800' :
                                inv.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {inv.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button className="flex items-center gap-1.5 rounded-lg border border-chm-border px-3 py-1.5 text-xs font-medium text-chm-text hover:bg-chm-gray transition-colors">
                      <Download size={13} />
                      Exporter CSV
                    </button>
                    <button className="flex items-center gap-1.5 rounded-lg border border-chm-border px-3 py-1.5 text-xs font-medium text-chm-text hover:bg-chm-gray transition-colors">
                      <FileSpreadsheet size={13} />
                      Rapport mensuel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== GESTION ========== */}
          {activeSection === 'gestion' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <UserCog size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-chm-charcoal">{TEAM_MEMBERS.length}</p>
                    <p className="text-sm text-chm-text-light">Membres de l'équipe</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <ClipboardList size={22} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-chm-charcoal">12</p>
                    <p className="text-sm text-chm-text-light">Rapports générés</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                    <Shield size={22} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-chm-charcoal">{AUDIT_LOG.length}</p>
                    <p className="text-sm text-chm-text-light">Événements audit</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Équipe */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-chm-charcoal">Équipe</h3>
                    <button className="flex items-center gap-1.5 rounded-lg bg-chm-red px-3 py-1.5 text-xs font-medium text-white hover:bg-chm-red-dark transition-colors">
                      <Plus size={13} />
                      Ajouter
                    </button>
                  </div>
                  <div className="space-y-3">
                    {TEAM_MEMBERS.map(m => (
                      <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-chm-gray/50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-chm-charcoal flex items-center justify-center shrink-0">
                          <span className="text-white font-bold text-sm">{m.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-chm-charcoal">{m.name}</p>
                          <p className="text-xs text-chm-text-light">{m.role} — {m.email}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${m.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                            {m.status}
                          </span>
                          <p className="text-[10px] text-chm-text-light mt-1">Dernière connexion: {m.lastLogin}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rapports rapides */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-base font-bold text-chm-charcoal mb-4">Rapports disponibles</h3>
                  <div className="space-y-3">
                    {[
                      { icon: <BarChart3 size={18} className="text-blue-600" />, title: 'Chiffre d\'affaires mensuel', desc: 'Vue détaillée des revenus par mois', action: 'Générer' },
                      { icon: <Receipt size={18} className="text-green-600" />, title: 'Factures en attente', desc: 'Liste des factures impayées et en retard', action: 'Consulter' },
                      { icon: <TrendingDown size={18} className="text-red-500" />, title: 'Rapport de dépenses', desc: 'Détail des sorties par catégorie', action: 'Générer' },
                      { icon: <FileSpreadsheet size={18} className="text-purple-600" />, title: 'Bilan trimestriel', desc: 'Synthèse financière du trimestre', action: 'Générer' },
                      { icon: <Users size={18} className="text-chm-gold" />, title: 'Performance équipe', desc: 'Activité et contributions par membre', action: 'Consulter' },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-chm-gray/50 transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-chm-gray flex items-center justify-center shrink-0">
                          {r.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-chm-charcoal">{r.title}</p>
                          <p className="text-xs text-chm-text-light">{r.desc}</p>
                        </div>
                        <button
                          onClick={() => showToast(`Rapport "${r.title}" en cours de génération — démo`, 'info')}
                          className="shrink-0 rounded-lg border border-chm-border px-3 py-1.5 text-xs font-medium text-chm-text hover:bg-chm-gray transition-colors"
                        >
                          {r.action}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Journal d'audit */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-chm-charcoal">Journal d'audit</h3>
                  <button className="flex items-center gap-1.5 rounded-lg border border-chm-border px-3 py-1.5 text-xs font-medium text-chm-text hover:bg-chm-gray transition-colors">
                    <Download size={13} />
                    Exporter
                  </button>
                </div>
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-chm-border">
                        <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">ID</th>
                        <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Utilisateur</th>
                        <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Action</th>
                        <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Date</th>
                        <th className="text-left py-2 font-medium text-chm-text-light whitespace-nowrap">Adresse IP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AUDIT_LOG.map(log => (
                        <tr key={log.id} className="border-b border-chm-border last:border-0 hover:bg-chm-gray/30 transition-colors">
                          <td className="py-2.5 font-medium text-chm-charcoal whitespace-nowrap">{log.id}</td>
                          <td className="py-2.5 text-chm-text whitespace-nowrap">{log.user}</td>
                          <td className="py-2.5 text-chm-text max-w-[280px] truncate" title={log.action}>{log.action}</td>
                          <td className="py-2.5 text-chm-text-light whitespace-nowrap">{log.date}</td>
                          <td className="py-2.5 text-chm-text-light font-mono whitespace-nowrap">{log.ip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========== PLACEHOLDER SECTIONS ========== */}
          {['categories', 'orders', 'clients', 'testimonials', 'content', 'settings'].includes(activeSection) && (
            <PlaceholderSection id={activeSection} />
          )}
        </main>
      </div>

      {/* Product form modal */}
      {showProductForm && <ProductFormPanel onClose={() => setShowProductForm(false)} />}

      {/* Request detail modal */}
      {selectedRequest && <RequestDetailPanel request={selectedRequest} onClose={() => setSelectedRequest(null)} />}
    </div>
  );
}

export default function AdminDemoPage() {
  return <AdminDashboardInner />;
}
