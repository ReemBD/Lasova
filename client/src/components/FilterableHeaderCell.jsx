import { useRef } from 'react';
import { ReactComponent as FilterIcon } from '../assets/imgs/icons/arrowhead-down-icon.svg';

const FilterableHeaderCell = ({ title, onToggleDropdown }) => {
  const containerRef = useRef();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }} ref={containerRef}>
      <p>{title}</p>
      <span style={{ position: 'relative', zIndex: '100' }} className="filter-btn-wrapper">
        <button
          className="show-filter-btn flex align-center"
          onClick={(ev) => {
            ev.stopPropagation();
            const rect = containerRef.current.getBoundingClientRect();
            onToggleDropdown(containerRef.current.getBoundingClientRect());
          }}
        >
          <FilterIcon />
        </button>
      </span>
    </div>
  );
};

export default FilterableHeaderCell;
