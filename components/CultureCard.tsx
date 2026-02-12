
import React from 'react';
import { Culture } from '../types';

interface CultureCardProps {
  culture: Culture;
  onClick: (id: string) => void;
}

const CultureCard: React.FC<CultureCardProps> = ({ culture, onClick }) => {
  return (
    <div 
      onClick={() => onClick(culture.id)}
      className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
      <img 
        src={culture.imageUrl} 
        alt={culture.name} 
        className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 p-6 z-20 text-white">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${culture.color} mb-3 inline-block`}>
          {culture.region}
        </span>
        <h3 className="text-3xl font-bold mb-1">{culture.name}</h3>
        <p className="text-sm italic opacity-90">"{culture.autonym}" — {culture.meaning}</p>
      </div>
    </div>
  );
};

export default CultureCard;
