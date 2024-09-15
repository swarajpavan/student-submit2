const cl = console.log;

const stdForm = document.getElementById("stdForm");
const stdform = document.getElementById("stdform");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");
let stdArr = [];

uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

const templatingOfStd = (arr) => {
    let result = ``;
    arr.forEach((std, i) => {
        result += `
                <tr id="${std.stdId}">
                    <td>${i + 1}</td>
                    <td>${std.fname}</td>
                    <td>${std.lname}</td>
                    <td>${std.email}</td>
                    <td>${std.contact}</td>
                    <td><i class="fa-solid fa-pen-to-square fa-2x text-primary"></i></td>
                    <td><i class="fa-solid fa-trash-can fa-2x text-danger"></i></td>
                </tr>
                `
    });
    stdform.innerHTML = result;
}

if (localStorage.getItem("stdArr")) {
    stdArr = JSON.parse(localStorage.getItem("stdArr"));
    templatingOfStd(stdArr)
}

const onStdAdd = (eve) => {
    eve.preventDefault();
    let newStd = {
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        stdId: uuid()
    }
    cl(newStd);
    stdArr.unshift(newStd);
    localStorage.setItem("stdArr", JSON.stringify(stdArr));
    // templatingOfStd(stdArr);
    let tr = document.createElement("tr");
    tr.id = newStd.stdId;
    tr.innerHTML = `
                    <td>${1}</td>
                    <td>${newStd.fname}</td>
                    <td>${newStd.lname}</td>
                    <td>${newStd.email}</td>
                    <td>${newStd.contact}</td>
                    <td><i class="fa-solid fa-pen-to-square fa-2x text-success"></i></td>
                    <td><i class="fa-solid fa-trash-can fa-2x text-danger"></i></td>
            `;
    stdform.prepend(tr);
    let allTr = [...stdform.children]
    cl(allTr)
    for (let i = 0; i < stdArr.length; i++) {
        cl(i)
        allTr[i].firstElementChild.innerHTML = i + 1;
    }
    eve.target.reset();
}




stdForm.addEventListener("submit", onStdAdd)