import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, Home, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function BookingSystem() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    projectType: location.state?.projectType || '',
    description: location.state?.projectTitle ? `Intéressé par: ${location.state.projectTitle}` : ''
  });

  const [errors, setErrors] = useState({});

  const timeSlots = [
    { value: 'morning', label: 'Matin (9h00 - 12h00)' },
    { value: 'afternoon', label: 'Après-midi (14h00 - 17h00)' },
    { value: 'evening', label: 'Soirée (17h00 - 19h00)' }
  ];

  const projectTypes = [
    { value: 'Kitchen', label: 'Cuisine' },
    { value: 'Bathroom', label: 'Salle de Bain' },
    { value: 'Living Room', label: 'Salon' },
    { value: 'Other', label: 'Autres' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[\d\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'La date ne peut pas être dans le passé';
      }
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Le créneau horaire est requis';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Le type de projet est requis';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive"
      });
      return;
    }

    // Generate booking reference
    const bookingRef = `REF${Date.now().toString().slice(-8)}`;
    
    // Save to localStorage
    const booking = {
      ...formData,
      bookingRef,
      timestamp: new Date().toISOString(),
      status: 'confirmed'
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    toast({
      title: "✅ Consultation réservée !",
      description: "Votre consultation a été réservée avec succès.",
      duration: 3000
    });

    // Navigate to confirmation page
    navigate('/booking-confirmation', { state: { booking } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="flex items-center space-x-2 text-blue-900 font-semibold mb-2">
            <User className="w-5 h-5 text-amber-600" />
            <span>Nom complet *</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-900 ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Jean Dupont"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="flex items-center space-x-2 text-blue-900 font-semibold mb-2">
            <Mail className="w-5 h-5 text-amber-600" />
            <span>Email *</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-900 ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="jean.dupont@exemple.fr"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="flex items-center space-x-2 text-blue-900 font-semibold mb-2">
            <Phone className="w-5 h-5 text-amber-600" />
            <span>Téléphone *</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-900 ${
              errors.phone ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="+33 7 62 73 51 61"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Date and Time Slot - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label htmlFor="date" className="flex items-center space-x-2 text-blue-900 font-semibold mb-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>Date préférée *</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-900 ${
                errors.date ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          {/* Time Slot */}
          <div>
            <label htmlFor="timeSlot" className="flex items-center space-x-2 text-blue-900 font-semibold mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Créneau horaire *</span>
            </label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-900 ${
                errors.timeSlot ? 'border-red-500' : 'border-gray-200'
              }`}
            >
              <option value="">Sélectionner...</option>
              {timeSlots.map(slot => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
            {errors.timeSlot && <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>}
          </div>
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="flex items-center space-x-2 text-blue-900 font-semibold mb-2">
            <Home className="w-5 h-5 text-amber-600" />
            <span>Type de projet *</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-900 ${
              errors.projectType ? 'border-red-500' : 'border-gray-200'
            }`}
          >
            <option value="">Sélectionner...</option>
            {projectTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="flex items-center space-x-2 text-blue-900 font-semibold mb-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            <span>Description du projet *</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none text-gray-900 ${
              errors.description ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Décrivez votre projet en quelques mots..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
        >
          Confirmer la Réservation
        </Button>

        <p className="text-sm text-gray-500 text-center">
          * Champs obligatoires
        </p>
      </form>
    </motion.div>
  );
}

export default BookingSystem;
