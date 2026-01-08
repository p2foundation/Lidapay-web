"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                By accessing or using LidaPay ("we," "our," or "us"), including our mobile application, website, and services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service.
              </p>
              <p className="mt-4 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes your acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                2. Description of Service
              </h2>
              <p className="leading-relaxed">
                LidaPay is a fintech platform that provides digital payment services, including but not limited to:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>Purchase of airtime and mobile data bundles</li>
                <li>Digital wallet services</li>
                <li>Transaction management and history</li>
                <li>Rewards and loyalty programs</li>
                <li>Payment processing services</li>
                <li>Other financial services as may be offered from time to time</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                3. Eligibility and Account Registration
              </h2>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                3.1 Eligibility
              </h3>
              <p className="leading-relaxed">
                To use our Service, you must:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Reside in a jurisdiction where our Service is available</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                3.2 Account Registration
              </h3>
              <p className="leading-relaxed">
                To access certain features of the Service, you must create an account. You agree to:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                4. Use of Service
              </h2>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                4.1 Permitted Use
              </h3>
              <p className="leading-relaxed">
                You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>Use the Service in any way that violates applicable laws or regulations</li>
                <li>Engage in fraudulent, deceptive, or illegal activities</li>
                <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Use automated systems (bots, scrapers) to access the Service without permission</li>
                <li>Transmit viruses, malware, or other harmful code</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Collect or harvest information about other users without their consent</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                4.2 Account Suspension and Termination
              </h3>
              <p className="leading-relaxed">
                We reserve the right to suspend or terminate your account and access to the Service at our sole discretion, without prior notice, if you violate these Terms or engage in any activity that we deem harmful to the Service or other users.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                5. Transactions and Payments
              </h2>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                5.1 Transaction Processing
              </h3>
              <p className="leading-relaxed">
                All transactions are processed through secure payment gateways. By initiating a transaction, you authorize us to process the payment using your selected payment method.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                5.2 Pricing and Fees
              </h3>
              <p className="leading-relaxed">
                We reserve the right to change our pricing and fees at any time. We will provide reasonable notice of any material changes. All fees are non-refundable unless otherwise stated or required by law.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                5.3 Refunds and Cancellations
              </h3>
              <p className="leading-relaxed">
                Refund policies vary by service type. Generally:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>Completed transactions are typically non-refundable</li>
                <li>Failed transactions may be eligible for refunds</li>
                <li>Refund requests must be submitted within the specified timeframe</li>
                <li>We reserve the right to deny refunds for transactions that violate these Terms</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                5.4 Currency and Exchange Rates
              </h3>
              <p className="leading-relaxed">
                All transactions are processed in the currency specified at the time of purchase. Exchange rates, if applicable, are determined by third-party payment processors and may fluctuate.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                6. Intellectual Property
              </h2>
              <p className="leading-relaxed">
                The Service, including its original content, features, and functionality, is owned by LidaPay and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="mt-4 leading-relaxed">
                You may not copy, modify, distribute, sell, or lease any part of the Service or included software, nor may you reverse engineer or attempt to extract the source code of the Service, unless laws prohibit these restrictions or you have our written permission.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                7. User Content
              </h2>
              <p className="leading-relaxed">
                You retain ownership of any content you submit, post, or display on or through the Service ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your User Content for the purpose of operating and providing the Service.
              </p>
              <p className="mt-4 leading-relaxed">
                You are solely responsible for your User Content and represent that you have all necessary rights to grant us the license described above.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                8. Disclaimers and Limitation of Liability
              </h2>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                8.1 Service Availability
              </h3>
              <p className="leading-relaxed">
                We strive to provide a reliable Service, but we do not guarantee that the Service will be available at all times, uninterrupted, or error-free. The Service is provided "as is" and "as available" without warranties of any kind.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                8.2 Limitation of Liability
              </h3>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, LidaPay shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>Your use or inability to use the Service</li>
                <li>Any unauthorized access to or use of our servers or your personal information</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content</li>
                <li>Any interruption or cessation of transmission to or from the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                9. Indemnification
              </h2>
              <p className="leading-relaxed">
                You agree to indemnify, defend, and hold harmless LidaPay and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with:
              </p>
              <ul className="ml-6 mt-3 list-disc space-y-2">
                <li>Your access to or use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your User Content</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                10. Governing Law and Dispute Resolution
              </h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Ghana, without regard to its conflict of law provisions. If you are located outside Ghana, you agree that any disputes will be resolved in accordance with Ghanaian law.
              </p>
              <p className="mt-4 leading-relaxed">
                Any disputes arising out of or relating to these Terms or the Service shall first be addressed through good faith negotiations. If a resolution cannot be reached, disputes shall be resolved through binding arbitration in accordance with the rules of the Ghana Arbitration Centre, except where prohibited by law. The arbitration shall take place in Accra, Ghana, and shall be conducted in the English language.
              </p>
              <p className="mt-4 leading-relaxed">
                Notwithstanding the foregoing, either party may seek injunctive relief or other equitable remedies in any court of competent jurisdiction to protect its intellectual property rights or confidential information.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                11. Third-Party Services
              </h2>
              <p className="leading-relaxed">
                The Service may contain links to third-party websites or services that are not owned or controlled by LidaPay. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p className="mt-4 leading-relaxed">
                You acknowledge and agree that LidaPay shall not be responsible or liable for any damage or loss caused by or in connection with the use of any such third-party content, goods, or services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                12. Changes to Service
              </h2>
              <p className="leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                13. Severability
              </h2>
              <p className="leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                14. Entire Agreement
              </h2>
              <p className="leading-relaxed">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and LidaPay regarding the use of the Service and supersede all prior agreements and understandings.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                15. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions, concerns, or need assistance regarding these Terms of Service, please contact us using any of the methods below:
              </p>
              <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">LidaPay / Advansis Technologies</p>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Legal & Terms Inquiries</p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Email: <a href="mailto:legal@lidapay.com" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">legal@lidapay.com</a>
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Alternative: <a href="mailto:legal@advansistechnologies.com" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">legal@advansistechnologies.com</a>
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Customer Support</p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Email: <a href="mailto:support@lidapay.com" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">support@lidapay.com</a>
                    </p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Phone: <a href="tel:+233XXXXXXXXX" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">+233 XX XXX XXXX</a> (Ghana)
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Business & Partnerships</p>
                    <p className="text-zinc-700 dark:text-zinc-300">
                      Email: <a href="mailto:business@lidapay.com" className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline">business@lidapay.com</a>
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
                We aim to respond to all legal and terms-related inquiries within 5-7 business days. For urgent matters, please call our support line during business hours.
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
          <Link href="/privacy">
            <Button>
              View Privacy Policy
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

