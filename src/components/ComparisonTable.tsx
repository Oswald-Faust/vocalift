import React from 'react';
import { Check, X } from 'lucide-react';
import { ComparisonItem } from '../types';
import { motion } from 'framer-motion';

interface ComparisonTableProps {
  items: ComparisonItem[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ items }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="py-4 px-6 text-left text-gray-400 font-normal">Fonctionnalité</th>
            <th className="py-4 px-6 text-center">
              <div className="flex flex-col items-center">
                <span className="text-primary-500 font-semibold">Vocalift</span>
                <span className="text-xs text-gray-400 mt-1">Notre solution</span>
              </div>
            </th>
            <th className="py-4 px-6 text-center">
              <div className="flex flex-col items-center">
                <span className="text-gray-300 font-semibold">Concurrents</span>
                <span className="text-xs text-gray-400 mt-1">Solutions du marché</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <motion.tr 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-800"
            >
              <td className="py-4 px-6 text-left">{item.feature}</td>
              <td className="py-4 px-6 text-center">
                {item.vocalift ? (
                  <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-500/20">
                    <Check size={16} className="text-primary-500" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-800">
                    <X size={16} className="text-gray-500" />
                  </div>
                )}
              </td>
              <td className="py-4 px-6 text-center">
                {item.competitors ? (
                  <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-700/20">
                    <Check size={16} className="text-gray-300" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-800">
                    <X size={16} className="text-gray-500" />
                  </div>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;