class Employee {
  constructor(name, age) {
    if (this.constructor === Employee) {
      throw new Error("Cannot instantiate abstract class Employee");
    }
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
  }
}

class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.employeeType = "Part-Time";
    this.calculatePay();
  }

  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
  }
}

class Manager extends Employee {
  constructor(name, age, payRate) {
    super(name, age);
    this.payRate = payRate;
    this.employeeType = "Manager";
    this.calculatePay();
  }

  calculatePay() {
    this.annualSalary = this.payRate * 40 * 52 - 1000;
  }
}

class Main {
  constructor() {
    this.employees = [];
    this.addInitialEmployees();
    this.displayEmployees();
    this.displayMenu();
  }

  addInitialEmployees() {
    this.employees.push(new Manager("Alice", 45, 25));
    this.employees.push(new PartTime("Bob", 22, 15, 20));
    this.employees.push(new PartTime("Greg", 30, 12, 25));
  }

  displayMenu() {
    const menu = `
        Employee Tracker
        1. Add Employee
        2. Remove Employee
        3. Edit Employee
        4. Display Employees
        5. Exit
        `;
    const choice = prompt(menu + "\nChoose an option:");
    this.handleMenuChoice(choice);
  }
  handleMenuChoice(choice) {
    switch (choice) {
      case "1":
        this.addEmployee();
        break;
      case "2":
        this.removeEmployee();
        break;
      case "3":
        this.editEmployee();
        break;
      case "4":
        this.displayEmployees();
        this.displayMenu();
        break;
      case "5":
        console.log("Exiting...");
        return; // Exit without showing the menu again
      default:
        console.log("Invalid choice. Please try again.");
        this.displayMenu();
        break;
    }
  }

  addEmployee() {
    const input = prompt("Enter employee details (name, age, payRate, hours):");
    const [name, age, payRate, hours] = input.split(",");
    const ageNum = parseInt(age);
    const payRateNum = parseFloat(payRate);
    const hoursNum = parseInt(hours);
    let newEmployee;

    if (hoursNum >= 40) {
      newEmployee = new Manager(name, ageNum, payRateNum);
    } else {
      newEmployee = new PartTime(name, ageNum, payRateNum, hoursNum);
    }

    this.employees.push(newEmployee);
    this.displayEmployees();
    this.displayMenu();
  }

  removeEmployee() {
    const input = prompt("Enter employee number or name to remove:");
    if (isNaN(input)) {
      this.employees = this.employees.filter((emp) => emp.name !== input);
    } else {
      const index = parseInt(input) - 1;
      if (index >= 0 && index < this.employees.length) {
        this.employees.splice(index, 1);
      }
    }
    this.displayEmployees();
    this.displayMenu();
  }

  editEmployee() {
    const input = prompt("Enter employee number to edit:");
    const index = parseInt(input) - 1;
    if (index >= 0 && index < this.employees.length) {
      const newPayRate = parseFloat(prompt("Enter new pay rate:"));
      this.employees[index].payRate = newPayRate;
      this.employees[index].calculatePay();
    }
    this.displayEmployees();
    this.displayMenu();
  }

  displayEmployees() {
    console.clear();
    console.log("ID\tName\tSalary\thrs\tpay\tFT/PT");
    this.employees.forEach((emp, index) => {
      console.log(
        `${index + 1}\t${emp.name}\t$${emp.annualSalary}\t${emp.hours || 40}\t${
          emp.payRate
        }\t${emp.employeeType}`
      );
    });
  }
}

// IIFE to instantiate the Main class and start the application
(function () {
  console.log("Starting application...");
  new Main();
})();
