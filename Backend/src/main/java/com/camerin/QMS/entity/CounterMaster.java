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
@Table(name = "COUNTERMASTER")
public class CounterMaster extends BaseDomain{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COUNTERID")
    private Long id;

    @Column(name = "COUNTERNAME")
    private String counterName;

    @Column(name = "DESCRIPTION")
    private String description;

}
