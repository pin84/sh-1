var _vehicleClassesObj = []
var vehicleClassesObj = {
    '1': [1, 2, 40, 41, 42, 43, 44, 45, 46, 47], //Sedan
    "2": [6, 3, 4, 36, 48, 49, 50, 51, 52], //Minivans and SUV's
    '3': [21, 22, 23, 24, 27, 25, 26, 28], //Stretch sedan and SUV (Limousine)
    '4': [5, 9, 10, 11, 56, 57], //Minibus
    '5': [29, 30, 31, 32, 33, 34, 35, 58, 59, 60, 61, 62, 63, 64] //Buses
}


var vehiclesSorts = [{
    id: 0,
    name: 'Sedan',
    vehicles: [1, 2, 40]
}, {
    id: 1,
    name: "Minivans and SUV's",
    vehicles: [6, 3, 4, 36]
}, {
    id: 2,
    name: 'Stretch Limousine',
    vehicles: [21, 22, 23, 24, 27]
}, {
    id: 3,
    name: 'Minibus',
    vehicles: [5, 9, 10, 11]
}, {
    id: 4,
    name: 'Buses',
    vehicles: [29, 30, 31, 32, 33, 34, 35]
}]

var vehicleClass = [{
        id: 1,
        name: "Sedan",
        seq: 1,
        min: 1,
        max: 3,
        manufacturer: "Toyota",
        model: "Camry",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/sedan.jpg"
    },
    {
        id: 2,
        name: "Business Sedan",
        seq: 4,
        min: 1,
        max: 3,
        manufacturer: "Lincoln",
        model: "Continental",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/besiness-sedan.jpg"
    },
    {
        id: 40,
        name: "First Class",
        seq: 6,
        min: 1,
        max: 3,
        manufacturer: "Mercedes",
        model: "S-Class",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/first-class.jpg"
    },
    {
        id: 6,
        name: "MPV-4",
        seq: 11,
        min: 1,
        max: 4,
        manufacturer: "Toyota",
        model: "Highlander",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/mpv-4.jpg"
    },

    {
        id: 3,
        name: "MPV-5",
        seq: 12,
        min: 1,
        max: 5,
        manufacturer: "Toyota",
        model: "Sienna",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/mpv-5.jpg"
    }, {
        id: 4,
        name: "Business SUV",
        seq: 15,
        min: 1,
        max: 5,
        manufacturer: "Lincoln",
        model: "Navigator",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/besiness-mpv.jpg"
    }, {
        id: 5,
        name: "Minibus-8",
        seq: 28,
        min: 1,
        max: 8,
        manufacturer: "Ford",
        model: "Transit",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/minibus-8.jpg"
    },

    {
        id: 9,
        name: "Minibus-10",
        seq: 29,
        min: 1,
        max: 10,
        manufacturer: "Ford",
        model: "Transit",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/minibus-10.jpg"
    }, {
        id: 10,
        name: "Minibus-12",
        seq: 30,
        min: 1,
        max: 12,
        manufacturer: "Mercedes",
        model: "Sprinter",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/minibus-12.jpg"
    }, {
        id: 11,
        name: "Minibus-14",
        seq: 31,
        min: 1,
        max: 14,
        manufacturer: "Mercedes",
        model: "Sprinter",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/minibus-14.jpg"
    },

    {
        id: 36,
        name: "Business Minivan",
        seq: 16,
        min: 1,
        max: 5,
        manufacturer: "Mercedes",
        model: "matrix",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/businessminivan.jpg"
    },


    {
        id: 21,
        name: "6 Passenger Stretch Limo",
        seq: 20,
        min: 1,
        max: 6,
        manufacturer: "Stretch Chrysler",
        model: "300",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/stretch-limo-6.jpg"
    }, {
        id: 22,
        name: "8 Passenger Stretch Limo",
        seq: 21,
        min: 1,
        max: 8,
        manufacturer: "Lincoln",
        model: "MKT",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/stretch-limo-8.jpg"
    }, {
        id: 23,
        name: "10 Passenger Stretch Limo",
        seq: 22,
        min: 1,
        max: 10,
        manufacturer: "Lincoln",
        model: "MKT",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/stretch-limo-10.jpg"
    }, {
        id: 24,
        name: "12 Passenger Stretch Limo",
        seq: 23,
        min: 1,
        max: 12,
        manufacturer: "Lincoln",
        model: "Navigator",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/stretch-limo-12.jpg"
    }, {
        id: 27,
        name: "16 Passenger Stretch Limo",
        seq: 24,
        min: 1,
        max: 16,
        manufacturer: "Hummer",
        model: "H2",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/stretch-limo-16.jpg"
    }, {
        id: 29,
        name: "16-seat Bus",
        seq: 34,
        min: 1,
        max: 16,
        manufacturer: "Ford",
        model: "E-450",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-16.jpg"
    }, {
        id: 30,
        name: "20-seat Bus",
        seq: 35,
        min: 1,
        max: 20,
        manufacturer: "Ford",
        model: "E-450",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-20.jpg"
    }, {
        id: 31,
        name: "23-seat Bus",
        seq: 36,
        min: 1,
        max: 23,
        manufacturer: "Ford",
        model: "F-550",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-23.jpg"
    }, {
        id: 32,
        name: "27-seat Bus",
        seq: 37,
        min: 1,
        max: 27,
        manufacturer: "Ford",
        model: "F-550",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-27.jpg"
    }, {
        id: 33,
        name: "36-seat Bus",
        seq: 38,
        min: 1,
        max: 36,
        manufacturer: "Ford",
        model: "F-650",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-36.jpg"
    }, {
        id: 34,
        name: "44-seat Coach Bus",
        seq: 39,
        min: 1,
        max: 44,
        manufacturer: "Volvo",
        model: "9700",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-44.jpg"
    }, {
        id: 35,
        name: "55-seat Coach Bus",
        seq: 40,
        min: 1,
        max: 55,
        manufacturer: "Prevost",
        model: "X3-45",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/vehicle/sm/bus-55.jpg"
    },

    {
        id: 41,
        name: "EV Sedan",
        seq: 2,
        min: 1,
        max: 3,
        manufacturer: "Chevy",
        model: "Bolt EUV",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-sedan.png"
    }, {
        id: 42,
        name: "EV Business Sedan",
        seq: 3,
        min: 1,
        max: 3,
        manufacturer: "Tesla",
        model: "Model 3",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-business-sedan.png"
    }, {
        id: 43,
        name: "EV First Class Sedan",
        seq: 5,
        min: 1,
        max: 3,
        manufacturer: "Tesla",
        model: "Model S",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-firstclass.png"
    }, {
        id: 44,
        name: "Rolls Royce Ghost",
        seq: 7,
        min: 1,
        max: 2,
        manufacturer: "Rolls Royce",
        model: "Ghost",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/rolls-royce-ghost.png"
    }, {
        id: 45,
        name: "Rolls Royce Phantom",
        seq: 8,
        min: 1,
        max: 2,
        manufacturer: "Rolls Royce",
        model: "Phantom",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/rolls-royce-phantom.png"
    }, {
        id: 46,
        name: "Bentley",
        seq: 9,
        min: 1,
        max: 2,
        manufacturer: "",
        model: "",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/bentley.png"
    }, {
        id: 47,
        name: "Classic Car",
        seq: 10,
        min: 1,
        max: 2,
        manufacturer: "",
        model: "",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/classic-car.png"
    }, {
        id: 48,
        name: "EV SUV",
        seq: 13,
        min: 1,
        max: 4,
        manufacturer: "Tesla",
        model: "Model Y",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-suv.png"
    }, {
        id: 49,
        name: "EV Business SUV",
        seq: 14,
        min: 1,
        max: 4,
        manufacturer: "Tesla",
        model: "Model X",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/ev-business-suv.png"
    }, {
        id: 50,
        name: "Wheelchair Van",
        seq: 17,
        min: 1,
        max: 1,
        manufacturer: "Toyota",
        model: "Sienna",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/wheelchair-van.png"
    }, {
        id: 51,
        name: "Wheelchair Minibus",
        seq: 18,
        min: 1,
        max: 2,
        manufacturer: "Ford",
        model: "Transit",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/wheelchair-minibus.png"
    }, {
        id: 52,
        name: "School Minivan",
        seq: 19,
        min: 1,
        max: 4,
        manufacturer: "Toyota",
        model: "Sienna",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-minivan.png"
    }, {
        id: 25,
        name: "12 Passenger Party Bus",
        seq: 25,
        min: 1,
        max: 12,
        manufacturer: "Mercedes",
        model: "Sprinter",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/party-bus-12.png"
    }, {
        id: 26,
        name: "14 Passenger Party Bus",
        seq: 26,
        min: 1,
        max: 14,
        manufacturer: "Mercedes",
        model: "Sprinter",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/party-bus-14.png"
    }, {
        id: 28,
        name: "23 Passenger Party Bus",
        seq: 27,
        min: 1,
        max: 23,
        manufacturer: "Ford",
        model: "F-550",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/party-bus-23.png"
    }, {
        id: 56,
        name: "9-School Minibus",
        seq: 32,
        min: 1,
        max: 9,
        manufacturer: "Titan School",
        model: "SRW 1",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-minibus-9.png"
    }, {
        id: 57,
        name: "14-School Minibus",
        seq: 33,
        min: 1,
        max: 14,
        manufacturer: "Titan School",
        model: "SRW 1",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-minibus-14.png"
    }, {
        id: 58,
        name: "16-School Bus",
        seq: 41,
        min: 1,
        max: 16,
        manufacturer: "Titan School",
        model: "SRW 1",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-16.png"
    }, {
        id: 59,
        name: "20-School Bus",
        seq: 42,
        min: 1,
        max: 20,
        manufacturer: "Titan School",
        model: "SRW 1",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-20.png"
    }, {
        id: 60,
        name: "23-School Bus",
        seq: 43,
        min: 1,
        max: 23,
        manufacturer: "Titan School",
        model: "DRW 2",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-23.png"
    }, {
        id: 61,
        name: "30-School Bus",
        seq: 44,
        min: 1,
        max: 30,
        manufacturer: "Titan School",
        model: "DRW 2",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-30.png"
    }, {
        id: 62,
        name: "36-School Bus",
        seq: 45,
        min: 1,
        max: 36,
        manufacturer: "Micro Bird",
        model: "G5",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-36.png"
    }, {
        id: 63,
        name: "44-School Bus",
        seq: 46,
        min: 1,
        max: 44,
        manufacturer: "Bluebird Version",
        model: "",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-44.png"
    }, {
        id: 64,
        name: "72-School Bus",
        seq: 47,
        min: 1,
        max: 72,
        manufacturer: "International school bus",
        model: "",
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/school-bus-72.png"
    }
];

//carType: 1:small 2:Luxury  3:Large
let vehicleClassesSup = [{
        id: 1,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/sedan.png",
        zho: "舒适5座",
        eng: 'Sedan',
        manufacturer: {
            zho: '',
            eng: 'Toyota Camry'
        },
        carType: 1 //1:small 2:Luxury  3:Large
    }, {
        id: 2,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/businesssedan.png",
        zho: "商务5座",
        eng: 'Business Sedan',
        manufacturer: {
            zho: '',
            eng: 'Lincoln Continental'
        },
        carType: 1
    }, {
        id: 3,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/mpv5.png",
        zho: "标准7座",
        eng: 'Minivan',
        manufacturer: {
            zho: '',
            eng: 'Toyota Sienna'
        },
        carType: 1
    }, {
        id: 4,
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/businesssuv.png",
        zho: "商务7座",
        eng: 'Business SUV',
        manufacturer: {
            zho: '',
            eng: 'Lincoln Navigator'
        },
        carType: 1
    }, {
        id: 5,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/minibus8.png",
        zho: "小巴8座",
        eng: 'Minibus-8',
        manufacturer: {
            zho: '',
            eng: 'Ford Transit'
        },
        carType: 1
    }, {
        id: 6,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/mpv4.png",
        zho: "紧凑7座",
        eng: 'Compact Minivan',
        manufacturer: {
            zho: '',
            eng: 'Toyota Highlander'
        },
        carType: 1
    }, {
        id: 9,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/minibus10.png",
        zho: "小巴-10座",
        eng: 'Minibus-10',
        manufacturer: {
            zho: '',
            eng: 'Ford Transit'
        },
        carType: 1
    }, {
        id: 10,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/minibus12.png",
        zho: "小巴-12座",
        eng: 'Minibus-12',
        manufacturer: {
            zho: '',
            eng: 'Mercedes Sprinter'
        },
        carType: 1
    }, {
        id: 11,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/minibus14.png",
        zho: "小巴-14座",
        eng: 'Minibus-14',
        manufacturer: {
            zho: '',
            eng: 'Mercedes Sprinter'
        },
        carType: 1
    }, {
        id: 21,
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/stretch-limo-6.png",
        zho: "6 Passenger Stretch Limo",
        eng: '6 Passenger Stretch Limo',
        manufacturer: {
            zho: '',
            eng: 'Stretch Chrysler 300'
        },
        shortName:'6 PAX Stretch',
        carType: 2
    }, {
        id: 22,
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/stretch-limo-8.png",
        zho: "8 Passenger Stretch Limo",
        eng: '8 Passenger Stretch Limo',
        manufacturer: {
            zho: '',
            eng: 'Lincoln MKT or Chrsley'
        },
        carType: 2,
        shortName:'8 PAX Stretch',
    }, {
        id: 23,
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/stretch-limo-10.png",
        zho: "10 Passenger Stretch Limo",
        eng: '10 Passenger Stretch Limo',
        manufacturer: {
            zho: '',
            eng: 'Lincoln MKT or Chrsley'
        },
        carType: 2,
        shortName:'10 PAX Stretch',
    }, {
        id: 24,
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/stretch-limo-12.png",
        zho: "12 Passenger Stretch Limo",
        eng: '12 Passenger Stretch Limo',
        manufacturer: {
            zho: '',
            eng: 'Lincoln Navigator'
        },
        carType: 2,
        shortName:'12 PAX Stretch',
    }, {
        id: 27,
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/stretch-limo-16.png",
        zho: "16 Passenger Stretch Limo",
        eng: '16 Passenger Stretch Limo',
        manufacturer: {
            zho: '',
            eng: 'Hummer H2'
        },
        carType: 2,
        shortName:'16 PAX Stretch',
    }, {
        id: 29,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/bus-16.png",
        zho: '巴士-16座',
        eng: '16-seat Bus',
        manufacturer: {
            zho: '',
            eng: 'Ford E-450'
        },
        carType: 3
    }, {
        id: 30,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/bus-20.png",
        zho: '巴士-20座',
        eng: '20-seat Bus',
        manufacturer: {
            zho: '待翻译',
            eng: 'Ford E-450'
        },
        carType: 3
    }, {
        id: 31,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/bus-23.png",
        zho: '巴士-23座',
        eng: '23-seat Bus',
        manufacturer: {
            zho: '',
            eng: 'Ford F-550'
        },
        carType: 3
    }, {
        id: 32,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/bus-27.png",
        zho: '巴士-27座',
        eng: '27-seat Bus',
        manufacturer: {
            zho: '',
            eng: 'Ford F-550'
        },
        carType: 3
    }, {
        id: 33,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/bus-36.png",
        zho: '巴士-36座',
        eng: '36-seat Bus',
        manufacturer: {
            zho: '',
            eng: 'Ford F-650'
        },
        carType: 3
    }, {
        id: 34,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/bus-44.png",
        zho: '大巴-44座',
        eng: '44-seat Coach Bus',
        manufacturer: {
            zho: '',
            eng: 'Volvo 9700'
        },
        carType: 3
    }, {
        id: 35,
        image_url: "https://elifetransfer.s3.us-east-2.amazonaws.com/art/icon/consumer_pc/bus-55.png",
        zho: '大巴-55座',
        eng: '55-seat Coach Bus',
        manufacturer: {
            zho: '',
            eng: 'Prevost X3-45'
        },
        carType: 3
    }, {
        id: 36,
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/businessminivan.png",
        zho: '商务面包车',
        eng: 'Business Minivan',
        manufacturer: {
            zho: '',
            eng: 'Mercedes matrix'
        },
        carType: 2
    },
    {
        id: 40,
        image_url: "https://elifelimo.s3.us-east-2.amazonaws.com/art/home/vehicle-classes/firstclass.png",
        zho: "豪华五座",
        eng: "First Class",
        manufacturer: {
            zho: '',
            eng: 'Mercedes S-Class'
        },
        carType: 1
    },

    {
        "id": 41,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "1"
    },
    {
        "id": 42,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "1"
    },
    {
        "id": 43,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "1"
    },
    {
        "id": 44,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "2"
    },
    {
        "id": 45,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "2"
    },
    {
        "id": 46,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "2"
    },
    {
        "id": 47,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "2"
    },
    {
        "id": 48,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "1"
    },
    {
        "id": 49,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "1"
    },
    {
        "id": 50,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "1"
    },
    {
        "id": 51,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "1"
    },
    {
        "id": 52,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "1"
    },
    {
        "id": 25,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "2"
    },
    {
        "id": 26,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "2"
    },
    {
        "id": 28,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "2"
    },
    {
        "id": 56,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "3"
    },
    {
        "id": 57,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "3"
    },
    {
        "id": 58,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "3"
    },
    {
        "id": 59,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "3"
    },
    {
        "id": 60,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "3"
    },
    {
        "id": 61,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "3"
    },
    {
        "id": 62,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "3"
    },
    {
        "id": 63,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "3"
    },
    {
        "id": 64,
        "zho": "",
        "eng": "",
        "manufacturer": {
            "zho": "",
            "eng": ""
        },
        "carType": "3"
    }
];


var _vehicleClasses = [];
var vehicleClasses = [];
vehicleClass.forEach(item => {
    let obj = vehicleClassesSup.find(o => o.id == item.id)
    vehicleClasses.push(Object.assign({}, item, obj))
})


var vehicleIdFleet2Ride = {
    1: [1],
    2: [1, 2],
    40: [1, 2, 40],
    6: [1, 6],
    3: [1, 6, 3],
    4: [1, 2, 6, 3, 4],
    36: [1, 2, 6, 3, 4, 36],
    21: [21],
    22: [21, 22],
    23: [21, 22, 23],
    24: [21, 22, 23, 24],
    27: [21, 22, 23, 24, 27],
    5: [6, 3, 5],
    9: [6, 3, 5, 9],
    10: [6, 3, 5, 9, 10],
    11: [6, 3, 5, 9, 10, 11],
    29: [5, 9, 10, 11, 29],
    30: [5, 9, 10, 11, 29, 30],
    31: [5, 9, 10, 11, 29, 30, 31],
    32: [5, 9, 10, 11, 29, 30, 31, 32],
    33: [5, 9, 10, 11, 29, 30, 31, 32, 33],
    34: [29, 30, 31, 32, 33, 34],
    35: [29, 30, 31, 32, 33, 34, 35]
}