import React from 'react';
import { useLanguage } from '../useLanguage';
import { translations } from '../translations';
import './FilterSidebar.css';

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <aside className="filter-sidebar">
      <h3 className="filter-title">{t.filterTitle}</h3>

      {/* Specie */}
      <div className="filter-group">
        <label className="filter-label">{t.filterSpecies}</label>
        <div className="chip-group">
          <button type="button" className="chip active">{t.filterDogs}</button>
          <button type="button" className="chip">{t.filterCats}</button>
          <button type="button" className="chip">{t.filterOther}</button>
        </div>
      </div>

      {/* Vârstă */}
      <div className="filter-group">
        <label className="filter-label">{t.filterAge}</label>
        <div className="chip-group">
          <button type="button" className="chip">{t.filterPuppy}</button>
          <button type="button" className="chip">{t.filterYoung}</button>
          <button type="button" className="chip">{t.filterAdult}</button>
          <button type="button" className="chip">{t.filterSenior}</button>
        </div>
      </div>

      {/* Talie */}
      <div className="filter-group">
        <label className="filter-label">{t.filterSize}</label>
        <div className="chip-group">
          <button type="button" className="chip">{t.filterSmall}</button>
          <button type="button" className="chip">{t.filterMedium}</button>
          <button type="button" className="chip">{t.filterLarge}</button>
        </div>
      </div>

      {/* Sex */}
      <div className="filter-group">
        <label className="filter-label">{t.filterGender}</label>
        <div className="chip-group">
          <button type="button" className="chip">{t.filterFemale}</button>
          <button type="button" className="chip">{t.filterMale}</button>
        </div>
      </div>

      {/* Stare medicală */}
      <div className="filter-group">
        <label className="filter-label">{t.filterMedicalStatus}</label>
        <div className="checkbox-group">
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>{t.filterVaccinated}</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>{t.filterDewormed}</span>
          </label>
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>{t.filterSterilized}</span>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;