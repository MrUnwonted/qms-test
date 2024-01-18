package com.camerin.QMS.dto;

import com.camerin.QMS.entity.LocationMaster;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CounterDto {

    private Long id;
    private String counterName;
    private String description;
    private LocationMaster location;
}
