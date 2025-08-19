import React from 'react';

interface TableProps {
  headers: string[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => (
  <table border={1} cellPadding={8} cellSpacing={0}>
    <thead>
      <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx}>
          {headers.map((h, i) => <td key={i}>{row[h] || '-'}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
