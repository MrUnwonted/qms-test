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
    @Column(name = "COUNTER_ID")
    private Long id;

    @Column(name = "COUNTER_NAME")
    private String counterName;

    @Column(name = "DESCRIPTION")
    private String description;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "LOCATION_ID") // This is the foreign key column
    private LocationMaster location;

}
