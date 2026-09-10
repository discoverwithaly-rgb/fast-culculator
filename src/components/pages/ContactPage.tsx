import React, { useState } from 'react';
import { AdSensePlaceholder } from '../AdSensePlaceholder';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Support &amp; Feedback</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Contact Asan Calculator
          </h1>
          <p className="text-slate-600 mt-2 text-base">
            Have a question, suggestion for a new calculator, or noticed a calculation discrepancy? We are eager to hear from you.
          </p>
        </div>

        <AdSensePlaceholder slotId="contact-top" format="horizontal" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="space-y-6 md:border-r border-slate-200 pr-6">
            <div>
              <h2 className="font-bold text-slate-900 text-sm mb-3">Get in Touch</h2>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-800">Email Us</span>
                    <a href="mailto:support@asancalculator.pk" className="text-emerald-700 hover:underline">
                      support@asancalculator.pk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-slate-800">Location</span>
                    <span>Islamabad / Lahore, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong className="block text-slate-800 font-semibold mb-1">Response Time</strong>
              We strive to respond to all inquiries and feedback reports within 24 to 48 business hours.
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Message Received!</h2>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out, <strong>{name}</strong>. Our editorial and development team will review your message promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Muhammad Ali"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject / Calculator Topic
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Suggestion for FBR Withholding Tax Calculator"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="contact-msg"
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="How can we assist you today?"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
