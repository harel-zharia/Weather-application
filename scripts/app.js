const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // Destructer properties
    const {cityDetails, weather} = data; 

    // Update details template
    // To get the correct template (such as changing the city name) we need to look for the exact property in the object (which is in the data we get back from the api, can be found
    // at accuweather.com) and pass it as a property to the correct data
    // (if it is from cityDetails or weather variables, which are in fact the new object we returned in the update city function)

    details.innerHTML = `
     <h5 class="my-3">${cityDetails.EnglishName}, ${cityDetails.Country.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
    `;
    
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSource);

    let timeSource = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    // At this case it is easier and more readble to use the below conditions as seen above

    // if (weather.IsDayTime){
    //     timeSource = 'img/day.svg';
    // }
    // else{
    //     timeSource = 'img/night.svg';
    // }
    time.setAttribute('src', timeSource);

};


const updateCity = async(city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        // cityDetails: cityDetails,
        // weather: weather

        //Instead of writing as described above, if both the property and the value are the same (as in the object itself), we can use object shorthand notation
        cityDetails,
        weather
    };
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value
    
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with the new city

    updateCity(city)
        .then(data => updateUI(data))
        .catch(e => console.log(e));
});