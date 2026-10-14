// Sample (placeholder) content for ReviveCare Physiotherapy.
// Everything here is dummy data and can be edited from the admin portal.
// Run `npm run db:seed:local` / `npm run db:seed:remote` to load it — this REPLACES all content.

export const settings = {
  clinic: {
    name: 'ReviveCare Physiotherapy',
    tagline: 'Move better. Live pain-free.',
    logo: '',
    established: '2014',
    registration: 'Clinic Reg. No. SAMPLE-0000 · GSTIN 00AAAAA0000A0Z0',
  },
  contact: {
    phone: '+91 90000 00000',
    whatsapp: '919000000000',
    email: 'hello@revivecare.example',
    address: '12 Sample Street, 2nd Avenue,\nAnna Nagar, Chennai – 600040',
    city: 'Chennai',
    mapEmbed: 'https://www.google.com/maps?q=Anna+Nagar,+Chennai&output=embed',
    mapLink: 'https://maps.google.com/?q=Anna+Nagar,+Chennai',
    hours: [
      { days: 'Monday – Saturday', time: '8:00 AM – 8:00 PM' },
      { days: 'Sunday', time: '9:00 AM – 1:00 PM (by appointment)' },
    ],
  },
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    x: '',
    linkedin: '',
    googleReviews: '',
  },
  hero: {
    badge: 'Trusted physiotherapy care in Chennai',
    title: 'Move freely.',
    highlight: 'Live pain-free.',
    subtitle:
      'One-to-one physiotherapy from experienced specialists. We find the cause of your pain, build a plan around your life, and stay with you until you are back to doing what you love.',
    primaryLabel: 'Book Appointment',
    secondaryLabel: 'WhatsApp Us',
    image: '',
  },
  stats: {
    items: [
      { value: '10,000+', label: 'Patients treated' },
      { value: '12+', label: 'Years of care' },
      { value: '15+', label: 'Specialists' },
      { value: '4.9★', label: 'Patient rating' },
    ],
  },
  sections: {
    servicesShow: true,
    servicesEyebrow: 'What we offer',
    servicesTitle: 'Physiotherapy services',
    servicesIntro: 'Evidence-based treatment for every stage of recovery — from the first painful day to getting back on the field.',
    aboutShow: true,
    aboutEyebrow: 'About us',
    aboutTitle: 'Care that puts you back in motion',
    aboutIntro: '',
    conditionsShow: true,
    conditionsEyebrow: 'Expertise',
    conditionsTitle: 'Conditions we treat',
    conditionsIntro: 'Our physiotherapists treat a wide range of muscle, joint, nerve and sports-related problems.',
    processShow: true,
    processEyebrow: 'How it works',
    processTitle: 'Your path to recovery',
    processIntro: 'A clear, step-by-step approach so you always know what comes next.',
    featuresShow: true,
    featuresEyebrow: 'Why ReviveCare',
    featuresTitle: 'What makes us different',
    featuresIntro: 'We treat people, not just symptoms.',
    testimonialsShow: true,
    testimonialsEyebrow: 'Patient stories',
    testimonialsTitle: 'What our patients say',
    testimonialsIntro: '',
    teamShow: true,
    teamEyebrow: 'Our specialists',
    teamTitle: 'Meet the team',
    teamIntro: 'Qualified physiotherapists with years of hands-on clinical experience.',
    faqsShow: true,
    faqsEyebrow: 'FAQs',
    faqsTitle: 'Frequently asked questions',
    faqsIntro: 'Everything you need to know before your first visit.',
    postsShow: true,
    postsEyebrow: 'Health tips',
    postsTitle: 'Latest articles',
    postsIntro: 'Practical advice from our physiotherapists on staying active and pain-free.',
  },
  about: {
    body:
      'ReviveCare Physiotherapy was started with a simple idea: every patient deserves unhurried, one-to-one care from a qualified physiotherapist.\n\nWe combine hands-on manual therapy, modern electrotherapy and carefully guided exercise to treat the cause of your pain — not just the symptoms. Every plan is written for you, explained clearly, and reviewed as you improve.',
    points: [
      'One-to-one sessions with qualified physiotherapists',
      'Detailed assessment before every treatment plan',
      'Modern electrotherapy and rehab equipment',
      'Home visits for patients who cannot travel',
      'Clear home-exercise plans with progress tracking',
    ],
    image: '',
    founderName: 'Dr. Anjali Menon (PT)',
    founderRole: 'Founder & Chief Physiotherapist',
    founderQualifications: 'BPT, MPT (Orthopaedics), Certified Manual Therapist',
    founderPhoto: '',
    founderBio:
      'Dr. Anjali has more than 14 years of experience treating spine, joint and sports injuries. She founded ReviveCare to offer patient-first physiotherapy where every session is planned, measured and explained.\n\nShe regularly conducts workshops on posture, workplace ergonomics and injury prevention.',
  },
  booking: {
    title: 'Book an appointment',
    intro: 'Fill in the form and our team will call you to confirm your slot — usually within a few hours.',
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
    successMessage: 'Thank you! Your request has been received. Our team will call you shortly to confirm your appointment.',
  },
  footer: {
    about: 'Patient-first physiotherapy for pain relief, injury recovery and better movement.',
    copyright: 'ReviveCare Physiotherapy. All rights reserved.',
  },
  theme: {
    primary: '#0f2340',
    accent: '#e9a23b',
    background: '#f7f5f0',
  },
  seo: {
    metaTitle: 'ReviveCare Physiotherapy | Physiotherapy Clinic in Chennai',
    metaDescription:
      'One-to-one physiotherapy for back pain, neck pain, sports injuries, arthritis, stroke rehab and post-surgery recovery. Book an appointment today.',
    ogImage: '',
    noindex: true,
    previewBanner: true,
    previewText: 'Preview website — all names, numbers and reviews are sample content.',
  },
};

const services = [
  {
    title: 'Orthopaedic Physiotherapy',
    icon: 'bone',
    summary: 'Treatment for joint, muscle and bone problems — from arthritis to long-standing back pain.',
    features: ['Manual therapy', 'Joint mobilisation', 'Strength programmes', 'Pain management'],
    body:
      'Orthopaedic physiotherapy helps you recover from problems affecting your joints, muscles, ligaments and bones.\n\n## What to expect\n- A detailed assessment of movement, strength and posture\n- Hands-on treatment to ease pain and stiffness\n- Exercises that rebuild strength and protect the joint\n- Advice on daily activities, sleep and work posture\n\nMost patients feel a clear difference within the first few sessions.',
  },
  {
    title: 'Sports Injury Rehabilitation',
    icon: 'activity',
    summary: 'Get back to your sport faster and stronger, with a plan built around your goals.',
    features: ['Injury assessment', 'Taping & strapping', 'Return-to-sport testing', 'Injury prevention'],
    body:
      'Whether you are a weekend runner or a competitive athlete, we help you recover from sprains, strains, tendon and ligament injuries.\n\n## Our approach\n- Early pain and swelling control\n- Progressive loading to rebuild tissue strength\n- Sport-specific drills and agility work\n- Clear return-to-play criteria so you do not get re-injured',
  },
  {
    title: 'Neuro Rehabilitation',
    icon: 'brain',
    summary: 'Regain movement, balance and independence after stroke or nerve conditions.',
    features: ['Stroke rehab', 'Balance training', 'Gait training', 'Family guidance'],
    body:
      'Neurological physiotherapy supports people living with stroke, Parkinson’s disease, spinal cord problems and nerve injuries.\n\nWe work on walking, balance, hand function and everyday tasks, and we involve family members so progress continues at home.',
  },
  {
    title: 'Post-Surgery Rehabilitation',
    icon: 'clipboard',
    summary: 'Safe, structured recovery after knee, hip, shoulder or spine surgery.',
    features: ['Knee & hip replacement', 'ACL reconstruction', 'Spine surgery', 'Fracture recovery'],
    body:
      'The right rehabilitation after surgery makes a big difference to the final result. We follow your surgeon’s protocol and adjust every stage to how you are healing.\n\n## Common surgeries we support\n- Total knee and hip replacement\n- ACL and meniscus repair\n- Shoulder and rotator cuff repair\n- Spine surgery and fracture fixation',
  },
  {
    title: 'Paediatric Physiotherapy',
    icon: 'baby',
    summary: 'Gentle, playful therapy that helps children reach their movement milestones.',
    features: ['Developmental delay', 'Cerebral palsy', 'Flat feet & posture', 'Play-based therapy'],
    body:
      'Our paediatric physiotherapists use play-based sessions to help children build strength, balance and coordination.\n\nWe work closely with parents and give simple activities to continue at home.',
  },
  {
    title: 'Home Visit Physiotherapy',
    icon: 'home',
    summary: 'Expert physiotherapy in the comfort of your home — ideal for elderly and post-surgery patients.',
    features: ['Elderly care', 'Bed-bound patients', 'Post-operative care', 'Flexible timings'],
    body:
      'When travelling to the clinic is difficult, our physiotherapists come to you with portable equipment and the same standard of care.\n\nHome visits are available across the city. Call or WhatsApp us to check availability in your area.',
  },
  {
    title: 'Pain Management & Electrotherapy',
    icon: 'zap',
    summary: 'Drug-free pain relief using modern electrotherapy alongside hands-on care.',
    features: ['TENS & IFT', 'Ultrasound therapy', 'Shockwave therapy', 'Dry needling'],
    body:
      'Electrotherapy can reduce pain and muscle spasm so you can move and exercise more comfortably. We always combine it with active treatment for longer-lasting results.',
  },
  {
    title: 'Posture & Ergonomic Care',
    icon: 'posture',
    summary: 'Correct posture habits and set up your workspace to prevent pain from long hours at a desk.',
    features: ['Posture assessment', 'Workstation advice', 'Core strengthening', 'Corporate workshops'],
    body:
      'Long hours at a desk or on the phone can lead to neck, shoulder and back pain. We assess your posture, teach simple corrective exercises and help you set up a healthier workspace.',
  },
];

const condition = (title, icon, short, summary, symptoms, treatments, body) => ({
  title, icon, short, summary, symptoms, treatments, body,
});

const conditions = [
  condition('Back Pain', 'spine', 'Lower, middle & upper back pain',
    'Back pain is one of the most common reasons people visit a physiotherapist. Most back pain improves well with the right mix of hands-on care and exercise.',
    ['Pain or stiffness in the back', 'Pain when bending or lifting', 'Pain after sitting for long periods', 'Muscle spasm'],
    ['Detailed spine and posture assessment', 'Manual therapy and mobilisation', 'Core and back strengthening', 'Ergonomic and lifting advice'],
    'We start by finding out what is driving your pain — posture, muscle weakness, joint stiffness or nerve irritation — and then build a plan to relieve pain and prevent it from coming back.'),
  condition('Neck Pain', 'neck', 'Cervical pain & stiffness',
    'Neck pain often comes from posture, stress or long screen time. Physiotherapy can ease pain quickly and improve how your neck moves.',
    ['Stiff or painful neck', 'Headaches starting at the neck', 'Pain spreading to shoulders', 'Tingling in arms or hands'],
    ['Gentle joint mobilisation', 'Soft tissue release', 'Deep neck strengthening', 'Workstation and pillow advice'],
    'Treatment focuses on easing pain, restoring movement and strengthening the deep neck muscles that support good posture.'),
  condition('Shoulder Pain & Frozen Shoulder', 'shoulder', 'Stiffness, rotator cuff & impingement',
    'Shoulder problems can make simple tasks like dressing or reaching overhead painful. Early physiotherapy speeds up recovery.',
    ['Pain when lifting the arm', 'Night pain', 'Loss of shoulder movement', 'Weakness'],
    ['Joint mobilisation', 'Stretching programmes', 'Rotator cuff strengthening', 'Pain-relief modalities'],
    'Frozen shoulder, rotator cuff injuries and impingement all respond well to a structured programme that restores movement step by step.'),
  condition('Knee Pain & Arthritis', 'knee', 'Osteoarthritis & joint pain',
    'Knee arthritis and pain can limit walking and climbing stairs. Targeted exercise is one of the most effective treatments.',
    ['Pain when walking or on stairs', 'Swelling', 'Stiffness in the morning', 'Clicking or giving way'],
    ['Quadriceps and hip strengthening', 'Joint mobilisation', 'Walking and balance training', 'Weight and activity guidance'],
    'We help you stay active with less pain, and many patients are able to delay or avoid surgery with the right programme.'),
  condition('Sciatica', 'zap', 'Nerve pain down the leg',
    'Sciatica is pain that travels from the lower back down the leg, usually caused by an irritated nerve.',
    ['Shooting pain down one leg', 'Numbness or tingling', 'Pain worse when sitting', 'Leg weakness'],
    ['Nerve mobilisation', 'Spinal mobility exercises', 'Core stabilisation', 'Posture correction'],
    'Our aim is to calm the irritated nerve, restore normal movement and strengthen your back so the pain does not return.'),
  condition('Sports Injuries', 'activity', 'Sprains, strains & tears',
    'From ankle sprains to hamstring strains, we help athletes of every level recover and return to sport safely.',
    ['Pain during or after activity', 'Swelling or bruising', 'Reduced strength or speed', 'Fear of re-injury'],
    ['Early injury management', 'Progressive strength training', 'Sport-specific drills', 'Return-to-sport testing'],
    'Every plan is built around your sport and your goals, with clear milestones along the way.'),
  condition('Stroke Recovery', 'brain', 'Neuro rehabilitation',
    'After a stroke, physiotherapy helps rebuild movement, balance and independence in daily life.',
    ['Weakness on one side', 'Difficulty walking', 'Poor balance', 'Reduced hand function'],
    ['Task-based training', 'Gait and balance training', 'Strength and coordination work', 'Carer and family training'],
    'Recovery continues for many months after a stroke. Regular, focused therapy makes the most of that window.'),
  condition('Post-Fracture Rehab', 'bone', 'Bone healing & strength',
    'Once a fracture has healed, physiotherapy restores the strength and movement lost during immobilisation.',
    ['Stiff joints after a cast', 'Muscle weakness', 'Swelling', 'Difficulty walking or gripping'],
    ['Range-of-motion exercises', 'Progressive strengthening', 'Balance and gait training', 'Scar and swelling management'],
    'We work closely with your orthopaedic surgeon to progress you safely back to full function.'),
  condition('Posture Problems', 'posture', 'Alignment & balance',
    'Poor posture can cause neck, shoulder and back pain over time. Small daily changes make a big difference.',
    ['Rounded shoulders', 'Forward head posture', 'Back ache after sitting', 'Muscle tightness'],
    ['Posture assessment', 'Stretching and mobility', 'Core and upper-back strengthening', 'Workstation advice'],
    'We show you exactly which muscles to stretch and strengthen, and how to set up your day to support better posture.'),
  condition('Headaches & Migraine', 'sparkles', 'Tension & neck-related headaches',
    'Many headaches start in the neck and shoulders. Physiotherapy can reduce how often they happen and how strong they are.',
    ['Headache starting at the base of the skull', 'Tight neck and shoulders', 'Pain behind the eyes', 'Headache after desk work'],
    ['Neck joint mobilisation', 'Soft tissue release', 'Posture and stress advice', 'Strengthening exercises'],
    'If your headaches are linked to your neck, treating the neck can bring lasting relief.'),
  condition('Hand & Wrist Pain', 'hand', 'Carpal tunnel & tendon pain',
    'Repetitive work, typing and phone use can lead to wrist and hand pain, tingling and weakness.',
    ['Tingling in fingers', 'Wrist pain when typing', 'Weak grip', 'Pain at the base of the thumb'],
    ['Nerve and tendon gliding', 'Splinting advice', 'Grip strengthening', 'Workstation changes'],
    'Early treatment of hand and wrist pain usually leads to faster recovery and avoids long-term problems.'),
  condition('Heel & Foot Pain', 'foot', 'Plantar fasciitis & ankle pain',
    'Heel pain, especially first thing in the morning, is often caused by plantar fasciitis and responds well to physiotherapy.',
    ['Sharp heel pain in the morning', 'Pain after standing long', 'Ankle stiffness', 'Arch pain'],
    ['Calf and foot stretching', 'Foot strengthening', 'Footwear and insole advice', 'Shockwave therapy'],
    'We address both the painful area and the reasons behind it, such as calf tightness, footwear and activity levels.'),
];

const process = [
  { title: 'Book your visit', text: 'Call, WhatsApp or book online. We will confirm a time that suits you.' },
  { title: 'Detailed assessment', text: 'Your physiotherapist takes your history, examines how you move and finds the root cause of the problem.' },
  { title: 'Personal treatment plan', text: 'We explain what is going on and agree a clear plan, with goals and an expected number of sessions.' },
  { title: 'Recover & stay well', text: 'We track your progress, adjust your plan and give you exercises to keep you pain-free for the long term.' },
];

const features = [
  { title: 'Evidence-based care', icon: 'shield', text: 'Treatments based on current clinical research and international guidelines.' },
  { title: 'One-to-one sessions', icon: 'users', text: 'Your physiotherapist stays with you for the whole session — no sharing, no rushing.' },
  { title: 'Modern equipment', icon: 'zap', text: 'Electrotherapy, shockwave and rehab equipment for precise, effective treatment.' },
  { title: 'Flexible timings', icon: 'clock', text: 'Early morning and evening slots, six days a week, plus Sunday appointments.' },
  { title: 'Experienced team', icon: 'award', text: 'Qualified specialists in orthopaedic, sports, neuro and paediatric physiotherapy.' },
  { title: 'Home visits', icon: 'home', text: 'The same quality of care at home for elderly and post-surgery patients.' },
];

const team = [
  { name: 'Dr. Anjali Menon', role: 'Founder & Chief Physiotherapist', specialty: 'Orthopaedic & Manual Therapy', experience: '14+ yrs', qualifications: 'BPT, MPT (Ortho)', photo: '', bio: 'Specialises in spine and joint pain, with a focus on hands-on treatment and long-term results.' },
  { name: 'Dr. Karthik Raman', role: 'Sports Physiotherapist', specialty: 'Sports Injury Rehabilitation', experience: '9+ yrs', qualifications: 'BPT, MPT (Sports)', photo: '', bio: 'Works with runners, cricketers and gym-goers to return to sport stronger.' },
  { name: 'Dr. Fathima Begum', role: 'Senior Physiotherapist', specialty: 'Neuro Rehabilitation', experience: '10+ yrs', qualifications: 'BPT, MPT (Neuro)', photo: '', bio: 'Helps stroke and Parkinson’s patients regain balance, walking and independence.' },
  { name: 'Dr. Rahul Varma', role: 'Paediatric Physiotherapist', specialty: 'Paediatric Physiotherapy', experience: '7+ yrs', qualifications: 'BPT, MPT (Paediatrics)', photo: '', bio: 'Uses play-based therapy to help children reach their movement milestones.' },
];

const testimonials = [
  { name: 'Sample Patient A', condition: 'Lower back pain', rating: 5, when: '2 weeks ago', text: 'I had back pain for months. After a few sessions I could sit at work without pain again. The exercises were clearly explained and easy to follow at home.' },
  { name: 'Sample Patient B', condition: 'Frozen shoulder', rating: 5, when: '1 month ago', text: 'My shoulder movement is almost back to normal. The physiotherapist was patient and encouraging throughout.' },
  { name: 'Sample Patient C', condition: 'Knee replacement rehab', rating: 5, when: '3 weeks ago', text: 'After my knee surgery the team got me walking confidently again. Very professional and caring staff.' },
  { name: 'Sample Patient D', condition: 'Sports injury', rating: 5, when: '2 months ago', text: 'Hurt my ankle playing football. They had a clear plan from day one and I was back on the pitch in six weeks.' },
  { name: 'Sample Patient E', condition: 'Neck pain', rating: 5, when: '1 month ago', text: 'The posture tips and neck exercises made a big difference. My headaches have reduced a lot.' },
  { name: 'Sample Patient F', condition: 'Home visit', rating: 5, when: '5 weeks ago', text: 'Home visits for my father after his stroke were a huge help. The therapist also taught us how to support him at home.' },
];

const faqs = [
  { question: 'Do I need a doctor’s referral to see a physiotherapist?', answer: 'No. You can book directly with us. If you have reports, scans or a referral letter, please bring them to your first visit.' },
  { question: 'How long is each session?', answer: 'The first visit, including assessment, takes about 45–60 minutes. Follow-up sessions usually last 30–45 minutes.' },
  { question: 'How many sessions will I need?', answer: 'It depends on your condition. After your assessment we will give you an estimate and review it as you improve. Many patients notice a difference within 3–5 sessions.' },
  { question: 'Is physiotherapy painful?', answer: 'Treatment should not be very painful. Some exercises may feel uncomfortable at first, but your physiotherapist will always work within a level you are comfortable with.' },
  { question: 'What should I wear?', answer: 'Loose, comfortable clothing that lets us see and move the area being treated — for example shorts for knee problems.' },
  { question: 'Do you offer home visits?', answer: 'Yes. Home visit physiotherapy is available for elderly, post-surgery and bed-bound patients. Call or WhatsApp us to check availability in your area.' },
];

const gallery = [
  { title: 'Reception & waiting area', image: '', category: 'Clinic' },
  { title: 'Treatment room', image: '', category: 'Clinic' },
  { title: 'Exercise & rehab studio', image: '', category: 'Rehab' },
  { title: 'Electrotherapy unit', image: '', category: 'Equipment' },
  { title: 'Sports rehab zone', image: '', category: 'Rehab' },
  { title: 'Consultation room', image: '', category: 'Clinic' },
];

const posts = [
  {
    title: '5 desk stretches to ease neck and back pain',
    date: '2026-09-22',
    author: 'Dr. Anjali Menon',
    category: 'Posture',
    excerpt: 'Long hours at a desk can leave your neck and back stiff. These five simple stretches take less than five minutes.',
    cover: '',
    body:
      'Sitting for long periods puts steady load on your neck and lower back. Short movement breaks every 30–45 minutes help more than one long workout at the end of the day.\n\n## Try these five stretches\n1. **Chin tucks** — gently draw your chin back, hold for 5 seconds, repeat 10 times.\n2. **Shoulder rolls** — roll your shoulders backwards slowly 10 times.\n3. **Upper back extension** — hands behind your head, gently lean back over your chair.\n4. **Seated twist** — turn your upper body to each side and hold for 10 seconds.\n5. **Standing back bend** — stand up, hands on your lower back, and gently lean back.\n\n## When to see a physiotherapist\nIf pain lasts more than two weeks, spreads into your arm or leg, or comes with numbness or tingling, book an assessment.\n\n*This article is general advice and not a substitute for a personal assessment.*',
  },
  {
    title: 'When should you see a physio after a sports injury?',
    date: '2026-09-08',
    author: 'Dr. Karthik Raman',
    category: 'Sports',
    excerpt: 'Not every knock needs treatment — but some injuries heal better and faster with early physiotherapy.',
    cover: '',
    body:
      'Most minor bumps settle within a few days. But some signs mean you should get your injury checked early.\n\n## See a physiotherapist if you have\n- Swelling that does not settle after 48 hours\n- Pain that stops you walking, running or lifting normally\n- A joint that feels unstable or gives way\n- Pain that keeps coming back when you return to sport\n\n## Why early treatment helps\nEarly, guided movement helps tissues heal in the right way, keeps you fitter while you recover, and lowers the risk of the same injury happening again.\n\n*This article is general advice and not a substitute for a personal assessment.*',
  },
  {
    title: 'Knee arthritis: why exercise is still the best medicine',
    date: '2026-08-25',
    author: 'Dr. Anjali Menon',
    category: 'Arthritis',
    excerpt: 'It may sound surprising, but the right kind of exercise is one of the most effective treatments for knee arthritis.',
    cover: '',
    body:
      'Many people with knee arthritis avoid activity because they worry it will make things worse. In fact, the right exercise usually reduces pain and improves function.\n\n## How exercise helps\n- Stronger thigh and hip muscles take load off the knee joint\n- Movement keeps the joint lubricated and less stiff\n- Better balance reduces the risk of falls\n\n## Getting started safely\nStart with gentle exercises such as cycling, walking on level ground and simple strengthening, and build up gradually. A physiotherapist can create a plan that suits your knee and your lifestyle.\n\n*This article is general advice and not a substitute for a personal assessment.*',
  },
];

const branches = [
  {
    name: 'Anna Nagar (Main Clinic)',
    address: '12 Sample Street, 2nd Avenue,\nAnna Nagar, Chennai – 600040',
    phone: '+91 90000 00000',
    hours: 'Mon–Sat 8:00 AM – 8:00 PM · Sun 9:00 AM – 1:00 PM',
    mapEmbed: 'https://www.google.com/maps?q=Anna+Nagar,+Chennai&output=embed',
    mapLink: 'https://maps.google.com/?q=Anna+Nagar,+Chennai',
    image: '',
    description: 'Our main clinic with dedicated treatment rooms, an exercise studio and full electrotherapy unit.',
  },
  {
    name: 'Velachery',
    address: '45 Example Road, Near Sample Bus Stop,\nVelachery, Chennai – 600042',
    phone: '+91 90000 00001',
    hours: 'Mon–Sat 9:00 AM – 8:00 PM',
    mapEmbed: 'https://www.google.com/maps?q=Velachery,+Chennai&output=embed',
    mapLink: 'https://maps.google.com/?q=Velachery,+Chennai',
    image: '',
    description: 'A convenient neighbourhood clinic for sports rehab, back and neck pain, and post-surgery care.',
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
  gallery,
  posts,
  branches,
};
