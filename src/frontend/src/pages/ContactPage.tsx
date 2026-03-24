import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <main className="min-h-screen" data-ocid="contact.page">
      {/* Hero */}
      <section className="bg-maroon text-white py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-white/80 text-lg">
              Questions? Suggestions? We'd love to hear from you. Our team
              typically responds within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {sent ? (
                <div
                  className="text-center py-20"
                  data-ocid="contact.success_state"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-maroon mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground">
                    We'll get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSent(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="contact.panel"
                >
                  <h2 className="font-display text-2xl font-bold text-maroon mb-6">
                    Send a Message
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Arjun Sharma"
                        value={form.name}
                        onChange={handleChange}
                        data-ocid="contact.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="arjun@example.com"
                        value={form.email}
                        onChange={handleChange}
                        data-ocid="contact.input"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={form.subject}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, subject: v }))
                      }
                    >
                      <SelectTrigger data-ocid="contact.select">
                        <SelectValue placeholder="Choose a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">Account & Login</SelectItem>
                        <SelectItem value="profile">
                          Profile & Photos
                        </SelectItem>
                        <SelectItem value="matching">
                          Matching & Browsing
                        </SelectItem>
                        <SelectItem value="messaging">Messages</SelectItem>
                        <SelectItem value="billing">
                          Billing & Membership
                        </SelectItem>
                        <SelectItem value="safety">
                          Safety & Reporting
                        </SelectItem>
                        <SelectItem value="feedback">
                          General Feedback
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Describe your question or issue in detail..."
                      value={form.message}
                      onChange={handleChange}
                      data-ocid="contact.textarea"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={sending}
                    className="bg-maroon hover:bg-maroon/90 text-white w-full"
                    data-ocid="contact.submit_button"
                  >
                    {sending ? "Sending..." : "Send Message"}
                    {!sending && <Send className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Side panel */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <h3 className="font-display font-semibold text-maroon mb-4">
                  Our Office
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-maroon mt-0.5 flex-shrink-0" />
                    <span>
                      Level 5, Prestige Tech Park,
                      <br />
                      Outer Ring Road,
                      <br />
                      Bengaluru, Karnataka 560103
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="w-4 h-4 text-maroon mt-0.5 flex-shrink-0" />
                    <span>
                      +91-80-4567-8900
                      <br />
                      (Mon–Fri, 9am–6pm IST)
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="w-4 h-4 text-maroon mt-0.5 flex-shrink-0" />
                    <span>support@bandhan.ai</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display font-semibold text-maroon mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="/"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-full bg-maroon/10 flex items-center justify-center hover:bg-maroon hover:text-white transition-colors text-maroon"
                  >
                    <SiFacebook className="w-4 h-4" />
                  </a>
                  <a
                    href="/"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-full bg-maroon/10 flex items-center justify-center hover:bg-maroon hover:text-white transition-colors text-maroon"
                  >
                    <SiInstagram className="w-4 h-4" />
                  </a>
                  <a
                    href="/"
                    aria-label="X"
                    className="w-9 h-9 rounded-full bg-maroon/10 flex items-center justify-center hover:bg-maroon hover:text-white transition-colors text-maroon"
                  >
                    <SiX className="w-4 h-4" />
                  </a>
                  <a
                    href="/"
                    aria-label="YouTube"
                    className="w-9 h-9 rounded-full bg-maroon/10 flex items-center justify-center hover:bg-maroon hover:text-white transition-colors text-maroon"
                  >
                    <SiYoutube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="bg-gold/10 rounded-lg p-4">
                <h4 className="font-display font-semibold text-maroon mb-2 text-sm">
                  Response Times
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• General queries: within 24 hours</li>
                  <li>• Safety reports: within 2 hours</li>
                  <li>• Billing issues: within 4 hours</li>
                  <li>• Technical bugs: within 8 hours</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
