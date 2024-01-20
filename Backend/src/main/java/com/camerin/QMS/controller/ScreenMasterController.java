package com.camerin.QMS.controller;

import com.camerin.QMS.dto.ScreenDto;
import com.camerin.QMS.exception.ResourceNotFoundException;
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
    public ResponseEntity<ScreenDto> addScreen(@RequestBody ScreenDto screenDto) throws ResourceNotFoundException {

        try {
            ScreenDto savedScreen = masterService.addScreen(screenDto);
            return new ResponseEntity<>(savedScreen, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Add Screen");
        }

    }


    //    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("{id}")
    public ResponseEntity<ScreenDto> getScreen(@PathVariable("id") Long screenId) throws ResourceNotFoundException {
        try {
            ScreenDto screenDto = masterService.getScreen(screenId);
            return new ResponseEntity<>(screenDto, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get Screen");
        }
    }


    @GetMapping
    public ResponseEntity<List<ScreenDto>> getAllScreen() throws ResourceNotFoundException {
        try {
            List<ScreenDto> screens = masterService.getAllScreen();
            return ResponseEntity.ok(screens);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Get all Screen");
        }
    }


    @PutMapping("{id}")
    public ResponseEntity<ScreenDto> updateScreen
            (@RequestBody ScreenDto ScreenDto, @PathVariable("id") Long screenId) throws ResourceNotFoundException {
        try {
            ScreenDto updateScreen = masterService.updateScreen(ScreenDto, screenId);
            return ResponseEntity.ok(updateScreen);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Update Screen");
        }
    }


    //    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteScreen(@PathVariable("id") Long screenId) throws ResourceNotFoundException {
        try {
            masterService.deleteScreen(screenId);
            return ResponseEntity.ok("Screen deleted successfully!.");
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Delete Screen");
        }
    }


    //    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("{id}/isactive")
    public ResponseEntity<ScreenDto> setIsActive(@PathVariable("id") Long screenId) throws ResourceNotFoundException {
        try {
            ScreenDto updatedScreen = masterService.setIsActive(screenId);
            return ResponseEntity.ok(updatedScreen);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Could not Toggle");
        }
    }

}
