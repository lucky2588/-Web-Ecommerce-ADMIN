import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineController,
    LineElement,
    PointElement,
} from "chart.js";
import 'chartjs-plugin-annotation';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    
);
export const chartBar =  (label,target) => {
    const data = {
        labels : label,
        datasets: [
            {
                label: "target",
                data: target,
                backgroundColor: "#0d6efd ",
            }
        ],
    };
    const options = {
        responsive: true,       
        plugins: {
            legend: {
                position: "top",
            },

            title: {
                display: true,
                
            },
            datalabels: {
                display: true,
                align: 'center',
                anchor: 'center',
                color: 'black',
                font: {
                    weight: 'bold',
                },
                formatter: function (value, context) {
                    return value;
                },
            },                
        },
    };
    return {data , options}
}


export const lineBar =  (label,target) => {
    const data = {
        labels : label,
        datasets: [
            {
                label: "target",
                data: target,
                backgroundColor: "#0d6efd ",
            }
        ],
    };
    const options = {
        responsive: true,       
        plugins: {
            legend: {
                position: "top",
            },

            title: {
                display: true,
                
            },
            datalabels: {
                display: true,
                align: 'center',
                anchor: 'center',
                color: 'black',
                font: {
                    weight: 'bold',
                },
                formatter: function (value, context) {
                    return value;
                },
            },                
        },
    };
    return {data , options}
}



