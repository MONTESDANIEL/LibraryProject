import { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, ChartOptions } from "chart.js";
import loans from "../data/loans.js";
import statisticsData from "../data/statsData.js";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

interface StatisticsData {
    totalBooks: number;
    availableBooks: number;
    unavailableBooks: number;
    mostBorrowedBook: string;
    uniqueUsers: number;
    currentMonthLoans: number;
    dailyLoans: number[];
}

interface Loan {
    id: number;
    book_id: number;
    user_id: number;
    loan_date: string;
    return_date: string;
}

const Statistics = () => {
    const [stats, setStats] = useState<StatisticsData | null>(null);

    useEffect(() => {
        const processLoanData = () => {
            const { totalBooks, availableBooks, unavailableBooks, mostBorrowedBook } = statisticsData;
            const uniqueUsers = new Set(loans.map((loan: Loan) => loan.user_id)).size;

            const currentMonth = new Date().getMonth() + 1;
            const currentMonthLoans = loans.filter((loan: Loan) => new Date(loan.loan_date).getMonth() + 1 === currentMonth).length;

            const dailyLoans = Array(30).fill(0);
            loans.forEach((loan: Loan) => {
                const loanDate = new Date(loan.loan_date);
                if (loanDate.getMonth() + 1 === currentMonth) {
                    dailyLoans[loanDate.getDate() - 1]++;
                }
            });

            return {
                totalBooks,
                availableBooks,
                unavailableBooks,
                mostBorrowedBook,
                uniqueUsers,
                currentMonthLoans,
                dailyLoans,
            };
        };

        setStats(processLoanData());
    }, []);

    // Configuración para el Pie Chart
    const pieOptions: ChartOptions<"pie"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Disponibilidad de Libros",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const chart = tooltipItem.chart;
                        const datasetIndex = tooltipItem.datasetIndex;
                        const dataset = chart.data.datasets[datasetIndex].data as number[];

                        // Calcular total de toda la serie de datos
                        const total = dataset.reduce((a, b) => a + b, 0);
                        const value = dataset[tooltipItem.dataIndex];
                        const percentage = total ? ((value / total) * 100).toFixed(2) : "0.0";

                        return `${tooltipItem.label}: ${percentage}% (${value} libros)`;
                    },
                },

            },
        },
    };

    const pieData = stats
        ? {
            labels: ["Disponibles", "No disponibles"],
            datasets: [
                {
                    data: [stats.availableBooks, stats.unavailableBooks],
                    backgroundColor: ["#4CAF50", "#F44336"],
                    hoverBackgroundColor: ["#45A049", "#D32F2F"],
                },
            ],
        }
        : null;

    // Configuración para el Line Chart
    const lineOptions: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Préstamos diarios del mes",
            },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 90,
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const lineData = stats
        ? {
            labels: Array.from({ length: 30 }, (_, i) => `Día ${i + 1}`),
            datasets: [
                {
                    label: "Préstamos por día",
                    data: stats.dailyLoans,
                    fill: false,
                    borderColor: "#007bff",
                    tension: 0.3,
                },
            ],
        }
        : null;

    return (
        <div className="container-fluid">
            <div className="row bg-light p-3 m-3 rounded-4 min-vh-100">
                <h1 className="text-center fw-bold p-3">Estadísticas</h1>

                {stats ? (
                    <>
                        {/* Resumen General */}
                        <div className="col-12 col-md-6 mb-4">
                            <div className="card shadow p-3 h-100">
                                <div className="card-body d-flex flex-column justify-content-center">
                                    <h5 className="card-title text-center fw-bold">Resumen</h5>
                                    <table className="table table-striped table-bordered table-hover mt-3">
                                        <tbody>
                                            <tr>
                                                <td className="align-middle text-center">Total de libros</td>
                                                <td className="fw-bold align-middle text-center">{stats.totalBooks}</td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle text-center">Libros disponibles</td>
                                                <td className="fw-bold align-middle text-center">{stats.availableBooks}</td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle text-center">Libros no disponibles</td>
                                                <td className="fw-bold align-middle text-center">{stats.unavailableBooks}</td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle text-center">Libro más prestado</td>
                                                <td className="fw-bold align-middle text-center">{stats.mostBorrowedBook}</td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle text-center">Usuarios únicos</td>
                                                <td className="fw-bold align-middle text-center">{stats.uniqueUsers}</td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle text-center">Préstamos este mes</td>
                                                <td className="fw-bold align-middle text-center">{stats.currentMonthLoans}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                        {/* Gráfico Pie - Disponibilidad */}
                        <div className="col-12 col-md-6 mb-4">
                            <div className="card shadow p-3 h-100">
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold">Disponibilidad de Libros</h5>
                                    {pieData && (
                                        <div className="d-flex justify-content-center" style={{ maxWidth: "100%", height: "300px" }}>
                                            <Pie data={pieData} options={pieOptions} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Gráfico Line - Préstamos por día */}
                        <div className="col-12 mb-4">
                            <div className="card shadow p-4 h-100">
                                <h5 className="card-title fw-bold text-center my-2">Préstamos diarios del mes</h5>
                                <div className="card-body" style={{ overflowX: 'auto' }}>
                                    {lineData && (
                                        <div className="w-100" style={{ minWidth: "550px", height: "300px" }}>
                                            <Line data={lineData} options={lineOptions} />
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-2">Cargando estadísticas...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Statistics;
