#include <iostream>
#include <fstream>
#include <string>
using namespace std;

// Function to check if username already exists
bool isUserExists(string username) {
    ifstream file("users.txt");
    string u, p;

    while (file >> u >> p) {
        if (u == username) {
            return true;
        }
    }
    return false;
}

// Registration function
void registerUser() {
    string username, password;

    cout << "\n=== Registration ===\n";
    cout << "Enter username: ";
    cin >> username;

    if (isUserExists(username)) {
        cout << "Error: Username already exists!\n";
        return;
    }

    cout << "Enter password: ";
    cin >> password;

    // Basic validation
    if (username.length() < 3 || password.length() < 3) {
        cout << "Error: Username and password must be at least 3 characters long.\n";
        return;
    }

    ofstream file("users.txt", ios::app);
    file << username << " " << password << endl;
    file.close();

    cout << "Registration successful!\n";
}

// Login function
void loginUser() {
    string username, password;
    bool found = false;

    cout << "\n=== Login ===\n";
    cout << "Enter username: ";
    cin >> username;

    cout << "Enter password: ";
    cin >> password;

    ifstream file("users.txt");
    string u, p;

    while (file >> u >> p) {
        if (u == username && p == password) {
            found = true;
            break;
        }
    }

    if (found) {
        cout << "Login successful! Welcome " << username << "!\n";
    } else {
        cout << "Error: Invalid username or password.\n";
    }
}

// Main menu
int main() {
    int choice;

    do {
        cout << "\n===== Login & Registration System =====\n";
        cout << "1. Register\n";
        cout << "2. Login\n";
        cout << "3. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                registerUser();
                break;
            case 2:
                loginUser();
                break;
            case 3:
                cout << "Exiting program...\n";
                break;
            default:
                cout << "Invalid choice!\n";
        }

    } while (choice != 3);

    return 0;
}