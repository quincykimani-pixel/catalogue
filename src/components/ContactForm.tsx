"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const CONTACT_EMAIL = "info@kyronex.co.ke";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("product") ?? "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    productName ? `Hi, I'd like more information about "${productName}".` : ""
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      productName ? `Enquiry: ${productName}` : "Product Enquiry"
    );
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <div>
        <label className="label-field">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <div>
        <label className="label-field">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <div>
        <label className="label-field">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="input-field"
          required
        />
      </div>
      <button type="submit" className="btn-primary">
        Send Enquiry
      </button>
    </form>
  );
}
