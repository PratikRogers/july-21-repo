import {List} from 'immutable';
export function dummyAudienceCount() {
    const resp = {counts: {
        Canadians: 0,
        TvSessions : 0,
        DigitalSessions: 0
      }
    };
    return resp;
}

export function getFakeAudienceCount() {
    const resp = {counts: {
        Canadians: 4020202,
        TvSessions : 90909000,
        DigitalSessions: 23232323
      }
    };
    return resp;
}


export function fakeAudienceList() {
    const data = List([
        {
            id: 1,
            name: "McDonald's Trendsetters",
            people: 12546733,
            tvSize: 1621932,
            radioSize: 2212003,
            digitalSize: 17559883,
            mobileSize: 4029100,
            emailSize: 3442567,
            status: 1,
            lastUpdated: "2017-01-01 14:33"
        },
        {
            id: 2,
            name: "VW SUV intenders",
            people: 257123,
            tvSize: 83210,
            radioSize: 10389,
            digitalSize: 1482929,
            mobileSize: 109370,
            emailSize: 187992,
            status: 1,
            lastUpdated: "2017-01-02 14:33"
        },
        {
            id: 3,
            name: "Expedia travellers",
            people: 1254001,
            tvSize: 623012,
            radioSize: 874201,
            digitalSize: 1932431,
            mobileSize: 457231,
            emailSize: 401823,
            status: 1,
            lastUpdated: "2017-01-03 14:33"
        },
        {
            id: 4,
            name: "Canadian Tire Campers",
            people: 655778,
            tvSize: 125928,
            radioSize: 499892,
            digitalSize: 994776,
            mobileSize: 277342,
            emailSize: 221029,
            status: 1,
            lastUpdated: "2017-01-07 14:33"
        },
    ]);
    return data;
}

export function getFakeEditSegmentResponse() {
    const resp = require('../data/editSegment.json');
    return resp.segmentation;
}

export function getFakeSegmentResponse() {
    const resp = {
        "segmentation": [
            {
                "category": "Demographics",
                "segmentDetails": [
                    {
                        "segmentId": 1,
                        "segmentName": "Province: British Columbia",
                        "segmentLabel": "(derived from billing records and browser behaviour)"
                    },
                    {
                        "segmentId": 2,
                        "segmentName": "Province: Alberta",
                        "segmentLabel": "(derived from billing records and browser behaviour)"
                    },
                    {
                        "segmentId": 3,
                        "segmentName": "Province: Manitoba",
                        "segmentLabel": "(derived from billing records and browser behaviour)"
                    },
                    {
                        "segmentId": 4,
                        "segmentName": "Province: Saskatchewan",
                        "segmentLabel": "(derived from billing records and browser behaviour)"
                    },
                    {
                        "segmentId": 5,
                        "segmentName": "Province: Ontario",
                        "segmentLabel": "(derived from billing records and browser behaviour)"
                    },
                    {
                        "segmentId": 6,
                        "segmentName": "Province: Quebec",
                        "segmentLabel": "(derived from billing records and browser behaviour)"
                    },
                    {
                        "segmentId": 7,
                        "segmentName": "Province: New Brunswick",
                        "segmentLabel": "(derived from billing records)"
                    },
                    {
                        "segmentId": 8,
                        "segmentName": "Province: Nova Scotia",
                        "segmentLabel": "(derived from billing records)"
                    },
                    {
                        "segmentId": 9,
                        "segmentName": "Province: PEI",
                        "segmentLabel": "(derived from billing records)"
                    },
                    {
                        "segmentId": 10,
                        "segmentName": "Province: Newfoundland & Labrador",
                        "segmentLabel": "(derived from billing records)"
                    },
                    {
                        "segmentId": 11,
                        "segmentName": "Province: Maritimes",
                        "segmentLabel": "(derived from billing records and browser behaviour)"
                    },
                    {
                        "segmentId": 12,
                        "segmentName": "Province: Nunavut",
                        "segmentLabel": "(derived from billing records)"
                    },
                    {
                        "segmentId": 13,
                        "segmentName": "Province: Northwest Territories",
                        "segmentLabel": "(derived from billing records)"
                    },
                    {
                        "segmentId": 14,
                        "segmentName": "Province: Yukon Territory",
                        "segmentLabel": "(derived from billing records)"
                    },
                    {
                        "segmentId": 15,
                        "segmentName": "Province: Northern Canada",
                        "segmentLabel": "(derived from billing records and browser behaviour)"
                    },
                    {
                        "segmentId": 16,
                        "segmentName": "Age between 18 and 24",
                        "segmentLabel": "(derived from billing records and digital data)"
                    },
                    {
                        "segmentId": 17,
                        "segmentName": "Age between 25 and 34",
                        "segmentLabel": "(derived from billing records and digital data)"
                    },
                    {
                        "segmentId": 18,
                        "segmentName": "Age between 35 and 44",
                        "segmentLabel": "(derived from billing records and digital data)"
                    },
                    {
                        "segmentId": 19,
                        "segmentName": "Age between 45 and 54",
                        "segmentLabel": "(derived from billing records and digital data)"
                   },
                    {
                        "segmentId": 20,
                        "segmentName": "Age between 55 and 64",
                        "segmentLabel": "(derived from billing records and digital data)"
                    },
                    {
                        "segmentId": 21,
                        "segmentName": "Age over 65",
                        "segmentLabel": "(derived from billing records and digital data)"
                    },
                    {
                        "segmentId": 47,
                        "segmentName": "Gender: Male",
                        "segmentLabel": "(derived from billing records)"
                    },
                    {
                        "segmentId": 48,
                        "segmentName": "Gender: Female",
                        "segmentLabel": "(derived from billing records)"
                    },
                    {
                        "segmentId": 57,
                        "segmentName": "Avg Income 0-75K",
                        "segmentLabel": "(Media Mart/LiveRamp)"
                    },
                    {
                        "segmentId": 58,
                        "segmentName": "Avg Income 100-150K",
                        "segmentLabel": "(Media Mart/LiveRamp)"
                    },
                    {
                        "segmentId": 59,
                        "segmentName": "Avg Income 150K+",
                        "segmentLabel": "(Media Mart/LiveRamp)"
                    },
                    {
                        "segmentId": 60,
                        "segmentName": "Avg Income 75-100K",
                        "segmentLabel": "(Media Mart/LiveRamp)"
                    },
                    {
                        "segmentId": 61,
                        "segmentName": "Avg Income 250K+",
                        "segmentLabel": "(Media Mart/LiveRamp)"
                    },
                    {
                        "segmentId": 62,
                        "segmentName": "Language: Arabic",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 63,
                        "segmentName": "Language: Asian",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 64,
                        "segmentName": "Language: Chinese",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 65,
                        "segmentName": "Language: English",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 66,
                        "segmentName": "Language: Filipino",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                       "segmentId": 67,
                        "segmentName": "Language: French",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 68,
                        "segmentName": "Language: Italian",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 69,
                        "segmentName": "Language: Russian",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 70,
                        "segmentName": "Language: South Asian",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 71,
                        "segmentName": "Language: Spanish",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 93,
                        "segmentName": "RED: Asian Families",
                        "segmentLabel": "(derived from browser and app behaviour)"
                    },
                    {
                        "segmentId": 94,
                        "segmentName": "RED: Chinese Families",
                        "segmentLabel": "(derived from browser and app behaviour)"
                    },
                    {
                        "segmentId": 95,
                        "segmentName": "RED: East Asian Families",
                        "segmentLabel": "(derived from browser and app behaviour)"
                    },
                    {
                        "segmentId": 96,
                        "segmentName": "RED: Multicultural Families",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 97,
                        "segmentName": "RED: South Asian Families",
                        "segmentLabel": "(derived from browser and app behaviour)"
                    },
                    {
                        "segmentId": 98,
                        "segmentName": "RED: Southeast Asian Families",
                        "segmentLabel": "(derived from browser and app behaviour)"
                    }
                ]
            },
            {
                "category": "Interests",
                "segmentDetails": [
                    {
                        "segmentId": 29,
                        "segmentName": "Watches TV on weekdays",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 30,
                        "segmentName": "Watches TV on weekends",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 31,
                        "segmentName": "Watches TV 2AM-6AM",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 32,
                        "segmentName": "Watches TV 6AM-10AM",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 33,
                        "segmentName": "Watches TV 10AM-4:30PM",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 34,
                        "segmentName": "Watches TV 4:30OM-7:30PM",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 35,
                        "segmentName": "Watches TV 7:30PM-11PM",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 36,
                        "segmentName": "Watches TV 11PM-2AM",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 37,
                        "segmentName": "Watches Kids/Family TV",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 38,
                        "segmentName": "Watches Life/Reality TV",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 39,
                        "segmentName": "Watches Movies",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 40,
                        "segmentName": "Watches Multicultural TV",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 41,
                        "segmentName": "Watches News/Learning TV",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 42,
                        "segmentName": "Watches Sports",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 43,
                        "segmentName": "Watches Music TV",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 44,
                        "segmentName": "Watches Radio on TV",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 45,
                        "segmentName": "Watches Shopping TV",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 46,
                        "segmentName": "Watches Spiritual TV",
                        "segmentLabel": "(derived from set top box viewing records)"
                    },
                    {
                        "segmentId": 49,
                        "segmentName": "Visits macleans.ca",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 50,
                        "segmentName": "Visits Canadian Business",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 51,
                        "segmentName": "Visits Chatelaine",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 52,
                        "segmentName": "Visits Fashion sites",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 53,
                        "segmentName": "Visits Flare",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 54,
                        "segmentName": "Visits Hello!",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 55,
                        "segmentName": "Visits Moneysense",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 56,
                        "segmentName": "Visits Today's Parent",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 72,
                        "segmentName": "RED: Canadian Auto Enthusiasts",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 73,
                        "segmentName": "RED: French Canadian Beauty Enthusiasts",
                        "segmentLabel": "(derived from browser behaviour and billing records)"
                    },
                    {
                        "segmentId": 74,
                        "segmentName": "RED: Canadian Business Experts",
                        "segmentLabel": "(derived from browser behaviour and billing records)"
                    },
                    {
                        "segmentId": 75,
                        "segmentName": "RED: Canadian Dads",
                        "segmentLabel": "(derived from browser behaviour and billing records)"
                    },
                    {
                        "segmentId": 76,
                        "segmentName": "RED: Canadian Fashion & Beauty Enthusiasts",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 77,
                        "segmentName": "RED: Canandian Fitness & Wellness Buffs",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 78,
                        "segmentName": "RED: Canadian Food Lovers",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 79,
                        "segmentName": "RED: Canadian Homeowners",
                        "segmentLabel": "(derived from browser behaviour and billing records)"
                    },
                    {
                        "segmentId": 80,
                        "segmentName": "RED: Canadian Millenials",
                        "segmentLabel": "(derived from browser behaviour and billing records)"
                    },
                    {
                        "segmentId": 81,
                        "segmentName": "RED: Canadian Moms",
                        "segmentLabel": "(derived from browser behaviour and billing records)"
                    },
                    {
                        "segmentId": 82,
                        "segmentName": "RED: Canadian Online Shoppers",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 83,
                        "segmentName": "RED: Canadian Beauty Shoppers",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 84,
                        "segmentName": "RED: Canadian Fashion Shoppers",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 85,
                        "segmentName": "RED: Canadian Parents",
                        "segmentLabel": "(derived from browser behaviour and subscriptions)"
                    },
                    {
                        "segmentId": 86,
                       "segmentName": "RED: Canadian Small Business",
                        "segmentLabel": "(derived from browser behaviour and billing records)"
                    },
                    {
                        "segmentId": 87,
                        "segmentName": "RED: Canadian Small/Medium Business",
                        "segmentLabel": "(derived from browser behaviour and billing records)"
                    },
                    {
                        "segmentId": 88,
                        "segmentName": "RED: Canadian Sports Fans",
                        "segmentLabel": "(derived from browser behaviour, set top box viewing records, and app usage)"
                    },
                    {
                        "segmentId": 89,
                        "segmentName": "RED: Canadian Baseball Fans",
                        "segmentLabel": "(derived from browser behaviour, set top box viewing records, and app usage)"
                    },
                    {
                        "segmentId": 90,
                        "segmentName": "RED: Canadian Basketball Fans",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 91,
                        "segmentName": "RED: Canadian Hockey Fans",
                        "segmentLabel": "(derived from browser behaviour)"
                    },
                    {
                        "segmentId": 92,
                        "segmentName": "RED: Canadian Travel Buffs",
                        "segmentLabel": "(derived from browser behaviour and location data)"
                    }
                ]
            },
            {
                "category": "Behaviours",
                "segmentDetails": [
                    {
                        "segmentId": 22,
                        "segmentName": "Subscriber: Flare",
                        "segmentLabel": "(derived from print subscriber data)"
                    },
                    {
                        "segmentId": 23,
                        "segmentName": "Subscriber: Hello!",
                        "segmentLabel": "(derived from print subscriber data)"
                    },
                    {
                        "segmentId": 24,
                        "segmentName": "Subscriber: Macleans",
                        "segmentLabel": "(derived from print subscriber data)"
                    },
                    {
                        "segmentId": 25,
                        "segmentName": "Subscriber: Moneysense",
                        "segmentLabel": "(derived from print subscriber data)"
                    },
                    {
                        "segmentId": 26,
                        "segmentName": "Subscriber: Today's Parent",
                        "segmentLabel": "(derived from print subscriber data)"
                    },
                    {
                        "segmentId": 27,
                        "segmentName": "Subscriber: Chatelaine (English)",
                        "segmentLabel": "(derived from print subscriber data)"
                    },
                    {
                        "segmentId": 28,
                        "segmentName": "Subscriber: Chatelaine (French)",
                        "segmentLabel": "(derived from print subscriber data)"
                    }
                ]
            }
        ]
    }
    return resp;    
}