"use client";
import React, { useState } from 'react';
import {
  Phone, Mail, MapPin, CheckCircle, Home, Trash2, Package, Sparkles,
  Clock, Shield, Leaf, Lock, ChevronDown, Menu, X
} from 'lucide-react';

const GoteborgsDodsboDemoWebsite: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'/' | '/tjanster' | '/om-oss' | '/kontakt' | string>('/');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    service: '',
    message: '',
    consent: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cities = [
    { slug: 'goteborg', name: 'Göteborg' },
    { slug: 'boras', name: 'Borås' },
    { slug: 'uddevalla', name: 'Uddevalla' },
    { slug: 'kungalv', name: 'Kungälv' },
    { slug: 'kungsbacka', name: 'Kungsbacka' },
    { slug: 'alingsas', name: 'Alingsås' },
    { slug: 'lidkoping', name: 'Lidköping' },
    { slug: 'skovde', name: 'Skövde' },
    { slug: 'trollhattan', name: 'Trollhättan' }
  ];

  const services = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Värdering av dödsbo',
      description: 'Professionell värdering på plats. Du får ett tydligt underlag och, om du vill, ett uppköpserbjudande samma dag.',
      benefits: [
        'Kostnadsfri värdering hos dig',
        'Erfarna värderare med mångårig erfarenhet',
        'Snabb offert samma dag',
        'Ingen skyldighet att sälja'
      ]
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Uppköp av dödsbo',
      description: 'Vi köper hela eller delar av dödsboet till marknadsmässiga priser. Snabb handläggning och omedelbar betalning.',
      benefits: [
        'Rättvisa priser baserade på marknadsvärde',
        'Betalning direkt vid överenskommelse',
        'Köper allt från möbler till samlarföremål',
        'Transparent och seriös affär'
      ]
    },
    {
      icon: <Trash2 className="w-8 h-8" />,
      title: 'Bortforsling av dödsbo',
      description: 'Professionell bortforsling av allt som inte ska behållas. Vi hanterar transport och återvinning.',
      benefits: [
        'Hämtar och transporterar allt',
        'Miljövänlig hantering och sortering',
        'Ansvarsfull återvinning',
        'Snabbt och effektivt'
      ]
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Röjning av dödsbo',
      description: 'Komplett röjning och tömning av bostaden. Vi tar hand om allt från sortering till bortforsling.',
      benefits: [
        'Helhetslösning från start till slut',
        'Sortering av värdesaker och sopor',
        'Respektfull hantering',
        'Flexibla tidsramar'
      ]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Flyttstädning av dödsbo',
      description: 'Professionell flyttstädning efter tömning. Bostaden lämnas i nyskick och redo för återlämnande.',
      benefits: [
        'Garanterad flyttstädning',
        'Erfarna städare',
        'Godkänd av hyresvärdar',
        'Alla ytor och utrymmen'
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Sanering av dödsbo',
      description: 'Specialiserad sanering vid behov. Vi hanterar allt från lukt till skadedjur med professionell utrustning.',
      benefits: [
        'Certifierad sanering',
        'Luktsanering och rengöring',
        'Skadedjursbekämpning',
        'Diskret och professionell'
      ]
    }
  ];

  const testimonials = [
    { name: 'Anna L.', location: 'Majorna', text: 'Fantastisk service från start till slut. Snabb värdering och rättvist pris. Kan varmt rekommendera!' },
    { name: 'Erik S.', location: 'Hisingen', text: 'Professionellt och respektfullt bemötande i en svår situation. Allt gick smidigt och vi fick hjälp med allt.' },
    { name: 'Maria K.', location: 'Linnéstaden', text: 'Snabba och noggranna. Värderade dödsboet på plats och vi fick offert samma dag. Mycket nöjd!' }
  ];

  const faqs = [
    {
      question: 'Vad kostar det att värdera ett dödsbo?',
      answer: 'Värderingen är helt kostnadsfri och utan förpliktelser. Vi kommer hem till dig, går igenom dödsboet och ger dig en professionell bedömning samt ett uppköpserbjudande om du önskar.'
    },
    {
      question: 'Hur lång tid tar det att röja ett dödsbo?',
      answer: 'Det varierar beroende på bostadens storlek och mängden tillhörigheter. En normal lägenhet tar oftast 1–2 dagar. Vi ger dig en tidsuppskattning vid värderingen.'
    },
    {
      question: 'Vad ingår i tjänsten?',
      answer: 'Vi erbjuder helhetslösningar som inkluderar värdering, uppköp, sortering, bortforsling, röjning, flyttstädning och sanering vid behov. Du väljer vilka tjänster du behöver.'
    },
    {
      question: 'Vad köper ni i ett dödsbo?',
      answer: 'Vi köper möbler, konst, antikviteter, samlarföremål, smycken, porslin, verktyg och mycket annat som har ett marknadsvärde. Vi värderar allt på plats.'
    },
    {
      question: 'Hur snabbt kan ni komma?',
      answer: 'Oftast kan vi komma ut för värdering inom 1–3 dagar. I brådskande fall kan vi ofta ordna snabbare besök. Kontakta oss så hittar vi en lösning.'
    },
    {
      question: 'Hur fungerar betalningen?',
      answer: 'Vid uppköp betalar vi direkt efter överenskommelse, vanligtvis via banköverföring. För tjänster som röjning och städning fakturerar vi efter utfört arbete.'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'form_submit_success',
        formType: 'contact_form',
        service: formData.service
      });
    }

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        service: '',
        message: '',
        consent: false
      });
    }, 5000);
  };

  const scrollToForm = () => {
    const form = document.getElementById('contact-form');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
  };

  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => setCurrentPage('/')}
            className="text-2xl font-bold text-[#0F2742]"
          >
            Göteborgs Dödsbo
          </button>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          <nav className="hidden md:flex space-x-6">
            <button onClick={() => setCurrentPage('/')} className="text-gray-700 hover:text-[#0F2742]">Hem</button>
            <button onClick={() => setCurrentPage('/tjanster')} className="text-gray-700 hover:text-[#0F2742]">Tjänster</button>
            <button onClick={() => setCurrentPage('/om-oss')} className="text-gray-700 hover:text-[#0F2742]">Om oss</button>
            <button onClick={() => setCurrentPage('/kontakt')} className="text-gray-700 hover:text-[#0F2742]">Kontakt</button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:0700000000" className="flex items-center text-[#0F2742] font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              072-9210871
            </a>
            <button
              onClick={scrollToForm}
              className="bg-[#C9A227] text-white px-6 py-2 rounded-lg hover:bg-[#B89020] transition"
            >
              Boka värdering
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <button onClick={() => { setCurrentPage('/'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700">Hem</button>
            <button onClick={() => { setCurrentPage('/tjanster'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700">Tjänster</button>
            <button onClick={() => { setCurrentPage('/om-oss'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700">Om oss</button>
            <button onClick={() => { setCurrentPage('/kontakt'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700">Kontakt</button>
            <a href="tel:0700000000" className="flex items-center py-2 text-[#0F2742] font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              072-9210871
            </a>
          </nav>
        )}
      </div>
    </header>
  );

  const Hero: React.FC<{ city?: string | null }> = ({ city = null }) => (
    <section className="bg-gradient-to-br from-[#0F2742] to-[#1a3a5c] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {city ? `Dödsbo i ${city} – snabb hjälp med värdering, uppköp och röjning`
            : 'Dödsbo i Göteborg – snabb hjälp med värdering, uppköp och röjning'}
        </h1>
        <p className="text-xl mb-8 text-gray-200">
          Trygg helhetslösning: värdering, uppköp, bortforsling, röjning, flyttstädning och sanering.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToForm}
            className="bg-[#C9A227] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B89020] transition"
          >
            Boka kostnadsfri värdering
          </button>
          <a
            href="tel:0700000000"
            className="bg-white text-[#0F2742] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center"
          >
            <Phone className="w-5 h-5 mr-2" />
            Ring oss nu: 072-9210871
          </a>
        </div>
      </div>
    </section>
  );

  const ServicesSection = () => (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0F2742]">Våra tjänster</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-[#C9A227] mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-[#0F2742]">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2 mb-4">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 mr-2 text-[#C9A227] flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToForm}
                className="text-[#C9A227] font-semibold hover:text-[#B89020]"
              >
                Få offert →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const ProcessSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0F2742]">Så fungerar det</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '1', title: 'Gratis besök och värdering', desc: 'Vi kommer hem till dig och värderar dödsboet kostnadsfritt.' },
            { step: '2', title: 'Offert samma dag', desc: 'Du får ett tydligt och fast pris direkt efter besöket.' },
            { step: '3', title: 'Utförande', desc: 'Vi utför uppdraget professionellt och effektivt enligt överenskommelse.' },
            { step: '4', title: 'Slutstädning & återvinning', desc: 'Bostaden städas och allt återvinns på ett miljövänligt sätt.' }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 bg-[#C9A227] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold mb-2 text-[#0F2742]">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const WhyChooseUs = () => (
    <section className="py-16 bg-[#0F2742] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Varför välja oss?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {[
            { icon: <Clock />, title: 'Snabba tider', desc: 'Oftast hos dig inom 1–3 dagar' },
            { icon: <CheckCircle />, title: 'Fast pris', desc: 'Inga dolda kostnader' },
            { icon: <Shield />, title: 'F-skatt & försäkring', desc: 'Fullt försäkrad verksamhet' },
            { icon: <Leaf />, title: 'Miljövänlig', desc: 'Ansvarsfull återvinning' },
            { icon: <Lock />, title: 'Sekretess', desc: 'Diskret och professionell hantering' }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-[#C9A227] flex justify-center mb-3">{item.icon}</div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0F2742]">Vad våra kunder säger</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4 italic">&quot;{t.text}&quot;</p>
              <p className="font-semibold text-[#0F2742]">{t.name}</p>
              <p className="text-sm text-gray-500">{t.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const FAQ = () => (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0F2742]">Vanliga frågor</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-semibold text-[#0F2742]">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const ContactForm = () => (
    <section id="contact-form" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#0F2742]">Kontakta oss</h2>
        <p className="text-center text-gray-600 mb-8">
          Fyll i formuläret så återkommer vi inom 24 timmar. För snabb kontakt, ring oss på 072-9210871.
        </p>

        {formSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Tack för ditt meddelande!</h3>
            <p className="text-green-700">Vi återkommer till dig inom kort.</p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#0F2742]">Namn *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#0F2742]">E-post *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#0F2742]">Telefon *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-[#0F2742]">Postnummer/Ort *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-[#0F2742]">Tjänst *</label>
              <select
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
              >
                <option value="">Välj tjänst</option>
                <option value="vardering">Värdering av dödsbo</option>
                <option value="uppkop">Uppköp av dödsbo</option>
                <option value="bortforsling">Bortforsling av dödsbo</option>
                <option value="rojning">Röjning av dödsbo</option>
                <option value="flyttstadning">Flyttstädning av dödsbo</option>
                <option value="sanering">Sanering av dödsbo</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-[#0F2742]">Beskrivning</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] focus:border-transparent"
                placeholder="Beskriv kort vad du behöver hjälp med..."
              />
            </div>

            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 mr-2"
                />
                <span className="text-sm text-gray-600">
                  Jag godkänner <button type="button" className="text-[#C9A227] underline">integritetspolicyn</button> *
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C9A227] text-white py-3 rounded-lg font-semibold hover:bg-[#B89020] transition"
            >
              Skicka meddelande
            </button>
          </form>
        )}
      </div>
    </section>
  );

  const AboutSection = () => (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#0F2742] mb-4">Om Göteborgs Dödsbo</h2>
        <p className="text-gray-700 leading-relaxed">
          Vi hjälper privatpersoner och dödsboförvaltare i hela Västra Götaland med värdering, uppköp,
          röjning, bortforsling, flyttstädning och sanering. Vi arbetar snabbt, respektfullt och med fasta priser.
          Vår ambition är att göra en svår process så enkel och trygg som möjligt.
        </p>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-[#0F2742] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Göteborgs Dödsbo</h3>
            <p className="text-gray-300 text-sm mb-4">
              Vi hjälper dig med hela dödsboet i Göteborg och hela Västra Götaland.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Snabblänkar</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setCurrentPage('/')} className="text-gray-300 hover:text-white">Hem</button></li>
              <li><button onClick={() => setCurrentPage('/tjanster')} className="text-gray-300 hover:text-white">Tjänster</button></li>
              <li><button onClick={() => setCurrentPage('/om-oss')} className="text-gray-300 hover:text-white">Om oss</button></li>
              <li><button onClick={() => setCurrentPage('/kontakt')} className="text-gray-300 hover:text-white">Kontakt</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Områden vi täcker</h4>
            <ul className="space-y-2 text-sm">
              {cities.slice(0, 5).map(city => (
                <li key={city.slug}>
                  <button
                    onClick={() => setCurrentPage(`/dodsbo-${city.slug}`)}
                    className="text-gray-300 hover:text-white"
                  >
                    {city.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Kontakt</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:0700000000" className="flex items-center text-gray-300 hover:text-white">
                <Phone className="w-4 h-4 mr-2" />
                072-9210871
              </a>
              <a href="mailto:info@goteborgsdodsbo.se" className="flex items-center text-gray-300 hover:text-white">
                <Mail className="w-4 h-4 mr-2" />
                info@goteborgsdodsbo.se
              </a>
              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>Västra Götaland</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Göteborgs Dödsbo. Alla rättigheter förbehållna.</p>
          <div className="mt-2">
            <button
              onClick={() => setCurrentPage('/integritetspolicy')}
              className="text-gray-400 hover:text-white mx-2"
            >
              Integritetspolicy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );

  // ---- Simple "routing" renderer ----
  const renderPage = () => {
    // City page: /dodsbo-<slug>
    if (currentPage.startsWith('/dodsbo-')) {
      const slug = currentPage.replace('/dodsbo-', '');
      const city = cities.find(c => c.slug === slug)?.name || 'Göteborg';
      return (
        <>
          <Hero city={city} />
          <ServicesSection />
          <FAQ />
          <ContactForm />
        </>
      );
    }

    switch (currentPage) {
      case '/':
        return (
          <>
            <Hero />
            <ServicesSection />
            <ProcessSection />
            <WhyChooseUs />
            <Testimonials />
            <FAQ />
            <ContactForm />
          </>
        );
      case '/tjanster':
        return (
          <>
            <Hero />
            <ServicesSection />
            <ProcessSection />
            <ContactForm />
          </>
        );
      case '/om-oss':
        return (
          <>
            <Hero />
            <AboutSection />
            <WhyChooseUs />
            <ContactForm />
          </>
        );
      case '/kontakt':
        return (
          <>
            <Hero />
            <ContactForm />
          </>
        );
      case '/integritetspolicy':
        return (
          <>
            <section className="py-16 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#0F2742] mb-4">Integritetspolicy</h1>
                <p className="text-gray-700">
                  Vi värnar om din integritet. Personuppgifter som lämnas via formuläret används endast för att
                  kontakta dig och lämna offert. Vi lagrar inte data längre än nödvändigt och delar inte uppgifter
                  med tredje part utöver nödvändiga tjänsteleverantörer. Kontakta oss vid frågor.
                </p>
              </div>
            </section>
            <ContactForm />
          </>
        );
      default:
        return (
          <>
            <Hero />
            <ServicesSection />
            <ContactForm />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default GoteborgsDodsboDemoWebsite;
