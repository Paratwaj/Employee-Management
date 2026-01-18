# Employee Management System (React)

A simple and responsive Employee Management System built using **React JS, CSS, and Bootstrap**.  
This application allows an admin to manage employee details such as adding, editing, deleting, and viewing employee records with a clean and professional UI.

---

##  Features

- Admin Login (Local authentication)
- Dashboard with:
  - Total Employees
  - Active Employees
  - Inactive Employees
- Employee List Page
- Add Employee (Modal Popup)
- Edit Employee (Modal Popup)
- Delete Employee with confirmation
- Employee Status (Active / Inactive)
- Search employees by name
- Filter employees by gender and status
- Profile image upload & preview
- Responsive Sidebar with Hamburger Menu
- Fully responsive UI (Desktop, Tablet, Mobile)
- Print employee list
- Data stored using Local Storage

---

##  Tech Stack

- **Frontend:** React JS (Vite)
- **Styling:** CSS & Bootstrap
- **State Management:** React Hooks
- **Storage:** Browser Local Storage

---

##  Folder Structure (Simplified)

src/
├── components/
│   ├── Auth/
│   ├── Common/
│   ├── Employees/
│   └── Sidebar/
├── pages/
│   ├── Dashboard.jsx
│   └── Employees.jsx
├── utils/
│   ├── auth.js
│   └── storage.js
├── styles/
│   ├── MainLayout.css               
│   └── Sidebar.css       
├── App.jsx
├── main.jsx
└── index.css              

##  How to Run the Project

1. Clone or download the repository
2. Open the project directory
3. Install dependencies

```bash
npm install

## Run the application :
  npm run dev

## Open in Browser:
    Output - http://localhost:5173 like this 

## Responsive Design:
    Sidebar collapses into hamburger menu on smaller screens
    Modal content scrolls properly on mobile devices
    Layout adapts for desktop, tablet, and mobile views  

## Notes:
    This is a frontend-only project
    Data is stored using browser Local Storage
    Designed to meet assignment requirements with professional UI standards      
      

## Author
    Paratwaj E
    Frontend Developer (React JS)    