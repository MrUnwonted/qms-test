package com.camerin.QMS.repository;

import com.camerin.QMS.entity.CounterMaster;
import com.camerin.QMS.entity.LocationMaster;
import com.camerin.QMS.entity.ServiceMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CounterMasterRepository extends JpaRepository<CounterMaster, Long> {
    Optional<CounterMaster> findById(Long locationId);
}
