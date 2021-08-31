const showCountryContainer = document.getElementById('show_country');
const showError = document.getElementById('show_error');
const blankInput = document.getElementById('show_error_blank_input');
const searchField = document.getElementById('search_field');


//fetch the country data
const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

//handle the search Countries
const searchHandle = () => {
    const searchValue = searchField.value;
    if (searchField.value.length === 0){
        showCountryContainer.textContent = " ";
        blankInput.innerHTML = `
        <h3 class="text-danger text-center">🙏 Please Write Someting 😧</h3>
        `
    }else{
        // get the data of countries
        fetchData(`https://restcountries.eu/rest/v2/name/${searchValue}`).then(data => showCountries(data[0])).catch(err => handleError("😧Opps ❗❗ Country Not Found.❌"));
    }
    //clear the value
    searchField.value = '';
}

//show countries 
const showCountries = (countryData) => {
    showError.textContent =  ' ';
    blankInput.textContent =  ' ';
    //show the country 
    showCountryContainer.innerHTML = `
    <div class="card w-50 mx-auto">
            <img src="${countryData.flag}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="text-center py-3">${countryData.name}</h4>
            <button type="button" class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
               See Details
            </button> 
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${countryData.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="card w-100">
                <img src="${countryData.flag}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5>Capital: ${countryData.capital} </h5>
                    <h5>Region: ${countryData.region} </h5>
                    <h5>Subregion: ${countryData.subregion} </h5>
                    <h5>Population: ${countryData.population} </h5>
                    <h5>Area: ${countryData.area} </h5>
                    <h5>Timezone: ${countryData.timezones[0]} </h5>
                    <h5>Currency: ${countryData.currencies[0].name} </h5>
                    <h5>Language: ${countryData.languages[0].name} </h5>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
    `
}


//handle error 
const handleError = (error) => {
    showCountryContainer.textContent = " ";
    showError.innerHTML = `
    <h3 class="text-danger text-center">${error}</h3>
    `
}