// Public-facing content based on Bhavisha Physiotherapy Clinic's Practo profile.
// Run `npm run db:seed:local` / `npm run db:seed:remote` to load it — this REPLACES all content.

export const settings = {
  clinic: {
    name: 'Bhavisha Physiotherapy Clinic',
    tagline: 'Physiotherapy care in Porur, Chennai',
    logo: '',
    established: '',
    registration: '',
  },
  contact: {
    phone: '+91 866 727 2971',
    whatsapp: '918667272971',
    email: '',
    address: 'No. 5, 7th Avenue, Vanagaram Main Road, Metro Nagar, Alappakkam,\nLandmark: Near Jeeva Complex, Chennai',
    city: 'Chennai',
    mapEmbed: 'https://www.google.com/maps?q=13.042784828745653,80.16090027987957&output=embed',
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=13.042784828745653,80.16090027987957',
    hours: [
      { days: 'Monday – Saturday', time: '9:00 AM – 10:00 PM' },
    ],
  },
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    x: '',
    linkedin: '',
    googleReviews: '',
    practoProfile: 'https://www.practo.com/chennai/doctor/sudha-18-physiotherapist/recommended?practice_id=1238501&referrer=establishment_profile',
  },
  hero: {
    badge: 'Physiotherapy in Porur, Chennai',
    title: 'Care that helps you',
    highlight: 'move with confidence.',
    subtitle:
      'Dr. Sudha (PT), BPTh/BPT, brings 17 years of overall physiotherapy experience to care at Bhavisha Physiotherapy Clinic. Call or WhatsApp to ask about treatments and clinic timings.',
    primaryLabel: 'Call the clinic',
    secondaryLabel: 'WhatsApp',
    image: '',
  },
  stats: {
    items: [
      { value: '17 years', label: 'Overall experience' },
      { value: 'BPTh/BPT', label: 'Physiotherapy qualification' },
      { value: 'Porur', label: 'Chennai clinic' },
      { value: 'Mon–Sat', label: 'Clinic hours' },
    ],
  },
  sections: {
    servicesShow: true,
    servicesEyebrow: 'What we offer',
    servicesTitle: 'Physiotherapy services',
    servicesIntro: 'Explore treatments listed on the clinic profile, including neuro, sports, joint, posture and gait physiotherapy.',
    aboutShow: true,
    aboutEyebrow: 'About us',
    aboutTitle: 'About Bhavisha Physiotherapy Clinic',
    aboutIntro: '',
    conditionsShow: true,
    conditionsEyebrow: 'Expertise',
    conditionsTitle: 'Physiotherapy for your needs',
    conditionsIntro: 'The clinic profile lists support for back and neck pain, joint pain, sports injuries, gait, posture and more.',
    processShow: true,
    processEyebrow: 'How it works',
    processTitle: 'Your path to recovery',
    processIntro: 'A clear, step-by-step approach so you always know what comes next.',
    featuresShow: true,
    featuresEyebrow: 'Why Bhavisha',
    featuresTitle: 'What makes us different',
    featuresIntro: 'Clinic and professional details are based on the public Practo profile.',
    testimonialsShow: true,
    testimonialsEyebrow: 'Practo stories',
    testimonialsTitle: '125 patient stories',
    testimonialsIntro: 'Practo currently shows a 98% recommendation from 125 patients.',
    teamShow: true,
    teamEyebrow: 'Our specialists',
    teamTitle: 'Meet Dr. Sudha',
    teamIntro: 'Physiotherapist at Bhavisha Physiotherapy Clinic, Porur.',
    faqsShow: true,
    faqsEyebrow: 'FAQs',
    faqsTitle: 'Frequently asked questions',
    faqsIntro: 'Clinic details and service information from the public profile.',
    postsShow: false,
    postsEyebrow: 'Articles',
    postsTitle: 'Articles',
    postsIntro: '',
  },
  about: {
    body:
      'Bhavisha Physiotherapy Clinic is a physiotherapy clinic in Porur, Chennai, visited by Dr. Sudha (PT). The Practo profile lists 17 years of overall physiotherapy experience and a BPTh/BPT qualification from The Tamil Nadu Dr. M.G.R. Medical University.\n\nThe clinic profile lists care across neurological, sports, back and neck, joint, gait, posture, home-care and other physiotherapy needs. Call or WhatsApp the clinic to ask about a treatment or confirm availability.',
    points: [
      'Physiotherapy clinic in Porur, Chennai',
      'Dr. Sudha (PT), BPTh/BPT',
      '17 years of overall physiotherapy experience listed on Practo',
      'Treatment options include neuro, sports, joint and back-care physiotherapy',
      'Call or WhatsApp to confirm current clinic hours',
    ],
    image: '',
    founderName: 'Dr. Sudha (PT)',
    founderRole: 'Physiotherapist',
    founderQualifications: 'BPTh/BPT · The Tamil Nadu Dr. M.G.R. Medical University, 2009',
    founderPhoto: '',
    founderBio:
      'Dr. Sudha is listed as a physiotherapist at Bhavisha Physiotherapy Clinic in Porur, Chennai. Her Practo profile lists a BPTh/BPT qualification and 17 years of overall experience. The profile also lists membership in the Indian Association of Physiotherapist.',
  },
  booking: {
    title: 'Call or WhatsApp',
    intro: 'Contact the clinic directly to ask about services, timings and availability.',
    services: [
      'General Physiotherapy',
      'Back & Neck Pain',
      'Sports Injury Rehab',
      'Orthopaedic Rehabilitation',
      'Neuro Rehabilitation',
      'Post-Surgery Recovery',
      'Paediatric Physiotherapy',
      'Home Visit Physiotherapy',
      'Other',
    ],
    timeSlots: [
      '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM',
      '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
    ],
    successMessage: '',
  },
  footer: {
    about: 'Physiotherapy care at Bhavisha Physiotherapy Clinic in Porur, Chennai.',
    copyright: 'Bhavisha Physiotherapy Clinic. All rights reserved.',
  },
  theme: {
    primary: '#0a2558',
    accent: '#2cc5b4',
    background: '#f3f7fc',
  },
  seo: {
    metaTitle: 'Bhavisha Physiotherapy Clinic | Physiotherapy in Porur, Chennai',
    metaDescription:
      'Physiotherapy in Porur, Chennai with Dr. Sudha (PT). Call or WhatsApp Bhavisha Physiotherapy Clinic to ask about services and timings.',
    ogImage: '',
    noindex: true,
  },
};

const services = [
  {
    title: 'Back & Neck Physiotherapy',
    icon: 'bone',
    summary: 'Physiotherapy for back and neck pain, including movement, posture and functional concerns.',
    features: ['Back and neck pain', 'Postural training', 'Traction', 'Guided exercise'],
    body:
      'The clinic lists back and neck pain physiotherapy, postural training, and cervical and lumbar traction among its services. Call or WhatsApp to discuss your symptoms and ask which care options are available.',
  },
  {
    title: 'Sports Physiotherapy',
    icon: 'activity',
    summary: 'Physiotherapy support for sports-related pain, movement and recovery.',
    features: ['Sports physiotherapy', 'Injury rehabilitation', 'Movement training', 'Recovery guidance'],
    body:
      'Sports physiotherapy is listed among the clinic’s treatment categories. The profile also names Achilles tendon rupture treatment. Contact the clinic to confirm whether a specific sports injury can be assessed there.',
  },
  {
    title: 'Neuro Physiotherapy',
    icon: 'brain',
    summary: 'Physiotherapy for neurological conditions, walking and day-to-day movement.',
    features: ['Neuro physiotherapy', 'Gait training', 'Assistive-device training', 'Hand-function training'],
    body:
      'The Practo profile lists neuro physiotherapy, gait or walking training, assistive-device training and hand-function training. Call the clinic to discuss the care required and confirm availability.',
  },
  {
    title: 'Joint & Knee Physiotherapy',
    icon: 'bone',
    summary: 'Physiotherapy for joint pain, knee pain and movement limitations.',
    features: ['Knee pain treatment', 'Joint pain management', 'Movement training', 'Exercise guidance'],
    body:
      'The clinic profile lists knee pain treatment, joint pain and joint pain management. If you are recovering after a procedure, call ahead to confirm the clinic can support your prescribed rehabilitation plan.',
  },
  {
    title: 'Home Care Physiotherapy',
    icon: 'home',
    summary: 'Home-care physiotherapy is listed among the clinic’s care options.',
    features: ['Home care physiotherapy', 'Mobility support', 'Gait training', 'Availability by enquiry'],
    body:
      'The profile lists home-care physiotherapy. Contact the clinic to ask about home visits, service areas and appointment availability.',
  },
  {
    title: 'Posture & Ergonomic Training',
    icon: 'posture',
    summary: 'Training to support posture, everyday movement and ergonomic habits.',
    features: ['Ergonomic training', 'Postural training', 'Movement habits', 'Workplace guidance'],
    body:
      'Ergonomic training and postural training are listed on the clinic’s profile. Call or WhatsApp to ask about the kind of training that may suit your needs.',
  },
  {
    title: 'Manual Therapy & Pain Management',
    icon: 'zap',
    summary: 'The clinic lists manual therapy, pain management and physiotherapy modalities.',
    features: ['Manual therapy', 'TENS', 'Computerised traction', 'Cervical/lumbar traction'],
    body:
      'The profile lists manual therapy, TENS and computerised, cervical and lumbar traction. A physiotherapist can advise whether a listed treatment is appropriate for your situation.',
  },
  {
    title: 'Jaw & TMJ Physiotherapy',
    icon: 'activity',
    summary: 'The profile lists ATM physiotherapy and manual therapy among reasons patients visit.',
    features: ['ATM/TMJ physiotherapy', 'Manual therapy', 'Movement assessment', 'Care by enquiry'],
    body:
      'The profile lists ATM physiotherapy and manual therapy. Contact the clinic to discuss your concern and confirm which services are currently available.',
  },
];

const condition = (title, icon, short, summary, symptoms, treatments, body) => ({
  title, icon, short, summary, symptoms, treatments, body,
});

const conditions = [
  condition('Back Pain', 'spine', 'Lower, middle & upper back pain',
    'Back pain physiotherapy and lower back pain are listed among the clinic’s treatment options.',
    ['Back discomfort', 'Limited movement', 'Pain with everyday activity'],
    ['Physiotherapy assessment', 'Postural training', 'Listed traction options'],
    'Call or WhatsApp the clinic to ask about an assessment and available treatment options.'),
  condition('Neck Pain', 'neck', 'Cervical pain & stiffness',
    'The clinic lists back and neck pain care as well as cervical and lumbar traction.',
    ['Neck discomfort', 'Restricted movement', 'Pain during daily activities'],
    ['Physiotherapy assessment', 'Postural training', 'Listed traction options'],
    'Call the clinic to discuss your symptoms and ask about available physiotherapy services.'),
  condition('Knee & Joint Pain', 'knee', 'Knee pain & joint pain',
    'The clinic profile lists knee pain treatment, joint pain and joint pain management.',
    ['Knee discomfort', 'Joint pain', 'Difficulty moving comfortably'],
    ['Physiotherapy assessment', 'Movement training', 'Care options by enquiry'],
    'Contact the clinic to discuss your concern and confirm which treatment options are available.'),
  condition('Sports Injuries & Achilles Tendon', 'activity', 'Sports physiotherapy',
    'Sports physiotherapy and Achilles tendon rupture treatment appear on the doctor’s profile.',
    ['Sports-related pain', 'Movement changes after injury', 'Achilles tendon concerns'],
    ['Sports physiotherapy', 'Rehabilitation by assessment', 'Availability by enquiry'],
    'If you have a sports injury or Achilles tendon concern, call ahead to check whether the clinic can help.'),
  condition('Jaw & TMJ Concerns', 'activity', 'ATM / TMJ physiotherapy',
    'ATM physiotherapy and manual therapy are listed on the doctor’s Practo profile.',
    ['Jaw discomfort', 'Jaw movement concerns'],
    ['Assessment by a physiotherapist', 'Listed ATM physiotherapy', 'Availability by enquiry'],
    'Contact the clinic to ask whether ATM/TMJ physiotherapy is available for your concern.'),
  condition('Posture Problems', 'posture', 'Alignment & balance',
    'Postural and ergonomic training are listed on the clinic profile.',
    ['Posture-related discomfort', 'Movement concerns during work or daily activity'],
    ['Postural training', 'Ergonomic training'],
    'Ask the clinic about postural or ergonomic training and whether it suits your needs.'),
  condition('Walking & Mobility Concerns', 'brain', 'Gait and mobility training',
    'Gait (walking) training and assistive-device training are listed among treatments.',
    ['Walking difficulty', 'Mobility concerns', 'Support with an assistive device'],
    ['Gait training', 'Assistive-device training', 'Physiotherapy assessment'],
    'Call the clinic to discuss gait or mobility support and confirm service availability.'),
  condition('Hand Function Concerns', 'hand', 'Hand function training',
    'Hand-function training is listed among treatments on the doctor’s profile.',
    ['Changes in hand function', 'Difficulty with hand movement'],
    ['Hand-function training', 'Assessment by a physiotherapist'],
    'Contact the clinic to ask about hand-function training and whether it fits your needs.'),
];

const process = [
  { title: 'Call or WhatsApp', text: 'Contact the clinic to ask about a service, clinic hours or availability.' },
  { title: 'Discuss your concern', text: 'Share what kind of physiotherapy support you are looking for.' },
  { title: 'Confirm availability', text: 'The clinic can confirm current services, timings and next steps directly.' },
  { title: 'Visit the clinic', text: 'Use the location details and directions to find the clinic after confirming your visit.' },
];

const features = [
  { title: '17 years of experience', icon: 'award', text: 'Dr. Sudha’s Practo profile lists 17 years of overall physiotherapy experience.' },
  { title: 'Physiotherapy qualification', icon: 'shield', text: 'The profile lists BPTh/BPT from The Tamil Nadu Dr. M.G.R. Medical University.' },
  { title: 'Multiple care areas', icon: 'activity', text: 'Listed services include neuro, sports, home-care, joint, gait and posture physiotherapy.' },
  { title: 'Clinic hours', icon: 'clock', text: 'Call or WhatsApp to confirm current clinic hours and availability.' },
  { title: 'Professional membership', icon: 'users', text: 'Dr. Sudha’s profile lists membership in the Indian Association of Physiotherapist.' },
  { title: 'Treatment modalities', icon: 'activity', text: 'The profile lists manual therapy, TENS and computerised traction among treatment options.' },
];

const team = [
  { name: 'Dr. Sudha (PT)', role: 'Physiotherapist', specialty: 'Physiotherapy', experience: '17 years overall', qualifications: 'BPTh/BPT · TNMGRMU, 2009', photo: '', bio: 'Listed at Bhavisha Physiotherapy Clinic in Porur, Chennai. The Practo profile lists membership in the Indian Association of Physiotherapist.' },
];

const testimonials = [];

const faqs = [
  { question: 'Where is Bhavisha Physiotherapy Clinic?', answer: 'The Practo profile lists the clinic in Porur, Chennai, at No. 5, 7th Avenue, Vanagaram Main Road, Metro Nagar, Alappakkam, near Jeeva Complex.' },
  { question: 'What are the clinic timings?', answer: 'The clinic page lists Monday–Saturday, 9:00 AM–10:00 PM. Call or WhatsApp to confirm current timings before visiting.' },
  { question: 'Which physiotherapy services are listed?', answer: 'Listed services include neuro and sports physiotherapy, home-care physiotherapy, back and neck care, joint pain management, gait training, ergonomic and postural training, manual therapy and traction.' },
  { question: 'Who is the physiotherapist?', answer: 'The profile lists Dr. Sudha (PT), BPTh/BPT, with 17 years of overall experience. It lists her qualification from The Tamil Nadu Dr. M.G.R. Medical University.' },
  { question: 'How do I ask about availability?', answer: 'Call or WhatsApp the clinic directly. Online appointment request forms are not available on this website.' },
];

const posts = [];

const branches = [
  {
    name: 'Bhavisha Physiotherapy Clinic · Porur',
    address: 'No. 5, 7th Avenue, Vanagaram Main Road, Metro Nagar, Alappakkam,\nNear Jeeva Complex, Chennai',
    phone: '+91 866 727 2971',
    hours: 'Mon–Sat 9:00 AM – 10:00 PM',
    mapEmbed: 'https://www.google.com/maps?q=13.042784828745653,80.16090027987957&output=embed',
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=13.042784828745653,80.16090027987957',
    image: '',
    description: 'Bhavisha Physiotherapy Clinic is listed in Porur, Chennai. Check the map or call ahead for directions and current clinic timings.',
  },
];

export const collections = {
  services,
  conditions,
  process,
  features,
  team,
  testimonials,
  faqs,
  posts,
  branches,
};
