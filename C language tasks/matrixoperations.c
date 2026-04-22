#include <stdio.h>

#define MAX 10

void inputMatrix(int matrix[MAX][MAX], int rows, int cols);
void displayMatrix(int matrix[MAX][MAX], int rows, int cols);
void addMatrices(int a[MAX][MAX], int b[MAX][MAX], int result[MAX][MAX], int rows, int cols);
void multiplyMatrices(int a[MAX][MAX], int b[MAX][MAX], int result[MAX][MAX], int r1, int c1, int c2);
void transposeMatrix(int matrix[MAX][MAX], int transpose[MAX][MAX], int rows, int cols);

int main() {
    int choice;
    int a[MAX][MAX], b[MAX][MAX], result[MAX][MAX], transpose[MAX][MAX];
    int r1, c1, r2, c2;

    printf("===== Matrix Operations Program =====\n");
    printf("1. Matrix Addition\n");
    printf("2. Matrix Multiplication\n");
    printf("3. Matrix Transpose\n");
    printf("Enter your choice: ");
    scanf("%d", &choice);

    switch (choice) {
        case 1:
            printf("\nEnter rows and columns of first matrix: ");
            scanf("%d %d", &r1, &c1);

            printf("Enter rows and columns of second matrix: ");
            scanf("%d %d", &r2, &c2);

            if (r1 != r2 || c1 != c2) {
                printf("Matrix addition is not possible. Both matrices must have same dimensions.\n");
            } else {
                printf("\nEnter elements of first matrix:\n");
                inputMatrix(a, r1, c1);

                printf("Enter elements of second matrix:\n");
                inputMatrix(b, r2, c2);

                addMatrices(a, b, result, r1, c1);

                printf("\nResult of Matrix Addition:\n");
                displayMatrix(result, r1, c1);
            }
            break;

        case 2:
            printf("\nEnter rows and columns of first matrix: ");
            scanf("%d %d", &r1, &c1);

            printf("Enter rows and columns of second matrix: ");
            scanf("%d %d", &r2, &c2);

            if (c1 != r2) {
                printf("Matrix multiplication is not possible. Columns of first matrix must equal rows of second matrix.\n");
            } else {
                printf("\nEnter elements of first matrix:\n");
                inputMatrix(a, r1, c1);

                printf("Enter elements of second matrix:\n");
                inputMatrix(b, r2, c2);

                multiplyMatrices(a, b, result, r1, c1, c2);

                printf("\nResult of Matrix Multiplication:\n");
                displayMatrix(result, r1, c2);
            }
            break;

        case 3:
            printf("\nEnter rows and columns of matrix: ");
            scanf("%d %d", &r1, &c1);

            printf("Enter elements of matrix:\n");
            inputMatrix(a, r1, c1);

            transposeMatrix(a, transpose, r1, c1);

            printf("\nOriginal Matrix:\n");
            displayMatrix(a, r1, c1);

            printf("\nTranspose Matrix:\n");
            displayMatrix(transpose, c1, r1);
            break;

        default:
            printf("Invalid choice.\n");
    }

    return 0;
}

void inputMatrix(int matrix[MAX][MAX], int rows, int cols) {
    int i, j;
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            printf("Enter element [%d][%d]: ", i, j);
            scanf("%d", &matrix[i][j]);
        }
    }
}

void displayMatrix(int matrix[MAX][MAX], int rows, int cols) {
    int i, j;
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            printf("%d\t", matrix[i][j]);
        }
        printf("\n");
    }
}

void addMatrices(int a[MAX][MAX], int b[MAX][MAX], int result[MAX][MAX], int rows, int cols) {
    int i, j;
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
}

void multiplyMatrices(int a[MAX][MAX], int b[MAX][MAX], int result[MAX][MAX], int r1, int c1, int c2) {
    int i, j, k;

    for (i = 0; i < r1; i++) {
        for (j = 0; j < c2; j++) {
            result[i][j] = 0;
            for (k = 0; k < c1; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
}

void transposeMatrix(int matrix[MAX][MAX], int transpose[MAX][MAX], int rows, int cols) {
    int i, j;
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            transpose[j][i] = matrix[i][j];
        }
    }
}