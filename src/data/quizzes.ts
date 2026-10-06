import type { Quiz } from "./types";

export const quizzes: Quiz[] = [
  {
    id: "quiz-001",
    lessonId: "les-001",
    courseId: "crs-001",
    title: "Quiz 1: Foundations of Exegesis",
    subject: "Bible Studies",
    questionCount: 4,
    questions: [
      {
        id: "q-001",
        question: "What does the Greek root verb 'ἐξηγεῖσθαι' (exēgeisthai) literally mean?",
        options: ["To write down", "To lead out", "To translate", "To sing praises"],
        correctAnswer: 1,
      },
      {
        id: "q-002",
        question: "Which of the following best describes the difference between exegesis and eisegesis?",
        options: [
          "Exegesis uses original languages; eisegesis uses English",
          "Exegesis extracts meaning from text; eisegesis reads modern bias into text",
          "Exegesis is for Old Testament; eisegesis is for New Testament",
          "There is no difference between the two terms",
        ],
        correctAnswer: 1,
      },
      {
        id: "q-003",
        question: "Why is historical context critical when interpreting biblical epistles?",
        options: [
          "Epistles were written to specific communities with specific historical situations",
          "Historical context determines the page count of the letter",
          "It helps calculate the exact date of Christ's return",
          "Historical context is actually optional in biblical interpretation",
        ],
        correctAnswer: 0,
      },
      {
        id: "q-004",
        question: "What is the first step in performing a biblical word study?",
        options: [
          "Consult an English dictionary",
          "Identify the original Hebrew or Greek term and its occurrences across scripture",
          "Choose your favorite translation",
          "Memorize the verse in Latin",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "quiz-002",
    lessonId: "les-003",
    courseId: "crs-001",
    title: "Quiz 2: Historical & Cultural Context",
    subject: "Bible Studies",
    questionCount: 3,
    questions: [
      {
        id: "q-005",
        question: "Which cultural dynamic was paramount in first-century Mediterranean society?",
        options: ["Democracy & voting", "Honor & Shame", "Industrial capitalism", "Feudalism"],
        correctAnswer: 1,
      },
      {
        id: "q-006",
        question:
          "What was the dominant language of commerce and culture across the Greco-Roman world during the NT era?",
        options: ["Hebrew", "Koine Greek", "Latin", "Aramaic"],
        correctAnswer: 1,
      },
      {
        id: "q-007",
        question: "What Jewish sect was known for strictly preserving oral tradition and purity laws?",
        options: ["Sadducees", "Pharisees", "Essenes", "Zealots"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "quiz-003",
    lessonId: "les-006",
    courseId: "crs-002",
    title: "Quiz 3: The Synoptic Problem",
    subject: "Scripture",
    questionCount: 3,
    questions: [
      {
        id: "q-008",
        question: "Which gospels constitute the 'Synoptic Gospels'?",
        options: ["Matthew, Mark, Luke", "Matthew, Mark, John", "Luke, John, Acts", "Genesis, Exodus, Leviticus"],
        correctAnswer: 0,
      },
      {
        id: "q-009",
        question: "In the Two-Source Hypothesis, what is 'Q' (Quelle)?",
        options: [
          "A hypothetical collection of Jesus' sayings shared by Matthew and Luke",
          "The Gospel of Mark",
          "The Old Testament Greek Septuagint",
          "The Book of Revelation",
        ],
        correctAnswer: 0,
      },
      {
        id: "q-010",
        question: "Which gospel is widely believed by modern scholars to have been written first?",
        options: ["Matthew", "Mark", "Luke", "John"],
        correctAnswer: 1,
      },
    ],
  },
];
