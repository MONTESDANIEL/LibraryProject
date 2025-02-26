import { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, ChartOptions } from "chart.js";
import { listLoans } from "@api/LoanApi.js";
import { listAllBooks } from "@api/BookApi.js";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

interface StatisticsData {
    totalBooks: number;
    availableBooks: number;
    unavailableBooks: number;
    uniqueUsers: number;
    currentMonthLoans: number;
    dailyLoans: number[];
}

interface Loan {
    loanId: number;
    userName: string;
    userEmail: string;
    userId: number;
    userPhone: string;
    userAddress: string;
    bookId: number;
    loanDate: string;
    returnDate: string;
}

const Statistics = () => {
    const [stats, setStats] = useState<StatisticsData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [books, loans] = await Promise.all([listAllBooks(), listLoans()]);

                // Procesar libros
                const totalBooks = books.length;
                const unavailableBooks = loans.length; // Suponiendo que cada préstamo representa un libro no disponible
                const availableBooks = totalBooks - unavailableBooks;

                // Procesar préstamos
                const loanStats = processLoanData(loans);

                setStats({
                    totalBooks,
                    availableBooks,
                    unavailableBooks,
                    ...loanStats
                });
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();
    }, []);


    const processLoanData = (loans: Loan[]): Pick<StatisticsData, 'currentMonthLoans' | 'dailyLoans' | 'uniqueUsers'> => {
        const currentMonth = new Date().getMonth() + 1;
        const dailyLoans = Array(30).fill(0);
        let currentMonthLoans = 0;
        const uniqueUsers = new Set<string>();

        loans.forEach(({ loanDate, userId }) => {
            const [_, month, day] = loanDate.split("-").map(Number);
            if (month === currentMonth) {
                currentMonthLoans++;
                uniqueUsers.add(String(userId)); // Agregamos el usuario al Set
                if (day - 1 >= 0 && day - 1 < dailyLoans.length) {
                    dailyLoans[day - 1]++;
                }
            }
        });

        return { currentMonthLoans, dailyLoans, uniqueUsers: uniqueUsers.size };
    };

    const pieData = stats ? {
        labels: ["Disponibles", "No disponibles"],
        datasets: [{
            data: [stats.availableBooks, stats.unavailableBooks],
            backgroundColor: ["#02910b", "#db0000"],
            hoverBackgroundColor: ["#29ab31", "#ff4646"],
        }],
    } : null;

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

    const lineData = stats ? {
        labels: Array.from({ length: 30 }, (_, i) => `Día ${i + 1}`),
        datasets: [{
            label: "Préstamos por día",
            data: stats.dailyLoans,
            borderColor: "#026491",
            tension: 0.3,
        }],
    } : null;

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

    return (
        <div className="container-fluid">
            <div className="row bg-light p-3 m-3 rounded-4 min-vh-100">
                <h1 className="text-center fw-bold p-3">Estadísticas</h1>
                {stats ? (
                    <>
                        <div className="col-12 col-md-6 mb-4">
                            <div className="card shadow p-2 h-100">
                                <div className="card-body d-flex flex-column justify-content-center">
                                    <h5 className="text-center fw-bold">Resumen</h5>
                                    <table className="table table-striped table-bordered table-hover mt-3 ">
                                        <tbody>
                                            <tr><td>Total de libros</td><td className="text-center">{stats.totalBooks}</td></tr>
                                            <tr><td>Libros disponibles</td><td className="text-center">{stats.availableBooks}</td></tr>
                                            <tr><td>Libros no disponibles</td><td className="text-center">{stats.unavailableBooks}</td></tr>
                                            <tr><td>Usuarios únicos</td><td className="text-center">{stats.uniqueUsers}</td></tr>
                                            <tr><td>Préstamos este mes</td><td className="text-center">{stats.currentMonthLoans}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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
                    <h5 className="mb-0 text-center">No se encontraron datos para mostrar</h5>
                )}
            </div>
        </div>
    );
};

export default Statistics;
