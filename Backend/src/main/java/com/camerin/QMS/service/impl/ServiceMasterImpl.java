package com.camerin.QMS.service.impl;


import com.camerin.QMS.dto.ServiceDto;
import com.camerin.QMS.entity.ServiceMaster;
import com.camerin.QMS.exception.ResourceNotFoundException;
import com.camerin.QMS.repository.ServiceMasterRepository;
import com.camerin.QMS.service.ServiceMasterService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ServiceMasterImpl implements ServiceMasterService {

    private ServiceMasterRepository serviceMasterRepository;
    private ModelMapper modelMapper;

    @Override
    public ServiceDto addService(ServiceDto serviceDto) throws ResourceNotFoundException {
        try {
            // convert ServiceDto into ServiceMaster Jpa entity
            ServiceMaster serviceMaster = modelMapper.map(serviceDto, ServiceMaster.class);
            serviceMaster.setIsActive(Boolean.TRUE);
            // ServiceMaster Jpa entity
            ServiceMaster savedService = serviceMasterRepository.save(serviceMaster);

            // Convert saved ServiceMaster Jpa entity object into ServiceDto object

            ServiceDto savedServiceDto = modelMapper.map(savedService, ServiceDto.class);

            return savedServiceDto;
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Add Service ");
        }

    }

    @Override
    public ServiceDto getService(Long id) throws ResourceNotFoundException {
        try {
            ServiceMaster serviceMaster = serviceMasterRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Service not found with id:" + id));

            return modelMapper.map(serviceMaster, ServiceDto.class);

        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get Service ");
        }

    }

    @Override
    public List<ServiceDto> getAllService() throws ResourceNotFoundException {
        try {
            List<ServiceMaster> allService = serviceMasterRepository.findAll();

            return allService.stream().map((service) -> modelMapper.map(service, ServiceDto.class))
                    .collect(Collectors.toList());

        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get all Service ");
        }

    }

    @Override
    public ServiceDto updateService(ServiceDto serviceDto, Long id) throws ResourceNotFoundException {
        try {

            ServiceMaster service = serviceMasterRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Service not found with id : " + id));
            service.setServiceName(serviceDto.getServiceName());
            service.setDescription(serviceDto.getDescription());
            service.setUpdatedBy(serviceDto.getUpdatedBy());
            service.setUpdatedDatetime(serviceDto.getUpdatedDatetime());


            ServiceMaster updatedService = serviceMasterRepository.save(service);

            return modelMapper.map(updatedService, ServiceDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Update Service ");
        }
    }

    @Override
    public void deleteService(Long id) throws ResourceNotFoundException {
        try {
            serviceMasterRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Service not found with id : " + id));

            serviceMasterRepository.deleteById(id);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Delete Service ");
        }
    }

    @Override
    public ServiceDto setIsActive(Long serviceId) throws ResourceNotFoundException {
        try {
            ServiceMaster dto = serviceMasterRepository.findById(serviceId)
                    .orElseThrow(() -> new ResourceNotFoundException("Service not found with id :" + serviceId));

            dto.setIsActive(!dto.isActive());
            serviceMasterRepository.save(dto);

            return modelMapper.map(dto, ServiceDto.class);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Toggle ");
        }
    }


}
