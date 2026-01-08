"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-900 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigoBrand-600 shadow-lg shadow-brand-500/25" />
            <div className="leading-tight">
              <div className="text-sm font-black tracking-tight text-zinc-900 dark:text-zinc-50">LidaPay</div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">Global • Trusted • Fast</div>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigoBrand-600">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Privacy Policy
              </h1>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <div className="space-y-8 text-zinc-700 dark:text-zinc-300">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                1. Introduction
              </h2>
              <p className="leading-relaxed">
                Welcome to LidaPay ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, website, and services (collectively, the "Service").
              </p>
              <p className="mt-4 leading-relaxed">
                By using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                2. Information We Collect
              </h2>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                2.1 Personal Information
              </h3>
              <p className="leading-relaxed">
                We may collect personal information that you provide directly to us, including:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Account credentials and authentication information</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Profile information and preferences</li>
                <li>KYC (Know Your Customer) documentation when required</li>
                <li>Transaction history and records</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                2.2 Automatically Collected Information
              </h3>
              <p className="leading-relaxed">
                When you use our Service, we may automatically collect certain information, including:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>Device information (device type, operating system, unique device identifiers)</li>
                <li>IP address and location data</li>
                <li>Usage data and analytics (how you interact with our Service)</li>
                <li>Log files and error reports</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                3. How We Use Your Information
              </h2>
              <p className="leading-relaxed">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>To provide, maintain, and improve our Service</li>
                <li>To process transactions and manage your account</li>
                <li>To communicate with you about your account, transactions, and our services</li>
                <li>To send you promotional materials and updates (with your consent)</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
                <li>To comply with legal obligations and regulatory requirements</li>
                <li>To personalize your experience and provide customer support</li>
                <li>To analyze usage patterns and improve our Service</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                4. Information Sharing and Disclosure
              </h2>
              <p className="leading-relaxed">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as payment processing, data analytics, and customer support.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or governmental authority.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</li>
                <li><strong>With Your Consent:</strong> We may share information with your explicit consent or at your direction.</li>
                <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, property, or safety, or that of our users or others.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                5. Data Security
              </h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security assessments and updates</li>
                <li>Employee training on data protection</li>
                <li>Compliance with industry security standards</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                6. Your Rights and Choices
              </h2>
              <p className="leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                7. Data Retention
              </h2>
              <p className="leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                8. Children's Privacy
              </h2>
              <p className="leading-relaxed">
                Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately, and we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                9. International Data Transfers
              </h2>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We take appropriate measures to ensure that your information receives adequate protection in accordance with this Privacy Policy.
              </p>
              <p className="mt-4 leading-relaxed">
                When transferring data internationally, we ensure compliance with applicable data protection regulations, including GDPR (for EU users), and implement appropriate safeguards such as standard contractual clauses and data processing agreements with our service providers.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                10. Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                11. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us using any of the methods below:
              </p>
              <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">LidaPay / Advansis Technologies</p>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Privacy & Data Protection</p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Email: <a href="mailto:privacy@lidapay.com" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">privacy@lidapay.com</a>
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Alternative: <a href="mailto:privacy@advansistechnologies.com" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">privacy@advansistechnologies.com</a>
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">General Inquiries</p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Email: <a href="mailto:support@lidapay.com" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">support@lidapay.com</a>
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Phone: <a href="tel:+233XXXXXXXXX" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">+233 XX XXX XXXX</a> (Ghana)
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Legal & Compliance</p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Email: <a href="mailto:legal@lidapay.com" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">legal@lidapay.com</a>
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Website</p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      <a href="https://www.lidapay.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">www.lidapay.com</a>
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      <a href="https://www.advansistechnologies.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">www.advansistechnologies.com</a>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-300 dark:border-zinc-700">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Business Hours</p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Monday - Friday: 9:00 AM - 6:00 PM (GMT)
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Saturday: 10:00 AM - 2:00 PM (GMT)
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-300 text-xs mt-1">
                      (Response times may vary for emails sent outside business hours)
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                We aim to respond to all privacy-related inquiries within 5-7 business days. For urgent matters, please call our support line during business hours.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/terms">
            <Button>
              View Terms of Service
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

