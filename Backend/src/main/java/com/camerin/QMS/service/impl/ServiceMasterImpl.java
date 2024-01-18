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
}
