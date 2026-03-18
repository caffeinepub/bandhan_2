export interface SampleProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  state: string;
  profession: string;
  religion: string;
  education: string;
  motherTongue: string;
  aboutMe: string;
  photoUrl: string;
  gender: string;
  isVerified: boolean;
}

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 26,
    city: "Mumbai",
    state: "Maharashtra",
    profession: "Software Engineer",
    religion: "Hindu",
    education: "Master's Degree",
    motherTongue: "Hindi",
    aboutMe:
      "Passionate software engineer who loves traveling and classical music. Looking for a kind-hearted partner who values family and personal growth.",
    photoUrl: "https://api.dicebear.com/7.x/personas/svg?seed=PriyaSharma",
    gender: "Female",
    isVerified: true,
  },
  {
    id: "2",
    name: "Arjun Patel",
    age: 29,
    city: "Ahmedabad",
    state: "Gujarat",
    profession: "Doctor",
    religion: "Hindu",
    education: "PhD",
    motherTongue: "Gujarati",
    aboutMe:
      "Medical professional dedicated to serving society. I enjoy cricket, cooking, and spending time with family. Seeking a life partner who shares my values.",
    photoUrl: "https://api.dicebear.com/7.x/personas/svg?seed=ArjunPatel",
    gender: "Male",
    isVerified: true,
  },
  {
    id: "3",
    name: "Ananya Reddy",
    age: 27,
    city: "Hyderabad",
    state: "Telangana",
    profession: "Teacher",
    religion: "Hindu",
    education: "Bachelor's Degree",
    motherTongue: "Telugu",
    aboutMe:
      "An educator by profession and an artist at heart. I believe in building strong bonds through trust and communication.",
    photoUrl: "https://api.dicebear.com/7.x/personas/svg?seed=AnanyaReddy",
    gender: "Female",
    isVerified: true,
  },
  {
    id: "4",
    name: "Rohan Kapoor",
    age: 31,
    city: "Delhi",
    state: "Delhi",
    profession: "Business Owner",
    religion: "Hindu",
    education: "Master's Degree",
    motherTongue: "Punjabi",
    aboutMe:
      "Entrepreneur with a passion for technology and innovation. Family-oriented and looking for a partner who appreciates both tradition and modernity.",
    photoUrl: "https://api.dicebear.com/7.x/personas/svg?seed=RohanKapoor",
    gender: "Male",
    isVerified: true,
  },
  {
    id: "5",
    name: "Fatima Khan",
    age: 25,
    city: "Pune",
    state: "Maharashtra",
    profession: "Engineer",
    religion: "Muslim",
    education: "Bachelor's Degree",
    motherTongue: "Urdu",
    aboutMe:
      "Civil engineer passionate about sustainable architecture. Love reading, cooking, and exploring new cultures. Looking for a caring and supportive partner.",
    photoUrl: "https://api.dicebear.com/7.x/personas/svg?seed=FatimaKhan",
    gender: "Female",
    isVerified: false,
  },
  {
    id: "6",
    name: "Harpreet Singh",
    age: 30,
    city: "Chandigarh",
    state: "Punjab",
    profession: "Government Officer",
    religion: "Sikh",
    education: "Master's Degree",
    motherTongue: "Punjabi",
    aboutMe:
      "A government officer who values integrity and service. I enjoy music, trekking, and family gatherings. Seeking a life partner grounded in values.",
    photoUrl: "https://api.dicebear.com/7.x/personas/svg?seed=HarpreetSingh",
    gender: "Male",
    isVerified: true,
  },
];

export const SUCCESS_STORIES = [
  {
    id: "1",
    coupleName: "Rahul & Sneha",
    location: "Bengaluru, Karnataka",
    story:
      "We matched on Bandhan in 2022. What started as a simple message turned into the most beautiful journey of our lives. We got married in February 2023 and are now building our dream together.",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=RahulSneha",
    date: "Married: February 2023",
  },
  {
    id: "2",
    coupleName: "Vikram & Meera",
    location: "Chennai, Tamil Nadu",
    story:
      "Bandhan helped us find each other across cities. Our families approved immediately, and our wedding was the most magical day of our lives. Thank you Bandhan!",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=VikramMeera",
    date: "Married: November 2022",
  },
  {
    id: "3",
    coupleName: "Aakash & Divya",
    location: "Jaipur, Rajasthan",
    story:
      "I was skeptical about online matrimony, but Bandhan's verified profiles gave me confidence. Found my soulmate in Divya — she's everything I prayed for.",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=AakashDivya",
    date: "Married: March 2023",
  },
];
