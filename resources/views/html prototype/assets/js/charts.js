/**
 * FASE 3: DYNAMIC CHARTS
 * Chart.js - Gráficos Dinámicos Interactivos para OCP
 * 
 * Gráficos implementados:
 * 1. Evolución Demográfica (Line Chart)
 * 2. Producción Agrícola por Sector (Bar Chart)
 * 3. Uso de Suelo (Pie/Doughnut Chart)
 * 4. Recursos Hídricos (Area Chart)
 */

class OCPDashboardCharts {
    constructor() {
        this.charts = {};
        this.chartConfigs = {};
        this.data = this.getSampleData();
        this.init();
    }
    
    /**
     * Inicializa todos los gráficos
     */
    init() {
        // Configurar opciones globales de Chart.js
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.font.size = 12;
        Chart.defaults.color = '#666666';
        Chart.defaults.borderColor = '#e0e0e0';
        
        // Crear cada gráfico
        this.createDemographicChart();
        this.createProductionChart();
        this.createLandUseChart();
        this.createWaterResourcesChart();
        
        console.log('✅ Todos los gráficos Chart.js inicializados');
    }
    
    /**
     * Obtiene datos de ejemplo (puede reemplazarse con API)
     */
    getSampleData() {
        return {
            months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            demographic: {
                2024: [2750, 2780, 2810, 2835, 2843, 2847],
                2023: [2680, 2700, 2720, 2740, 2755, 2770]
            },
            production: {
                norte: 1250,
                centro: 1580,
                sur: 990,
                valle: 670
            },
            landUse: {
                agricola: 35,
                ganadero: 25,
                forestal: 20,
                urbano: 10,
                otros: 10
            },
            water: [840, 450, 250, 350, 480, 320]
        };
    }
    
    /**
     * 1. GRÁFICO DE EVOLUCIÓN DEMOGRÁFICA (Line Chart)
     */
    createDemographicChart() {
        const container = document.getElementById('chart-demo');
        if (!container) {
            console.warn('⚠️ Contenedor #chart-demo no encontrado');
            return;
        }
        
        // Crear canvas para el gráfico
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '250px';
        canvas.style.display = 'block';
        container.innerHTML = '';
        container.appendChild(canvas);
        
        this.charts.demographic = new Chart(canvas, {
            type: 'line',
            data: {
                labels: this.data.months,
                datasets: [
                    {
                        label: 'Población 2024',
                        data: this.data.demographic['2024'],
                        borderColor: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.08)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointBackgroundColor: '#2196F3',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 7,
                        segment: {
                            borderDash: [0]
                        }
                    },
                    {
                        label: 'Población 2023',
                        data: this.data.demographic['2023'],
                        borderColor: '#90CAF9',
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false,
                        pointRadius: 4,
                        pointBackgroundColor: '#90CAF9',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            fontWeight: '600',
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 13, weight: 'bold' },
                        bodyFont: { size: 12 },
                        padding: 12,
                        borderRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' hab';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString('es-CO');
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
            }
        });
        
        console.log('✅ Gráfico de Evolución Demográfica creado');
    }
    
    /**
     * 2. GRÁFICO DE PRODUCCIÓN AGRÍCOLA (Bar Chart)
     */
    createProductionChart() {
        const ctx = document.getElementById('chart-production');
        if (!ctx) {
            console.warn('⚠️ Contenedor #chart-production no encontrado');
            return;
        }
        
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '250px';
        canvas.style.display = 'block';
        ctx.innerHTML = '';
        ctx.appendChild(canvas);
        
        const sectors = ['Sector Norte', 'Sector Centro', 'Sector Sur', 'Valle'];
        const production = [
            this.data.production.norte,
            this.data.production.centro,
            this.data.production.sur,
            this.data.production.valle
        ];
        
        // Colores por sector
        const colors = [
            '#FF6B35',  // Naranja
            '#4CAF50',  // Verde
            '#2196F3',  // Azul
            '#9C27B0'   // Púrpura
        ];
        
        this.charts.production = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: sectors,
                datasets: [{
                    label: 'Producción (Toneladas)',
                    data: production,
                    backgroundColor: colors,
                    borderRadius: 8,
                    borderSkipped: false,
                    borderWidth: 0,
                    hoverBackgroundColor: colors.map(c => this.lightenColor(c, 0.2)),
                    hoverBorderRadius: [12, 12, 12, 12]
                }]
            },
            options: {
                indexAxis: 'x',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            fontWeight: '600'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        borderRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toLocaleString('es-CO') + ' ton';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString('es-CO');
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
            }
        });
        
        console.log('✅ Gráfico de Producción Agrícola creado');
    }
    
    /**
     * 3. GRÁFICO DE USO DE SUELO (Pie/Doughnut Chart)
     */
    createLandUseChart() {
        const ctx = document.getElementById('chart-land');
        if (!ctx) {
            console.warn('⚠️ Contenedor #chart-land no encontrado');
            return;
        }
        
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '250px';
        canvas.style.display = 'block';
        ctx.innerHTML = '';
        ctx.appendChild(canvas);
        
        const labels = ['Agrícola', 'Ganadero', 'Forestal', 'Urbano', 'Otros'];
        const data = [
            this.data.landUse.agricola,
            this.data.landUse.ganadero,
            this.data.landUse.forestal,
            this.data.landUse.urbano,
            this.data.landUse.otros
        ];
        
        const colors = [
            '#4CAF50',  // Verde
            '#FF9800',  // Naranja
            '#2196F3',  // Azul
            '#9C27B0',  // Púrpura
            '#F44336'   // Rojo
        ];
        
        this.charts.landUse = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderColor: '#fff',
                    borderWidth: 2,
                    hoverBorderWidth: 3,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            fontWeight: '600',
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        borderRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
        
        console.log('✅ Gráfico de Uso de Suelo creado');
    }
    
    /**
     * 4. GRÁFICO DE RECURSOS HÍDRICOS (Area Chart)
     */
    createWaterResourcesChart() {
        const ctx = document.getElementById('chart-water');
        if (!ctx) {
            console.warn('⚠️ Contenedor #chart-water no encontrado');
            return;
        }
        
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '250px';
        canvas.style.display = 'block';
        ctx.innerHTML = '';
        ctx.appendChild(canvas);
        
        this.charts.water = new Chart(canvas, {
            type: 'line',
            data: {
                labels: this.data.months,
                datasets: [{
                    label: 'Disponibilidad Hídrica (L/día)',
                    data: this.data.water,
                    borderColor: '#00BCD4',
                    backgroundColor: 'rgba(0, 188, 212, 0.15)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#00BCD4',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                    segment: {
                        borderDash: [0]
                    }
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            fontWeight: '600',
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 13, weight: 'bold' },
                        bodyFont: { size: 12 },
                        padding: 12,
                        borderRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' L';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString('es-CO');
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    }
                }
            }
        });
        
        console.log('✅ Gráfico de Recursos Hídricos creado');
    }
    
    /**
     * Actualiza todos los gráficos (útil para filtrado)
     */
    updateAllCharts(filters = {}) {
        console.log('🔄 Actualizando gráficos con filtros:', filters);
        
        // Aquí iría la lógica para actualizar los datos según filtros
        // Por ahora, simplemente recargar muestra animación
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.update('active');
        });
        
        toastr.info('Gráficos actualizados');
    }
    
    /**
     * Exportar gráfico como imagen
     */
    exportChartAsImage(chartName) {
        const chart = this.charts[chartName];
        if (chart) {
            const url = chart.toBase64Image();
            const link = document.createElement('a');
            link.href = url;
            link.download = `${chartName}-chart.png`;
            link.click();
            toastr.success(`Gráfico de ${chartName} descargado`);
        }
    }
    
    /**
     * Utilidad: Aclarar color
     */
    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
            (G < 255 ? G : 255) * 0x100 +
            (B < 255 ? B : 255))
            .toString(16)
            .slice(1);
    }
}

// Inicializar gráficos cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que Chart.js esté disponible
    if (typeof Chart !== 'undefined') {
        window.dashboardCharts = new OCPDashboardCharts();
        console.log('📊 Sistema de Gráficos Chart.js inicializado');
    } else {
        console.error('❌ Chart.js no está disponible');
    }
});
