# 📦 Sports Line Management System

### 👤 Developer Information

**Name:** → Juan Esteban Garzón Lujan.

**Clan:** → Linus.

---

### 🧩 Project Description

The company **Sports Line** aims to optimize its order management process, which is currently done manually using spreadsheets.  
This system seeks to **automate and digitize the management of customers, products and delivery orders**, reducing errors and improving traceability throughout the logistics process.

The backend has been developed using **Node.js**, **Express**, **TypeScript**, **Sequelize (PostgreSQL)** and **JWT** for user authentication.

---

### 🚀 Project Objective

Implement a **REST API** that allows:
- Register customers (ID, name, email).  
- Create delivery orders with the requested products. 
- Consult the order history of each customer.

---

### ⚙️ Technologies Used

- **Node.js + Express** → Main backend framework.  
- **TypeScript** → Static typing for better maintainability.  
- **Sequelize ORM** → PostgreSQL database management.  
- **JWT (JSON Web Token)** → Authentication and role control.  
- **Docker** → Isolated and reproducible development environment.  
- **PostgreSQL** → Relational database.

---

### 🧠 System Requirements

Before getting started, make sure you have the following installed:

- **Node.js** (version 18 or higher)  
- **npm** (v8 or higher)  
- **PostgreSQL** (v13 or higher)  
- **Docker** (optional, for an isolated development environment)

---

### 🚶 Steps to run the system

**Steps to take into account that already there is one database local created:**

- Open the folder or address where you want to have the project.
- Right click inside the folder and open the option: “Open by terminal”.
- Type the following command: git clone https://github.com/EsstebanG/sports-line
- Open the folder that was created with Visual Studio Code, or enter it, right click, select “Open by terminal” and execute the command: code .
- In the options of the upper zone of Visual Studio Code, you should click on the option “Terminal” --> “New Terminal”. 
- In this terminal that opened you must execute the command: npm run dev
- And you will be able to open Postman or Thunder Client (Visual Studio Extension) to make your requests such as: GET - http://localhost:3001/users

**In case you do not have the local database before you must do these steps:**

- You must have PostgreSQL downloaded. If you don't have it yet, download it here: https://www.postgresql.org/
- Open the terminal on your computer and type the command: sudo -i -u postgres (Linux) or open the “SQL Shell” terminal on windows.
- For Windows: After opening the terminal you should create the database with CREATE DATABASE database_name and then type  \c database_name.
- Once connected to the database, you will have to execute one by one the commands that exist in the file called: sports_line.sql
- Then you will have your local database ready to work. Don't forget to set your environment variables to your needs to work in the .env file.

**Good Luck!**