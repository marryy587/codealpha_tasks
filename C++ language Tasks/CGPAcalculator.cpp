#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    int numCourses;
    string courseName, grade;
    int creditHours;
    float gradePoint, totalCredits = 0, totalGradePoints = 0;
    float semesterGPA, previousCGPA, overallCGPA;
    int previousCredits;

    cout << "========== CGPA Calculator ==========\n";
    cout << "Enter number of courses taken in this semester: ";
    cin >> numCourses;

    string courseNames[100];
    string grades[100];
    int credits[100];
    float points[100];

    for (int i = 0; i < numCourses; i++) {
        cout << "\nEnter details for Course " << i + 1 << ":\n";

        cout << "Course name: ";
        cin >> courseName;

        cout << "Grade (A, B, C, D, F): ";
        cin >> grade;

        cout << "Credit hours: ";
        cin >> creditHours;

        if (grade == "A" || grade == "a")
            gradePoint = 4.0;
        else if (grade == "B" || grade == "b")
            gradePoint = 3.0;
        else if (grade == "C" || grade == "c")
            gradePoint = 2.0;
        else if (grade == "D" || grade == "d")
            gradePoint = 1.0;
        else
            gradePoint = 0.0;

        courseNames[i] = courseName;
        grades[i] = grade;
        credits[i] = creditHours;
        points[i] = gradePoint * creditHours;

        totalCredits += creditHours;
        totalGradePoints += points[i];
    }

    semesterGPA = totalGradePoints / totalCredits;

    cout << "\nEnter previous CGPA: ";
    cin >> previousCGPA;

    cout << "Enter total previous completed credit hours: ";
    cin >> previousCredits;

    overallCGPA = ((previousCGPA * previousCredits) + totalGradePoints) / (previousCredits + totalCredits);

    cout << "\n========== Result ==========\n";
    cout << left << setw(15) << "Course"
         << setw(10) << "Grade"
         << setw(15) << "Credit Hours"
         << setw(15) << "Grade Points" << endl;

    for (int i = 0; i < numCourses; i++) {
        cout << left << setw(15) << courseNames[i]
             << setw(10) << grades[i]
             << setw(15) << credits[i]
             << setw(15) << points[i] << endl;
    }

    cout << "\nTotal Credits: " << totalCredits << endl;
    cout << "Total Grade Points: " << totalGradePoints << endl;
    cout << fixed << setprecision(2);
    cout << "Semester GPA: " << semesterGPA << endl;
    cout << "Overall CGPA: " << overallCGPA << endl;

    return 0;
}