import React from 'react';
import { Helmet } from 'react-helmet';
import BookingConfirmation from '@/components/BookingConfirmation';

function BookingConfirmationPage() {
  return (
    <>
      <Helmet>
        <title>Confirmation de Réservation | Lapirenov</title>
        <meta name="description" content="Votre consultation avec Lapirenov a été réservée avec succès. Nous vous contacterons bientôt." />
      </Helmet>

      <BookingConfirmation />
    </>
  );
}

export default BookingConfirmationPage;