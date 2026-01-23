import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = "https://wa.me/33762735161";

  return (
    <footer className="bg-gradient-to-br from-[#1e3a8a] to-[#172554] text-white border-t-4 border-[#d4af37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold">Lapirenov</span>
            </div>
            <p className="text-blue-100 leading-relaxed">
              Votre partenaire expert en rénovation de façades et traitement des murs. Qualité et savoir-faire traditionnel.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-[#d4af37]">Contact</span>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group">
                <Phone className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" />
                <div>
                  <p className="text-blue-100">+33 7 62 73 51 61</p>
                </div>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3 group hover:bg-white/5 p-1 rounded-lg -ml-1 transition-colors">
                <MessageCircle className="w-5 h-5 text-[#25D366] mt-0.5 flex-shrink-0" />
                <p className="text-blue-100 group-hover:text-white transition-colors">WhatsApp</p>
              </a>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <p className="text-blue-100">contact@lapirenov.fr</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <p className="text-blue-100">
                  262 chemin des Fleches<br />
                  01000 Saint-Denis-les-Bourg
                </p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-[#d4af37]">Horaires d'ouverture</span>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div className="text-blue-100">
                  <p className="font-medium">Lundi - Vendredi</p>
                  <p>8h00 - 18h00</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div className="text-blue-100">
                  <p className="font-medium">Samedi</p>
                  <p>9h00 - 13h00</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                <div className="text-blue-100">
                  <p className="font-medium">Dimanche</p>
                  <p>Fermé</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-[#d4af37]">Suivez-nous</span>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-800 hover:bg-[#d4af37] rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-800 hover:bg-[#d4af37] rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-800 hover:bg-[#d4af37] rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="pt-4">
              <p className="text-sm text-blue-200">
                Raison sociale: LAPI RENOV<br />
                SIREN: 995 099 702<br />
                SIRET: 995 099 702 00012<br />
                TVA: FR55 995099702<br />
                RCS Bourg-en-Bresse<br />
                Code NAF/APE: 4329A<br />
                Forme juridique: SARL<br />
                Immatriculation: 01/01/2026<br />
                Commune: Saint-Denis-les-Bourg (Ain)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="text-center text-blue-200">
            <p>&copy; {currentYear} Lapirenov. Tous droits réservés.</p>
            <p className="mt-2 text-sm">
              Spécialiste de la rénovation et du traitement de façades
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
