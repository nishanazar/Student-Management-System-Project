import inquirer from "inquirer";
import chalk from "chalk";
//Create a Student Class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    //Create a method
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = "Rs. 10,000";
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log("=".repeat(60));
        console.log(chalk.green.bold(`Account Balance For ${this.name} : ${this.balance}`));
        console.log("=".repeat(60));
    }
    pay_fees(amount) {
        this.balance = `Rs. ${(parseInt(this.balance.replace(/\D+/g, "")) - amount).toString()}/-`;
        console.log("=".repeat(60));
        console.log(chalk.green.bold(`Rs.${amount}/- Fee paid successfully for ${this.name}`));
        console.log(chalk.green.bold(`Remaining Balance In Account : ${this.balance}`));
        console.log("=".repeat(60));
    }
    show_status() {
        console.log("=".repeat(60));
        console.log(chalk.yellow.bgRed(`********** View Status **********\n`));
        console.log(chalk.yellow(`Student ID: ${this.id}`));
        console.log(chalk.yellow(`Student Name: ${this.name}`));
        console.log(chalk.yellow(`Enrolled Course: ${this.courses}`));
        console.log(chalk.yellow(`Balance In Account: ${this.balance}`));
        console.log("=".repeat(60));
    }
}
//Create a Student Manager Class
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log("=".repeat(60));
        console.log(chalk.bold.green(`Student : ${name} added successfully. Student ID: ${student.id}`));
        console.log("=".repeat(60));
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log("=".repeat(60));
            console.log(chalk.bold.green(`${student.name} successfully enrolled in ${course} course.`));
            console.log("=".repeat(60));
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("\nStudent not found. Please enter a correct srudent ID\n");
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("\nStudent not found. Please enter a correct srudent ID\n");
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    find_student(student_id) {
        return this.students.find((std) => std.id === student_id);
    }
}
//Main function to RUN the program
async function main() {
    console.log("**********************************************");
    console.log(chalk.yellow.bgRed.bold("\t* Wellcome Student Management System  *"));
    console.log("**********************************************");
    let student_manager = new Student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option to proceed.",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "Student Balance In Account",
                    "Pay Fee",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        //Using Switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student name",
                    },
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course name",
                    },
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "Student Balance In Account":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fee":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    },
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.yellow.bold("Exiting..."));
                process.exit();
        }
    }
}
main();
