package hs.selmi.booki.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hs.selmi.booki.domain.UtiliLivreDone;
import hs.selmi.booki.domain.UtiliLivreDoneID;

public interface ILivresDoneRepository extends JpaRepository<UtiliLivreDone, UtiliLivreDoneID> {

	
}
