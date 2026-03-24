const stories = [
  {
    id: 1,
    names: "Priya & Rahul",
    location: "Mumbai & Delhi",
    married: "March 2023",
    story:
      "We connected on Bandhan in January 2023. Our families met in February and we got married the very next month! Bandhan's detailed profiles helped us understand each other before even meeting. We are grateful every day.",
    avatar1: "P",
    avatar2: "R",
  },
  {
    id: 2,
    names: "Ananya & Vikram",
    location: "Bengaluru & Pune",
    married: "November 2022",
    story:
      "As a software engineer, I was skeptical about matrimonial apps. But Bandhan's verified profiles gave me confidence. Vikram's profile stood out immediately -- his values matched mine perfectly. We are now happily settled in Bengaluru.",
    avatar1: "A",
    avatar2: "V",
  },
  {
    id: 3,
    names: "Meera & Arjun",
    location: "Chennai & Hyderabad",
    married: "February 2024",
    story:
      "Our parents had been searching for a match for years. Within two months of joining Bandhan, we found each other. The detailed horoscope and family background sections made the process so much smoother for our families.",
    avatar1: "M",
    avatar2: "A",
  },
  {
    id: 4,
    names: "Sneha & Karthik",
    location: "Kolkata & Chennai",
    married: "August 2023",
    story:
      "Being from different states, we never imagined we would find each other. Bandhan's smart matching connected us based on our shared interests and values. We had our first video call through the platform and knew instantly.",
    avatar1: "S",
    avatar2: "K",
  },
  {
    id: 5,
    names: "Pooja & Nikhil",
    location: "Jaipur & Ahmedabad",
    married: "January 2024",
    story:
      "We were both Rajasthani at heart and Bandhan helped us find that common ground. The Premium membership gave us access to contact details quickly and our families connected within a week. A dream wedding followed!",
    avatar1: "P",
    avatar2: "N",
  },
  {
    id: 6,
    names: "Kavitha & Suresh",
    location: "Coimbatore & Madurai",
    married: "May 2023",
    story:
      "Both Tamil Brahmin families, we found each other through Bandhan's community filter. Our horoscopes matched perfectly and the families agreed within days. Bandhan made what seemed impossible, possible.",
    avatar1: "K",
    avatar2: "S",
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-maroon text-white py-16 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Success Stories
        </h1>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Real couples who found their life partners on Bandhan. Their joy is
          our greatest achievement.
        </p>
        <div className="mt-8 flex justify-center gap-10 text-center">
          <div>
            <div className="text-3xl font-bold text-gold">50,000+</div>
            <div className="text-white/70 text-sm mt-1">Happy Marriages</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gold">2 Lakh+</div>
            <div className="text-white/70 text-sm mt-1">Verified Profiles</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gold">15+ Years</div>
            <div className="text-white/70 text-sm mt-1">Trusted Service</div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-maroon text-center mb-10">
          Couples Who Found Love on Bandhan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl shadow-md p-6 border border-border hover:shadow-lg transition-shadow"
            >
              {/* Avatars */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-maroon text-white flex items-center justify-center text-lg font-bold">
                  {s.avatar1}
                </div>
                <span className="text-maroon font-bold text-xl">♥</span>
                <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center text-lg font-bold">
                  {s.avatar2}
                </div>
                <div className="ml-2">
                  <div className="font-semibold text-foreground">{s.names}</div>
                  <div className="text-xs text-muted-foreground">
                    {s.location}
                  </div>
                </div>
              </div>
              {/* Story */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                "{s.story}"
              </p>
              {/* Badge */}
              <div className="inline-block bg-secondary text-maroon text-xs font-semibold px-3 py-1 rounded-full">
                Married {s.married}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-maroon/5 border-t border-border py-12 px-4 text-center">
        <h2 className="font-display text-2xl font-bold text-maroon mb-3">
          Your Story Could Be Next
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Join lakhs of families who trust Bandhan to find their perfect match.
        </p>
        <a
          href="/register"
          className="inline-block bg-maroon text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
        >
          Register Free Today
        </a>
      </section>
    </div>
  );
}
