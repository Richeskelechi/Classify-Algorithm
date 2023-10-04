// Import The Student Data
import studentData from './data.js';


function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();
    if (
        currentDate.getMonth() < dob.getMonth() ||
        (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
    ) {
        return age - 1;
    }
    return age;
}
function classify(studentData) {
    const students = studentData.map(student => ({
        name: student.name,
        age: calculateAge(student.dob),
        regNo: parseInt(student.regNo),
    }));

    students.sort((a, b) => a.age - b.age);

    const groups = [];
    let currentGroup = [];

    for (const student of students) {
        let added = false;

        for (const group of groups) {
            const oldestAgeInGroup = group.members[group.members.length - 1].age;
            if (group.members.length < 3 && Math.abs(oldestAgeInGroup - student.age) <= 5) {
                group.members.push({
                    name: student.name,
                    age: student.age,
                });
                group.regNos.push(student.regNo);
                group.sum += student.age;
                group.members.sort((a, b) => a.age - b.age);
                added = true;
                break;
            }
        }

        if (!added) {
            currentGroup.push({
                name: student.name,
                age: student.age,
            });
            currentGroup.sort((a, b) => a.age - b.age);
            groups.push({
                members: currentGroup,
                oldest: currentGroup[currentGroup.length - 1].age,
                sum: currentGroup.reduce((acc, curr) => acc + curr.age, 0),
                regNos: currentGroup.map(member => member.regNo).filter(Boolean).sort(),
            });
            currentGroup = [];
        }
    }

    const output = {
        noOfGroups: groups.length,
    };

    groups.forEach((group, index) => {
        output[`group${index + 1}`] = {
            members: group.members,
            oldest: group.oldest,
            sum: group.sum,
            regNos: group.regNos,
        };
    });

    return output;
}


console.log(classify(studentData));

