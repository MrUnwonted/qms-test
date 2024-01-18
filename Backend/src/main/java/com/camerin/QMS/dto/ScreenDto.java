package com.camerin.QMS.dto;

import com.camerin.QMS.entity.CounterMaster;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScreenDto {

    private Long id;
    private String screenName;
    private String description;
    private CounterMaster counter;
}
