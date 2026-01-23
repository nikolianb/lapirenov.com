import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Home, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    navigate('/booking');
    return null;
  }

  const timeSlotLabels = {
    'morning': 'Matin (9h00 - 12h00)',
    'afternoon': 'Après-midi (14h00 - 17h00)',
    'evening': 'Soirée (17h00 - 19h00)'
  };

  const projectTypeLabels = {
    'Kitchen': 'Cuisine',
    'Bathroom': 'Salle de Bain',
    'Living Room': 'Salon',
    'Other': 'Autres'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Consultation Réservée !
            </h1>
            <p className="text-lg text-gray-600">
              Votre demande de consultation a été enregistrée avec succès.
            </p>
          </div>

          {/* Booking Reference */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl p-6 mb-8">
            <p className="text-sm text-amber-900 font-semibold mb-1">Numéro de référence</p>
            <p className="text-3xl font-bold text-amber-700">{booking.bookingRef}</p>
          </div>

          {/* Booking Details */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-900 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-semibold">Date de consultation</p>
                <p className="text-lg text-gray-900 font-medium capitalize">
                  {formatDate(booking.date)}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-900 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-semibold">Créneau horaire</p>
                <p className="text-lg text-gray-900 font-medium">
                  {timeSlotLabels[booking.timeSlot]}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Home className="w-6 h-6 text-blue-900 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-semibold">Type de projet</p>
                <p className="text-lg text-gray-900 font-medium">
                  {projectTypeLabels[booking.projectType]}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <User className="w-6 h-6 text-blue-900 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-semibold">Nom</p>
                <p className="text-lg text-gray-900 font-medium">{booking.name}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-6 h-6 text-blue-900 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-semibold">Email</p>
                <p className="text-lg text-gray-900 font-medium">{booking.email}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-6 h-6 text-blue-900 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-semibold">Téléphone</p>
                <p className="text-lg text-gray-900 font-medium">{booking.phone}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Prochaines étapes :</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Vous recevrez un email de confirmation à l'adresse indiquée</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Notre équipe vous contactera 48h avant la consultation</span>
              </li>
              <li className="flex items-start">
                <span className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Préparez vos questions et vos idées pour la consultation</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            Retour à l'Accueil
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default BookingConfirmation;