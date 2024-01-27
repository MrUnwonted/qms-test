package com.camerin.QMS.service.impl;


import com.camerin.QMS.dto.LocationDto;
import com.camerin.QMS.dto.ServiceDto;
import com.camerin.QMS.entity.LocationMaster;
import com.camerin.QMS.entity.ServiceMaster;
import com.camerin.QMS.exception.ResourceNotFoundException;
import com.camerin.QMS.repository.LocationMasterRepository;
import com.camerin.QMS.repository.ServiceMasterRepository;
import com.camerin.QMS.service.LocationMasterService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LocationMasterImpl implements LocationMasterService {

    private LocationMasterRepository locationMasterRepository;
    private ServiceMasterRepository serviceMasterRepository;
    private ModelMapper modelMapper;

    @Override
    public LocationDto addLocation(LocationDto locationDto) throws ResourceNotFoundException {

        try {
            // Convert LocationDto into LocationMaster Jpa entity
            LocationMaster locationMaster = modelMapper.map(locationDto, LocationMaster.class);
            locationMaster.setIsActive(Boolean.TRUE);

            // Retrieve the ServiceMaster entity based on the provided serviceId in the LocationDto
            Long serviceId = locationDto.getServiceId();
            if (serviceId != null) {
                Optional<ServiceMaster> serviceOptional = serviceMasterRepository.findById(serviceId);
                if (serviceOptional.isPresent()) {
                    ServiceMaster serviceMaster = serviceOptional.get();
                    locationMaster.setService(serviceMaster);
                } else {
                    // Handle the case where the specified ServiceMaster is not found
                    throw new ResourceNotFoundException("ServiceMaster not found with id: " + serviceId);
                }
            } else {
                // Handle the case where serviceId is null
                throw new IllegalArgumentException("ServiceId cannot be null");
            }

            // Save the LocationMaster Jpa entity to the database
            LocationMaster savedLocation = locationMasterRepository.save(locationMaster);

            // Convert saved LocationMaster Jpa entity object into LocationDto object
            return modelMapper.map(savedLocation, LocationDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Add Location ");
        }
    }


    @Override
    public LocationDto getLocation(Long id) throws ResourceNotFoundException {

        try {
            LocationMaster locationMaster = locationMasterRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Location not found with id:" + id));

            return modelMapper.map(locationMaster, LocationDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get Location ");
        }
    }

    @Override
    public List<LocationDto> getAllLocation() throws ResourceNotFoundException {
        try {
            List<LocationMaster> allLocation = locationMasterRepository.findAll();

            return allLocation.stream().map((Location) -> modelMapper.map(Location, LocationDto.class))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get all Location ");
        }
    }

    @Override
    public LocationDto updateLocation(LocationDto LocationDto, Long id) throws ResourceNotFoundException {

        try {

            LocationMaster location = locationMasterRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Location not found with id : " + id));
            location.setLocationName(LocationDto.getLocationName());
            location.setDescription(LocationDto.getDescription());
            location.setUserNo(LocationDto.getUserNo());
//        location.setService(LocationDto.getService());

            location.setUpdatedBy(LocationDto.getUpdatedBy());
            location.setUpdatedDatetime(LocationDto.getUpdatedDatetime());
            location.setVersionNo(LocationDto.getVersionNo());
            location.setQueNumber(LocationDto.getQueNumber());


            LocationMaster updatedLocation = locationMasterRepository.save(location);

            return modelMapper.map(updatedLocation, LocationDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Update Location ");
        }
    }

    @Override
    public void deleteLocation(Long id) throws ResourceNotFoundException {
        try {

            locationMasterRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Location not found with id : " + id));

            locationMasterRepository.deleteById(id);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Delete Location ");
        }
    }

    @Override
    public LocationDto setIsActive(Long locationId) throws ResourceNotFoundException {
        try {
            LocationMaster location = locationMasterRepository.findById(locationId)
                    .orElseThrow(() -> new ResourceNotFoundException("Location not found with id : " + locationId));

            location.setIsActive(!location.isActive());
            locationMasterRepository.save(location);

            return modelMapper.map(location, LocationDto.class);

        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Toggle ");
        }

    }
}
