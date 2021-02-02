import Chart from "chart.js";

const runCharts = () => {
    const timeChart = document.getElementById("timeChart");
    if (document.body.contains(timeChart)) {
        fetch("/admin/stats")
            .then((response) => response.json())
            .then((data) => {
                const chartOptions = {
                    scales: {
                        yAxes: [
                            {
                                gridLines: {
                                    display: true,
                                    color: "rgba(128, 128, 128, 0.6)",
                                    zeroLineColor: "#808080",
                                    lineWidth: 1,
                                },
                                ticks: {
                                    fontColor: "#808080",
                                    beginAtZero: true,
                                },
                            },
                        ],
                        xAxes: [
                            {
                                gridLines: {
                                    display: true,
                                    color: "rgba(128, 128, 128, 0.3)",
                                    zeroLineColor: "#808080",
                                    lineWidth: 1,
                                },
                                ticks: {
                                    fontColor: "#808080",
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                    responsive: true,
                };
                let dateset = [];
                let amountset1 = [];
                let amountset2 = [];
                data.postData.forEach((element, i) => {
                    dateset.push(element.createdAt);
                    amountset1.push(i);
                });
                data.projectData.forEach((element, i) => {
                    dateset.push(element.createdAt);
                    amountset2.push(i);
                });
                dateset.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
                new Chart(timeChart, {
                    type: "line",
                    data: {
                        labels: dateset,
                        datasets: [
                            {
                                label: "Posts",
                                data: amountset1,
                                backgroundColor: "rgba(37, 57, 128, 0.7)",
                            },
                            {
                                label: "Projects",
                                data: amountset2,
                                backgroundColor: "rgba(40, 133, 54  , 0.7)",
                            },
                        ],
                    },
                    options: chartOptions,
                });
            });
    }
};

if (window.addEventListener) window.addEventListener("load", runCharts, false);
else if (window.attachEvent) window.attachEvent("onload", runCharts);
else window.onload = runCharts;
