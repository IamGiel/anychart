import { Component, OnInit, Input } from '@angular/core';
import { MapService } from './map.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'jhi-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    //countryData: any;
    @Input('chartData') chartData;

    locations: any = [
        { id: 'Bangalore', size: 6, lat: 12.9743882, long: 77.5882343 },
        { id: 'New Delhi', size: 3, lat: 28.6139391, long: 77.2090212 },
        { id: 'San Fransisco', size: 9, lat: 37.7712408, long: -122.5389803 },
        { id: 'New York', size: 12, lat: 40.6611314, long: -74.3096548 },
        { id: 'Hongkong', size: 12, lat: 22.1287591, long: 114.2396604 },
        { id: "Xi'an", size: 4, lat: 34.2590616, long: 108.6870282 },
        { id: 'Yokohama', size: 9, lat: 35.4526439, long: 139.456724 },
        { id: 'Frankfurt', size: 4, lat: 50.1211277, long: 8.4964825 },
        { id: 'Accra', size: 2, lat: 5.5912077, long: -0.2147489 },
        { id: 'Berlin', size: 2, lat: 52.5067614, long: 13.2846508 },
        { id: 'London', size: 9, lat: 51.5285582, long: -0.2416797 },
        { id: 'Liverpool', size: 4, lat: 53.4121569, long: -2.9860979 },
        { id: 'Milan', size: 2, lat: 45.4627124, long: 9.1076929 },
        { id: 'Casablanca', size: 2, lat: 33.5722678, long: -7.6570322 }
    ];
    // countryData: any[] = [
    //     {
    //         id: 'SA',
    //         name: 'Saudi Arabia',
    //         value: '5.5',
    //         indicator: 'Environmental performance index'
    //     },
    //     {
    //         id: 'VA',
    //         name: 'Vatican City',
    //         value: '8.6',
    //         indicator: 'Environmental performance index'
    //     },
    //     {
    //         id: 'IN',
    //         name: 'India',
    //         value: '6.5',
    //         indicator: 'Environmental performance index'
    //     },
    //     {
    //         id: 'US',
    //         name: 'United States of America',
    //         value: '9.6',
    //         indicator: 'Environmental performance index'
    //     },
    //     {
    //         id: 'UK',
    //         name: 'United Kingdom',
    //         value: '6.5',
    //         indicator: 'Environmental performance index'
    //     },
    //     {
    //         id: 'CN',
    //         name: 'China',
    //         value: '3.5',
    //         indicator: 'Environmental performance index'
    //     },
    //     {
    //         id: 'AU',
    //         name: 'Australia',
    //         value: '6.9',
    //         indicator: 'Environmental performance index'
    //     },
    //     {
    //         id: 'DE',
    //         name: 'Germany',
    //         value: '8.7',
    //         indicator: 'Environmental performance index'
    //     },
    //     {
    //         id: 'FR',
    //         name: 'France',
    //         value: '8.3',
    //         indicator: 'Environmental performance index'
    //     }
    // ];

    countryData: any[] = [
        {
            id: 'SA',
            name: 'Saudi Arabia',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'VA',
            name: 'Vatican City',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'PN',
            name: 'Pitcairn',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'IM',
            name: 'Isle of Man',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'CK',
            name: 'Cook Islands',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'NZ',
            name: 'New Zealand',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'AU',
            name: 'Australia',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'FI',
            name: 'Finland',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'NO',
            name: 'Norway',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'DK',
            name: 'Denmark',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'GL',
            name: 'Greenland',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'IS',
            name: 'Iceland',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'FO',
            name: 'Faroe Islands',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'AM',
            name: 'Armenia',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'CA',
            name: 'Canada',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'EE',
            name: 'Estonia',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'LV',
            name: 'Latvia',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'RU',
            name: 'Russia',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'UY',
            name: 'Uruguay',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'AZ',
            name: 'Azerbaijan',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'GE',
            name: 'Georgia',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'DE',
            name: 'Germany',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'HU',
            name: 'Hungary',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'IE',
            name: 'Ireland',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'KG',
            name: 'Kyrgyzstan',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'LT',
            name: 'Lithuania',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'PL',
            name: 'Poland',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'GB',
            name: 'United Kingdom',
            value: '7.45',
            indicator: 'Environmental performance index'
        },
        {
            id: 'AT',
            name: 'Austria',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'BY',
            name: 'Belarus',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'BE',
            name: 'Belgium',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'JE',
            name: 'Jersey',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'LU',
            name: 'Luxembourg',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'NL',
            name: 'Netherlands',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'UA',
            name: 'Ukraine',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'ZW',
            name: 'Zimbabwe',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'AL',
            name: 'Albania',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'CZ',
            name: 'Czech Republic',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'SK',
            name: 'Slovakia',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'US',
            name: 'United States',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'SE',
            name: 'Sweden',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'MM',
            name: 'Myanmar',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'KZ',
            name: 'Kazakhstan',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'MN',
            name: 'Mongolia',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'TJ',
            name: 'Tajikistan',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'TM',
            name: 'Turkmenistan',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'TT',
            name: 'Trinidad and Tobago',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'EC',
            name: 'Ecuador',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'MD',
            name: 'Moldova',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'PR',
            name: 'Puerto Rico',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'RO',
            name: 'Romania',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'GR',
            name: 'Greece',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'ZA',
            name: 'South Africa',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'TR',
            name: 'Turkey',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'PT',
            name: 'Portugal',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'ES',
            name: 'Spain',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'LK',
            name: 'Sri Lanka',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'BR',
            name: 'Brazil',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'MV',
            name: 'Maldives',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'TH',
            name: 'Thailand',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'CU',
            name: 'Cuba',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'ID',
            name: 'Indonesia',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'PH',
            name: 'Philippines',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'BO',
            name: 'Bolivia',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'BG',
            name: 'Bulgaria',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'UZ',
            name: 'Uzbekistan',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'SV',
            name: 'El Salvador',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'PA',
            name: 'Panama',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'DO',
            name: 'Dominican Republic',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'BM',
            name: 'Bermuda',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'FR',
            name: 'France',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'JM',
            name: 'Jamaica',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'IT',
            name: 'Italy',
            value: '2.35',
            indicator: 'Environmental performance index'
        },
        {
            id: 'SN',
            name: 'Senegal',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'TG',
            name: 'Togo',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'RS',
            name: 'Serbia',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'ME',
            name: 'Montenegro',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'HR',
            name: 'Croatia',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'SI',
            name: 'Slovenia',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'BA',
            name: 'Bosnia and Herzegovina',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'MK',
            name: 'Macedonia',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'CM',
            name: 'Cameroon',
            value: '2.35',
            indicator: 'Environmental performance index'
        },
        {
            id: 'DJ',
            name: 'Djibouti',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'GT',
            name: 'Guatemala',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'KR',
            name: 'Korea, North',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'LR',
            name: 'Liberia',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'VE',
            name: 'Venezuela',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'VN',
            name: 'Vietnam',
            value: '2.35',
            indicator: 'Environmental performance index'
        },
        {
            id: 'AR',
            name: 'Argentina',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'CN',
            name: 'China',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'IN',
            name: 'India',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'JP',
            name: 'Japan',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'MT',
            name: 'Malta',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'MX',
            name: 'Mexico',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'PK',
            name: 'Pakistan',
            value: '2.35',
            indicator: 'Environmental performance index'
        },
        {
            id: 'SG',
            name: 'Singapore',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'TW',
            name: 'Taiwan',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'IL',
            name: 'Israel',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'KP',
            name: 'Korea, South',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'NE',
            name: 'Niger',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'SC',
            name: 'Seychelles',
            value: '2.3',
            indicator: 'Environmental performance index'
        },
        {
            id: 'SR',
            name: 'Suriname',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'CL',
            name: 'Chile',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'CR',
            name: 'Costa Rica',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'HK',
            name: 'Hong Kong',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'NL',
            name: 'Netherlands',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'SY',
            name: 'Syria',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'BB',
            name: 'Barbados',
            value: '8.7',
            indicator: 'Environmental performance index'
        },
        {
            id: 'HT',
            name: 'Haiti',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'AG',
            name: 'Antigua and Barbuda',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'VG',
            name: 'British Virgin Islands',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'MS',
            name: 'Montserrat',
            value: '7.4',
            indicator: 'Environmental performance index'
        },
        {
            id: 'PM',
            name: 'Saint Kitts and Nevis',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'AI',
            name: 'Anguilla',
            value: '1.6',
            indicator: 'Environmental performance index'
        },
        {
            id: 'GD',
            name: 'Grenada',
            value: '5.5',
            indicator: 'Environmental performance index'
        },
        {
            id: 'LC',
            name: 'St Lucia',
            value: '3.9',
            indicator: 'Environmental performance index'
        },
        {
            id: 'VC',
            name: 'St Vincent and the Grenadines',
            value: '2.3',
            indicator: 'Environmental performance index'
        }
    ];

    constructor(private http: HttpClient, private service: MapService) {}

    ngOnInit() {
        this.basicMap();
    }

    basicMap() {
        // The data used in this sample can be obtained from the CDN
        // https://cdn.anychart.com/samples/maps-general-features/world-bubble-map/data.json
        // anychart.data.loadJsonFile('https://cdn.anychart.com/samples/maps-general-features/wo`rld-bubble-map/data.json', function(data) {
        //     const map = anychart.map();
        //     map
        //         .credits()
        //         .enabled(true)
        //         .url('https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_population_density')
        //         .logoSrc('https://en.wikipedia.org/static/favicon/wikipedia.ico')
        //         .text(
        //             'Data source: https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_population_density'
        //         );
        //     map
        //         .title()
        //         .enabled(true)
        //         .useHtml(true)
        //         .padding([10, 0, 10, 0])
        //         .text('');

        //     map.geoData('anychart.maps.world');

        //     map.interactivity().selectionMode('none');
        //     map.padding(0);

        //     const dataSet = anychart.data.set(data);
        //     const density_data = dataSet.mapAs({ size: 'population' });

        //     const series = map.bubble(density_data);
        //     // set chart bubble settings
        //     map.maxBubbleSize('2%').minBubbleSize('0.5%');

        //     series.labels(false).selectionMode('none');
        //     const series_choropleth = map.choropleth(density_data);
        //     series_choropleth
        //         .selectionMode('none')
        //         .fill('#eaeaea')
        //         .stroke('#D2D2D2')
        //         .labels(false);

        //     series_choropleth
        //         .hovered()
        //         .stroke('#eaeaea')
        //         .fill('#D2D2D2');
        //     map
        //         .tooltip()
        //         .useHtml(true)
        //         .format(function() {
        //             return (
        //                 '<span style="color: #d9d9d9">Density</span>: ' +
        //                 parseFloat(this.getData('density')).toLocaleString() +
        //                 ' pop./km&#178 <br/>' +
        //                 '<span style="color: #d9d9d9">Population</span>: ' +
        //                 parseInt(this.getData('population')).toLocaleString() +
        //                 '<br/>' +
        //                 '<span style="color: #d9d9d9">Area</span>: ' +
        //                 parseInt(this.getData('area')).toLocaleString() +
        //                 ' km&#178'
        //             );
        //         });

        //     // create zoom controls
        //     const zoomController = anychart.ui.zoom();
        //     zoomController.render(map);
        //     // set container id for the chart
        //     map.container('worldmap');
        //     // initiate chart drawing
        //     map.draw();
        // });

        var map = anychart.map();
        map.geoData('anychart.maps.world');
        var series1 = map.bubble(this.locations);
        var series2 = map.choropleth(this.countryData);

        series1.labels().format('{%id}');
        series1.tooltip().format('{%size}');
        series1.tooltip().titleFormat('{%id}');

        series2.labels().format('{%name}');
        series2.tooltip().format('{%indicator}: {%value}');
        series2.tooltip().titleFormat('{%name}');

        map.maxBubbleSize(8);
        map.minBubbleSize(2);
        var colorRange = map.colorRange();
        colorRange.enabled(true);
        series2.colorScale(anychart.scales.linearColor('#B4E8C8', '#FDEC84', '#FFA7A5'));
        series2.stroke('#000 .1');

        var zoomController = anychart.ui.zoom();
        zoomController.render(map);
        map.container('worldmap');
        map.draw();
    }
}
