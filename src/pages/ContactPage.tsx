import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  Send,
  ChevronDown,
} from 'lucide-react';
import { showToast } from '../components/ui/Toast';
import SectionTitle from '../components/ui/SectionTitle';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  product: string;
  message: string;
}

const initialForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  product: '',
  message: '',
};

const subjects = [
  'Demande de devis',
  'Question sur un produit',
  'Sourcing personnalisé',
  'Partenariat',
  'Autre',
];

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+261 34 31 197 68',
    href: 'tel:+261343119768',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+261 34 31 197 68',
    href: 'https://wa.me/261343119768',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@chinahubmada.mg',
    href: 'mailto:contact@chinahubmada.mg',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun-Ven : 8h - 17h\nSam : 8h - 12h',
  },
];

const faqs = [
  {
    question: 'Quels délais pour une réponse ?',
    answer: 'Nous répondons à toutes les demandes dans un délai de 24 à 48 heures ouvrées.',
  },
  {
    question: 'Travaillez-vous avec les particuliers ?',
    answer: 'Oui, nous accompagnons aussi bien les particuliers que les professionnels pour leurs importations en provenance de Chine.',
  },
  {
    question: 'Livrez-vous partout à Madagascar ?',
    answer: 'Oui, nous livrons dans toutes les grandes villes de Madagascar. Le délai varie selon la destination.',
  },
  {
    question: 'Comment sont établis les devis ?',
    answer: 'Chaque devis est personnalisé selon vos besoins réels : produit, qualité, quantité et conditions de livraison.',
  },
];

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-chm-border bg-white text-chm-text focus:outline-none focus:ring-2 focus:ring-chm-red focus:border-transparent transition';

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      showToast('Veuillez remplir les champs obligatoires.', 'error');
      return;
    }
    showToast('Votre message a été envoyé. Nous vous répondrons sous 24-48h.');
    setForm(initialForm);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-chm-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-chm-charcoal mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-chm-text-light max-w-2xl mx-auto">
            Une question, un besoin d'importation ? Notre équipe est là pour vous.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <SectionTitle
                title="Nos coordonnées"
                subtitle="Contactez-nous par téléphone, WhatsApp, email ou en personne aux horaires d'ouverture."
                centered={false}
              />
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white border border-chm-border rounded-xl p-5 hover:border-chm-red/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-chm-red/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-6 h-6 text-chm-red" />
                    </div>
                    <div>
                      <p className="text-sm text-chm-text-light mb-1">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="font-semibold text-chm-charcoal hover:text-chm-red whitespace-pre-line transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-chm-charcoal whitespace-pre-line">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-chm-gray rounded-2xl border border-chm-border">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-chm-red" />
                  <h3 className="text-lg font-bold text-chm-charcoal">Villes desservies</h3>
                </div>
                <p className="text-chm-text-light text-sm mb-3">
                  Nous assurons la livraison dans toutes les grandes villes de Madagascar.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Antananarivo', 'Toamasina', 'Antsirabe', 'Mahajanga', 'Fianarantsoa'].map(city => (
                    <span key={city} className="px-3 py-1.5 bg-white border border-chm-border rounded-full text-xs font-medium text-chm-text">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <SectionTitle
                title="Envoyez-nous un message"
                subtitle="Remplissez ce formulaire et nous vous répondrons rapidement."
                centered={false}
              />
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl border border-chm-border p-6 lg:p-8 space-y-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-chm-text mb-2">
                    Nom complet <span className="text-chm-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom et prénom"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-chm-text mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="vous@email.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-chm-text mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+261 34 00 000 00"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-chm-text mb-2">
                    Sujet <span className="text-chm-red">*</span>
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="" disabled>Sélectionnez un sujet</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-chm-text mb-2">
                    Produit concerné <span className="text-xs font-normal text-chm-text-light">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    placeholder="Ex : machine à torréfier le café"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-chm-text mb-2">
                    Message <span className="text-chm-red">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Décrivez votre demande en détail..."
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-chm-red text-white font-bold rounded-xl hover:bg-chm-red-dark transition-colors"
                >
                  <Send size={18} />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-chm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Notre zone de couverture"
            subtitle="Nous livrons depuis la Chine vers toute l'île de Madagascar."
          />
          <div className="flex items-center justify-center p-16 bg-white border border-chm-border rounded-2xl">
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-16 h-16 text-chm-red mb-4" />
              <p className="text-2xl font-bold text-chm-charcoal mb-2">Madagascar</p>
              <p className="text-chm-text-light text-sm max-w-lg">
                Livraison dans toutes les grandes villes de Madagascar, avec suivi
                de votre commande depuis la Chine jusqu'à votre porte.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Questions fréquentes"
            subtitle="Voici quelques réponses rapides à vos questions."
          />
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-chm-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-chm-gray transition-colors"
                >
                  <span className="font-semibold text-chm-text">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-chm-text-light transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-chm-text-light text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-chm-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à démarrer votre projet d'importation ?
          </h2>
          <p className="text-white/70 mb-8">
            Décrivez-nous votre besoin et recevez un devis gratuit sous 24-48h.
          </p>
          <a
            href="https://wa.me/261343119768"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-chm-gold text-chm-charcoal font-bold rounded-xl hover:bg-chm-gold-light transition-colors"
          >
            <MessageCircle size={20} />
            Discuter sur WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}