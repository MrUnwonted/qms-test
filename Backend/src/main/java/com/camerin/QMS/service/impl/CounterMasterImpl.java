package com.camerin.QMS.service.impl;


import com.camerin.QMS.dto.CounterDto;
import com.camerin.QMS.entity.CounterMaster;
import com.camerin.QMS.entity.LocationMaster;
import com.camerin.QMS.exception.ResourceNotFoundException;
import com.camerin.QMS.repository.CounterMasterRepository;
import com.camerin.QMS.repository.LocationMasterRepository;
import com.camerin.QMS.service.CounterMasterService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CounterMasterImpl implements CounterMasterService {

    private CounterMasterRepository counterMasterService;
    private LocationMasterRepository locationMasterRepository;
    private ModelMapper modelMapper;


    @Override
    public CounterDto addCounter(CounterDto counterDto) throws ResourceNotFoundException {

        try {
            // Convert CounterDto into LocationMaster Jpa entity
            CounterMaster counterMaster = modelMapper.map(counterDto, CounterMaster.class);
            counterMaster.setIsActive(Boolean.TRUE);

            // Retrieve the ServiceMaster entity based on the provided serviceId in the CounterDto
            Long locationId = counterDto.getLocationId();
            if (locationId != null) {
                Optional<LocationMaster> serviceOptional = locationMasterRepository.findById(locationId);
                if (serviceOptional.isPresent()) {
                    LocationMaster locationMaster = serviceOptional.get();
                    counterMaster.setLocation(locationMaster);
                } else {
                    // Handle the case where the specified ServiceMaster is not found
                    throw new ResourceNotFoundException("LocationMaster not found with id: " + locationId);
                }
            } else {
                // Handle the case where serviceId is null
                throw new IllegalArgumentException("LocationId cannot be null");
            }

            // Save the LocationMaster Jpa entity to the database
            CounterMaster savedCounter = counterMasterService.save(counterMaster);

            // Convert saved LocationMaster Jpa entity object into CounterDto object
            return modelMapper.map(savedCounter, CounterDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Add Counter ");
        }

    }


    @Override
    public CounterDto getCounter(Long id) throws ResourceNotFoundException {

        try {
            CounterMaster counterMaster = counterMasterService.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Counter not found with id:" + id));

            return modelMapper.map(counterMaster, CounterDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get Counter ");
        }
    }

    @Override
    public List<CounterDto> getAllCounter() throws ResourceNotFoundException {

        try {

            List<CounterMaster> allCounter = counterMasterService.findAll();

            return allCounter.stream().map((Counter) -> modelMapper.map(Counter, CounterDto.class))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get all Counter ");
        }
    }

    @Override
    public CounterDto updateCounter(CounterDto CounterDto, Long id) throws ResourceNotFoundException {

        try {

            CounterMaster counter = counterMasterService.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Location not found with id : " + id));
            counter.setCounterName(CounterDto.getCounterName());
            counter.setDescription(CounterDto.getDescription());

//        location.setService(CounterDto.getService());

            counter.setUpdatedBy(CounterDto.getUpdatedBy());
            counter.setUpdatedDatetime(CounterDto.getUpdatedDatetime());
            counter.setVersionNo(CounterDto.getVersionNo());


            CounterMaster updatedCounter = counterMasterService.save(counter);

            return modelMapper.map(updatedCounter, CounterDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Update Counter ");
        }
    }

    @Override
    public void deleteCounter(Long id) throws ResourceNotFoundException {
        try {

            counterMasterService.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Counter not found with id : " + id));

            counterMasterService.deleteById(id);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Delete Counter ");
        }
    }

    @Override
    public CounterDto setIsActive(Long id) throws ResourceNotFoundException {
        try {

            CounterMaster counter = counterMasterService.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Counter not found with id : " + id));

            counter.setIsActive(!counter.isActive());
            counterMasterService.save(counter);

            return modelMapper.map(counter, CounterDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Toggle ");
        }
    }
}
