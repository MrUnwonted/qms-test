package com.camerin.QMS.controller;

import com.camerin.QMS.dto.CounterDto;
import com.camerin.QMS.exception.ResourceNotFoundException;
import com.camerin.QMS.service.CounterMasterService;
import com.camerin.QMS.service.LocationMasterService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/countermaster")
@AllArgsConstructor
public class CounterMasterController {

    private CounterMasterService masterService;


    @PostMapping
    public ResponseEntity<CounterDto> addCounter(@RequestBody CounterDto CounterDto) throws ResourceNotFoundException {

        try {
            CounterDto savedCounter = masterService.addCounter(CounterDto);
            return new ResponseEntity<>(savedCounter, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Add Counter ");
        }

    }


    @GetMapping("{id}")
    public ResponseEntity<CounterDto> getCounter(@PathVariable("id") Long counterId) throws ResourceNotFoundException {
        try {
            CounterDto counterDto = masterService.getCounter(counterId);
            return new ResponseEntity<>(counterDto, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get Counter ");
        }
    }


    @GetMapping
    public ResponseEntity<List<CounterDto>> getAllCounter() throws ResourceNotFoundException {
        try {
            List<CounterDto> counters = masterService.getAllCounter();
            return ResponseEntity.ok(counters);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get all Counter ");
        }

    }


    @PutMapping("{id}")
    public ResponseEntity<CounterDto> updateCounter
            (@RequestBody CounterDto counterDto, @PathVariable("id") Long counterId) throws ResourceNotFoundException {
        try {
            CounterDto updateCounter = masterService.updateCounter(counterDto, counterId);
            return ResponseEntity.ok(updateCounter);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Update Counter ");
        }
    }


    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCounter(@PathVariable("id") Long counterId) throws ResourceNotFoundException {
        try {
            masterService.deleteCounter(counterId);
            return ResponseEntity.ok("Counter deleted successfully!.");
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Delete Counter ");
        }
    }


    @PatchMapping("{counterId}/toggle")
    public ResponseEntity<CounterDto> setIsActive(@PathVariable Long counterId) throws ResourceNotFoundException {
        try {
            CounterDto updatedCounter = masterService.setIsActive(counterId);
            return ResponseEntity.ok(updatedCounter);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Toggle ");
        }
    }

}
