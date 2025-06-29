# **Patient Management Portal \- Backend**

This repository contains the NestJS backend application for the Patient Management Portal. It provides a robust RESTful API to manage patient data, handle user authentication, and enforce role-based access control.

## **Table of Contents**

1. [Project Description](#bookmark=id.bk19aie233kp)  
2. [Features](#bookmark=id.3w4q4w3989yz)  
3. [Local Setup](#bookmark=id.rv1nqjleo5gh)  
   * [Prerequisites](#bookmark=id.5sdfd88w1rs)  
   * [Cloning the Repository](#bookmark=id.gy4ecsv2xnhy)  
   * [Installation](#bookmark=id.aroth96jxtzt)  
   * [Environment Variables](#bookmark=id.s5ffcngwtmex)  
   * [Running the Application Locally](#bookmark=id.cbemtjj5596a)  
4. [Docker Setup](#bookmark=id.8ekc656lrp5t)  
   * [Prerequisites](#bookmark=id.wm18q7hitdbk)  
   * [Building the Docker Image](#bookmark=id.8dc7tfeejp4i)  
   * [Running the Docker Container](#bookmark=id.ermfslsqxydz)

## **1\. Project Description**

The Patient Management Portal backend is a secure and scalable API built with NestJS, a progressive Node.js framework. It serves as the data and business logic layer for the frontend application, handling patient record management and user authentication. The API interacts with a database (e.g., PostgreSQL, MySQL, MongoDB – specify if known) to store and retrieve information securely, adhering to role-based access control policies.

## **2\. Features**

* **RESTful API:** Provides endpoints for CRUD (Create, Read, Update, Delete) operations on patient records and user accounts.  
* **Authentication:** JWT-based authentication for secure API access.  
* **Authorization:** Role-based access control (RBAC) to restrict actions based on user roles (e.g., Admin, Employee).  
* **Database Integration:** Connects to a database for data persistence.  
* **Validation:** Input validation using class-validator to ensure data integrity.  
* **Pagination:** Supports pagination for listing large datasets of patients.

## **3\. Local Setup**

### **Prerequisites**

Before you begin, ensure you have the following installed on your machine:

* **Node.js:** Version 20.x or higher (LTS recommended).  
* **npm** (Node Package Manager): Comes with Node.js.  
* **Git:** For cloning the repository.

### **Cloning the Repository**

1. **Clone the backend repository:**  
   git clone https://github.com/aahadaazar/patients-api  
   cd patients-api

### **Installation**

1. **Install backend dependencies:**  
   npm install

### **Environment Variables**

### **Running the Application Locally**

1. **Ensure your database is running** and accessible at the DATABASE\_URL specified in your .env file.  
2. **Run database migrations or seed data** if your project uses them (e.g., npm run migration:run, npm run seed). Refer to your backend's specific setup instructions for this.  
3. Start the backend server:  
   Open your terminal, navigate to the backend project directory, and run:  
   npm run start:dev  
   The API will usually be accessible at http://localhost:3000 (or the PORT specified in your .env)

## **4\. Docker Setup**

You can containerize the backend application using Docker for consistent development and deployment environments.

### **Docker Prerequisites**

* **Docker Desktop:** Installed and running on your system.

### **Building the Docker Image** 

1. **Navigate to the backend project directory in your terminal.**  
   cd patients-api

2. **Build the Docker image:**  
   docker compose up \--build  
   * This might take a few minutes the first time.

### **Running the Docker Container**

Once the image is built, you can run it:

docker run \-p 3000:3000 patient-portal-backend

* This command maps port 3000 on your host machine to port 3000 inside the container.  
* Your backend API should now be accessible at http://localhost:3000. Remember to update your frontend's VITE\_API\_BASE\_URL if necessary when running the backend via Docker (e.g., [http://localhost:3000](http://localhost:3000))  
* All the necessary documentation are handled via **SWAGGER**. This would be available on [http://localhost:3000](http://localhost:3000)/api