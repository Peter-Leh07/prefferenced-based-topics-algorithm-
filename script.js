/*1. Úloha: Optimálne rozdelenie študentov na seminárne skupiny
Popis problému: Máme nnn študentov, každý má zoznam preferovaných tém (napr. téma A, B, C...), zoradený podľa preferencie. Každá téma má kapacitu (maximálny počet študentov). Cieľom je priradiť každému študentovi jednu tému tak, aby sa:
•	maximalizoval celkový počet spokojných študentov (t.j. tých, ktorí dostali jednu zo svojich top 3 preferencií),
•	rešpektovali kapacitné limity tém,
•	zabránilo tomu, aby niektorá téma zostala prázdna, ak sa dá obsadiť.
Očakávané algoritmické aspekty:
•	stabilné párovanie (variácia Stable Marriage)
•	prioritné radenie podľa preferencií
•	filtrovanie na základe kapacity
•	výber najlepšej voľby z obmedzených možností
*/
const students = [
    {
      name: "Anna",
      preferences: [
        "Umelá inteligencia v zdravotníctve",
        "Etické dilemy autonómnych vozidiel",
        "Blockchain vo verejnej správe"
      ],
      submittedAt: "2025-04-30T08:15:00Z"
    },
    {
      name: "Branislav",
      preferences: [
        "Etické dilemy autonómnych vozidiel",
        "Umelá inteligencia v zdravotníctve",
        "Analýza sentimentu v sociálnych médiách"
      ],
      submittedAt: "2025-04-30T08:17:42Z"
    },
    {
      name: "Cyril",
      preferences: ["Analýza sentimentu v sociálnych médiách"],
      submittedAt: "2025-04-30T08:20:13Z"
    },
    {
      name: "Dominika",
      preferences: [
        "Umelá inteligencia v zdravotníctve",
        "Etické dilemy autonómnych vozidiel"
      ],
      submittedAt: "2025-04-30T08:23:05Z"
    },
    {
      name: "Eva",
      preferences: [
        "Etické dilemy autonómnych vozidiel",
        "Blockchain vo verejnej správe"
      ],
      submittedAt: "2025-04-30T08:26:10Z"
    },
    {
      name: "Filip",
      preferences: [
        "Analýza sentimentu v sociálnych médiách",
        "Blockchain vo verejnej správe"
      ],
      submittedAt: "2025-04-30T08:29:44Z"
    },
    {
      name: "Gabriela",
      preferences: ["Umelá inteligencia v zdravotníctve"],
      submittedAt: "2025-04-30T08:32:11Z"
    }
  ];
  
  const topics = {
    "Umelá inteligencia v zdravotníctve": { capacity: 3, students: [] },
    "Etické dilemy autonómnych vozidiel": { capacity: 1, students: [] },
    "Blockchain vo verejnej správe": { capacity: 2, students: [] },
    "Analýza sentimentu v sociálnych médiách": { capacity: 1, students: [] }
  };
  
  const studentsWithoutTopic = [];
  
  const getOrderBySubmittedTime = (someStudents) => {
    return someStudents.sort(
      (a, b) => new Date(a.submittedAt) - new Date(b.submittedAt)
    );
  };
  
  const getTopicForStudents = (someStudents, someTopics) => {
    let studentsForFilter = [...someStudents];
    let studentsForIteration = [...someStudents];
    for (let i = 0; i < 3; i++) {
      studentsForIteration.forEach((student) => {
        if (i >= student.preferences.length) return;
        const topicKey = student.preferences[i];
        if (!someTopics[topicKey]) return;
        if (someTopics[topicKey].capacity > 0) {
          someTopics[topicKey].students.push(student.name);
          someTopics[topicKey].capacity--;
          student.assignedTopic = topicKey;
          studentsForFilter = studentsForFilter.filter(
            (s) => s.name !== student.name
          );
        } else if (i === student.preferences.length - 1) {
          studentsWithoutTopic.push(student);
        }
      });
      studentsForIteration = studentsForFilter;
    }
  };
  
  const getTopicForOthers = (someTopics, someStudentsWithoutTopic) => {
    for (const topicKey in someTopics) {
      const topic = someTopics[topicKey];
      while (topic.capacity > 0 && someStudentsWithoutTopic.length > 0) {
        const student = someStudentsWithoutTopic.shift();
        topic.students.push(student.name);
        topic.capacity--;
        student.assignedTopic = topicKey;
      }
    }
  };
  const topicPrefferenceAlgorithm = () => {
    const orderedStudents =  getOrderBySubmittedTime(students)
    getTopicForStudents(orderedStudents , topics)
    getTopicForOthers(topics , students , studentsWithoutTopic)
    console.log(students ,topics)
}
 

export default topicPrefferenceAlgorithm();
