import React from 'react';
import { ReactComponent as Standby } from '../assets/imgs/icons/status/standby.svg';
import { ReactComponent as Active } from '../assets/imgs/icons/status/active.svg';
import { ReactComponent as Inactive } from '../assets/imgs/icons/status/inactive.svg';
import { ReactComponent as All } from '../assets/imgs/icons/status/all.svg';


export default function StatusTabs({setStatusFilter}) {
  return (
    <div className="status-tabs">
        <button onClick={()=>setStatusFilter('')}><All className="status-icon"/><span> הכל</span></button>
        <button onClick={()=>setStatusFilter('active')}><Active className="status-icon"/><span> מתנדב פעיל</span></button>
        <button onClick={()=>setStatusFilter('standby')}><Standby className="status-icon"/><span> מתנדב בהמתנה</span></button>
        <button onClick={()=>setStatusFilter('inactive')}><Inactive className="status-icon"/><span> מתנדב סיים</span></button>
    </div>
  )
}
