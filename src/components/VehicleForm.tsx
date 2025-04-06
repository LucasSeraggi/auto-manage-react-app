
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vehicle } from '../services/api';

interface VehicleFormProps {
  initialVehicle?: Vehicle;
  onSubmit: (vehicle: Vehicle) => Promise<void>;
  isEditMode?: boolean;
}

const VehicleForm = ({ initialVehicle, onSubmit, isEditMode = false }: VehicleFormProps) => {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle>({
    veiculo: '',
    marca: '',
    ano: new Date().getFullYear(),
    descricao: '',
    vendido: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Vehicle, string>>>({});

  useEffect(() => {
    if (initialVehicle) {
      setVehicle(initialVehicle);
    }
  }, [initialVehicle]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Vehicle, string>> = {};
    
    if (!vehicle.veiculo.trim()) {
      newErrors.veiculo = 'Vehicle name is required';
    }
    
    if (!vehicle.marca.trim()) {
      newErrors.marca = 'Brand is required';
    }
    
    if (!vehicle.ano || vehicle.ano < 1900 || vehicle.ano > new Date().getFullYear() + 1) {
      newErrors.ano = `Year must be between 1900 and ${new Date().getFullYear() + 1}`;
    }
    
    if (!vehicle.descricao.trim()) {
      newErrors.descricao = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setVehicle(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      await onSubmit(vehicle);
    }
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
      
      <div className="form-group">
        <label htmlFor="veiculo">Vehicle Name:</label>
        <input
          type="text"
          id="veiculo"
          name="veiculo"
          value={vehicle.veiculo}
          onChange={handleChange}
          className={errors.veiculo ? 'error' : ''}
        />
        {errors.veiculo && <span className="error-text">{errors.veiculo}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="marca">Brand:</label>
        <input
          type="text"
          id="marca"
          name="marca"
          value={vehicle.marca}
          onChange={handleChange}
          className={errors.marca ? 'error' : ''}
        />
        {errors.marca && <span className="error-text">{errors.marca}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="ano">Year:</label>
        <input
          type="number"
          id="ano"
          name="ano"
          value={vehicle.ano}
          onChange={handleChange}
          min="1900"
          max={new Date().getFullYear() + 1}
          className={errors.ano ? 'error' : ''}
        />
        {errors.ano && <span className="error-text">{errors.ano}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="descricao">Description:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={vehicle.descricao}
          onChange={handleChange}
          rows={4}
          className={errors.descricao ? 'error' : ''}
        />
        {errors.descricao && <span className="error-text">{errors.descricao}</span>}
      </div>
      
      <div className="form-group checkbox-group">
        <label htmlFor="vendido" className="checkbox-label">
          <input
            type="checkbox"
            id="vendido"
            name="vendido"
            checked={vehicle.vendido}
            onChange={handleChange}
          />
          <span>Sold</span>
        </label>
      </div>
      
      <div className="button-group">
        <button type="submit" className="submit-btn">
          {isEditMode ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
        <button 
          type="button" 
          className="cancel-btn"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;
