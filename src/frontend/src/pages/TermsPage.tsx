import { motion } from "motion/react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Bandhan platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all Terms, you may not access or use the Service. These Terms constitute a legally binding agreement between you and Bandhan Technologies Pvt. Ltd. ("Bandhan", "we", "us").`,
  },
  {
    title: "2. Eligibility",
    content: `To use Bandhan, you must:
• Be at least 18 years of age
• Be legally eligible to marry under the laws of India
• Not have been previously banned from the platform
• Provide accurate and truthful registration information
• Not be married at the time of registration (unless separated/divorced/widowed)

Bandhan reserves the right to verify eligibility at any time and to terminate accounts that do not meet these requirements.`,
  },
  {
    title: "3. Account Responsibility",
    content: `You are responsible for maintaining the security of your Internet Identity and for all activity that occurs under your account. You agree to:
• Provide accurate, current, and complete information in your profile
• Update your information promptly if it changes
• Notify us immediately of any unauthorised access to your account
• Not share your login credentials with any third party
• Use the platform only for genuine matrimonial purposes

Bandhan will not be liable for any loss or damage arising from your failure to comply with these obligations.`,
  },
  {
    title: "4. Prohibited Conduct",
    content: `You agree not to:
• Create a false identity or misrepresent yourself
• Upload photos of anyone other than yourself
• Harass, threaten, or harm other members
• Solicit money, gifts, or favours from other members
• Post or transmit any obscene, defamatory, or illegal content
• Use the platform for commercial solicitation or spam
• Attempt to circumvent our security measures
• Scrape, crawl, or extract data from the platform
• Use automated bots or scripts to interact with the Service

Violation of these rules may result in immediate account termination and legal action where warranted.`,
  },
  {
    title: "5. Payments & Subscriptions",
    content: `Premium and Elite membership plans are billed in advance on a monthly or annual basis. By subscribing, you authorise Bandhan to charge your selected payment method.

• Prices are inclusive of applicable GST
• Plans auto-renew unless cancelled 24 hours before the renewal date
• Cancellations take effect at the end of the current billing period
• No partial refunds for unused periods
• Failed payments may result in downgrade to the Free tier

Bandhan reserves the right to change pricing with 30 days' notice. Existing subscribers will be notified via email.`,
  },
  {
    title: "6. Termination",
    content: `Bandhan may suspend or terminate your account at its sole discretion if:
• You violate these Terms
• We receive valid legal orders to do so
• Your account shows signs of fraudulent activity
• You have been inactive for more than 24 consecutive months

You may delete your account at any time via My Profile → Settings → Delete Account. Upon termination, your public profile will be removed immediately; backend data is purged within 30 days.`,
  },
  {
    title: "7. Dispute Resolution",
    content: `In the event of a dispute arising from these Terms or your use of the Service, both parties agree to first attempt resolution through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996 (India).

Arbitration shall take place in Bengaluru, Karnataka. The arbitrator's decision shall be final and binding. Each party shall bear its own costs unless the arbitrator rules otherwise.`,
  },
  {
    title: "8. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict-of-law principles. Any legal proceedings not subject to arbitration shall be filed exclusively in the courts of Bengaluru, Karnataka.

If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force. Our failure to enforce any right does not constitute a waiver of that right.`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen" data-ocid="terms.page">
      {/* Hero */}
      <section className="bg-maroon text-white py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl font-bold mb-3">
              Terms of Service
            </h1>
            <p className="text-white/70">Last updated: March 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground leading-relaxed mb-10 text-base border-l-4 border-gold pl-4"
          >
            Please read these Terms carefully before using Bandhan. By
            registering or using the Service, you acknowledge that you have
            read, understood, and agree to be bound by these Terms.
          </motion.p>

          <div className="space-y-10">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h2 className="font-display text-xl font-bold text-maroon mb-3">
                  {s.title}
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                  {s.content}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
