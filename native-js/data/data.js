const  data = {
    title: "Прогноз погоды",
    daysBefore: "0",
    daysAfter: "3",
    matcherIconCloudiness: [
        {
            value: "rain",
            label: "Дождь",
            icon: {
                path: "",
                style: {}
            }
        },
        {
            value: "rain",
            label: "Снег",
            icon: {
                path: "",
                style: {}
            }
        },
        {
            value: "rain",
            label: "Облачно",
            icon: {
                path: "",
                style: {}
            }
        },
        {
            value: "rain",
            label: "Ясно",
            icon: {
                path: "",
                style: {}
            }
        }
    ],
    data: [
        {
            date: "",
            cloudiness: "",
            temperature: {
                day: "",
                night: ""
            },
            pressure: "",
            humidity: "",
            wind: "",
            feelsLike: ""
        },
    ]
};

export default data;