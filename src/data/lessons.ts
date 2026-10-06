import type { Lesson } from "./types";

export const lessons: Lesson[] = [
  // Course 1: Intro to Biblical Exegesis (crs-001)
  {
    id: "les-001",
    courseId: "crs-001",
    title: "Lesson 1: What is Exegesis?",
    description: "Introduction to historical-critical and literary methods of reading sacred scripture.",
    order: 1,
    contentType: "mixed",
    duration: "45 mins",
    hasQuiz: true,
    quizId: "quiz-001",
    content: `Exegesis is the critical explanation or interpretation of a text, especially of scripture. Derived from the Greek verb ἐξηγεῖσθαι ('to lead out'), exegesis requires us to discover what the original author intended to convey to their original audience.

Key principles of exegesis include:
1. **Historical Context**: Who wrote the text, when, and under what circumstances?
2. **Literary Context**: How does this passage fit into the chapter, book, and overall biblical canon?
3. **Linguistic Context**: What do the key original words (Hebrew, Aramaic, Greek) mean?
4. **Theological Application**: How does this timeless truth apply to contemporary believers?`,
    resources: [
      { id: "res-001", title: "Exegesis Handbook (PDF)", type: "pdf", url: "#" },
      { id: "res-002", title: "Greek Interlinear Tool", type: "link", url: "https://biblehub.com" },
    ],
  },
  {
    id: "les-002",
    courseId: "crs-001",
    title: "Lesson 2: Literary Genres in the Bible",
    description: "Understanding narrative, poetry, prophecy, wisdom, and apocalyptic writings.",
    order: 2,
    contentType: "text",
    duration: "40 mins",
    hasQuiz: false,
    content: `Scripture is not a single book, but a library of 66 books written in various genres. Interpreting a Psalm requires a different set of rules than interpreting a Paul epistle or an OT law code.

Genres include:
- Historical Narrative (e.g. Genesis, Acts)
- Hebrew Poetry & Wisdom (e.g. Psalms, Proverbs)
- Prophecy (e.g. Isaiah, Amos)
- Gospel (e.g. Mark, John)
- Epistles (e.g. Romans, Ephesians)
- Apocalyptic (e.g. Daniel, Revelation)`,
    resources: [{ id: "res-003", title: "Guide to Biblical Genres", type: "pdf", url: "#" }],
  },
  {
    id: "les-003",
    courseId: "crs-001",
    title: "Lesson 3: Historical & Cultural Context",
    description: "Reconstructing the Ancient Near East and Greco-Roman worlds.",
    order: 3,
    contentType: "mixed",
    duration: "50 mins",
    hasQuiz: true,
    quizId: "quiz-002",
    content: `To hear God's word as the first hearers heard it, we must understand their world. We investigate Ancient Near Eastern covenants, Greco-Roman honor-shame dynamics, and Jewish temple ritual life.`,
    resources: [{ id: "res-004", title: "Cultural Background Study Notes", type: "document", url: "#" }],
  },
  {
    id: "les-004",
    courseId: "crs-001",
    title: "Lesson 4: Word Studies & Translation Principles",
    description: "Avoiding word-study fallacies and choosing faithful translation strategies.",
    order: 4,
    contentType: "video",
    duration: "35 mins",
    hasQuiz: false,
    content: `Learn how to avoid the root fallacy, overload fallacy, and illegitimate totality transfer when doing Hebrew and Greek word studies.`,
    resources: [],
  },
  {
    id: "les-005",
    courseId: "crs-001",
    title: "Lesson 5: Synthesizing & Application",
    description: "Bridging the gap between the ancient world and the modern church.",
    order: 5,
    contentType: "text",
    duration: "45 mins",
    hasQuiz: false,
    content: `Moving from 'What it meant' to 'What it means'. Formulating timeless biblical principles and applying them with pastoral wisdom.`,
    resources: [],
  },

  // Course 2: Synoptic Gospels (crs-002)
  {
    id: "les-006",
    courseId: "crs-002",
    title: "Lesson 1: The Synoptic Problem",
    description: "Exploring the literary relationship between Matthew, Mark, and Luke.",
    order: 1,
    contentType: "mixed",
    duration: "50 mins",
    hasQuiz: true,
    quizId: "quiz-003",
    content: `The term 'Synoptic' comes from Greek for 'seeing together'. Matthew, Mark, and Luke share striking similarities in wording and structure. We examine the Two-Source Hypothesis (Markian Priority & Q source).`,
    resources: [{ id: "res-005", title: "Synoptic Comparison Chart", type: "pdf", url: "#" }],
  },
];
