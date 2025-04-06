
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import VehicleList from '../components/VehicleList';
import vehicleService, { Vehicle } from '../services/api';

const Home = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const data = await vehicleService.getAll();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch vehicles. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const success = await vehicleService.delete(id);
      if (success) {
        setVehicles(vehicles.filter(v => v.id !== id));
        toast({
          title: "Success",
          description: "Vehicle deleted successfully",
        });
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
  };

  return (
    <div className="home-page">
      {loading ? (
        <div className="loading">Loading vehicles...</div>
      ) : (
        <VehicleList vehicles={vehicles} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;
