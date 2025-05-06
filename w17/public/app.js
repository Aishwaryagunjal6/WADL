document.addEventListener('DOMContentLoaded', () => {
  const employeeContainer = document.getElementById('employeeContainer');
  
  fetch('/api/employees')
      .then(response => response.json())
      .then(employees => {
          employees.forEach(employee => {
              const employeeCard = document.createElement('div');
              employeeCard.className = 'employee-card';
              
              employeeCard.innerHTML = `
                  <img src="${employee.profileImage}" 
                       alt="${employee.name}" 
                       class="profile-image">
                  <div class="employee-info">
                      <h2>${employee.name}</h2>
                      <p><strong>Designation:</strong> ${employee.designation}</p>
                      <p><strong>Department:</strong> ${employee.department}</p>
                      <p><strong>Salary:</strong> $${employee.salary.toLocaleString()}</p>
                  </div>
              `;
              
              employeeContainer.appendChild(employeeCard);
          });
      })
      .catch(error => {
          console.error('Error fetching employees:', error);
          employeeContainer.innerHTML = '<p>Error loading employee data</p>';
      });
});