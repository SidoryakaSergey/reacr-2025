import React from 'react';
import { useSelectedItemsStore } from '../../store/selectedItemsStore';

const SelectedFlyout: React.FC = () => {
  const { selected, clear } = useSelectedItemsStore();
  const items = Object.values(selected);

  const handleDownload = () => {
    const csvContent = [
      ['ID', 'Name', 'Image'].join(','),
      ...items.map(({ id, name, image }) => [id, name, image].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${items.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (items.length === 0) return null;

  return (
    <div className="flyout">
      <span className="page-info">{items.length} items are selected</span>
      <button onClick={clear}>Unselect All</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default SelectedFlyout;
