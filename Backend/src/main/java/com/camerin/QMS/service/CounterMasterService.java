package com.camerin.QMS.service;

import com.camerin.QMS.dto.CounterDto;
import com.camerin.QMS.dto.LocationDto;

import java.util.List;

public interface CounterMasterService {

 CounterDto addCounter(CounterDto counterDto);
 CounterDto getCounter(Long id);

 List<CounterDto> getAllCounter();

 CounterDto updateCounter(CounterDto counterDto, Long id);

 void deleteCounter(Long id);

 CounterDto setIsActive(Long counterId);

}
