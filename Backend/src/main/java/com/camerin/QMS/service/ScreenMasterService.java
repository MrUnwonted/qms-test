package com.camerin.QMS.service;

import com.camerin.QMS.dto.ScreenDto;
import com.camerin.QMS.dto.ScreenDto;

import java.util.List;

public interface ScreenMasterService {

 ScreenDto addScreen(ScreenDto screenDto);
 ScreenDto getScreen(Long id);

 List<ScreenDto> getAllScreen();

 ScreenDto updateScreen(ScreenDto screenDto, Long id);

 void deleteScreen(Long id);

 ScreenDto setIsActive(Long id);

}
