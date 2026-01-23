import React from 'react';
import { Helmet } from 'react-helmet';
import BookingConfirmation from '@/components/BookingConfirmation';

function BookingConfirmationPage() {
  return (
    <>
      <Helmet>
        <title>Confirmation de reservation | Lapi Renov</title>
        <meta
          name="description"
          content="Votre consultation avec Lapi Renov a ete reservee avec succes. Nous vous contacterons bientot."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <BookingConfirmation />
    </>
  );
}

export default BookingConfirmationPage;
