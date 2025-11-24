import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const ContactMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Johannesburg coordinates
  const coordinates: [number, number] = [28.0473, -26.2041];

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates,
        zoom: 14,
      });

      // Add marker
      new mapboxgl.Marker({ color: '#CBA35C' })
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h3 style="font-weight: bold; margin-bottom: 4px;">Respect HQ</h3><p style="margin: 0;">Johannesburg, South Africa</p>')
        )
        .addTo(map.current);

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      setIsMapLoaded(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox-token', mapboxToken);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox-token');
    if (savedToken) {
      setMapboxToken(savedToken);
      initializeMap(savedToken);
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapLoaded && !mapboxToken) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-accent">
            <MapPin className="h-5 w-5" />
            <h3 className="font-semibold">Enter Mapbox Token</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            To display the map, please enter your Mapbox public token. Get one free at{' '}
            <a
              href="https://mapbox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <form onSubmit={handleTokenSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.eyJ1..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="accent">
              Load Map
            </Button>
          </form>
        </div>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default ContactMap;
