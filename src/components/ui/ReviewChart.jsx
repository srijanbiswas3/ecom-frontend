import React from 'react'
import Chart from 'react-google-charts';

const ReviewChart = ({ chartData }) => {
    const colorGradient = [
        "#3d9306", // Dark Green for 5 stars
        "#95c207", // Green for 4.5 stars
        "#d2de0d", // Yellow Green for 4 stars (less bright)
        "#f9ee3f", // Yellow for 3.5 stars
        "#d6b404", // Dark Orange for 3 stars
        "#df9303", // Orange-Red for 2.5 stars
        "#ea8202", // Tomato for 2 stars
        "#f25501", // Light Coral for 1.5 stars
        "#aa0707"  // Dark Red for 1 star
    ];
    const data = [
        [
            "Stars",
            "Customer Reviews",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],

        ["5 star", chartData?.['5.0'] ?? 0, colorGradient[0], null],
        ["4.5 star", chartData?.['4.5'] ?? 0, colorGradient[1], null],
        ["4 star", chartData?.['4.0'] ?? 0, colorGradient[2], null],
        ["3.5 star", chartData?.['3.5'] ?? 0, colorGradient[3], null],
        ["3 star", chartData?.['3.0'] ?? 0, colorGradient[4], null],
        ["2.5 star", chartData?.['2.5'] ?? 0, colorGradient[5], null],
        ["2 star", chartData?.['2.0'] ?? 0, colorGradient[6], null],
        ["1.5 star", chartData?.['1.5'] ?? 0, colorGradient[7], null],
        ["1 star", chartData?.['1.0'] ?? 0, colorGradient[8], null]


    ];

    const options = {
        title: "Reviews",
        width: "100%",
        height: 300,
        legend: { position: "none" },
        hAxis: {
            minValue: 1,  // Ensure the horizontal axis starts at 0
            format: '0', //no decimals

        },

        bar: { groupWidth: '75%' },  // Optional: Adjust the width of the bars
    };
    return (
        <Chart
            chartType="BarChart"
            data={data}
            options={options}
        />
    )
}

export default ReviewChart