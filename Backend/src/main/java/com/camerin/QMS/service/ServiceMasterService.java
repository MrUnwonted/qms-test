package com.camerin.QMS.service;

import com.camerin.QMS.dto.ServiceDto;

import java.util.List;

public interface ServiceMasterService {

 ServiceDto addService(ServiceDto serviceDto);
 ServiceDto getService(Long id);

 List<ServiceDto> getAllService();

}
