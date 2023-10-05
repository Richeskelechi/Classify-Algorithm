// Import The Student Data
import studentData from './data.js';
// Now you can use studentData as an array of objects
function classify(allstudent) {
    // Do Your Solution Inside Here...
    if (allstudent.length === 0)return { noOfGroups: 0 };
    let sortedStudent = sortByAge(allstudent)
    let group = groupStudents(sortedStudent)
    let finalGroup = groupedClass(group);
    return finalGroup
}
const groupedClass = (groupedStudents) => {
    const students = {noOfGroups: groupedStudents.length};
    for (let [index, group] of groupedStudents.entries()) {
        const groupNo = index + 1;
        const groupAges = group.map((member) => member.age);
        const sum = sumAges(groupAges);
        const oldest = Math.max(...groupAges);
        const groupObj = {
            members: group.map((member) => {
                return {
                    name: member.name,
                    age: member.age,
                    dob: member.dob,
                    regNo: member.regNo
                }
            }),
            oldest: oldest,
            sum: sum,
            regNos: group.map((member) => parseInt(member.regNo)).sort((a, b) => a - b)
        };
        if (!students.hasOwnProperty(`group${groupNo}`))students[`group${groupNo}`] = groupObj;
    }
    return students;
}
const sortByAge = (allStudents) => {
    for (let student of allStudents) {
        let studentAge = calculateAge(student.dob);
        student.age = studentAge;
    }
    return allStudents.sort((a, b) => a.age - b.age)
}
// Timestamp -> Age
// given a UTC format Timestamp, calculates the age of Student
const calculateAge = (dob) => {
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}
// ensures the difference in years of the ages of student in any particular group is not more than 5.
// Also ensures that the students in the group is not more than 3.
const validAgeDifferenceAndGroupLength = (oldStuAge, newStuAge, len) => {
    if(oldStuAge - newStuAge <= 5 && len <= 2) return true;
    return false
}
// sum the ages of group members
const sumAges = (groupAges) => {
    return groupAges.reduce((a, b) => { return a + b }, 0);
}
// groups students in sets with maximum of 3 in a set
const groupStudents = (sortedStudents) => {
    let grouped = [];
    let eachGroup = [];
    eachGroup.push(sortedStudents[0]);
    for (let i = 1; i < sortedStudents.length; i++) {
        const student = sortedStudents[i];
        if(validAgeDifferenceAndGroupLength(eachGroup[0].age, student.age, eachGroup.length)) {
            eachGroup.push(student);
        }else{
            grouped.push(eachGroup)
            eachGroup = [student]
        }
    }
    if(eachGroup.length > 0) grouped.push(eachGroup)
    sortedStudents = []
    eachGroup = []
    return grouped;
}
console.log(classify(studentData));

