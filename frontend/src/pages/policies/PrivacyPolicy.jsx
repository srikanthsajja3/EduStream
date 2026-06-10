import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4"><strong>Effective Date:</strong> June 9, 2026</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p>VR EduStream ("we," "us," or "our") provides a school management ERP system. We are committed to protecting the privacy of students, parents, and staff. This policy explains how we collect, use, and safeguard personal data in compliance with GDPR, COPPA, and the Digital Personal Data Protection (DPDP) Act.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Data We Collect</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Student Information:</strong> Name, age, grade, attendance, academic records, and emergency contact details.</li>
          <li><strong>Parent/Guardian Information:</strong> Name, contact number (SMS/WhatsApp), email, and payment history.</li>
          <li><strong>Staff Information:</strong> Professional details, contact info, and payroll data.</li>
          <li><strong>Usage Data:</strong> Device ID, IP address, and login timestamps for security auditing.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. How We Use Data</h2>
        <p>Data is used exclusively for educational and administrative purposes:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Sending attendance and fee alerts via SMS and WhatsApp.</li>
          <li>Processing school fee payments via authorized gateways.</li>
          <li>Generating academic reports and performance tracking.</li>
          <li>Ensuring platform security and preventing unauthorized access.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. SMS & WhatsApp Communication</h2>
        <p>By registering, users provide express consent to receive transactional notifications. We comply with TRAI (India) DLT regulations and Meta's WhatsApp Business policies. Users can opt-out at any time by replying "STOP" or contacting the school administration.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Data Sharing & Security</h2>
        <p>We <strong>do not sell</strong> student or parent data to third parties. Data is shared only with:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Payment Gateways (for fee processing).</li>
          <li>SMS/WhatsApp Service Providers (for notifications).</li>
        </ul>
        <p>All data is encrypted in transit using SSL/TLS and at rest using industry-standard encryption.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
        <p>Users have the right to access, correct, or request the deletion of their personal data. For students under 18, these rights are exercised by their legal guardians.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">7. Contact Information</h2>
        <p>For any privacy-related queries, please contact our Data Protection Officer at <strong>vrplay.sdtech@gmail.com</strong>.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
