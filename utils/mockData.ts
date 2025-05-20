export const generateMockCommunityPosts = (lifePathNumber: number) => {
  const posts = [
    {
      id: '1',
      userName: 'Priya Sharma',
      lifePathNumber: lifePathNumber,
      postType: 'compatibility',
      content: "I just did a compatibility check with my boyfriend (life path 7) and we're a 98% match! The report explained so well why we connect intellectually. Anyone else with this combo?",
      likes: 156,
      comments: 42,
    },
    {
      id: '2',
      userName: 'Aditya Kumar',
      lifePathNumber: 3,
      postType: 'story',
      content: "Life path 3 people - has Numora been accurate for you? My career prediction said I'd excel in creative fields, and I just got a promotion at my design agency!",
      imageUrl: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      likes: 89,
      comments: 15,
    },
    {
      id: '3',
      userName: 'Meera Patel',
      lifePathNumber: 9,
      postType: 'compatibility',
      content: "My sister (life path 4) and I (life path 9) have such different approaches to life. The compatibility report explained our differences perfectly and suggested how we can better understand each other!",
      likes: 67,
      comments: 23,
    },
    {
      id: '4',
      userName: 'Raj Verma',
      lifePathNumber: 5,
      postType: 'story',
      content: "Used the business name advisor for my new startup. Changed from 'Quantum Tech' to 'Quantum Vista' and our investor pitch went amazingly well! Coincidence? 🤔",
      imageUrl: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      likes: 231,
      comments: 78,
    },
    {
      id: '5',
      userName: 'Kavita Reddy',
      lifePathNumber: lifePathNumber,
      postType: 'story',
      content: "Found someone with the same life path number as me! We have so many personality traits in common it's scary. Anyone else met their numerology twin?",
      likes: 45,
      comments: 12,
    }
  ];

  return posts;
};

export const generateMockDailyQuiz = () => {
  const questions = [
    {
      question: "What number represents creativity and self-expression?",
      options: ["1", "3", "7", "9"],
      correctAnswer: "3",
    },
    {
      question: "Which is considered a master number in numerology?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "11",
    },
    {
      question: "What does the life path number 5 represent?",
      options: ["Stability", "Leadership", "Freedom", "Harmony"],
      correctAnswer: "Freedom",
    },
    {
      question: "How do you calculate your life path number?",
      options: [
        "Add your birthdate digits until you get a single digit",
        "Add the vowels in your name",
        "Multiply your birth month and day",
        "Count the letters in your full name",
      ],
      correctAnswer: "Add your birthdate digits until you get a single digit",
    },
    {
      question: "Which planet is associated with the number 4?",
      options: ["Sun", "Moon", "Venus", "Uranus"],
      correctAnswer: "Uranus",
    },
  ];

  return questions[Math.floor(Math.random() * questions.length)];
};