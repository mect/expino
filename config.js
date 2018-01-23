// Load environment variables from .env file if available
require('dotenv').load();

var config = {
    env:  'prod',

    host: '0.0.0.0',
    port: process.env.PORT || 5000,

    // Available themes:
    // + bordeau
    // + harlequin
    // + light-grey
    // + light-yellow
    // + night-blue
    // + snow
    // + yellow
    theme: 'light-grey',

    // clients configs
    api: {
        aws: {
            region: 'eu-west-1'
        },
        jenkins: {
            baseUrl: 'https://my-jenkins.com',
            auth: {
                user:     'me',
                password: 'me'
            }
        }
    },

    // define duration between each dashboard rotation (ms)
    rotationDuration: 8000,

    // define the interval used by Mozaïk Bus to call registered APIs
    apisPollInterval: 15000,

    dashboards: [

        // first dashboard
        {
            // 4 x 3 dashboard
            columns: 5,
            rows:    5,
            widgets: [
                {
                    type: 'switch.widgets',
                    columns: 1, rows: 1,
                    x: 0, y: 4,
                    // Duration how long to show each widget
                    duration: 8000,
                    // Structure within widgets is same normally
                    // with widgets. Naturally the size and placement
                    // comes from switch.widgets
                    widgets: [
                        {
                            type: 'time.clock',
                            timezone: 'America/Los_Angeles',
                            info: 'date',
                            title: 'Los Angeles'
                        },
                        {
                            type: 'weather.weather',
                            city: 'Helsinki',
                            country: 'FI',
                            lang: 'en',
                        },
                        {
                            type: 'time.clock',
                            info: 'time',
                            timezone: 'Asia/Tokyo',
                            title: 'Tokyo'
                        }
                    ]
                },
                {
                    type: 'switch.widgets',
                    columns: 4, rows: 5,
                    x: 1, y: 0,
                    // Duration how long to show each widget
                    duration: 8000,
                    // Structure within widgets is same normally
                    // with widgets. Naturally the size and placement
                    // comes from switch.widgets
                    widgets: [
                        {
                            type: 'travis.build_history',
                            owner: 'plouc',
                            repository: 'mozaik',
                            columns: 4, rows: 5,
                            x: 1, y: 0
                        },
                        {
                            type: 'github.user_badge',
                            user: 'plouc',
                            columns: 4, rows: 5,
                            x: 1, y: 0
                        },
                        {
                            type: 'travis.repository',
                            owner: 'plouc',
                            repository: 'mozaik',
                            columns: 1, rows: 1,
                            x: 1, y: 0
                        },
                        {
                            type: 'travis.build_histogram',
                            owner: 'plouc',
                            repository: 'mozaik',
                            columns: 4, rows: 5,
                            x: 1, y: 0
                        }
                    ]
                },


            ]
         }
        //
        // // second dashboard
        // {
        //     // 3 x 2 dashboard
        //     columns: 3,
        //     rows:    2,
        //     widgets: [
        //
        //     ]
        // }
    ]
};

module.exports = config;
