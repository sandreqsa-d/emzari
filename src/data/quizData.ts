export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  topic: string;
  icon: string;
  questions: QuizQuestion[];
  badgeId: string;
  xpReward: number;
}

export const quizzes: Quiz[] = [
  {
    id: 'password-safety',
    title: 'Password Protector',
    description: 'Learn how to create super strong passwords that hackers can\'t crack!',
    topic: 'Password Safety',
    icon: '🔐',
    badgeId: 'password-pro',
    xpReward: 50,
    questions: [
      {
        id: 'ps1',
        question: 'Which password is the STRONGEST?',
        options: ['password123', 'MyDog2024', 'Tr0ub4dor&3', 'qwerty'],
        correctAnswer: 2,
        explanation: 'Tr0ub4dor&3 is strongest because it mixes uppercase, lowercase, numbers, and special characters. It doesn\'t use common words or patterns!',
        topic: 'Password Safety'
      },
      {
        id: 'ps2',
        question: 'How often should you share your password with friends?',
        options: ['Every day', 'Only best friends', 'Only family', 'Never!'],
        correctAnswer: 3,
        explanation: 'Never share your password with anyone except your parents! Even best friends might accidentally share it or get their devices hacked.',
        topic: 'Password Safety'
      },
      {
        id: 'ps3',
        question: 'What makes a password easy to guess?',
        options: ['Using your birthday', 'Using random letters', 'Using special symbols', 'Making it long'],
        correctAnswer: 0,
        explanation: 'Using your birthday makes passwords easy to guess because hackers can find this information on social media!',
        topic: 'Password Safety'
      },
      {
        id: 'ps4',
        question: 'Should you use the same password for all your accounts?',
        options: ['Yes, it\'s easier to remember', 'Only for game accounts', 'No, use different passwords', 'Only for email'],
        correctAnswer: 2,
        explanation: 'Always use different passwords! If a hacker gets one password, they could access ALL your accounts if you use the same one everywhere.',
        topic: 'Password Safety'
      },
      {
        id: 'ps5',
        question: 'What is a password manager?',
        options: ['A person who manages passwords', 'A safe app that stores passwords', 'A type of video game', 'A website'],
        correctAnswer: 1,
        explanation: 'A password manager is a safe app that remembers all your passwords for you. You only need to remember one master password!',
        topic: 'Password Safety'
      }
    ]
  },
  {
    id: 'phishing-detector',
    title: 'Phishing Fighter',
    description: 'Spot fake messages and emails that try to trick you!',
    topic: 'Phishing & Scams',
    icon: '🎣',
    badgeId: 'phishing-fighter',
    xpReward: 50,
    questions: [
      {
        id: 'ph1',
        question: 'You get an email saying "You won $1,000,000! Click here NOW!" What should you do?',
        options: ['Click immediately!', 'Share with friends first', 'Delete it - it\'s a scam', 'Give your address'],
        correctAnswer: 2,
        explanation: 'Delete it! Real prizes don\'t come from random emails. Scammers use exciting messages to trick you into clicking dangerous links.',
        topic: 'Phishing & Scams'
      },
      {
        id: 'ph2',
        question: 'What is "phishing"?',
        options: ['A fun fishing game', 'Catching real fish', 'Fake messages trying to steal info', 'A type of phone'],
        correctAnswer: 2,
        explanation: 'Phishing is when bad people send fake messages pretending to be someone else to steal your information or passwords!',
        topic: 'Phishing & Scams'
      },
      {
        id: 'ph3',
        question: 'A message says it\'s from "Amaz0n" (with a zero). Is this real?',
        options: ['Yes, looks official', 'Probably real', 'No, it\'s fake!', 'Need more info'],
        correctAnswer: 2,
        explanation: 'No! Scammers use tricky spellings like "Amaz0n" or "Netf1ix" to look real. Always check spelling carefully!',
        topic: 'Phishing & Scams'
      },
      {
        id: 'ph4',
        question: 'Your friend sends you a weird link you weren\'t expecting. What do you do?',
        options: ['Click it immediately', 'Ask your friend about it first', 'Share it with others', 'Download any files'],
        correctAnswer: 1,
        explanation: 'Ask your friend first! Their account might be hacked. Real friends will understand why you\'re checking before clicking.',
        topic: 'Phishing & Scams'
      },
      {
        id: 'ph5',
        question: 'Which website address looks SAFEST?',
        options: ['amaz0n-deals.sketchy.com', 'free-prizes.net/amazon', 'www.amazon.com', 'amazon.free-stuff.org'],
        correctAnswer: 2,
        explanation: 'www.amazon.com is the real Amazon website! Fake sites add extra words or use tricky spellings to fool you.',
        topic: 'Phishing & Scams'
      }
    ]
  },
  {
    id: 'privacy-guardian',
    title: 'Privacy Guardian',
    description: 'Learn what info to keep private and what\'s safe to share online!',
    topic: 'Online Privacy',
    icon: '🛡️',
    badgeId: 'privacy-guardian',
    xpReward: 50,
    questions: [
      {
        id: 'pr1',
        question: 'Which information is SAFE to share in an online game?',
        options: ['Your home address', 'Your school name', 'Your game username', 'Your phone number'],
        correctAnswer: 2,
        explanation: 'Only share your username! Never share your real address, school, or phone number with strangers online.',
        topic: 'Online Privacy'
      },
      {
        id: 'pr2',
        question: 'Someone online asks for a photo of you. What do you do?',
        options: ['Send it right away', 'Send an old photo', 'Say no and tell an adult', 'Ask for their photo first'],
        correctAnswer: 2,
        explanation: 'Always say no and tell a parent! Strangers online might not be who they say they are. Keep your photos private.',
        topic: 'Online Privacy'
      },
      {
        id: 'pr3',
        question: 'What is "private information"?',
        options: ['Your favorite color', 'Your full name and address', 'Your favorite game', 'Your pet\'s name'],
        correctAnswer: 1,
        explanation: 'Private information includes your full name, address, school, phone number, and birthday. Keep these secret from strangers!',
        topic: 'Online Privacy'
      },
      {
        id: 'pr4',
        question: 'Is it okay to post your location when on vacation?',
        options: ['Yes, always!', 'Only to close friends', 'Wait until you\'re back home', 'Share with everyone'],
        correctAnswer: 2,
        explanation: 'Wait until you\'re home! Posting your location tells everyone you\'re away, which could be unsafe.',
        topic: 'Online Privacy'
      },
      {
        id: 'pr5',
        question: 'Why should you use privacy settings on social media?',
        options: ['To get more followers', 'To control who sees your stuff', 'To post more often', 'They\'re not important'],
        correctAnswer: 1,
        explanation: 'Privacy settings let YOU decide who can see your posts and info. Always check your settings!',
        topic: 'Online Privacy'
      }
    ]
  },
  {
    id: 'safe-browsing',
    title: 'Safe Surfer',
    description: 'Navigate the internet safely and avoid dangerous downloads!',
    topic: 'Safe Browsing',
    icon: '🏄',
    badgeId: 'safe-surfer',
    xpReward: 50,
    questions: [
      {
        id: 'sb1',
        question: 'A popup says "Your computer has a virus! Download this NOW!" What do you do?',
        options: ['Download it fast!', 'Close the popup and tell an adult', 'Click to learn more', 'Share with friends'],
        correctAnswer: 1,
        explanation: 'Close it and tell an adult! These scary popups are tricks to make you download actual viruses.',
        topic: 'Safe Browsing'
      },
      {
        id: 'sb2',
        question: 'What does the lock symbol 🔒 in your browser mean?',
        options: ['The site is locked', 'The site is encrypted and safer', 'You need a password', 'The site is broken'],
        correctAnswer: 1,
        explanation: 'The lock means the website uses encryption to protect your information. Look for it when sharing sensitive info!',
        topic: 'Safe Browsing'
      },
      {
        id: 'sb3',
        question: 'You want to download a free game. Where is the SAFEST place?',
        options: ['Random website popup', 'Official app store', 'Email attachment', 'Unknown website'],
        correctAnswer: 1,
        explanation: 'Official app stores (like App Store or Google Play) check apps for safety. Random websites might have viruses!',
        topic: 'Safe Browsing'
      },
      {
        id: 'sb4',
        question: 'What should you do if a website asks for your credit card for a "free" game?',
        options: ['Enter the info', 'Ask a parent first', 'Use a fake number', 'Share with friends to split cost'],
        correctAnswer: 1,
        explanation: 'Always ask a parent! Real free games don\'t need credit cards. This could be a scam to steal money.',
        topic: 'Safe Browsing'
      },
      {
        id: 'sb5',
        question: 'What is malware?',
        options: ['A type of hardware', 'Bad software that hurts computers', 'A helpful program', 'A video game'],
        correctAnswer: 1,
        explanation: 'Malware is bad software (mal = bad) that can steal your info, break your computer, or spy on you!',
        topic: 'Safe Browsing'
      }
    ]
  }
];

export const badges = [
  {
    id: 'password-pro',
    name: 'Password Pro',
    description: 'Master of creating super strong passwords!',
    icon: '🔐',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'phishing-fighter',
    name: 'Phishing Fighter',
    description: 'Expert at spotting fake messages and scams!',
    icon: '🎣',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'privacy-guardian',
    name: 'Privacy Guardian',
    description: 'Protector of personal information!',
    icon: '🛡️',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'safe-surfer',
    name: 'Safe Surfer',
    description: 'Champion of safe internet browsing!',
    icon: '🏄',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'cyber-champion',
    name: 'Cyber Champion',
    description: 'Complete all quizzes to become the ultimate Cyber Champion!',
    icon: '🏆',
    color: 'from-yellow-400 to-amber-500'
  }
];
