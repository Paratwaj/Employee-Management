const EMPLOYEE_KEY = "employees";

export const getEmployees = () => {
  return JSON.parse(localStorage.getItem(EMPLOYEE_KEY)) || [];
};

export const saveEmployees = (employees) => {
  localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employees));
};
