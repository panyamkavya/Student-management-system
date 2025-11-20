function fetchStudents() {
    fetch('http://localhost:8080/api/students')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#studentsTable tbody');
            tbody.innerHTML = '';
            data.forEach(student => {
                tbody.innerHTML += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.age}</td>
                    <td>
                        <button onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>`;
            });
        });
}

function addStudent() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = parseInt(document.getElementById("age").value);
    fetch('http://localhost:8080/api/students', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, age})
    })
    .then(() => { fetchStudents(); });
}

function deleteStudent(id) {
    fetch(`http://localhost:8080/api/students/${id}`, { method: 'DELETE' })
        .then(() => { fetchStudents(); });
}

window.onload = fetchStudents;
