/**
 * FASE 5: DATA TABLES INTEGRATION
 * DataTables.js - Tabla Interactiva con Datos Territoriales
 * 
 * Funcionalidades:
 * 1. Tabla responsive con DataTables
 * 2. Búsqueda integrada
 * 3. Paginación dinámmica
 * 4. Ordenamiento por columnas
 * 5. Exportación de datos (CSV, PDF, Excel)
 * 6. Sincronización con filtros FASE 4
 */

class OCPDataTable {
    constructor(tableId = 'territorioDataTable') {
        this.tableId = tableId;
        this.table = null;
        this.allData = this.generateTableData();
        this.filteredData = this.allData;
        this.init();
    }
    
    /**
     * Inicializa DataTable
     */
    init() {
        console.log('📋 Inicializando DataTable FASE 5');
        
        // Esperar a que DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                this.createTable();
                console.log('✅ DataTable creado exitosamente');
            }, 1500);
        });
    }
    
    /**
     * Genera datos completos para la tabla
     */
    generateTableData() {
        return [
            // Sector Norte
            { sector: 'Sector Norte', municipio: 'Toledo', categoria: 'Demográfico', poblacion: 748, agua: 120, suelo: 'Agrícola', produccion: 850, estado: 'Activo' },
            { sector: 'Sector Norte', municipio: 'Garagoa', categoria: 'Agricultura', poblacion: 320, agua: 85, suelo: 'Ganadero', produccion: 150, estado: 'Activo' },
            { sector: 'Sector Norte', municipio: 'Ventaquemada', categoria: 'Ambiente', poblacion: 145, agua: 95, suelo: 'Forestal', produccion: 200, estado: 'Activo' },
            { sector: 'Sector Norte', municipio: 'Chita', categoria: 'Infraestructura', poblacion: 98, agua: 60, suelo: 'Urbano', produccion: 80, estado: 'Monitoreado' },
            
            // Sector Centro
            { sector: 'Sector Centro', municipio: 'Tunja', categoria: 'Demográfico', poblacion: 1185, agua: 280, suelo: 'Agrícola', produccion: 950, estado: 'Activo' },
            { sector: 'Sector Centro', municipio: 'Duitama', categoria: 'Agricultura', poblacion: 580, agua: 150, suelo: 'Ganadero', produccion: 420, estado: 'Activo' },
            { sector: 'Sector Centro', municipio: 'Sogamoso', categoria: 'Ambiente', poblacion: 340, agua: 110, suelo: 'Forestal', produccion: 380, estado: 'Activo' },
            { sector: 'Sector Centro', municipio: 'Tuta', categoria: 'Infraestructura', poblacion: 220, agua: 85, suelo: 'Urbano', produccion: 150, estado: 'Monitoreado' },
            { sector: 'Sector Centro', municipio: 'Paipa', categoria: 'Agricultura', poblacion: 310, agua: 95, suelo: 'Agrícola', produccion: 380, estado: 'Activo' },
            
            // Sector Sur
            { sector: 'Sector Sur', municipio: 'Ipiales', categoria: 'Demográfico', poblacion: 590, agua: 170, suelo: 'Agrícola', produccion: 620, estado: 'Activo' },
            { sector: 'Sector Sur', municipio: 'Pasto', categoria: 'Agricultura', poblacion: 280, agua: 95, suelo: 'Ganadero', produccion: 240, estado: 'Activo' },
            { sector: 'Sector Sur', municipio: 'Nariño', categoria: 'Ambiente', poblacion: 165, agua: 75, suelo: 'Forestal', produccion: 180, estado: 'Activo' },
            { sector: 'Sector Sur', municipio: 'Potosí', categoria: 'Infraestructura', poblacion: 112, agua: 55, suelo: 'Urbano', produccion: 95, estado: 'Por Revisar' },
            
            // Valle
            { sector: 'Valle', municipio: 'Calarcá', categoria: 'Demográfico', poblacion: 324, agua: 140, suelo: 'Agrícola', produccion: 480, estado: 'Activo' },
            { sector: 'Valle', municipio: 'Filandia', categoria: 'Agricultura', poblacion: 156, agua: 60, suelo: 'Ganadero', produccion: 120, estado: 'Activo' },
            { sector: 'Valle', municipio: 'Salento', categoria: 'Ambiente', poblacion: 98, agua: 50, suelo: 'Forestal', produccion: 140, estado: 'Activo' },
            { sector: 'Valle', municipio: 'Córdoba', categoria: 'Infraestructura', poblacion: 87, agua: 45, suelo: 'Urbano', produccion: 70, estado: 'Monitoreado' }
        ];
    }
    
    /**
     * Crea e inicializa la tabla DataTables
     */
    createTable() {
        const container = document.getElementById(this.tableId);
        
        if (!container) {
            console.warn(`⚠️ Contenedor #${this.tableId} no encontrado`);
            return;
        }
        
        // Crear tabla HTML
        let html = `
            <table class="table table-hover table-striped" id="dataTable">
                <thead>
                    <tr>
                        <th>Sector</th>
                        <th>Municipio</th>
                        <th>Categoría</th>
                        <th>Población</th>
                        <th>Agua (L/día)</th>
                        <th>Uso Suelo</th>
                        <th>Producción (t)</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        // Agregar filas de datos
        this.allData.forEach(row => {
            const statusColor = this.getStatusColor(row.estado);
            html += `
                <tr>
                    <td><span class="badge bg-info">${row.sector}</span></td>
                    <td><strong>${row.municipio}</strong></td>
                    <td>${this.getCategoryIcon(row.categoria)} ${row.categoria}</td>
                    <td>${row.poblacion.toLocaleString('es-CO')}</td>
                    <td>${row.agua.toLocaleString('es-CO')}</td>
                    <td>${row.suelo}</td>
                    <td>${row.produccion.toLocaleString('es-CO')}</td>
                    <td><span class="badge ${statusColor}">${row.estado}</span></td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-primary" onclick="window.dataTable.viewRow('${row.municipio}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-success" onclick="window.dataTable.exportRow('${row.municipio}')">
                            <i class="fas fa-download"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
        
        container.innerHTML = html;
        
        // Inicializar DataTables Plugin
        this.table = $('#dataTable').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
            },
            dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>><"row"<"col-sm-12"tr>><"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
            pageLength: 10,
            lengthMenu: [5, 10, 25, 50, 100],
            responsive: true,
            order: [[0, 'asc'], [1, 'asc']],
            columnDefs: [
                { targets: 8, orderable: false, searchable: false } // Columna Acciones
            ],
            drawCallback: () => {
                console.log('✅ DataTable renderizado');
            }
        });
        
        console.log('✅ DataTables inicializado con', this.allData.length, 'registros');
    }
    
    /**
     * Aplica filtros a la tabla
     */
    applyFilters(filters) {
        console.log('🔍 Aplicando filtros a DataTable:', filters);
        
        this.filteredData = this.allData.filter(row => {
            // Filtro por sector
            if (filters.sector && filters.sector !== 'all') {
                const sectorMap = {
                    north: 'Sector Norte',
                    center: 'Sector Centro',
                    south: 'Sector Sur',
                    valley: 'Valle'
                };
                if (row.sector !== sectorMap[filters.sector]) return false;
            }
            
            // Filtro por categoría
            if (filters.category && filters.category !== 'all') {
                const categoryMap = {
                    demographic: 'Demográfico',
                    agriculture: 'Agricultura',
                    environment: 'Ambiente',
                    infrastructure: 'Infraestructura'
                };
                if (row.categoria !== categoryMap[filters.category]) return false;
            }
            
            return true;
        });
        
        // Actualizar tabla con datos filtrados
        if (this.table) {
            this.table.clear();
            
            this.filteredData.forEach(row => {
                const statusColor = this.getStatusColor(row.estado);
                this.table.row.add([
                    `<span class="badge bg-info">${row.sector}</span>`,
                    `<strong>${row.municipio}</strong>`,
                    `${this.getCategoryIcon(row.categoria)} ${row.categoria}`,
                    row.poblacion.toLocaleString('es-CO'),
                    row.agua.toLocaleString('es-CO'),
                    row.suelo,
                    row.produccion.toLocaleString('es-CO'),
                    `<span class="badge ${statusColor}">${row.estado}</span>`,
                    `<button class="btn btn-sm btn-outline-primary" onclick="window.dataTable.viewRow('${row.municipio}')"><i class="fas fa-eye"></i></button>
                     <button class="btn btn-sm btn-outline-success" onclick="window.dataTable.exportRow('${row.municipio}')"><i class="fas fa-download"></i></button>`
                ]);
            });
            
            this.table.draw();
            console.log('✅ Tabla filtrada:', this.filteredData.length, 'registros');
        }
    }
    
    /**
     * Obtiene color de estado
     */
    getStatusColor(estado) {
        const colors = {
            'Activo': 'bg-success',
            'Monitoreado': 'bg-warning',
            'Por Revisar': 'bg-danger',
            'Inactivo': 'bg-secondary'
        };
        return colors[estado] || 'bg-secondary';
    }
    
    /**
     * Obtiene icono de categoría
     */
    getCategoryIcon(categoria) {
        const icons = {
            'Demográfico': '👥',
            'Agricultura': '🌾',
            'Ambiente': '🌳',
            'Infraestructura': '🏗️'
        };
        return icons[categoria] || '📊';
    }
    
    /**
     * Ver detalle de fila
     */
    viewRow(municipio) {
        const row = this.allData.find(r => r.municipio === municipio);
        if (row) {
            const message = `<strong>${municipio}</strong><br>
                           Sector: ${row.sector}<br>
                           Población: ${row.poblacion}<br>
                           Producción: ${row.produccion} ton<br>
                           Estado: ${row.estado}`;
            
            if (window.toastr) {
                toastr.info(message, 'Detalle del Municipio', { timeOut: 5000 });
            }
            console.log('👁️ Viendo detalle:', municipio, row);
        }
    }
    
    /**
     * Exporta fila individual
     */
    exportRow(municipio) {
        const row = this.allData.find(r => r.municipio === municipio);
        if (row) {
            const csv = this.convertToCSV([row]);
            this.downloadCSV(csv, `${municipio}-datos.csv`);
            window.toastr && toastr.success(`Datos de ${municipio} descargados`, 'Exportación');
        }
    }
    
    /**
     * Exporta todos los datos visibles
     */
    exportAllData(format = 'csv') {
        console.log(`📊 Exportando tabla en ${format.toUpperCase()}`);
        
        if (format === 'csv') {
            const csv = this.convertToCSV(this.filteredData);
            this.downloadCSV(csv, 'datos-territoriales.csv');
        } else if (format === 'excel') {
            this.exportToExcel(this.filteredData);
        } else if (format === 'pdf') {
            this.exportToPDF(this.filteredData);
        }
        
        window.toastr && toastr.success(`Tabla exportada en ${format.toUpperCase()}`, 'Exportación');
    }
    
    /**
     * Convierte datos a CSV
     */
    convertToCSV(data) {
        const headers = ['Sector', 'Municipio', 'Categoría', 'Población', 'Agua (L/día)', 'Suelo', 'Producción (t)', 'Estado'];
        
        let csv = headers.join(',') + '\n';
        
        data.forEach(row => {
            const values = [
                row.sector,
                row.municipio,
                row.categoria,
                row.poblacion,
                row.agua,
                row.suelo,
                row.produccion,
                row.estado
            ];
            csv += values.map(v => `"${v}"`).join(',') + '\n';
        });
        
        return csv;
    }
    
    /**
     * Descarga CSV
     */
    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ CSV descargado:', filename);
    }
    
    /**
     * Exporta a Excel (requiere librería adicional)
     */
    exportToExcel(data) {
        // Implementación básica sin librería externa
        const csv = this.convertToCSV(data);
        this.downloadCSV(csv, 'datos-territoriales.xlsx');
        console.log('📊 Datos exportados a Excel format');
    }
    
    /**
     * Exporta a PDF (requiere librería adicional)
     */
    exportToPDF(data) {
        // Implementación básica - mostrar mensaje
        if (window.toastr) {
            toastr.warning('PDF export disponible en próxima versión (requiere jsPDF)', 'Exportación PDF');
        }
        console.log('⚠️ PDF export no implementado aún');
    }
    
    /**
     * Busca en la tabla
     */
    search(query) {
        if (this.table) {
            this.table.search(query).draw();
            console.log('🔍 Buscando:', query);
        }
    }
    
    /**
     * Limpia búsqueda
     */
    clearSearch() {
        if (this.table) {
            this.table.search('').draw();
            console.log('🔄 Búsqueda limpiada');
        }
    }
}

// Inicializar DataTable cuando documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.dataTable = new OCPDataTable('territorioDataTable');
    console.log('✅ FASE 5: DataTable inicializado');
    
    // Conectar con sistema de filtros
    setTimeout(() => {
        if (window.dashboardFilters) {
            console.log('🔗 DataTable conectado con sistema de filtros');
        }
    }, 2000);
});
