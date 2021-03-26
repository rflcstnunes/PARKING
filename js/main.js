document.getElementById('form').addEventListener('submit', registerCar);

function registerCar(e) {
    // console.log('Hey');
    var modelCar = document.getElementById('modelVehicle').value;
    var boardCar = document.getElementById('licenseVehicle').value;
    var time = new Date();

    if (!modelCar && !boardCar) {
        alert("please complete the blank fields.");
        return false;
    }
    
    car = {
        model: modelCar,
        license: boardCar,
        hour: time.getHours(),
        minutes: time.getMinutes()
    }

    /* 
    localStorage.setItem('');
    localStorage.getItem('');
    localStorage.removeItem('');
    */

    if (localStorage.getItem('parking') == null) {
        var cars = [];
        cars.push(car);
        localStorage.setItem('parking', JSON.stringify(cars));
    } else {
        var cars = JSON.parse(localStorage.getItem('parking'));
        cars.push(car);
        localStorage.setItem('parking', JSON.stringify(cars));
    }

    // console.log(car);

    // console.log(modelCar, boardCar);

    document.getElementById('form').reset();

    showParking();

    e.preventDefault(); // bloqueia que o evento aconteça
}

function deleteVehicle(boardCar) {
    // console.log(boardCar);
    var cars = JSON.parse(localStorage.getItem('parking'));

    for (var i = 0; i < cars.length; i++) {
        if (cars[i].license == boardCar) {
            cars.splice(i, 1);
        }

        localStorage.setItem('parking', JSON.stringify(cars));
    }

    showParking();
}

function showParking() {
    var cars = JSON.parse(localStorage.getItem('parking'));
    var resultsCars = document.getElementById('results');

    resultsCars.innerHTML = '';

    for (var i = 0; i < cars.length; i++) {
        var modelCar = cars[i].model;
        var boardCar = cars[i].license;
        var hours = cars[i].hour;
        var minutes = cars[i].minutes;

        resultsCars.innerHTML += '<tr><td>' + modelCar + 
                            '</td><td>' + boardCar +
                            '</td><td>' + hours + ' : ' + minutes +
                            '</td><td><button class="btn btn-danger" onclick="deleteVehicle(\'' + boardCar + '\')">DELETE</button></td>' +
                            '</tr>';
    }
}