(async function() {

    const data = await fetch('./src/data.json');
    const resp = await data.json();
    
    let employees = resp;
    let selectedEmployeeId = employees[0].id;

    document.querySelector('.addEmployee__button').addEventListener('click', e => {
        document.querySelector('.modal').style.display = 'flex';
    })

    document.querySelector('.modal').addEventListener('click', e => {
        if(e.target.className === 'modal'){
            document.querySelector('.modal').style.display = 'none';
        }
    })

    const addEmployeeForm = document.querySelector('.addEmployee_form');
    // const dobInput = document.querySelector('.addEmployee_create--dob');
    // dobInput.max = `${new Date().getFullYear() - 18} - ${new Date().toISOString().slice(5, 10)}`;

    addEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(addEmployeeForm);
        const values = [...formData.entries()];
        
        let empData = {};
        values.forEach((val)=>{
            empData[val[0]] = val[1];
        });

        empData.id = employees[employees.length - 1].id + 1;
        empData.age = new Date().getFullYear - parseInt(empData.dob.slice(0, 4), 10);

        empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        employees.push(empData);

        renderList();
        addEmployeeForm.reset();
        document.querySelector('.modal').style.display = 'none';
    })

    document.querySelector('.employees__names--list').addEventListener('click',(e) => {
        if(e.target.tagName === 'SPAN' && selectedEmployeeId !== e.target.id){
            selectedEmployeeId = e.target.id;
            renderSelectedProfile(selectedEmployeeId);

            renderList(selectedEmployeeId);
        }
    })

    function renderList(id = 1001) {
        const names_list = document.querySelector(".employees__names--list");
        names_list.innerHTML = '';
        employees.forEach(person => {

            const span = document.createElement('SPAN');
            span.innerHTML = `${person.firstName} ${person.lastName} <i class="fa fa-times-circle"></i>`;
            span.setAttribute('id', person.id);
            span.classList.add('employee__list--item');

            if(id === Number(person.id)){
                span.classList.add('selected_employee_in_list');
            }
            names_list.append(span);
        });
    }

    function renderSelectedProfile(id) {
        
        var person = {}
        if (id === undefined){
            person = employees[0];
            selectedEmployeeId = person.id;
        } else {
            employees.forEach(item => {
                if( item.id === Number(id)) {
                    person = item;
                    selectedEmployeeId = person.id;
                    return;
                }
            });
        }

        const emp_info = document.querySelector('.employees__single--info')
        emp_info.innerHTML = "";

        let image = document.createElement('img');
        image.setAttribute('src', person.imageUrl);

        let employee_name = document.createElement('SPAN');
        employee_name.innerHTML = `${person.firstName} ${person.lastName} ${person.id}`;
        employee_name.classList.add('profile_name');
        
        let employee_address = document.createElement('SPAN');
        employee_address.innerHTML = `${person.address}`;
        employee_address.classList.add('profile_address');

        let employee_email = document.createElement('SPAN');
        employee_email.innerHTML = `${person.email}`;
        employee_email.classList.add('profile_email');

        let employee_contact = document.createElement('SPAN');
        employee_contact.innerHTML = `${person.contactNumber}`;
        employee_contact.classList.add('profile_contact');

        let employee_dob = document.createElement('SPAN');
        employee_dob.innerHTML = `${person.dob}`;
        employee_dob.classList.add('profile_dob');

        emp_info.append(image);
        emp_info.append(employee_name);
        emp_info.append(employee_address);
        emp_info.append(employee_email);
        emp_info.append(employee_contact);
        emp_info.append(employee_dob);

    }


    renderList();
    renderSelectedProfile();
})()