package hs.selmi.booki.service;

import java.util.List;
import java.util.Optional;

import hs.selmi.booki.domain.DefisLecture;

public interface IDefisLectureService {

	List<DefisLecture> getAllDefisLecture();
	
	boolean saveDefis(DefisLecture defis);
	boolean addChallengeToUser(int nbBook, String email);
	List<DefisLecture> getAllUserChallenges(String email);
	boolean deleteChallengeFromUser(int nbBook, String email);
	boolean deleteDefis(DefisLecture defis);
	Optional<DefisLecture> findById(int id);

}
