
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import VehicleForm from '../components/VehicleForm';
import vehicleService, { Vehicle } from '../services/api';

const EditVehicle = () => {
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

  const handleSubmit = async (updatedVehicle: Vehicle) => {
    if (id && vehicle) {
      try {
        const result = await vehicleService.update(parseInt(id), updatedVehicle);
        if (result) {
          toast({
            title: "Success",
            description: "Vehicle updated successfully",
          });
          navigate('/');
        } else {
          toast({
            title: "Error",
            description: "Failed to update vehicle",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error updating vehicle:', error);
        toast({
          title: "Error",
          description: "Failed to update vehicle",
          variant: "destructive"
        });
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading vehicle details...</div>;
  }

  return (
    <div className="edit-vehicle-page">
      {vehicle && <VehicleForm initialVehicle={vehicle} onSubmit={handleSubmit} isEditMode={true} />}
    </div>
  );
};

export default EditVehicle;
