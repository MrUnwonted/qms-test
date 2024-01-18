package com.camerin.QMS.controller;

import com.camerin.QMS.dto.ScreenDto;
import com.camerin.QMS.service.CounterMasterService;
import com.camerin.QMS.service.ScreenMasterService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/screenmaster")
@AllArgsConstructor
public class ScreenMasterController {

    private ScreenMasterService masterService;

//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ScreenDto> addScreen(@RequestBody ScreenDto screenDto){

        ScreenDto savedScreen = masterService.addScreen(screenDto);

        return new ResponseEntity<>(savedScreen, HttpStatus.CREATED);
    }


//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<ScreenDto> getScreen(@PathVariable("id") Long screenId){
        ScreenDto screenDto = masterService.getScreen(screenId);
        return new ResponseEntity<>(screenDto, HttpStatus.OK);
    }


//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public ResponseEntity<List<ScreenDto>> getAllScreen(){
        List<ScreenDto> screens = masterService.getAllScreen();
        //return new ResponseEntity<>(todos, HttpStatus.OK);
        return ResponseEntity.ok(screens);
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<ScreenDto> updateScreen(@RequestBody ScreenDto ScreenDto, @PathVariable("id") Long screenId){
        ScreenDto updateScreen = masterService.updateScreen(ScreenDto, screenId);
        return ResponseEntity.ok(updateScreen);
    }


//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteScreen(@PathVariable("id") Long screenId){
        masterService.deleteScreen(screenId);
        return ResponseEntity.ok("Screen deleted successfully!.");
    }


//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/isactive")
    public ResponseEntity<ScreenDto> setIsActive(@PathVariable("id") Long screenId){
        ScreenDto updatedScreen = masterService.setIsActive(screenId);
        return ResponseEntity.ok(updatedScreen);
    }

}
