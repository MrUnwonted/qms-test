import { useEffect, useState } from 'react';
import { getAllLocation, setIsActive } from '../../services/LocationMaster';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../../services/AuthService';
import { getService } from '../../services/ServiceMaster';
import Loading from '../../components/Loading';

const LocationMasterComponent = () => {
  const [locations, setLocations] = useState([]); // Change to locations
  const [filteredLocations, setFilteredLocations] = useState([]); // New state for filtered locations
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const isAdmin = isAdminUser();

  useEffect(() => {
    listLocations();
  }, []);
  // function listLocations() {
    //     getAllLocation().then((response) => {
    //         setLocation(response.data);
    //     }).catch(error => {
    //         console.error(error);
    //     })
    // }

  async function listLocations() {
    try {
      setLoading(true);
      const response = await getAllLocation();
      const locationsWithServiceNames = await Promise.all(
        response.data.map(async (location) => {
          const serviceName = await fetchServiceName(location.serviceId);
          return { ...location, serviceName };
        })
      );

      // Update both locations and filteredLocations
      setLocations(locationsWithServiceNames);
      filterLocations(locationsWithServiceNames, searchTerm);
    } catch (error) {
      console.error(error);
      setError('Error fetching locations');
    } finally {
      setLoading(false);
    }
  }

  // Filter locations based on the search term
  function filterLocations(locations, term) {
    const filtered = locations.filter((location) =>
      location.locationName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredLocations(filtered);
  }

  function addNewLocation() {
    navigate('/add-location');
  }

  function updatelocation(id) {
    navigate(`/update-location/${id}`);
  }
 // function removelocation(id) {
    //     deleteLocation(id).then(() => {
    //         listLocations();
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }
  function makeActiveOrInactive(id) {
    setIsActive(id)
      .then(() => {
        listLocations();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function viewLocation() {
    navigate('/locations');
  }

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) {
      return ''; // Handle null or undefined values
    }

    const date = new Date(dateTimeString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const fetchServiceName = async (serviceId) => {
    try {
      const response = await getService(serviceId);
      return response.data.serviceName;
    } catch (error) {
      console.error(error);
      return 'N/A';
    }
  };

  useEffect(() => {
    filterLocations(locations, searchTerm);
  }, [searchTerm, locations]); // Trigger filtering when searchTerm or locations change

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='container'>
      <h2 className='text-center'>List of Locations</h2>
      {isAdmin && (
        <div className='mb-2'>
          <button className='btn btn-primary' onClick={addNewLocation}>
            Create Location
          </button>
        </div>
      )}
      <div>
        {/* Search Bar */}
        <input
          type='text'
          placeholder='Search by location name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Location Name</th>
              <th> Description</th>
              <th> Creation Time</th>
              <th> Mapped Table</th>
              <th>Location Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.map((location) => (
              <tr key={location.id}>
                <td>{location.id}</td>
                <td>{location.locationName}</td>
                <td>{location.description}</td>
                <td>{formatDate(location.createdDatetime)}</td>
                <td>{location.serviceName}</td>
                <td>{location.isActive ? 'YES' : 'NO'}</td>
                <td>
                  <button className='btn btn-info' onClick={() => updatelocation(location.id)}>
                    Update
                  </button>
                  <button
                    className='btn btn-success'
                    onClick={() => makeActiveOrInactive(location.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Active
                  </button>
                  <button
                    className='btn btn-warning'
                    onClick={() => viewLocation(location.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Create
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationMasterComponent;
