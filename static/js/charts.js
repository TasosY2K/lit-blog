import Chart from "chart.js";

const range = (start, end) => {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
};

const runCharts = () => {
    const timeChart = document.getElementById("timeChart");
    if (document.body.contains(timeChart)) {
        fetch("/admin/stats")
            .then((response) => response.json())
            .then(async (data) => {
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
                                    precision: 0,
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

                for (let i = 0; i < data.postData.length; i++) {
                    const element = data.postData[i];
                    await dateset.push(element.createdAt);
                }

                for (let i = 0; i < data.projectData.length; i++) {
                    const element = data.projectData[i];
                    await dateset.push(element.createdAt);
                }

                await dateset.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });

                await new Chart(timeChart, {
                    type: "line",
                    data: {
                        labels: dateset,
                        datasets: [
                            {
                                label: "Posts",
                                data: range(0, data.postData.length),
                                backgroundColor: "rgba(37, 57, 128, 0.7)",
                            },
                            {
                                label: "Projects",
                                data: range(0, data.projectData.length),
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
