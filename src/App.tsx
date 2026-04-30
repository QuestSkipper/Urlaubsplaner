import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  MapPin, 
  ChevronDown, 
  Navigation,
  Utensils,
  Plus,
  Minus,
  Wallet,
  Calendar,
  Star,
  Map as MapIcon,
  CalendarDays,
  User
} from 'lucide-react';
import { type ItineraryItem } from './data/itinerary';
import { destinations } from './data/destinations';
import ProfileTab from './ProfileTab';
import MapTab from './MapTab';
import type { CustomPin } from './MapTab';
import './index.css';

// Custom hook for local storage
function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const Checklist = () => {
  const [checks, setChecks] = useStickyState<Record<string, boolean>>({}, 'kreta-checklist');
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { id: 'p1', label: '🧴 Sonnencreme / Aftersun' },
    { id: 'p2', label: '💧 Wasser (min. 1.5L)' },
    { id: 'p3', label: '🚗 Führerschein & Mietwagen-Papiere' },
    { id: 'p4', label: '💶 Bargeld für Tavernen/Liegen' },
    { id: 'p5', label: '🕶️ Sonnenbrille & Kopfbedeckung' },
    { id: 'p6', label: '🩱 Badesachen & Strandtuch' },
    { id: 'p7', label: '🔋 Powerbank & Ladekabel' },
    { id: 'p8', label: '🍎 Snacks für zwischendurch' }
  ];

  const toggleCheck = (id: string) => {
    setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checks).filter(Boolean).length;

  return (
    <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 20, marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", overflow: 'hidden' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: isOpen ? 'rgba(14, 165, 233, 0.05)' : 'transparent' }}
      >
        <h3 style={{ fontSize: 16, margin: 0, display: 'flex', alignItems: 'center', gap: 8, color: '#075985' }}>
          <CheckSquare size={18} /> Tägliche Checkliste
          <span style={{ fontSize: 13, fontWeight: 'normal', color: '#64748b', background: '#e0f2fe', padding: '2px 8px', borderRadius: 12 }}>
            {checkedCount} / {items.length}
          </span>
        </h3>
        <ChevronDown size={20} color="#0ea5e9" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
      </div>
      
      {isOpen && (
        <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8, animation: 'fadeIn 0.3s ease' }}>
          {items.map(item => (
            <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: 'rgba(0,0,0,0.03)', padding: '10px 14px', borderRadius: 12 }}>
              <input 
                type="checkbox" 
                style={{ display: 'none' }}
                checked={!!checks[item.id]} 
                onChange={() => toggleCheck(item.id)}
              />
              <div style={{ width: 22, height: 22, borderRadius: 6, border: '2px solid #0ea5e9', display: 'flex', justifyContent: 'center', alignItems: 'center', background: checks[item.id] ? '#10b981' : 'transparent', borderColor: checks[item.id] ? '#10b981' : '#0ea5e9', color: 'white', transition: '0.2s' }}>
                {checks[item.id] && <CheckSquare size={14} />}
              </div>
              <span style={{ fontSize: 15, color: checks[item.id] ? '#9ca3af' : '#374151', textDecoration: checks[item.id] ? 'line-through' : 'none' }}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const OptionalDayCard = ({ 
  item, 
  counts, 
  updateCount,
  isPinned = false,
  togglePin
}: { 
  item: ItineraryItem, 
  counts: Record<string, number>, 
  updateCount: (id: string, delta: number) => void,
  isPinned?: boolean,
  togglePin?: (id: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const count = counts[item.costId] || 0;

  return (
    <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 20, marginBottom: 16, overflow: 'hidden', boxShadow: "0 8px 32px rgba(0,0,0,0.1)", borderLeft: isPinned ? '4px solid #e11d48' : '4px solid #f59e0b' }}>
      <div style={{ padding: 16, display: 'flex', alignItems: 'flex-start', gap: 16, cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fef3c7', padding: '4px 8px', borderRadius: 8, border: '1px solid #fcd34d' }} onClick={e => e.stopPropagation()}>
          <button style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: 4, width: 24, height: 24, fontWeight: 'bold' }} onClick={() => updateCount(item.costId, -1)}><Minus size={14}/></button>
          <span style={{ fontWeight: 'bold', minWidth: 16, textAlign: 'center', color: '#b45309' }}>{count}</span>
          <button style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: 4, width: 24, height: 24, fontWeight: 'bold' }} onClick={() => updateCount(item.costId, 1)}><Plus size={14}/></button>
        </div>
        <div style={{ flexGrow: 1 }}>
          <h3 style={{ fontSize: 16, marginBottom: 4, color: '#1f2937' }}>{item.title}</h3>
          <div style={{ fontSize: 13, color: '#6b7280' }}>
            {item.subtitle}
          </div>
          {togglePin && (
            <button 
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: isPinned ? '#e11d48' : 'rgba(0,0,0,0.05)', color: isPinned ? 'white' : '#6b7280', border: 'none', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 'bold', marginTop: 8 }}
              onClick={(e) => { e.stopPropagation(); togglePin(item.id); }}
            >
              <MapPin size={12} /> {isPinned ? 'Angepinnt' : 'Anpinnen'}
            </button>
          )}
        </div>
        <ChevronDown size={20} color="#0ea5e9" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
      </div>
      
      {isOpen && (
        <div style={{ padding: '0 16px 16px 16px', borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: 8, paddingTop: 16 }}>
          <img src={item.image} alt={item.location} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 12, marginBottom: 16, background: '#e5e7eb' }} loading="lazy" />
          
          <p style={{ margin: '0 0 16px', color: '#374151', lineHeight: 1.6, fontSize: 15 }}>{item.plan}</p>

          <div style={{ background: '#fef3c7', borderRadius: 12, padding: 16, borderLeft: '4px solid #f59e0b', marginBottom: 16 }}>
            <h4 style={{ color: '#b45309', marginBottom: 4, fontSize: 15 }}><Utensils size={14} style={{display:'inline', marginRight: 4}}/> {item.tavernaTip.name}</h4>
            <div style={{fontSize: 13, fontWeight: 'bold', color: '#f59e0b', marginBottom: 4}}>⭐ {item.tavernaTip.rating}</div>
            <p style={{ fontSize: 14, color: '#6b7280', fontStyle: 'italic', margin: 0 }}>{item.tavernaTip.desc}</p>
          </div>

          {item.beachTip && (
            <details style={{ background: '#ecfdf5', borderRadius: 12, padding: 12, borderLeft: '4px solid #10b981', marginBottom: 16, cursor: 'pointer' }}>
              <summary style={{ fontWeight: 'bold', color: '#047857', fontSize: 15, outline: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                🏖️ Strand-Tipp in der Nähe
              </summary>
              <div style={{ marginTop: 10, fontSize: 14 }}>
                <strong style={{ color: '#065f46' }}>{item.beachTip.name}</strong>
                <p style={{ margin: '4px 0 0', color: '#059669' }}>{item.beachTip.desc}</p>
              </div>
            </details>
          )}

          <div style={{ background: '#f0f9ff', padding: 12, borderRadius: 12, marginBottom: 16 }}>
            <div style={{ fontWeight: 'bold', color: '#0369a1' }}>💰 Budget ca. {item.budget}€ <span style={{fontSize: 12, fontWeight: 'normal', color: '#64748b'}}>(für 2 Pers.)</span></div>
            <span style={{ fontSize: 13, color: '#6b7280' }}>{item.budgetDesc}</span>
          </div>

          <a href={item.navLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: 14, background: '#0ea5e9', color: 'white', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 'bold', textDecoration: 'none' }}>
            <Navigation size={18} /> GPS Starten
          </a>
        </div>
      )}
    </div>
  );
};



export default function App() {
  const [counts, setCounts] = useStickyState<Record<string, number>>({}, 'kreta-counts');
  const [pins, setPins] = useStickyState<Record<string, boolean>>({}, 'kreta-pins');
  const [customPins, setCustomPins] = useStickyState<CustomPin[]>([], 'kreta-custom-pins');
  const [optPage, setOptPage] = useState(0);
  
  const [activeDay, setActiveDay] = useState(0);
  const [countdownText, setCountdownText] = useState("");
  const [mainTab, setMainTab] = useState<'plan'|'map'|'profile'>('plan');

  const [destinationId, setDestinationId] = useStickyState<string>('kreta', 'planner-dest-id');
  const [startDate, setStartDate] = useStickyState<string>('', 'planner-start-date');
  const [endDate, setEndDate] = useStickyState<string>('', 'planner-end-date');
  const [baseLocationName, setBaseLocationName] = useStickyState<string>('Matala', 'planner-base-name');

  const activeDestination = destinations.find(d => d.id === destinationId) || destinations[0];
  const { baseItinerary, optionalItinerary } = activeDestination;

  useEffect(() => {
    if (activeDay >= baseItinerary.length) {
      setActiveDay(0);
    }
  }, [baseItinerary.length, activeDay]);

  useEffect(() => {
    if (!startDate) {
      setCountdownText("Wähle ein Reisedatum im Profil");
      return;
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
    const tripStart = new Date(startYear, startMonth - 1, startDay);
    
    let tripEnd = tripStart;
    if (endDate) {
      const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
      tripEnd = new Date(endYear, endMonth - 1, endDay);
    }
    
    const destName = activeDestination.name;
    
    if (today < tripStart) {
      const diff = tripStart.getTime() - today.getTime();
      const days = Math.round(diff / (1000 * 3600 * 24));
      setCountdownText(`⏳ Noch ${days} Tage bis ${destName}!`);
    } else if (today >= tripStart && today <= tripEnd) {
      const diff = tripEnd.getTime() - today.getTime();
      const days = Math.round(diff / (1000 * 3600 * 24));
      if (days === 0) {
        setCountdownText(`🌴 Letzter Tag auf ${destName}!`);
      } else {
        setCountdownText(`🌴 Noch ${days} Tage auf ${destName}!`);
      }
    } else {
      setCountdownText(`🌊 Hoffentlich war ${destName} wunderschön!`);
    }
  }, [startDate, endDate, activeDestination.name]);

  const current = baseItinerary[activeDay];

  const updateCount = (id: string, delta: number) => {
    setCounts(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const togglePin = (id: string) => {
    setPins(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalBudget = () => {
    let total = 0;
    baseItinerary.forEach(item => {
      total += (counts[item.costId] || 0) * item.budget;
    });
    optionalItinerary.forEach(item => {
      total += (counts[item.costId] || 0) * item.budget;
    });
    return total;
  };

  const visibleOptionals = optionalItinerary.slice(optPage * 4, optPage * 4 + 4);
  const pinnedOptionals = optionalItinerary.filter(i => pins[i.id]);

  return (
    <div style={{
      minHeight: "100vh",
      height: "100vh",
      background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 30%, #075985 100%)",
      fontFamily: "'Outfit', 'Georgia', serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: "20px 16px 80px" }}>
        
        {mainTab === 'plan' ? (
          <>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "#bae6fd", letterSpacing: 4, textTransform: "uppercase", marginBottom: 6 }}>
          Dein persönlicher
        </div>
        <h1 style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "white",
          margin: 0,
          textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          letterSpacing: 1,
        }}>
          🏝️ {activeDestination.name} Reiseplan
        </h1>
        <div style={{ color: "#e0f2fe", fontSize: 15, marginTop: 6, fontWeight: 'bold' }}>
          {countdownText}
        </div>

        {/* Budget badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: 16,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
          borderRadius: 20,
          padding: "8px 20px",
          color: "#0369a1",
          fontSize: 18,
          fontWeight: 'bold',
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}>
          <Wallet size={20} color="#f59e0b" /> {totalBudget()} € <span style={{fontSize: 13, color: '#6b7280', fontWeight: 'normal'}}>Gesamt</span>
        </div>
      </div>

      <Checklist />

      <h2 style={{ fontSize: 20, color: 'white', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
        <Calendar size={20} /> Basisroute
      </h2>

      {/* Day Selector - Scrollable chips */}
      <div style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 8,
        marginBottom: 20,
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}>
        {baseItinerary.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            style={{
              flexShrink: 0,
              padding: "10px 16px",
              borderRadius: 16,
              border: "none",
              cursor: "pointer",
              fontFamily: "Outfit, sans-serif",
              fontSize: 14,
              fontWeight: activeDay === i ? "bold" : "normal",
              background: activeDay === i ? "white" : "rgba(255,255,255,0.18)",
              color: activeDay === i ? "#0284c7" : "white",
              boxShadow: activeDay === i ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
              transition: "all 0.2s",
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 2 }}>Tag {d.day}</div>
            <div style={{ whiteSpace: 'nowrap' }}>{d.location.split(' ')[0]}</div>
          </button>
        ))}
      </div>

      {/* Main Card */}
      <div style={{
        background: 'white',
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
        marginBottom: 24,
        border: '1px solid #f1f5f9'
      }}>
        {/* Card Header */}
        <div style={{
          padding: "16px 20px",
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          borderBottom: '1px solid #f1f5f9'
        }}>
          {/* Counter Box */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 10, 
            background: '#fffbeb', 
            padding: '6px', 
            borderRadius: 8, 
            border: '1px solid #fcd34d' 
          }}>
            <button 
              style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', alignItems:'center', justifyContent:'center', fontWeight: 'bold', cursor: 'pointer' }} 
              onClick={() => updateCount(current.costId, -1)}
            >
              <Minus size={16}/>
            </button>
            <span style={{ fontWeight: 'bold', minWidth: 20, textAlign: 'center', fontSize: 16, color: '#111827' }}>
              {counts[current.costId] || 0}
            </span>
            <button 
              style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: 4, width: 28, height: 28, display: 'flex', alignItems:'center', justifyContent:'center', fontWeight: 'bold', cursor: 'pointer' }} 
              onClick={() => updateCount(current.costId, 1)}
            >
              <Plus size={16}/>
            </button>
          </div>
          
          <div>
            <div style={{ fontSize: 18, fontWeight: "bold", color: '#1f2937' }}>
              Tag {current.day} – {current.location.split(' ')[0]}
            </div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
              {current.subtitle}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px", background: 'white' }}>
          <img 
            src={current.image} 
            alt={current.location} 
            style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 12, marginBottom: 20 }} 
            loading="lazy" 
          />
          
          <h2 style={{ margin: "0 0 16px", fontSize: 20, color: '#3b82f6', fontWeight: 'bold' }}>
            {current.title}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 15, color: '#374151' }}>
              <span>🌅</span>
              <div>
                <strong>Beste Zeit:</strong> {current.bestTime}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 15, color: '#374151' }}>
              <span>🏖️</span>
              <div>
                <strong>Ort:</strong> {current.location}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 15, color: '#374151' }}>
              <span>🗺️</span>
              <div>
                <strong>Plan:</strong> {current.plan}
              </div>
            </div>
          </div>

          <div style={{
            background: '#fffbeb',
            borderRadius: 8,
            padding: "16px",
            borderLeft: `4px solid #f59e0b`,
            marginBottom: 20
          }}>
            <div style={{ fontSize: 15, color: '#1f2937', marginBottom: 4 }}>
              🍽️ <strong>Tavernen-Tipp:</strong> {current.tavernaTip.name} <span style={{color: '#d97706', fontWeight: 'bold', marginLeft: 4}}>⭐ {current.tavernaTip.rating}</span>
            </div>
            <div style={{ fontSize: 14, color: "#4b5563", fontStyle: 'italic' }}>
              ({current.tavernaTip.desc})
            </div>
          </div>

          {current.beachTip && (
            <details style={{
              background: '#ecfdf5',
              borderRadius: 8,
              padding: "16px",
              borderLeft: `4px solid #10b981`,
              marginBottom: 20,
              cursor: 'pointer'
            }}>
              <summary style={{ fontWeight: 'bold', color: '#047857', fontSize: 15, outline: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                🏖️ Strand-Tipp in der Nähe
              </summary>
              <div style={{ marginTop: 10, fontSize: 14 }}>
                <strong style={{ color: '#065f46' }}>{current.beachTip.name}</strong>
                <p style={{ margin: '4px 0 0', color: '#059669', lineHeight: 1.5 }}>{current.beachTip.desc}</p>
              </div>
            </details>
          )}

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 15, color: '#1f2937', fontWeight: 'bold', marginBottom: 4 }}>
              💰 Tagesbudget: {current.budget}€
            </div>
            <div style={{ fontSize: 14, color: "#6b7280" }}>
              ({current.budgetDesc})
            </div>
          </div>

          <a href={current.navLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)' }}>
            📍 GPS-Navigation starten
          </a>
        </div>
      </div>

      {/* Quick Navigation */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        <button
          onClick={() => { if (activeDay > 0) setActiveDay(activeDay - 1); }}
          disabled={activeDay === 0}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: 16,
            border: "none",
            cursor: activeDay === 0 ? "not-allowed" : "pointer",
            background: activeDay === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
            color: activeDay === 0 ? "rgba(255,255,255,0.3)" : "white",
            fontSize: 15,
            fontFamily: "Outfit, sans-serif",
            fontWeight: 500,
            backdropFilter: "blur(4px)"
          }}
        >
          ← Vorheriger Tag
        </button>
        <button
          onClick={() => { if (activeDay < baseItinerary.length - 1) setActiveDay(activeDay + 1); }}
          disabled={activeDay === baseItinerary.length - 1}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: 16,
            border: "none",
            cursor: activeDay === baseItinerary.length - 1 ? "not-allowed" : "pointer",
            background: activeDay === baseItinerary.length - 1 ? "rgba(255,255,255,0.1)" : "white",
            color: activeDay === baseItinerary.length - 1 ? "rgba(255,255,255,0.3)" : "#0284c7",
            fontSize: 15,
            fontWeight: "bold",
            fontFamily: "Outfit, sans-serif",
            boxShadow: activeDay === baseItinerary.length - 1 ? "none" : "0 4px 12px rgba(0,0,0,0.2)"
          }}
        >
          Nächster Tag →
        </button>
      </div>

      <h2 style={{ fontSize: 20, color: 'white', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
        <Star size={20} /> Optionale Highlights
      </h2>
      
      {pinnedOptionals.length > 0 && (
        <div style={{marginBottom: 24}}>
          <h3 style={{fontSize: 13, color: '#fca5a5', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600}}>📌 Angepinnt</h3>
          {pinnedOptionals.map(item => (
            <OptionalDayCard 
              key={`pinned-${item.id}`} 
              item={item} 
              counts={counts} 
              updateCount={updateCount}
              isPinned={true}
              togglePin={togglePin}
            />
          ))}
        </div>
      )}

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
        <h3 style={{fontSize: 14, color: '#e0f2fe', fontWeight: 500}}>Entdecke mehr...</h3>
        <button 
          style={{display: 'flex', alignItems:'center', gap: 6, background: '#f59e0b', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)'}}
          onClick={() => setOptPage(p => (p + 1) % 4)}
        >
          🔄 Neue laden
        </button>
      </div>

      <div>
        {visibleOptionals.map(item => {
          if (pins[item.id]) return null; // Don't show again if pinned
          return (
            <OptionalDayCard 
              key={item.id} 
              item={item} 
              counts={counts} 
              updateCount={updateCount}
              isPinned={false}
              togglePin={togglePin}
            />
          );
        })}
      </div>

            {/* Footer */}
            <div style={{ textAlign: "center", marginTop: 40, color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
              Kalós írthate · Bienvenido · Welcome 🌍
            </div>
          </>
        ) : mainTab === 'map' ? (
          <MapTab customPins={customPins} setCustomPins={setCustomPins} destination={activeDestination} />
        ) : (
          <ProfileTab 
            destinationId={destinationId}
            setDestinationId={setDestinationId}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            baseLocationName={baseLocationName}
            setBaseLocationName={setBaseLocationName}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        padding: '12px 16px 20px',
        zIndex: 2000,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={() => setMainTab('plan')}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', color: mainTab === 'plan' ? '#0ea5e9' : '#94a3b8', cursor: 'pointer' }}
        >
          <CalendarDays size={24} />
          <span style={{ fontSize: 12, fontWeight: mainTab === 'plan' ? 'bold' : 'normal' }}>Reiseplan</span>
        </button>
        <button 
          onClick={() => setMainTab('map')}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', color: mainTab === 'map' ? '#0ea5e9' : '#94a3b8', cursor: 'pointer' }}
        >
          <MapIcon size={24} />
          <span style={{ fontSize: 12, fontWeight: mainTab === 'map' ? 'bold' : 'normal' }}>Karte</span>
        </button>
        <button 
          onClick={() => setMainTab('profile')}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', color: mainTab === 'profile' ? '#0ea5e9' : '#94a3b8', cursor: 'pointer' }}
        >
          <User size={24} />
          <span style={{ fontSize: 12, fontWeight: mainTab === 'profile' ? 'bold' : 'normal' }}>Profil</span>
        </button>
      </div>
    </div>
  );
}
