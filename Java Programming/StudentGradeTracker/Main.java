import java.util.Scanner;

public class Main {

    static String[] names = new String[100];
    static int[] marks = new int[100];
    static int count = 0;

    // Grade function
    public static String getGrade(int marks) {
        if (marks >= 90) return "A";
        else if (marks >= 80) return "B";
        else if (marks >= 70) return "C";
        else if (marks >= 60) return "D";
        else return "F";
    }

    // Add student
    public static void addStudent(Scanner input) {
        System.out.print("Enter student name: ");
        names[count] = input.nextLine();

        int m;
        while (true) {
            System.out.print("Enter marks (0-100): ");
            m = input.nextInt();
            if (m >= 0 && m <= 100) break;
            System.out.println("Invalid marks! Try again.");
        }
        input.nextLine();

        marks[count] = m;
        count++;

        System.out.println("✅ Student added successfully!\n");
    }

    // View report
    public static void viewReport() {
        if (count == 0) {
            System.out.println("No data available.\n");
            return;
        }

        int sum = 0;
        int highest = marks[0];
        int lowest = marks[0];

        System.out.println("\n========== STUDENT REPORT ==========");
        System.out.printf("%-15s %-10s %-10s\n", "Name", "Marks", "Grade");

        for (int i = 0; i < count; i++) {
            sum += marks[i];

            if (marks[i] > highest) highest = marks[i];
            if (marks[i] < lowest) lowest = marks[i];

            System.out.printf("%-15s %-10d %-10s\n",
                    names[i], marks[i], getGrade(marks[i]));
        }

        double average = (double) sum / count;

        System.out.println("\n----------- SUMMARY -----------");
        System.out.println("Average: " + average);
        System.out.println("Highest: " + highest);
        System.out.println("Lowest: " + lowest + "\n");
    }

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        while (true) {
            System.out.println("===== STUDENT GRADE TRACKER =====");
            System.out.println("1. Add Student");
            System.out.println("2. View Report");
            System.out.println("3. Exit");
            System.out.print("Choose option: ");

            int choice = input.nextInt();
            input.nextLine();

            switch (choice) {
                case 1:
                    addStudent(input);
                    break;

                case 2:
                    viewReport();
                    break;

                case 3:
                    System.out.println("Exiting program...");
                    input.close();
                    return;

                default:
                    System.out.println("Invalid choice!\n");
            }
        }
    }
}