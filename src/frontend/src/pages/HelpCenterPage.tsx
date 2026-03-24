import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const faqs = [
  {
    category: "Account",
    items: [
      {
        q: "How do I create a Bandhan account?",
        a: "Click 'Register' on the homepage and authenticate with Internet Identity — a secure, passwordless login. Once verified, you'll be guided through your profile setup.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to My Profile → Settings → Delete Account. All your data will be permanently removed within 30 days as per our Privacy Policy.",
      },
      {
        q: "I forgot my login. What should I do?",
        a: "Bandhan uses Internet Identity, which is managed by your device's biometrics or security key. Visit identity.ic0.app for recovery options.",
      },
      {
        q: "Can I have multiple accounts?",
        a: "No. Each Internet Identity is limited to one Bandhan account to maintain trust and authenticity across the platform.",
      },
    ],
  },
  {
    category: "Profiles",
    items: [
      {
        q: "How do I edit my profile?",
        a: "Navigate to 'My Profile' from the navbar, then click the 'Edit Profile' button. You can update all sections at any time.",
      },
      {
        q: "How is my profile verified?",
        a: "Our team manually reviews each profile within 24-48 hours of submission. Verified profiles receive a blue checkmark visible to other members.",
      },
      {
        q: "Why isn't my profile showing in search results?",
        a: "Profiles under review or those with incomplete information may not appear. Ensure all mandatory fields are filled and your profile is marked as active.",
      },
      {
        q: "Can I hide my profile temporarily?",
        a: "Yes. In My Profile → Settings, toggle 'Hide my profile'. Your profile won't appear in searches but existing conversations remain active.",
      },
    ],
  },
  {
    category: "Messaging",
    items: [
      {
        q: "How do I send a message to a match?",
        a: "Open any profile and click 'Send Message'. Free members can send 5 messages per week; Premium and Elite members enjoy unlimited messaging.",
      },
      {
        q: "Are my messages private?",
        a: "Yes. Messages are end-to-end encrypted on the Internet Computer blockchain. Bandhan staff cannot read your personal conversations.",
      },
      {
        q: "Why can't I message someone?",
        a: "Some members restrict messages to Premium/Elite subscribers only. Upgrading your plan will grant you full access.",
      },
      {
        q: "How do I report or block someone?",
        a: "Open the conversation, click the three-dot menu, and choose 'Block & Report'. Our safety team reviews reports within 24 hours.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "What payment methods are accepted?",
        a: "We accept all major credit/debit cards, UPI, net banking, and EMI options through our secure payment gateway.",
      },
      {
        q: "How do I upgrade to Premium or Elite?",
        a: "Go to the 'Membership' page, choose your plan, and complete payment. Your account is upgraded instantly.",
      },
      {
        q: "Can I get a refund?",
        a: "Membership plans are non-refundable once activated. If you face technical issues preventing access, contact support within 7 days for a review.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We never store card details. All payments are processed by PCI-DSS certified payment processors.",
      },
    ],
  },
];

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");

  const filtered = faqs
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          !query ||
          item.q.toLowerCase().includes(query.toLowerCase()) ||
          item.a.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <main className="min-h-screen" data-ocid="help.page">
      {/* Hero */}
      <section className="bg-maroon text-white py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Help Center
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Find answers to the most common questions about Bandhan.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                className="pl-12 py-6 text-base bg-white text-foreground border-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-ocid="help.search_input"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {filtered.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="help.empty_state"
            >
              No results found for "{query}". Try a different search term.
            </div>
          ) : (
            <div className="space-y-10">
              {filtered.map((section, si) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: si * 0.1 }}
                >
                  <h2 className="font-display text-xl font-bold text-maroon mb-4">
                    {section.category}
                  </h2>
                  <Accordion
                    type="single"
                    collapsible
                    className="border border-gold/20 rounded-lg overflow-hidden"
                  >
                    {section.items.map((item) => (
                      <AccordionItem
                        key={item.q}
                        value={item.q}
                        className="border-gold/20"
                      >
                        <AccordionTrigger className="px-5 text-left font-medium hover:text-maroon hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-5 text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
