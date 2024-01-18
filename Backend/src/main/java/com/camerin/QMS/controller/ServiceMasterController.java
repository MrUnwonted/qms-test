package com.camerin.QMS.controller;

import com.camerin.QMS.dto.ServiceDto;
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

//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ServiceDto> addService(@RequestBody ServiceDto serviceDto){

        ServiceDto savedService = masterService.addService(serviceDto);

        return new ResponseEntity<>(savedService, HttpStatus.CREATED);
    }


//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<ServiceDto> getTodo(@PathVariable("id") Long serviceId){
        ServiceDto serviceDto = masterService.getService(serviceId);
        return new ResponseEntity<>(serviceDto, HttpStatus.OK);
    }

    // Build Get All Todos REST API
//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<ServiceDto>> getAllService(){
        List<ServiceDto> services = masterService.getAllService();
        //return new ResponseEntity<>(todos, HttpStatus.OK);
        return ResponseEntity.ok(services);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<ServiceDto> updateService(@RequestBody ServiceDto serviceDto, @PathVariable("id") Long serviceId){
        ServiceDto updateService = masterService.updateService(serviceDto, serviceId);
        return ResponseEntity.ok(updateService);
    }


//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteService(@PathVariable("id") Long serviceId){
        masterService.deleteService(serviceId);
        return ResponseEntity.ok("Service deleted successfully!.");
    }


//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/isactive")
    public ResponseEntity<ServiceDto> setIsActive(@PathVariable("id") Long serviceId){
        ServiceDto updatedservice = masterService.setIsActive(serviceId);
        return ResponseEntity.ok(updatedservice);
    }

}
