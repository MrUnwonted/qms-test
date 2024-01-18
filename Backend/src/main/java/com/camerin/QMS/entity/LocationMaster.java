package com.camerin.QMS.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "LOCATIONMASTER")
public class LocationMaster extends BaseDomain{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LOCATIONID")
    private Long id;

    @Column(name = "LOCATIONNAME")
    private String locationName;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "USERNO")
    private Integer userNo;

}
