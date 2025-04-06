
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import VehicleForm from '../components/VehicleForm';
import vehicleService, { Vehicle } from '../services/api';

const AddVehicle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (vehicle: Vehicle) => {
    try {
      const newVehicle = await vehicleService.create(vehicle);
      if (newVehicle) {
        toast({
          title: "Success",
          description: "Vehicle added successfully",
        });
        navigate('/');
      } else {
        toast({
          title: "Error",
          description: "Failed to add vehicle",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      toast({
        title: "Error",
        description: "Failed to add vehicle",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="add-vehicle-page">
      <VehicleForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddVehicle;
