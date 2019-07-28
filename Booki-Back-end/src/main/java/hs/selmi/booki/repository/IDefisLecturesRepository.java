package hs.selmi.booki.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hs.selmi.booki.domain.DefisLecture;

public interface IDefisLecturesRepository extends JpaRepository<DefisLecture,Integer> {

	Optional<DefisLecture> findByNbreTotalLivre(int nbre);
}
