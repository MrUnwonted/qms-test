package com.camerin.QMS.controller;

import com.camerin.QMS.dto.CounterDto;
import com.camerin.QMS.service.CounterMasterService;
import com.camerin.QMS.service.LocationMasterService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/locationmaster")
@AllArgsConstructor
public class CounterMasterController {

    private CounterMasterService masterService;

//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CounterDto> addCounter(@RequestBody CounterDto CounterDto){

        CounterDto savedCounter = masterService.addCounter(CounterDto);

        return new ResponseEntity<>(savedCounter, HttpStatus.CREATED);
    }


//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<CounterDto> getCounter(@PathVariable("id") Long counterId){
        CounterDto counterDto = masterService.getCounter(counterId);
        return new ResponseEntity<>(counterDto, HttpStatus.OK);
    }


//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<CounterDto>> getAllCounter(){
        List<CounterDto> counters = masterService.getAllCounter();
        //return new ResponseEntity<>(todos, HttpStatus.OK);
        return ResponseEntity.ok(counters);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<CounterDto> updateCounter(@RequestBody CounterDto counterDto, @PathVariable("id") Long counterId){
        CounterDto updateCounter = masterService.updateCounter(counterDto, counterId);
        return ResponseEntity.ok(updateCounter);
    }


//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCounter(@PathVariable("id") Long counterId){
        masterService.deleteCounter(counterId);
        return ResponseEntity.ok("Counter deleted successfully!.");
    }


//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/isactive")
    public ResponseEntity<CounterDto> setIsActive(@PathVariable("id") Long counterId){
        CounterDto updatedCounter = masterService.setIsActive(counterId);
        return ResponseEntity.ok(updatedCounter);
    }

}
