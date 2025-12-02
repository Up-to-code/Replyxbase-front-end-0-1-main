import { useState } from 'react';
import { SortField, SortDirection } from '../types';

export interface DynamicFilter {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'gt' | 'lt';
  value: string;
}

export const useFilters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: new Date(), // Default to today
    end: new Date()
  });
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const [dynamicFilters, setDynamicFilters] = useState<DynamicFilter[]>([]);

  const addDynamicFilter = () => {
    setDynamicFilters([
      ...dynamicFilters,
      { id: Date.now().toString(), field: 'price', operator: 'gt', value: '' }
    ]);
  };

  const removeDynamicFilter = (id: string) => {
    setDynamicFilters(dynamicFilters.filter(f => f.id !== id));
  };

  const updateDynamicFilter = (id: string, updates: Partial<DynamicFilter>) => {
    setDynamicFilters(dynamicFilters.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    serviceFilter,
    setServiceFilter,
    dateRange,
    setDateRange,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    currentPage,
    setCurrentPage,
    dynamicFilters,
    addDynamicFilter,
    removeDynamicFilter,
    updateDynamicFilter
  };
};
