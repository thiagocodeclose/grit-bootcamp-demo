export const siteData = {
  gym: {
    name: 'GRIT Bootcamp',
    tagline: 'Military-Style Bootcamp · Outdoor & Indoor Training',
    location: 'Nashville, TN',
    address: '1801 Charlotte Ave, Nashville, TN 37203',
    phone: '(615) 555-0289',
    email: 'train@gritbootcamp.com',
  },
  stats: [
    { value: '280+', label: 'Members' },
    { value: '6 AM', label: 'First Formation' },
    { value: '60', label: 'Min Per Class' },
    { value: '0', label: 'Days Off' },
  ],
  pillars: [
    { icon: '💪', name: 'Strength', desc: 'Bodyweight, sandbags, sleds, and loaded carries. Functional strength built for real life.' },
    { icon: '🏃', name: 'Conditioning', desc: 'Sprints, circuits, and timed challenges. Cardio that actually translates to performance.' },
    { icon: '🤝', name: 'Accountability', desc: 'Your team shows up — so do you. The squad doesn\'t leave anyone behind.' },
    { icon: '🧠', name: 'Mental Toughness', desc: 'The hardest part of bootcamp is showing up. We train that too.' },
  ],
  classes: [
    { name: 'AM Formation', level: 'All Levels', duration: '60 min', desc: 'The flagship class. 6 AM start. Military cadence, team drills, and full-body conditioning circuits.' },
    { name: 'Strength Camp', level: 'Intermediate', duration: '60 min', desc: 'Loaded movements — sandbags, sleds, kettlebells. Strength-focused with conditioning finishers.' },
    { name: 'Outdoor Circuit', level: 'All Levels', duration: '60 min', desc: 'Rain or shine. Outdoor training using natural terrain, bodyweight, and minimal equipment.' },
    { name: 'Rookie Camp', level: 'Beginner', duration: '45 min', desc: 'Your on-ramp to GRIT. 4-week intro program with foundational movements and habit-building.' },
    { name: 'Spartan Prep', level: 'Advanced', duration: '75 min', desc: 'Race-specific preparation. Obstacle course simulation, carry conditioning, and mental edge training.' },
    { name: 'PM Hustle', level: 'All Levels', duration: '60 min', desc: 'Evening session for those who prefer to burn off the day. High-intensity with full team energy.' },
  ],
  pricing: [
    {
      name: 'Recruit',
      price: '$79',
      period: 'per month',
      features: ['4 classes / month', 'All class formats', 'Team community access', 'Progress tracking'],
      highlight: false,
    },
    {
      name: 'Soldier',
      price: '$129',
      period: 'per month',
      features: ['Unlimited classes', 'Priority AM Formation', 'Nutrition guidance', 'Spartan Prep included', 'Monthly fitness test'],
      highlight: true,
    },
    {
      name: 'Rookie Camp',
      price: '$149',
      period: 'one-time (4 weeks)',
      features: ['4-week intro program', '2x/week structured sessions', '1-on-1 start assessment', 'Transition to full membership'],
      highlight: false,
    },
  ],
};
