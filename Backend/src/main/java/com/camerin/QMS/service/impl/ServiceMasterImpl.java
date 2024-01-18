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
    public ServiceDto addService(ServiceDto serviceDto) {

        // convert ServiceDto into ServiceMaster Jpa entity
        ServiceMaster serviceMaster = modelMapper.map(serviceDto, ServiceMaster.class);
        serviceMaster.setIsActive(Boolean.TRUE);
        // ServiceMaster Jpa entity
        ServiceMaster savedService = serviceMasterRepository.save(serviceMaster);

        // Convert saved ServiceMaster Jpa entity object into ServiceDto object

        ServiceDto savedServiceDto = modelMapper.map(savedService, ServiceDto.class);

        return savedServiceDto;
    }

    @Override
    public ServiceDto getService(Long id) {

        ServiceMaster serviceMaster =  serviceMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id:" + id));

        return modelMapper.map(serviceMaster, ServiceDto.class);
    }

    @Override
    public List<ServiceDto> getAllService() {

        List<ServiceMaster> allService = serviceMasterRepository.findAll();

        return allService.stream().map((service) -> modelMapper.map(service, ServiceDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ServiceDto updateService(ServiceDto serviceDto, Long id) {

        ServiceMaster service = serviceMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id : " + id));
        service.setServiceName(serviceDto.getServiceName());
        service.setDescription(serviceDto.getDescription());
        service.setCreatedDatetime(serviceDto.getCreatedDatetime());
        service.setCreatedBy(serviceDto.getCreatedBy());
        service.setUpdatedBy(serviceDto.getUpdatedBy());
        service.setUpdatedDatetime(serviceDto.getUpdatedDatetime());
        service.setVersionNo(serviceDto.getVersionNo());
        service.setIsActive(serviceDto.getIsActive());


        ServiceMaster updatedService = serviceMasterRepository.save(service);

        return modelMapper.map(updatedService, ServiceDto.class);
    }

    @Override
    public void deleteService(Long id) {
        ServiceMaster todo = serviceMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id : " + id));

        serviceMasterRepository.deleteById(id);
    }

    @Override
    public ServiceDto setIsActive(Long id) {
        ServiceMaster service = serviceMasterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id : " + id));

        service.setIsActive(Boolean.FALSE);

        return modelMapper.map(service, ServiceDto.class);
    }
}
