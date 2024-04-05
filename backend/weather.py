import datetime as dt
import requests

# BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
# API_KEY = "5ec647272a51a28a2968582daa03703c"
# CITY = "Orlando"

# url = BASE_URL + "appid=" + API_KEY + "&q=" + CITY

# response = requests.get(url).json()


# print(local_time, lon, lat, humidity, description, celsius, fahrenheit)


def get_weather(city):
    BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
    API_KEY = "5ec647272a51a28a2968582daa03703c"

    url = BASE_URL + "appid=" + API_KEY + "&q=" + city
    response = requests.get(url).json()

    kelvin = response['main']['temp']

    # temp
    celsius = round(kelvin - 273.15, 2)
    fahrenheit = round(celsius * (9/5) + 32, 2)
    # long, lat
    lon = response['coord']['lon']
    lat = response['coord']['lat']
    # humidity
    humidity = response['main']['humidity']
    # description
    description = response['weather'][0]['description']
    # time
    unix_timestamp = response['dt']
    timezone_offset = response['timezone']
    local_time = dt.datetime.fromtimestamp(
        unix_timestamp, tz=dt.timezone.utc) + dt.timedelta(seconds=timezone_offset)

    data = {
        "celsius": celsius,
        "fahrenheit": fahrenheit,
        "lat": lat,
        "lon": lon,
        "humidity": humidity,
        "description": description,
        "localTime": local_time
    }

    return data
