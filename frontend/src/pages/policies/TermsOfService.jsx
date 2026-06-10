import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">Welcome to VR EduStream. By accessing our platform, you agree to be bound by these terms.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Use of Service</h2>
        <p>VR EduStream is provided to educational institutions for administrative management. Users (Parents, Students, Staff) must use the platform solely for its intended purpose. Any attempt to reverse engineer or disrupt the service is strictly prohibited.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Messaging Consent (SMS & WhatsApp)</h2>
        <p>By providing your mobile number, you authorize VR EduStream and the School to send:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Attendance and emergency alerts.</li>
          <li>Fee reminders and payment confirmations.</li>
          <li>Academic and extracurricular updates.</li>
        </ul>
        <p>Standard carrier rates may apply. SMS delivery is subject to telecom operator availability and DLT regulations.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Payments & Fees</h2>
        <p>Online fee payments are processed through third-party gateways. VR EduStream does not store your credit/debit card details. In case of transaction failure where funds are debited, the refund process is governed by our Refund Policy.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Account Security</h2>
        <p>Users are responsible for maintaining the confidentiality of their login credentials. Any unauthorized use of your account must be reported to the school administration immediately.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Limitation of Liability</h2>
        <p>VR EduStream shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the platform, including technical delays in SMS/WhatsApp delivery or payment gateway downtimes.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. Governing Law</h2>
        <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in the school's registered city.</p>
      </section>
    </div>
  );
};

export default TermsOfService;
