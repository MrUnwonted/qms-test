package com.camerin.QMS.controller;

import com.camerin.QMS.dto.LocationDto;
import com.camerin.QMS.dto.LocationDto;
import com.camerin.QMS.exception.ResourceNotFoundException;
import com.camerin.QMS.service.LocationMasterService;
import com.camerin.QMS.service.ServiceMasterService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/locationmaster")
@AllArgsConstructor
public class LocationMasterController {

    private LocationMasterService masterService;


    @PostMapping
    public ResponseEntity<LocationDto> addLocation(@RequestBody LocationDto locationDto) throws ResourceNotFoundException {

        try {
            LocationDto savedLocation = masterService.addLocation(locationDto);
            return new ResponseEntity<>(savedLocation, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Add Location ");
        }

    }


    @GetMapping("{id}")
    public ResponseEntity<LocationDto> getLocation(@PathVariable("id") Long locationId) throws ResourceNotFoundException {
        try {
            LocationDto locationDto = masterService.getLocation(locationId);
            return new ResponseEntity<>(locationDto, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get Location ");
        }
    }


    @GetMapping
    public ResponseEntity<List<LocationDto>> getAllLocation() throws ResourceNotFoundException {
        try {
            List<LocationDto> locations = masterService.getAllLocation();
            return ResponseEntity.ok(locations);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get all Location ");
        }

    }


    @PutMapping("{id}")
    public ResponseEntity<LocationDto> updateLocation
            (@RequestBody LocationDto locationDto, @PathVariable("id") Long locationId) throws ResourceNotFoundException {
        try {
            LocationDto updateLocation = masterService.updateLocation(locationDto, locationId);
            return ResponseEntity.ok(updateLocation);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Update Location ");
        }
    }


    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLocation(@PathVariable("id") Long locationId) throws ResourceNotFoundException {
        try {
            masterService.deleteLocation(locationId);
            return ResponseEntity.ok("Location deleted successfully!.");
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Delete Location ");
        }
    }


    @PatchMapping("{locationId}/toggle")
    public ResponseEntity<LocationDto> setIsActive(@PathVariable Long locationId) throws ResourceNotFoundException {
        try {
            LocationDto updatedLocation = masterService.setIsActive(locationId);
            return ResponseEntity.ok(updatedLocation);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Toggle ");
        }
    }

}
