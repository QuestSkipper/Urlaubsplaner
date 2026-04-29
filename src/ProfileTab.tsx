import React from 'react';
import { User, Map, Calendar as CalendarIcon, Save, MapPin } from 'lucide-react';
import { destinations } from './data/destinations';

interface ProfileTabProps {
  destinationId: string;
  setDestinationId: (id: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  baseLocationName: string;
  setBaseLocationName: (name: string) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ 
  destinationId, 
  setDestinationId, 
  startDate, 
  setStartDate, 
  endDate, 
  setEndDate,
  baseLocationName,
  setBaseLocationName
}) => {

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDestId = e.target.value;
    setDestinationId(newDestId);
    
    // Auto-update base location to default when destination changes
    const dest = destinations.find(d => d.id === newDestId);
    if (dest) {
      setBaseLocationName(dest.baseLocation.name);
    }
  };

  return (
    <div style={{ padding: '80px 20px 100px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <div style={{ width: 48, height: 48, borderRadius: 24, background: '#0ea5e9', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
          <User size={24} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, color: '#0f172a', fontWeight: 'bold' }}>Mein Profil</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: 15 }}>Gestalte deine Reise</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 24, padding: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.08)', marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, color: '#1e293b', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Map size={20} color="#0ea5e9" /> 1. Reiseziel wählen
        </h2>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 8 }}>Destination</label>
          <select 
            value={destinationId}
            onChange={handleDestinationChange}
            style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1px solid #cbd5e1', fontSize: 16, background: '#f8fafc', color: '#0f172a', outline: 'none', appearance: 'none' }}
          >
            {destinations.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.country})</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 8 }}>Deine Home-Base</label>
          <div style={{ position: 'relative' }}>
            <MapPin size={18} color="#64748b" style={{ position: 'absolute', left: 16, top: 15 }} />
            <input 
              type="text" 
              value={baseLocationName}
              onChange={(e) => setBaseLocationName(e.target.value)}
              placeholder="z.B. Matala, Cala d'Or..."
              style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: 12, border: '1px solid #cbd5e1', fontSize: 16, background: '#f8fafc', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: '8px 0 0' }}>Die Home-Base wird für die Berechnung von Entfernungen und Spritkosten auf der Karte genutzt.</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: 24, padding: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: 18, color: '#1e293b', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarIcon size={20} color="#0ea5e9" /> 2. Zeitraum festlegen
        </h2>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 8 }}>Ankunft</label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: '100%', padding: '14px 12px', borderRadius: 12, border: '1px solid #cbd5e1', fontSize: 15, background: '#f8fafc', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 8 }}>Abreise</label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ width: '100%', padding: '14px 12px', borderRadius: 12, border: '1px solid #cbd5e1', fontSize: 15, background: '#f8fafc', color: '#0f172a', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32, textAlign: 'center', color: '#64748b', fontSize: 14 }}>
        <Save size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
        <p>Alle Änderungen werden automatisch gespeichert.</p>
      </div>

    </div>
  );
};

export default ProfileTab;
