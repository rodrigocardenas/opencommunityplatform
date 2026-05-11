/**
 * FASE 4: FILTER INTEGRATION
 * Sistema de Filtros Dinámicos - Integración con Gráficos y Mapa
 * 
 * Componentes:
 * 1. Gestión de estado de filtros
 * 2. Actualización de datos de gráficos según filtros
 * 3. Sincronización con mapa Leaflet
 * 4. Actualización dinámica de KPIs
 */

class OCPDashboardFilters {
    constructor() {
        this.filters = {
            time: 'year',
            category: 'all',
            sector: 'all'
        };
        
        this.chartsInstance = null;
        this.mapInstance = null;
        
        // Datos completos (data lake)
        this.fullDataSet = this.generateComprehensiveData();
        
        this.init();
    }
    
    /**
     * Inicializa el sistema de filtros
     */
    init() {
        console.log('🔧 Inicializando sistema de filtros FASE 4');
        
        // Esperar a que los gráficos estén listos
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                this.attachEventListeners();
                console.log('✅ Listeners de filtros adjuntados');
            }, 1000);
        });
    }
    
    /**
     * Genera dataset completo con múltiples escenarios
     */
    generateComprehensiveData() {
        return {
            demographic: {
                [2024]: {
                    all: [2750, 2780, 2810, 2835, 2843, 2847],
                    north: [680, 705, 725, 740, 745, 748],
                    center: [1100, 1120, 1150, 1170, 1180, 1185],
                    south: [550, 560, 570, 580, 585, 590],
                    valley: [420, 395, 365, 345, 333, 324]
                },
                [2023]: {
                    all: [2680, 2700, 2720, 2740, 2755, 2770],
                    north: [650, 675, 695, 710, 720, 730],
                    center: [1050, 1070, 1100, 1120, 1135, 1145],
                    south: [530, 540, 550, 565, 575, 580],
                    valley: [450, 415, 375, 345, 325, 315]
                }
            },
            production: {
                all: { norte: 1250, centro: 1580, sur: 990, valle: 670 },
                agricultural: { norte: 1050, centro: 1280, sur: 890, valle: 570 },
                livestock: { norte: 200, centro: 300, sur: 100, valle: 100 },
                environmental: { norte: 800, centro: 1050, sur: 650, valle: 450 }
            },
            landUse: {
                agricola: 35,
                ganadero: 25,
                forestal: 20,
                urbano: 10,
                otros: 10
            },
            water: {
                [2024]: [840, 450, 250, 350, 480, 320],
                [2023]: [800, 420, 200, 300, 450, 280]
            }
        };
    }
    
    /**
     * Adjunta event listeners a los filtros
     */
    attachEventListeners() {
        const timeFilter = document.getElementById('timeFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const sectorFilter = document.getElementById('sectorFilter');
        const resetBtn = document.querySelector('.filter-reset');
        
        if (timeFilter) {
            timeFilter.addEventListener('change', (e) => this.handleFilterChange('time', e.target.value));
        }
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => this.handleFilterChange('category', e.target.value));
        }
        if (sectorFilter) {
            sectorFilter.addEventListener('change', (e) => this.handleFilterChange('sector', e.target.value));
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetAllFilters());
        }
        
        console.log('✅ Event listeners configurados');
    }
    
    /**
     * Maneja cambios en filtros
     */
    handleFilterChange(filterType, value) {
        this.filters[filterType] = value;
        console.log(`📊 Filtro actualizado: ${filterType} = ${value}`);
        console.log('🔄 Estado actual de filtros:', this.filters);
        
        // Actualizar visualizaciones
        this.updateCharts();
        this.updateMap();
        this.updateKPIs();
        this.updateDataTable();
        
        // Mostrar notificación
        this.showFilterNotification(filterType, value);
    }
    
    /**
     * Actualiza os gráficos según filtros activos
     */
    updateCharts() {
        const filteredData = this.getFilteredData();
        
        // Obtener instancia de gráficos
        if (!window.dashboardCharts) {
            console.warn('⚠️ Instancia de gráficos aún no disponible');
            return;
        }
        
        const chartsInstance = window.dashboardCharts;
        
        // Actualizar cada gráfico
        this.updateDemographicChart(chartsInstance, filteredData);
        this.updateProductionChart(chartsInstance, filteredData);
        this.updateLandUseChart(chartsInstance, filteredData);
        this.updateWaterChart(chartsInstance, filteredData);
        
        console.log('✅ Gráficos actualizados con nuevo filtro');
    }
    
    /**
     * Obtiene datos filtrados según criterios actuales
     */
    getFilteredData() {
        const filtered = {
            months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            period: this.filters.time,
            category: this.filters.category,
            sector: this.filters.sector
        };
        
        // Aplicar filtro de categoría a datos demográficos
        const sectorKey = this.filters.sector === 'all' ? 'all' : 
                         this.filters.sector === 'north' ? 'north' :
                         this.filters.sector === 'center' ? 'center' :
                         this.filters.sector === 'south' ? 'south' : 'valley';
        
        filtered.demographic2024 = this.fullDataSet.demographic[2024][sectorKey];
        filtered.demographic2023 = this.fullDataSet.demographic[2023][sectorKey];
        
        // Datos de producción
        if (this.filters.category === 'agriculture') {
            filtered.production = this.fullDataSet.production.agricultural;
        } else if (this.filters.category === 'livestock') {
            filtered.production = this.fullDataSet.production.livestock;
        } else if (this.filters.category === 'environment') {
            filtered.production = this.fullDataSet.production.environmental;
        } else {
            filtered.production = this.fullDataSet.production.all;
        }
        
        // Datos de uso de suelo
        filtered.landUse = this.fullDataSet.landUse;
        
        // Datos de agua
        filtered.water = this.fullDataSet.water[2024];
        
        return filtered;
    }
    
    /**
     * Actualiza gráfico demográfico
     */
    updateDemographicChart(chartsInstance, filteredData) {
        if (chartsInstance.charts.demographic) {
            const chart = chartsInstance.charts.demographic;
            chart.data.datasets[0].data = filteredData.demographic2024;
            chart.data.datasets[1].data = filteredData.demographic2023;
            chart.update('none');
        }
    }
    
    /**
     * Actualiza gráfico de producción
     */
    updateProductionChart(chartsInstance, filteredData) {
        if (chartsInstance.charts.production) {
            const chart = chartsInstance.charts.production;
            const sector = this.filters.sector;
            
            if (sector === 'all') {
                chart.data.labels = ['Sector Norte', 'Sector Centro', 'Sector Sur', 'Valle'];
                chart.data.datasets[0].data = [
                    filteredData.production.norte,
                    filteredData.production.centro,
                    filteredData.production.sur,
                    filteredData.production.valle
                ];
            } else {
                // Mostrar solo sector seleccionado
                const sectorNames = { north: 'Norte', center: 'Centro', south: 'Sur', valley: 'Valle' };
                const sectorKey = sector === 'north' ? 'norte' :
                                 sector === 'center' ? 'centro' :
                                 sector === 'south' ? 'sur' : 'valle';
                
                chart.data.labels = [sectorNames[sector]];
                chart.data.datasets[0].data = [filteredData.production[sectorKey]];
            }
            
            chart.update('none');
        }
    }
    
    /**
     * Actualiza gráfico de uso de suelo
     */
    updateLandUseChart(chartsInstance, filteredData) {
        if (chartsInstance.charts.landUse) {
            const chart = chartsInstance.charts.landUse;
            
            // Datos de uso de suelo varían según categoría
            let data = [35, 25, 20, 10, 10];
            
            if (this.filters.category === 'agriculture') {
                data = [50, 20, 15, 10, 5];
            } else if (this.filters.category === 'livestock') {
                data = [20, 50, 15, 10, 5];
            } else if (this.filters.category === 'environment') {
                data = [20, 15, 50, 10, 5];
            }
            
            chart.data.datasets[0].data = data;
            chart.update('none');
        }
    }
    
    /**
     * Actualiza gráfico de recursos hídricos
     */
    updateWaterChart(chartsInstance, filteredData) {
        if (chartsInstance.charts.water) {
            const chart = chartsInstance.charts.water;
            chart.data.datasets[0].data = filteredData.water;
            chart.update('none');
        }
    }
    
    /**
     * Actualiza mapa según filtros
     */
    updateMap() {
        if (window.territorialMap) {
            const mapInstance = window.territorialMap;
            
            // Filtrar markers por categoría
            if (this.filters.category !== 'all') {
                mapInstance.filterByCategory(this.filters.category);
            } else {
                mapInstance.filterByCategory('all');
            }
            
            console.log('🗺️ Mapa actualizado con filtro de categoría');
        }
    }
    
    /**
     * Actualiza DataTable según filtros
     */
    updateDataTable() {
        if (window.dataTable) {
            window.dataTable.applyFilters(this.filters);
            console.log('📋 DataTable actualizado con filtros');
        }
    }
    
    /**
     * Actualiza KPIs según datos filtrados
     */
    updateKPIs() {
        const filtered = this.getFilteredData();
        
        // Calcular promedio demográfico
        const avgDemo = Math.round(filtered.demographic2024.reduce((a, b) => a + b) / filtered.demographic2024.length);
        
        // Calcular producción total
        const totalProd = Object.values(filtered.production).reduce((a, b) => a + b, 0);
        
        // Actualizar elementos KPI (si existen)
        const kpiValues = document.querySelectorAll('.kpi-value');
        if (kpiValues[0]) {
            kpiValues[0].textContent = avgDemo.toLocaleString('es-CO');
        }
        if (kpiValues[1]) {
            kpiValues[1].textContent = totalProd.toLocaleString('es-CO');
        }
        
        console.log('📊 KPIs actualizados');
    }
    
    /**
     * Resetea todos los filtros
     */
    resetAllFilters() {
        this.filters = {
            time: 'year',
            category: 'all',
            sector: 'all'
        };
        
        // Resetear UI
        document.getElementById('timeFilter').value = 'year';
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('sectorFilter').value = 'all';
        
        // Actualizar visualizaciones
        this.updateCharts();
        this.updateMap();
        this.updateKPIs();
        this.updateDataTable();
        
        // Notificación
        window.toastr && toastr.info('Filtros reiniciados', 'Filtros');
        console.log('🔄 Filtros reiniciados');
    }
    
    /**
     * Muestra notificación de filtro aplicado
     */
    showFilterNotification(filterType, value) {
        const filterNames = {
            time: 'Período',
            category: 'Categoría',
            sector: 'Sector'
        };
        
        const filterDisplay = {
            month: 'Último mes',
            quarter: 'Último trimestre',
            year: 'Último año',
            all: 'Todos',
            demographic: 'Demográfico',
            agriculture: 'Agricultura',
            environment: 'Medio Ambiente',
            infrastructure: 'Infraestructura',
            north: 'Sector Norte',
            center: 'Sector Centro',
            south: 'Sector Sur',
            valley: 'Valle'
        };
        
        const message = `${filterNames[filterType]}: ${filterDisplay[value] || value}`;
        
        if (window.toastr) {
            toastr.success(message, 'Filtro Aplicado', { timeOut: 2000 });
        }
    }
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardFilters = new OCPDashboardFilters();
    console.log('✅ FASE 4: Sistema de filtros inicializado');
});
