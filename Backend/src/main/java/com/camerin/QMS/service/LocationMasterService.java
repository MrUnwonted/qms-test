package com.camerin.QMS.service;

import com.camerin.QMS.dto.LocationDto;
import com.camerin.QMS.dto.ServiceDto;

import java.util.List;

public interface LocationMasterService {

 LocationDto addLocation(LocationDto locationDto);
 LocationDto getLocation(Long id);

 List<LocationDto> getAllLocation();

 LocationDto updateLocation(LocationDto locationDto, Long id);

 void deleteLocation(Long id);

 LocationDto setIsActive(Long id);

}
