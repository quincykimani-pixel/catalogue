import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="section-heading mb-6">Contact Kyronex</h1>
        <p className="text-ink-muted leading-relaxed mb-8">
          Have a question about a product, pricing or availability? Send us
          an enquiry and our team will get back to you, or visit our store
          directly.
        </p>

        <div className="space-y-4 text-sm">
          <div>
            <p className="label-field">Address</p>
            <p className="text-ink">Nyamakima Price Road, Haaki Business Center, Nairobi, Kenya</p>
          </div>
          <div>
            <p className="label-field">Email</p>
            <p className="text-ink">info@kyronex.co.ke</p>
          </div>
          <div>
            <p className="label-field">Phone</p>
            <p className="text-ink">+254 700 000 000</p>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="card p-6 h-96" />}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
