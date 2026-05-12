import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Challenge {
    id: number;
    title: string;
    lat: number | null;
    lng: number | null;
}

interface MapProps {
    challenges: Challenge[];
    center?: [number, number];
}

export default function MapContainer({ challenges, center = [4.6097, -74.0817] }: MapProps) {
    return (
        <div className="w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden border border-slate-800 shadow-lg relative z-0">
            <LeafletMap center={center} zoom={13} scrollWheelZoom={false} className="w-full h-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {challenges.filter(c => c.lat && c.lng).map((challenge) => (
                    <Marker key={challenge.id} position={[challenge.lat as number, challenge.lng as number]}>
                        <Popup>
                            <div className="font-semibold">{challenge.title}</div>
                        </Popup>
                    </Marker>
                ))}
            </LeafletMap>
        </div>
    );
}
