
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import vehicleService, { Vehicle } from '../services/api';

const ViewVehicle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchVehicle = async () => {
      if (id) {
        try {
          const data = await vehicleService.getById(parseInt(id));
          if (data) {
            setVehicle(data);
          } else {
            toast({
              title: "Error",
              description: "Vehicle not found",
              variant: "destructive"
            });
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching vehicle:', error);
          toast({
            title: "Error",
            description: "Failed to fetch vehicle details",
            variant: "destructive"
          });
          navigate('/');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVehicle();
  }, [id, navigate]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString() + ' ' + 
           new Date(dateString).toLocaleTimeString();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this vehicle?') && id) {
      try {
        const success = await vehicleService.delete(parseInt(id));
        if (success) {
          toast({
            title: "Success",
            description: "Vehicle deleted successfully",
          });
          navigate('/');
        } else {
          toast({
            title: "Error",
            description: "Failed to delete vehicle",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        toast({
          title: "Error",
          description: "Failed to delete vehicle",
          variant: "destructive"
        });
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading vehicle details...</div>;
  }

  if (!vehicle) {
    return <div className="error">Vehicle not found</div>;
  }

  return (
    <div className="view-vehicle-page">
      <div className="vehicle-details">
        <h2>{vehicle.veiculo}</h2>
        <div className="detail-header">
          <span className={`status-badge ${vehicle.vendido ? 'sold' : 'available'}`}>
            {vehicle.vendido ? 'Sold' : 'Available'}
          </span>
        </div>

        <div className="detail-section">
          <div className="detail-row">
            <span className="detail-label">Brand:</span>
            <span className="detail-value">{vehicle.marca}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Year:</span>
            <span className="detail-value">{vehicle.ano}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Description:</span>
            <div className="detail-value description">{vehicle.descricao}</div>
          </div>
          <div className="detail-row">
            <span className="detail-label">Created:</span>
            <span className="detail-value">{formatDate(vehicle.created)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Last Updated:</span>
            <span className="detail-value">{formatDate(vehicle.updated)}</span>
          </div>
        </div>

        <div className="button-group">
          <Link to={`/edit/${vehicle.id}`} className="edit-btn">Edit Vehicle</Link>
          <button onClick={handleDelete} className="delete-btn">Delete Vehicle</button>
          <Link to="/" className="back-btn">Back to List</Link>
        </div>
      </div>
    </div>
  );
};

export default ViewVehicle;
