package com.camerin.QMS.controller;

import com.camerin.QMS.dto.LocationDto;
import com.camerin.QMS.dto.LocationDto;
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

//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<LocationDto> addLocation(@RequestBody LocationDto locationDto){

        LocationDto savedLocation = masterService.addLocation(locationDto);

        return new ResponseEntity<>(savedLocation, HttpStatus.CREATED);
    }


//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<LocationDto> getLocation(@PathVariable("id") Long locationId){
        LocationDto locationDto = masterService.getLocation(locationId);
        return new ResponseEntity<>(locationDto, HttpStatus.OK);
    }

    // Build Get All Todos REST API
//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<LocationDto>> getAllLocation(){
        List<LocationDto> locations = masterService.getAllLocation();
        //return new ResponseEntity<>(todos, HttpStatus.OK);
        return ResponseEntity.ok(locations);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<LocationDto> updateLocation(@RequestBody LocationDto locationDto, @PathVariable("id") Long locationId){
        LocationDto updateLocation = masterService.updateLocation(locationDto, locationId);
        return ResponseEntity.ok(updateLocation);
    }


//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLocation(@PathVariable("id") Long locationId){
        masterService.deleteLocation(locationId);
        return ResponseEntity.ok("Location deleted successfully!.");
    }


//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/isactive")
    public ResponseEntity<LocationDto> setIsActive(@PathVariable("id") Long locationId){
        LocationDto updatedLocation = masterService.setIsActive(locationId);
        return ResponseEntity.ok(updatedLocation);
    }

}
