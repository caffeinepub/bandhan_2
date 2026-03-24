import { motion } from "motion/react";

const sections = [
  {
    title: "1. Data We Collect",
    content: `When you register on Bandhan, we collect:
• Identity information: name, date of birth, gender, religion, caste, mother tongue, marital status
• Contact information: email address, phone number (optional)
• Profile details: education, occupation, income range, family background, horoscope details
• Photos you upload to your profile
• Technical data: IP address, device type, browser, and usage logs
• Communications data: messages exchanged on the platform (encrypted)

We collect this data when you create an account, fill out your profile, and interact with other members.`,
  },
  {
    title: "2. How We Use Your Data",
    content: `We use your information to:
• Display your profile to compatible matches
• Recommend suitable matches based on your preferences
• Enable secure communication between members
• Verify the authenticity of profiles
• Process payments for Premium and Elite memberships
• Send notifications about matches, messages, and platform updates
• Improve our matchmaking algorithms and product experience
• Comply with legal obligations under Indian law`,
  },
  {
    title: "3. Data Sharing",
    content: `Bandhan does not sell your personal data. We share information only:
• With other registered members (the profile information you choose to make visible)
• With trusted payment processors to handle subscription payments
• With identity verification partners for profile verification
• With law enforcement authorities if required by a valid legal order
• With acquirers in the event of a merger or acquisition (with prior notice)

All third-party partners are bound by strict data processing agreements aligned with Indian data protection standards.`,
  },
  {
    title: "4. Data Security",
    content: `We employ industry-standard security measures:
• All data is stored on the Internet Computer blockchain — decentralised and highly resilient
• End-to-end encryption for private messages
• Secure HTTPS connections on all platform interfaces
• Regular independent security audits
• Role-based access controls for platform staff
• Automatic session expiry and anomaly detection

While we take every reasonable precaution, no system is 100% immune to breaches. We will notify affected users within 72 hours of discovering any data incident.`,
  },
  {
    title: "5. Cookies",
    content: `Bandhan uses cookies and similar technologies to:
• Maintain your login session
• Remember your search preferences and filters
• Analyse traffic and usage patterns to improve the platform
• Serve relevant content and match recommendations

You may manage cookies through your browser settings. Disabling cookies may limit some platform functionality. We do not use third-party advertising cookies.`,
  },
  {
    title: "6. Your Rights",
    content: `Under applicable Indian data protection law, you have the right to:
• Access: Request a copy of all personal data we hold about you
• Correction: Ask us to correct inaccurate or outdated information
• Deletion: Request erasure of your data (subject to legal retention requirements)
• Portability: Receive your data in a machine-readable format
• Restriction: Ask us to limit how we process your data in certain circumstances
• Withdrawal of Consent: Opt out of non-essential data processing at any time

To exercise any of these rights, email privacy@bandhan.ai from your registered email address.`,
  },
  {
    title: "7. Contact Us",
    content: `For privacy-related queries or to exercise your data rights:

Data Protection Officer
Bandhan Technologies Pvt. Ltd.
Level 5, Prestige Tech Park, Outer Ring Road
Bengaluru, Karnataka 560103

Email: privacy@bandhan.ai
Phone: +91-80-4567-8900

We aim to respond to all privacy requests within 30 days. If you are not satisfied with our response, you may lodge a complaint with the relevant data protection authority.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen" data-ocid="privacy.page">
      {/* Hero */}
      <section className="bg-maroon text-white py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl font-bold mb-3">
              Privacy Policy
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
            At Bandhan, your privacy is not an afterthought — it is a founding
            principle. This policy explains what data we collect, why we collect
            it, how we protect it, and the control you have over it. Please read
            it carefully before using our platform.
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
