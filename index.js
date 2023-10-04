// Import The Student Data
import studentData from './data.js';

// Now you can use studentData as an array of objects
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  }


function classify(student) {
    // Do Your Solution Inside Here...
    // Step 1: Calculate ages and sort students
  const students = studentData.map(student => ({
    name: student.name,
    age: calculateAge(student.dob),
    regNo: parseInt(student.regNo),
  }));
  students.sort((a, b) => a.age - b.age || a.regNo - b.regNo);

  // Step 2: Create groups
  const groups = [];
  let currentGroup = [];
  let currentGroupMaxAge = -1;

  for (const student of students) {
    if (
      currentGroup.length >= 3 ||
      (currentGroup.length > 0 && student.age - currentGroup[0].age > 5)
    ) {
      // Start a new group
      groups.push(currentGroup);
      currentGroup = [];
      currentGroupMaxAge = -1;
    }
    currentGroup.push(student);
    currentGroupMaxAge = Math.max(currentGroupMaxAge, student.age);
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  // Step 3: Calculate group information and create output
  const output = {
    noOfGroups: groups.length,
  };

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    output[`group${i + 1}`] = {
      members: group.map(student => ({
        name: student.name,
        age: student.age,
      })),
      oldest: currentGroupMaxAge,
      sum: group.reduce((sum, student) => sum + student.age, 0),
      regNos: group.map(student => student.regNo).sort((a, b) => a - b),
    };
  }

  return output;
}



console.log(classify(studentData));

