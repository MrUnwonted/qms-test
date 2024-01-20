package com.camerin.QMS.controller;

import com.camerin.QMS.dto.ServiceDto;
import com.camerin.QMS.exception.ResourceNotFoundException;
import com.camerin.QMS.service.ServiceMasterService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/servicemaster")
@AllArgsConstructor
public class ServiceMasterController {

    private ServiceMasterService masterService;

    @PostMapping
    public ResponseEntity<ServiceDto> addService(@RequestBody ServiceDto serviceDto) throws ResourceNotFoundException {

        try {
            ServiceDto savedService = masterService.addService(serviceDto);
            return new ResponseEntity<>(savedService, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Add Service ");
        }

    }

    @GetMapping("{id}")
    public ResponseEntity<ServiceDto> getService(@PathVariable("id") Long serviceId) throws ResourceNotFoundException {
        try {
            ServiceDto serviceDto = masterService.getService(serviceId);
            return new ResponseEntity<>(serviceDto, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get Service ");
        }
    }

    @GetMapping
    public ResponseEntity<List<ServiceDto>> getAllService() throws ResourceNotFoundException {
        try {
            List<ServiceDto> services = masterService.getAllService();
            return ResponseEntity.ok(services);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get all Service ");
        }
    }


    @PutMapping("{id}")
    public ResponseEntity<ServiceDto> updateService(@RequestBody ServiceDto serviceDto, @PathVariable("id") Long serviceId) throws ResourceNotFoundException {
        try {
            ServiceDto updateService = masterService.updateService(serviceDto, serviceId);
            return ResponseEntity.ok(updateService);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Update Service ");
        }
    }


    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteService(@PathVariable("id") Long serviceId) throws ResourceNotFoundException {
        try {
            masterService.deleteService(serviceId);
            return ResponseEntity.ok("Service deleted successfully!.");
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Delete Service ");
        }
    }


    @PatchMapping("/{serviceId}/toggle")
    public ResponseEntity<ServiceDto> setIsActive(@PathVariable Long serviceId) throws ResourceNotFoundException {
        try {
            ServiceDto toggledService = masterService.setIsActive(serviceId);
            return ResponseEntity.ok(toggledService);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Toggle ");
        }
    }

}
