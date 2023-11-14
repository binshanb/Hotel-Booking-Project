import React, { useEffect } from 'react';
import { loadRazorpayScript, createRazorpayOrder } from '../../../utils/razorpay';

function BookingPayment({ bookingId, amount }) {
  useEffect(() => {
    const handleRazorpayPayment = async () => {
      try {
        await loadRazorpayScript();

        const order = await createRazorpayOrder(bookingId, amount);

        const options = {
          // Configure your Razorpay options here using bookingId and amount
          // ...
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error('Error handling Razorpay payment:', error);
      }
    };

    handleRazorpayPayment();
  }, [bookingId, amount]);

  return (
    <div>
      <p>Processing payment...</p>
    </div>
  );
}

export default BookingPayment;
