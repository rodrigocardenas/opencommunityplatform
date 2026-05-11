/**
 * FASE 2: MAP INTEGRATION
 * Leaflet.js - Mapa Territorial Interactivo para OCP
 * 
 * Funcionalidades:
 * - Mapa base con OpenStreetMap
 * - Capas intercambiables (demográfico, agrícola, ambiental, infraestructura)
 * - Markers y clusters de datos
 * - Heatmaps dinamicos
 * - Controles personalizados
 */

class OCPTerritorialMap {
    constructor(containerId = 'map') {
        this.containerId = containerId;
        this.map = null;
        this.markers = [];
        this.clusters = null;
        this.currentLayer = 'demographic';
        this.init();
    }
    
    /**
     * Inicializa el mapa Leaflet
     */
    init() {
        // Crear mapa centrado en Colombia (coordenadas centrales)
        this.map = L.map(this.containerId).setView([4.5709, -74.2973], 6);
        
        // Agregar capa base de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors',
            className: 'leaflet-tiles'
        }).addTo(this.map);
        
        // Agregar controles personalizados
        this.addCustomControls();
        
        // Cargar datos de ejemplo
        this.loadSampleData();
        
        // Agregar eventos del mapa
        this.attachMapEvents();
        
        console.log('✅ Mapa territorial inicializado');
    }
    
    /**
     * Agrega controles personalizados al mapa
     */
    addCustomControls() {
        // Control de capas
        const layerControl = L.control.layers(
            {}, // baselayers
            {
                'Demográfico': L.layerGroup(),
                'Agrícola': L.layerGroup(),
                'Ambiental': L.layerGroup(),
                'Infraestructura': L.layerGroup()
            },
            { position: 'topright', collapsed: false }
        ).addTo(this.map);
        
        // Control de escala
        L.control.scale().addTo(this.map);
        
        // Control personalizado de filtros
        const filterControl = L.Control.extend({
            options: {
                position: 'topleft'
            },
            
            onAdd: (map) => {
                const div = L.DomUtil.create('div', 'leaflet-filter-control');
                div.innerHTML = `
                    <div style="background: white; padding: 10px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 12px; color: #333;">
                            Filtrar por categoría:
                        </label>
                        <select id="map-layer-filter" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px;">
                            <option value="all">Todas las capas</option>
                            <option value="demographic">Demográfico</option>
                            <option value="agriculture">Agrícola</option>
                            <option value="environment">Ambiental</option>
                            <option value="infrastructure">Infraestructura</option>
                        </select>
                    </div>
                `;
                
                L.DomEvent.disableClickPropagation(div);
                return div;
            }
        });
        
        new filterControl().addTo(this.map);
    }
    
    /**
     * Carga datos de ejemplo en el mapa
     */
    loadSampleData() {
        const dataPoints = [
            {
                lat: 4.7110,
                lng: -74.0721,
                category: 'demographic',
                title: 'Centro Comunitario Norte',
                population: 2847,
                description: 'Centro principal de datos demográficos'
            },
            {
                lat: 4.6452,
                lng: -74.0829,
                category: 'agriculture',
                title: 'Zona Agrícola Sector Centro',
                production: '1,580 ton',
                description: 'Producción agrícola anual'
            },
            {
                lat: 4.5504,
                lng: -74.1294,
                category: 'environment',
                title: 'Punto de Monitoreo Ambiental',
                water: '462 L/día',
                description: 'Monitoreo de recursos hídricos'
            },
            {
                lat: 4.5265,
                lng: -74.0729,
                category: 'infrastructure',
                title: 'Proyecto de Infraestructura',
                status: 'En Progreso',
                description: 'Conexión de acueducto rural'
            },
            {
                lat: 4.6038,
                lng: -74.1558,
                category: 'agriculture',
                title: 'Granja Modelo Sector Sur',
                production: '990 ton',
                description: 'Producción agrícola innovadora'
            },
            {
                lat: 4.7538,
                lng: -74.0505,
                category: 'demographic',
                title: 'Punto de Censo',
                families: 847,
                description: 'Centro de recopilación de datos'
            }
        ];
        
        // Agregar markers para cada punto
        dataPoints.forEach(point => {
            this.addDataPoint(point);
        });
        
        // Agregar boundaries de sectores
        this.addSectorBoundaries();
        
        console.log(`✅ ${dataPoints.length} puntos de datos cargados`);
    }
    
    /**
     * Agrega un punto de dato al mapa
     */
    addDataPoint(data) {
        // Determinar color según categoría
        const colors = {
            demographic: '#2196F3',
            agriculture: '#4CAF50',
            environment: '#FF9800',
            infrastructure: '#9C27B0'
        };
        
        const iconColor = colors[data.category] || '#2196F3';
        
        // Crear icono personalizado
        const marker = L.circleMarker([data.lat, data.lng], {
            radius: 8,
            fillColor: iconColor,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
            className: `marker-${data.category}`
        });
        
        // Popup con información
        const popupContent = `
            <div style="min-width: 200px;">
                <h5 style="margin: 0 0 8px 0; font-weight: 600; color: ${iconColor};">
                    ${data.title}
                </h5>
                <p style="margin: 4px 0; font-size: 12px; color: #666;">
                    ${data.description}
                </p>
                ${data.population ? `<p style="margin: 4px 0; font-size: 12px;"><strong>Población:</strong> ${data.population} hab</p>` : ''}
                ${data.families ? `<p style="margin: 4px 0; font-size: 12px;"><strong>Familias:</strong> ${data.families}</p>` : ''}
                ${data.production ? `<p style="margin: 4px 0; font-size: 12px;"><strong>Producción:</strong> ${data.production}</p>` : ''}
                ${data.water ? `<p style="margin: 4px 0; font-size: 12px;"><strong>Agua:</strong> ${data.water}</p>` : ''}
                ${data.status ? `<p style="margin: 4px 0; font-size: 12px;"><strong>Estado:</strong> ${data.status}</p>` : ''}
            </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.addTo(this.map);
        
        this.markers.push({
            marker: marker,
            category: data.category,
            data: data
        });
    }
    
    /**
     * Agrega limites de sectores territoriales
     */
    addSectorBoundaries() {
        // Polígonos representando sectores
        const sectors = [
            {
                name: 'Sector Norte',
                color: 'rgba(33, 150, 243, 0.2)',
                coordinates: [
                    [4.8, -74.0],
                    [4.8, -74.3],
                    [4.6, -74.3],
                    [4.6, -74.0],
                    [4.8, -74.0]
                ]
            },
            {
                name: 'Sector Centro',
                color: 'rgba(76, 175, 80, 0.2)',
                coordinates: [
                    [4.6, -74.0],
                    [4.6, -74.3],
                    [4.4, -74.3],
                    [4.4, -74.0],
                    [4.6, -74.0]
                ]
            },
            {
                name: 'Sector Sur',
                color: 'rgba(255, 152, 0, 0.2)',
                coordinates: [
                    [4.4, -74.0],
                    [4.4, -74.3],
                    [4.2, -74.3],
                    [4.2, -74.0],
                    [4.4, -74.0]
                ]
            }
        ];
        
        sectors.forEach(sector => {
            L.polygon(sector.coordinates, {
                color: sector.color.replace('0.2', '0.5'),
                fillColor: sector.color,
                weight: 2,
                opacity: 0.7,
                fillOpacity: 0.3,
                dashArray: '5, 5'
            }).bindPopup(sector.name).addTo(this.map);
        });
    }
    
    /**
     * Filtra markers por categoría
     */
    filterByCategory(category) {
        this.markers.forEach(item => {
            if (category === 'all' || item.category === category) {
                item.marker.setStyle({ opacity: 1, fillOpacity: 0.8 });
            } else {
                item.marker.setStyle({ opacity: 0.3, fillOpacity: 0.2 });
            }
        });
        
        this.currentLayer = category;
        toastr.info(`Mostrando: ${category === 'all' ? 'Todas las capas' : category}`);
    }
    
    /**
     * Adjunta eventos del mapa
     */
    attachMapEvents() {
        // Escuchar cambios en el selector de filtros
        const filterSelect = document.getElementById('map-layer-filter');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.filterByCategory(e.target.value);
            });
        }
        
        // Evento de zoom
        this.map.on('zoom', () => {
            const zoom = this.map.getZoom();
            if (zoom < 8) {
                console.log('🔍 Zoom alejado - viendo vista regional');
            } else if (zoom < 12) {
                console.log('🔍 Zoom medio - viendo sectores');
            } else {
                console.log('🔍 Zoom cercano - viendo puntos detallados');
            }
        });
    }
    
    /**
     * Agregar heatmap (simulado)
     */
    addHeatmap(category) {
        console.log(`📊 Activando heatmap para: ${category}`);
        toastr.info(`Mostrando densidad: ${category}`);
    }
    
    /**
     * Centrar mapa en un punto específico
     */
    centerOn(lat, lng, zoom = 12) {
        this.map.setView([lat, lng], zoom);
    }
    
    /**
     * Exportar vista actual
     */
    exportView() {
        const bounds = this.map.getBounds();
        const center = this.map.getCenter();
        const zoom = this.map.getZoom();
        
        return {
            center: { lat: center.lat, lng: center.lng },
            bounds: {
                north: bounds.getNorth(),
                south: bounds.getSouth(),
                east: bounds.getEast(),
                west: bounds.getWest()
            },
            zoom: zoom
        };
    }
}

// Inicializar mapa cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        window.territorialMap = new OCPTerritorialMap('map');
        console.log('🗺️ Sistema de Mapa Territorial inicializado');
    }
});
