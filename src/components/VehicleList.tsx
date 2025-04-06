
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '../services/api';

interface VehicleListProps {
  vehicles: Vehicle[];
  onDelete: (id: number) => void;
}

const VehicleList = ({ vehicles, onDelete }: VehicleListProps) => {
  const [sortField, setSortField] = useState<keyof Vehicle>('veiculo');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Vehicle) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (a[sortField] === undefined || b[sortField] === undefined) return 0;
    
    let comparison = 0;
    
    if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
      comparison = (a[sortField] as string).localeCompare(b[sortField] as string);
    } else {
      comparison = a[sortField] < b[sortField] ? -1 : a[sortField] > b[sortField] ? 1 : 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      onDelete(id);
    }
  };

  return (
    <div className="vehicle-list">
      <div className="table-actions">
        <h2>Vehicle List</h2>
        <Link to="/add" className="add-button">Add New Vehicle</Link>
      </div>
      
      {vehicles.length === 0 ? (
        <div className="no-vehicles">
          <p>No vehicles found. Add a new vehicle to get started.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('veiculo')} className={sortField === 'veiculo' ? sortDirection : ''}>
                  Vehicle
                </th>
                <th onClick={() => handleSort('marca')} className={sortField === 'marca' ? sortDirection : ''}>
                  Brand
                </th>
                <th onClick={() => handleSort('ano')} className={sortField === 'ano' ? sortDirection : ''}>
                  Year
                </th>
                <th>Description</th>
                <th onClick={() => handleSort('vendido')} className={sortField === 'vendido' ? sortDirection : ''}>
                  Status
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.veiculo}</td>
                  <td>{vehicle.marca}</td>
                  <td>{vehicle.ano}</td>
                  <td className="description-cell">
                    {vehicle.descricao.length > 50 
                      ? `${vehicle.descricao.substring(0, 50)}...` 
                      : vehicle.descricao}
                  </td>
                  <td>
                    <span className={`status ${vehicle.vendido ? 'sold' : 'available'}`}>
                      {vehicle.vendido ? 'Sold' : 'Available'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <Link to={`/view/${vehicle.id}`} className="view-btn">View</Link>
                    <Link to={`/edit/${vehicle.id}`} className="edit-btn">Edit</Link>
                    <button 
                      onClick={() => vehicle.id && handleDeleteClick(vehicle.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VehicleList;
