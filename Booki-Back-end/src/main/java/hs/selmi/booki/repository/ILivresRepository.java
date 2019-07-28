package hs.selmi.booki.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import hs.selmi.booki.domain.Livre;

public interface ILivresRepository extends JpaRepository<Livre, String> {
	
	@Query("select l from Livre l where l.titre Like %?1%")
	List<Livre> findByBookNameContain(String pattern);
	
	@Query("SELECT COUNT(u) FROM Livre u")
    Long countLivre();
	
	@Query("SELECT COUNT(u) FROM Utilisateur u")
    Long countUsers();
	
	@Query("SELECT COUNT(u) FROM DefisLecture u")
    Long countChallenges();
}
