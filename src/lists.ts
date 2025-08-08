import { VideoItem } from "./Components/Playlist";

export const popupitems = {
  "Live Classes": [
    {
      question: "How can I access the online live classes for Semester exams?",
      answer:
        "Our top educators schedule online live classes for College Semester Exams on a regular basis. These classes are pre-scheduled so you can set your reminders for upcoming live classes by your favourite educators. Interact with the educator during the live class and ask for doubts. To access our online classes, please subscribe and start learning.",
    },
    {
      question: "Are all the semester exams video lectures available for free?",
      answer:
        "The video content will be free once the subscription has been taken. Live classes will only be accessible for our students - those who have taken subscriptions and joined our classes",
    },
    {
      question: "Can I ask for doubts during the live class?",
      answer:
        "Yes, Kepler provides one of the best live-class experiences to free learners as well. You can ask for doubts, interact with fellow students, and many more. You can use the doubts and solutions feature if you have any doubts after the live class. We also provide 1-on-1 mentorship to iconic students after live classes.",
    },
    {
      question: "Can I Watch the Live Classes later at my convenience?",
      answer:
        "All the free live classes are available to users as recorded classes later on. To view these free classes from your favourite educator, simply request in the respective chat group and the online class link will be provided to the student.",
    },
    {
      question: "How can I find online live classes for semester by subject?",
      answer:
        "All the free live classes as well as recorded lectures have a subject label on them. To view live classes by subject, you can scroll to the Popular subjects in Library and select the subject you want to watch the class for.",
    },
  ],
  Courses: [],
  Batches: [],
  "Top Educators": [],
  Practice: [],
  "Doubts and Solutions": [],
};

export const schedules = {
  college: [
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
  ],
  jee: [
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
    {
      month: "JANUARY",
      day: "9",
      title: "Introduction to LDRI",
      details: "Lession 1 • Shubhayan Ghosal • 8 pm",
      topic: "DI And LR",
    },
  ],
};

export const syllabus = {
  college: [
    "Indefinite Integrals",
    "Complex Analysis",
    "Convergence",
    "Divergence",
  ],
  jee: [],
};

export const playlistData: { [key: string]: VideoItem[] } = {
  college: [
    {
      id: 1,
      name: "Suraj Hua Maddham",
      time: "45:30",
      type: "youtube",
      link: "https://www.youtube.com/embed/4LqqQfMweuk?si=EJ9GC5PXToDSt96C",
      image: "https://img.youtube.com/vi/4LqqQfMweuk/maxresdefault.jpg",
      duration: "45:30",
      views: "12.5K",
      isCompleted: true,
      chapter: "Chapter 1: Calculus Basics",
      difficulty: "beginner",
    },
    {
      id: 2,
      name: "Banjara",
      time: "52:15",
      type: "youtube",
      link: "https://www.youtube.com/embed/6qwect3_VSE?si=CBIesZygtzEtoL0R",
      image: "https://img.youtube.com/vi/6qwect3_VSE/maxresdefault.jpg",
      duration: "52:15",
      views: "8.9K",
      isCompleted: false,
      chapter: "Chapter 2: Differential Equations",
      difficulty: "intermediate",
    },
    {
      id: 3,
      name: "Jindegi",
      time: "38:45",
      type: "youtube",
      link: "https://www.youtube.com/embed/zxmwOURAnQM?si=cDm1W9Sreo3eOAL0",
      image: "https://img.youtube.com/vi/zxmwOURAnQM/maxresdefault.jpg",
      duration: "38:45",
      views: "15.2K",
      isCompleted: false,
      isLocked: true,
      chapter: "Chapter 3: Linear Algebra",
      difficulty: "advanced",
    },
    {
      id: 4,
      name: "Dard",
      time: "67:22",
      type: "live",
      link: "https://www.youtube.com/embed/iufGu7FuQRY?si=uNg3h72--SO_8I87",
      image: "https://img.youtube.com/vi/iufGu7FuQRY/maxresdefault.jpg",
      duration: "67:22",
      views: "6.1K",
      isCompleted: false,
      chapter: "Chapter 4: Complex Analysis",
      difficulty: "advanced",
    },
    {
      id: 5,
      name: "Galliyan",
      time: "41:18",
      type: "youtube",
      link: "https://www.youtube.com/embed/8iASYJ0OpOg?si=wBaQqf0SeuhHCf7_",
      image: "https://img.youtube.com/vi/8iASYJ0OpOg/maxresdefault.jpg",
      duration: "41:18",
      views: "9.7K",
      isCompleted: false,
      chapter: "Chapter 5: Statistics",
      difficulty: "intermediate",
    },
    {
      id: 6,
      name: "Drive Image",
      time: "41:18",
      type: "drive",
      link: "https://drive.google.com/file/d/1KodGtJcCvcnWGtynCndoktXsOb1P5VQf/preview",
      image: "/Images/Mentorship.webp",
      duration: "41:18",
      views: "9.7K",
      isCompleted: false,
      chapter: "Chapter 5: Statistics",
      difficulty: "intermediate",
    },
  ],
  jee: [
    {
      id: 1,
      name: "JEE Physics - Mechanics Fundamentals",
      time: "55:30",
      type: "youtube",
      link: "https://www.youtube.com/embed/4LqqQfMweuk?si=EJ9GC5PXToDSt96C",
      image: "https://img.youtube.com/vi/4LqqQfMweuk/maxresdefault.jpg",
      duration: "55:30",
      views: "25.3K",
      isCompleted: true,
      chapter: "Physics - Mechanics",
      difficulty: "intermediate",
    },
    {
      id: 2,
      name: "JEE Physics - Mechanics Fundamentals",
      time: "55:30",
      type: "youtube",
      link: "https://www.youtube.com/embed/6qwect3_VSE?si=CBIesZygtzEtoL0R",
      image: "https://img.youtube.com/vi/6qwect3_VSE/maxresdefault.jpg",
      duration: "55:30",
      views: "25.3K",
      isCompleted: true,
      chapter: "Physics - Mechanics",
      difficulty: "intermediate",
    },
    {
      id: 3,
      name: "JEE Physics - Mechanics Fundamentals",
      time: "55:30",
      type: "youtube",
      link: "https://www.youtube.com/embed/zxmwOURAnQM?si=cDm1W9Sreo3eOAL0",
      image: "https://img.youtube.com/vi/zxmwOURAnQM/maxresdefault.jpg",
      duration: "55:30",
      views: "25.3K",
      isCompleted: true,
      chapter: "Physics - Mechanics",
      difficulty: "intermediate",
    },
    {
      id: 4,
      name: "JEE Physics - Mechanics Fundamentals",
      time: "55:30",
      type: "youtube",
      link: "https://www.youtube.com/embed/iufGu7FuQRY?si=uNg3h72--SO_8I87",
      image: "https://img.youtube.com/vi/iufGu7FuQRY/maxresdefault.jpg",
      duration: "55:30",
      views: "25.3K",
      isCompleted: true,
      chapter: "Physics - Mechanics",
      difficulty: "intermediate",
    },
    {
      id: 5,
      name: "JEE Physics - Mechanics Fundamentals",
      time: "55:30",
      type: "youtube",
      link: "https://www.youtube.com/embed/8iASYJ0OpOg?si=wBaQqf0SeuhHCf7_",
      image: "https://img.youtube.com/vi/8iASYJ0OpOg/maxresdefault.jpg",
      duration: "55:30",
      views: "25.3K",
      isCompleted: true,
      chapter: "Physics - Mechanics",
      difficulty: "intermediate",
    },
    {
      id: 6,
      name: "JEE Physics - Mechanics Fundamentals",
      time: "55:30",
      type: "youtube",
      link: "https://www.youtube.com/embed/8iASYJ0OpOg?si=wBaQqf0SeuhHCf7_",
      image: "https://img.youtube.com/vi/8iASYJ0OpOg/maxresdefault.jpg",
      duration: "55:30",
      views: "25.3K",
      isCompleted: true,
      chapter: "Physics - Mechanics",
      difficulty: "intermediate",
    },
  ],
};

export const defaultCodes: Record<string, string> = {
  cpp: `#include<bits/stdc++.h>
using namespace std;
  
int main(){
  ios::sync_with_stdio(false);
  cin.tie(NULL);
  // Write your code here

  return 0;
}`,
  java: `public class Main{
  public static void main(String args[]){
    // Write your code here

  }
}`,
  c: `#include<stdio.h>
int main(){
  // Write your code here

  return 0;
}`,
  python: `# Write your code here`,
  javascript: `// Write your code here`,
  typescript: `// Write your code here`,
  go: `package main
import "fmt"
func main(){
  // Write your code here
}`
}