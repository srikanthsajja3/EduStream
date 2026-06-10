import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Refund and Cancellation Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Fee Payment</h2>
        <p>All school fees, once paid through the VR EduStream portal, are generally non-refundable. The admission fee and registration charges are strictly non-refundable under any circumstances.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Duplicate Payments</h2>
        <p>If a user makes a duplicate payment for the same transaction due to a technical error, the excess amount will be refunded. Users must submit a written request to the school office with proof of transaction within 7 days of the payment.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Refund Timeline</h2>
        <p>Approved refunds will be processed within <strong>7 to 14 working days</strong> and will be credited back to the original payment source (Bank Account/Card/UPI) used during the transaction.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Transaction Failures</h2>
        <p>If your account is debited but the transaction is marked as "Failed" on the portal, the amount is usually auto-refunded by the payment gateway within 3-5 business days. Please contact your bank before raising a dispute with the school.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Cancellations</h2>
        <p>Parents wishing to cancel an admission or withdraw a student must follow the school's official withdrawal process. Refund of tuition fees (if any) will be calculated based on the school's internal refund slab at the time of withdrawal.</p>
      </section>
    </div>
  );
};

export default RefundPolicy;
