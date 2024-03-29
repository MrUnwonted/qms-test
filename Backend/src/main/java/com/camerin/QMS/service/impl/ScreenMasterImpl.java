package com.camerin.QMS.service.impl;


import com.camerin.QMS.dto.ScreenDto;
import com.camerin.QMS.entity.CounterMaster;
import com.camerin.QMS.entity.LocationMaster;
import com.camerin.QMS.entity.ScreenMaster;
import com.camerin.QMS.exception.ResourceNotFoundException;
import com.camerin.QMS.repository.CounterMasterRepository;
import com.camerin.QMS.repository.LocationMasterRepository;
import com.camerin.QMS.repository.ScreenMasterRepository;
import com.camerin.QMS.service.CounterMasterService;
import com.camerin.QMS.service.ScreenMasterService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ScreenMasterImpl implements ScreenMasterService {

    private CounterMasterRepository counterMasterService;
    private ScreenMasterRepository screenMasterRepository;
    private ModelMapper modelMapper;


    @Override
    public ScreenDto addScreen(ScreenDto screenDto) throws ResourceNotFoundException {
        try {

            // Convert ScreenDto into LocationMaster Jpa entity
            ScreenMaster screenMaster = modelMapper.map(screenDto, ScreenMaster.class);
            screenMaster.setIsActive(Boolean.TRUE);

            // Retrieve the ServiceMaster entity based on the provided serviceId in the ScreenDto
            Long screenId = screenDto.getCounterId();
            if (screenId != null) {
                Optional<CounterMaster> serviceOptional = counterMasterService.findById(screenId);
                if (serviceOptional.isPresent()) {
                    CounterMaster counterMaster = serviceOptional.get();
                    screenMaster.setCounter(counterMaster);
                } else {
                    // Handle the case where the specified ServiceMaster is not found
                    throw new ResourceNotFoundException("Screen not found with id: " + screenId);
                }
            } else {
                // Handle the case where serviceId is null
                throw new IllegalArgumentException("Screen cannot be null");
            }

            // Save the LocationMaster Jpa entity to the database
            ScreenMaster savedScreen = screenMasterRepository.save(screenMaster);

            // Convert saved LocationMaster Jpa entity object into ScreenDto object
            return modelMapper.map(savedScreen, ScreenDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Add Screen");
        }
    }


    @Override
    public ScreenDto getScreen(Long id) throws ResourceNotFoundException {

        try {

            ScreenMaster screenMaster = screenMasterRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Screen not found with id:" + id));

            return modelMapper.map(screenMaster, ScreenDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get Screen");
        }
    }

    @Override
    public List<ScreenDto> getAllScreen() throws ResourceNotFoundException {
        try {

            List<ScreenMaster> allScreen = screenMasterRepository.findAll();

            return allScreen.stream().map((Screen) -> modelMapper.map(Screen, ScreenDto.class))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get all Screen");
        }
    }

    @Override
    public ScreenDto updateScreen(ScreenDto screenDto, Long id) throws ResourceNotFoundException {
        try {

            ScreenMaster screen = screenMasterRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Screen not found with id : " + id));
            screen.setScreenName(screenDto.getScreenName());
            screen.setDescription(screenDto.getDescription());

//        location.setService(ScreenDto.getService());

            screen.setUpdatedBy(screenDto.getUpdatedBy());
            screen.setUpdatedDatetime(screenDto.getUpdatedDatetime());
            screen.setVersionNo(screenDto.getVersionNo());


            ScreenMaster updatedScreen = screenMasterRepository.save(screen);

            return modelMapper.map(updatedScreen, ScreenDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Update Screen");
        }
    }

    @Override
    public void deleteScreen(Long id) throws ResourceNotFoundException {
        try {
            screenMasterRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Counter not found with id : " + id));
            screenMasterRepository.deleteById(id);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Delete Screen");
        }

    }

    @Override
    public ScreenDto setIsActive(Long screenId) throws ResourceNotFoundException {
        try {
            ScreenMaster screen = screenMasterRepository.findById(screenId)
                    .orElseThrow(() -> new ResourceNotFoundException("Screen not found with id : " + screenId));
            screen.setIsActive(!screen.isActive());
            screenMasterRepository.save(screen);

            return modelMapper.map(screen, ScreenDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Toggle");
        }

    }
}
