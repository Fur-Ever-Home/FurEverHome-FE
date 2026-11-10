import React from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import './FilterSidebar.css';

export interface FilterState {
  adoptionType: string; // 'fizica' | 'la_distanta' | ''
  species: string;      // 'Caine' | 'Pisica' | 'Altele' | ''
  gender: string;       // 'Mascul' | 'Femela' | ''
  size: string;         // 'Mica' | 'Medie' | 'Mare' | ''
  ageGroup: string;
  temperament: string;
  healthState: string;
  color: string;
  county: string;
  shelter: string;
  locationType: string;
  petFriendly: boolean;
  childFriendly: boolean;
  noAllergies: boolean;
  microchipped: boolean;
  vaccinated: boolean;
  sterilized: boolean;
  dewormed: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
  totalResults?: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApply,
  onReset,
  totalResults = 0,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.ro;

  const handleToggle = (field: keyof FilterState, value: any) => {
    onFilterChange({
      ...filters,
      [field]: filters[field] === value ? '' : value,
    });
  };

  const handleCheckboxChange = (field: keyof FilterState) => {
    onFilterChange({
      ...filters,
      [field]: !filters[field],
    });
  };

  const handleSelectChange = (field: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const renderFilterContent = () => (
    <div className="filter-body">
      {/* TIP ADOPȚIE */}
      <div className="filter-group">
        <label className="filter-group-title">TIP ADOPȚIE</label>
        <div className="pill-group">
          <button
            type="button"
            className={`filter-pill ${filters.adoptionType === 'fizica' ? 'active' : ''}`}
            onClick={() => handleToggle('adoptionType', 'fizica')}
          >
            Fizică
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.adoptionType === 'la_distanta' ? 'active' : ''}`}
            onClick={() => handleToggle('adoptionType', 'la_distanta')}
          >
            La distanță
          </button>
        </div>

        {filters.adoptionType === 'la_distanta' && (
          <div className="distance-notice-box">
            <strong>Doar adopție la distanță</strong>
            <p>
              Se afișează doar seniorii și animalele care au nevoie de tratament sau cazare permanentă și nu mai pot fi date spre adopție.
            </p>
          </div>
        )}
      </div>

      {/* INFO DE BAZĂ */}
      <div className="filter-group">
        <label className="filter-group-title">INFO DE BAZĂ</label>

        <span className="sub-label">Tip</span>
        <div className="pill-group">
          <button
            type="button"
            className={`filter-pill ${filters.species === 'Caine' ? 'active' : ''}`}
            onClick={() => handleToggle('species', 'Caine')}
          >
            Câine
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.species === 'Pisica' ? 'active' : ''}`}
            onClick={() => handleToggle('species', 'Pisica')}
          >
            Pisică
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.species === 'Altele' ? 'active' : ''}`}
            onClick={() => handleToggle('species', 'Altele')}
          >
            Altele
          </button>
        </div>

        <span className="sub-label">Sex</span>
        <div className="pill-group">
          <button
            type="button"
            className={`filter-pill ${filters.gender === 'Mascul' ? 'active' : ''}`}
            onClick={() => handleToggle('gender', 'Mascul')}
          >
            Mascul
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.gender === 'Femela' ? 'active' : ''}`}
            onClick={() => handleToggle('gender', 'Femela')}
          >
            Femelă
          </button>
        </div>

        <span className="sub-label">Talie</span>
        <div className="pill-group">
          <button
            type="button"
            className={`filter-pill ${filters.size === 'Mica' ? 'active' : ''}`}
            onClick={() => handleToggle('size', 'Mica')}
          >
            Mică
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.size === 'Medie' ? 'active' : ''}`}
            onClick={() => handleToggle('size', 'Medie')}
          >
            Medie
          </button>
          <button
            type="button"
            className={`filter-pill ${filters.size === 'Mare' ? 'active' : ''}`}
            onClick={() => handleToggle('size', 'Mare')}
          >
            Mare
          </button>
        </div>
      </div>

      {/* DETALII ANIMAL */}
      <div className="filter-group">
        <label className="filter-group-title">DETALII ANIMAL</label>
        
        <select 
          className="filter-select"
          value={filters.ageGroup}
          onChange={(e) => handleSelectChange('ageGroup', e.target.value)}
        >
          <option value="">Vârstă (Pui, Tânăr, Adult, Senior)</option>
          <option value="pui">Pui (&lt; 1 an)</option>
          <option value="tanar">Tânăr (1 - 3 ani)</option>
          <option value="adult">Adult (3 - 7 ani)</option>
          <option value="senior">Senior (&gt; 7 ani)</option>
        </select>

        <select 
          className="filter-select"
          value={filters.temperament}
          onChange={(e) => handleSelectChange('temperament', e.target.value)}
        >
          <option value="">Temperament</option>
          <option value="jucaus">Jucăuș</option>
          <option value="calm">Calm</option>
          <option value="energic">Energic</option>
          <option value="timid">Timid</option>
        </select>

        <select 
          className="filter-select"
          value={filters.healthState}
          onChange={(e) => handleSelectChange('healthState', e.target.value)}
        >
          <option value="">Stare de sănătate</option>
          <option value="sanatos">Sănătos</option>
          <option value="necesita_ingrijiri">Necesită îngrijiri</option>
        </select>

        <select 
          className="filter-select"
          value={filters.color}
          onChange={(e) => handleSelectChange('color', e.target.value)}
        >
          <option value="">Culoare</option>
          <option value="negru">Negru</option>
          <option value="alb">Alb</option>
          <option value="maro">Maro</option>
          <option value="portocaliu">Portocaliu / Roșcat</option>
          <option value="bicolor">Bicolor / Tricolor</option>
        </select>
      </div>

      {/* LOCAȚIE */}
      <div className="filter-group">
        <label className="filter-group-title">LOCAȚIE</label>

        <select 
          className="filter-select"
          value={filters.county}
          onChange={(e) => handleSelectChange('county', e.target.value)}
        >
          <option value="">Județ</option>
          <option value="iasi">Iași</option>
          <option value="bucuresti">București</option>
          <option value="cluj">Cluj</option>
          <option value="timis">Timiș</option>
        </select>

        <select 
          className="filter-select"
          value={filters.shelter}
          onChange={(e) => handleSelectChange('shelter', e.target.value)}
        >
          <option value="">Centru / Adăpost</option>
          <option value="casa_lui_azor">Casa lui Azor</option>
          <option value="labute_copou">Adăpostul Lăbuțe din Copou</option>
          <option value="patrupezi_iasi">Asociația Patrupezi Iași</option>
        </select>

        <select 
          className="filter-select"
          value={filters.locationType}
          onChange={(e) => handleSelectChange('locationType', e.target.value)}
        >
          <option value="">Locația animalului (Centru / Foster)</option>
          <option value="centru">Centru / Adăpost</option>
          <option value="foster">În Foster</option>
        </select>
      </div>

      {/* COMPATIBILITATE & SĂNĂTATE */}
      <div className="filter-group">
        <label className="filter-group-title">COMPATIBILITATE & SĂNĂTATE</label>

        <div className="checkbox-grid">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.petFriendly} 
              onChange={() => handleCheckboxChange('petFriendly')} 
            />
            <span>Pet friendly</span>
          </label>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.microchipped} 
              onChange={() => handleCheckboxChange('microchipped')} 
            />
            <span>Microcipat</span>
          </label>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.childFriendly} 
              onChange={() => handleCheckboxChange('childFriendly')} 
            />
            <span>Child friendly</span>
          </label>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.vaccinated} 
              onChange={() => handleCheckboxChange('vaccinated')} 
            />
            <span>Vaccinat</span>
          </label>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.noAllergies} 
              onChange={() => handleCheckboxChange('noAllergies')} 
            />
            <span>Fără alergii</span>
          </label>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.sterilized} 
              onChange={() => handleCheckboxChange('sterilized')} 
            />
            <span>Sterilizat</span>
          </label>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.dewormed} 
              onChange={() => handleCheckboxChange('dewormed')} 
            />
            <span>Deparazitat</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="filter-sidebar-desktop">
        <h3 className="filter-sidebar-title">Filtrează după</h3>
        {renderFilterContent()}
        <div className="filter-sidebar-actions">
          <button type="button" className="btn-apply-filters" onClick={onApply}>
            Aplică filtre
          </button>
          <button type="button" className="btn-reset-filters" onClick={onReset}>
            Resetează filtrele
          </button>
        </div>
      </aside>

      {isOpenMobile && createPortal(
        <div className="filter-mobile-overlay" onClick={onCloseMobile}>
          <div className="filter-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="filter-mobile-header">
              <button type="button" className="filter-mobile-close" onClick={onCloseMobile}>
                ✕
              </button>
              <h3 className="filter-mobile-title">Filtrează după</h3>
              <button type="button" className="filter-mobile-clear" onClick={onReset}>
                Șterge tot
              </button>
            </div>

            <div className="filter-mobile-scroll-body">
              {renderFilterContent()}
            </div>

            <div className="filter-mobile-footer">
              <button 
                type="button" 
                className="btn-mobile-apply" 
                onClick={() => {
                  onApply();
                  if (onCloseMobile) onCloseMobile();
                }}
              >
                Aplică filtre ({totalResults} animale)
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default FilterSidebar;