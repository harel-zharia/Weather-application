const key = "4z2gFbGZSK1bG86ZYqaSkUpN73p7TR4B";

// get weather info

const getWeather = async(locationId) => {
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${locationId}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

// get city info

const getCity = async(city) => {

    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};