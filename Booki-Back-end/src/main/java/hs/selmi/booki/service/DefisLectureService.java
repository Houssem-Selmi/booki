package hs.selmi.booki.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hs.selmi.booki.domain.DefisLecture;
import hs.selmi.booki.domain.Utilisateur;
import hs.selmi.booki.repository.IDefisLecturesRepository;
import hs.selmi.booki.repository.IUtilisateursRepository;

@Service
public class DefisLectureService implements IDefisLectureService {

	
	@Autowired
	IDefisLecturesRepository defisLecturesRepository;
	@Autowired
	IUtilisateursRepository utilisateurRepository;
	
	
	
	@Override
	public List<DefisLecture> getAllDefisLecture() {
		return this.defisLecturesRepository.findAll();
	}

	@Override
	public boolean addChallengeToUser(int nbBook, String email) {
		Utilisateur user;
		DefisLecture defis;
		boolean res = false;
		 user =  this.utilisateurRepository.findByEmail(email).get();
		 defis = this.defisLecturesRepository.findByNbreTotalLivre(nbBook).get();

		  res = user.getDefisLectures().add(defis);

		 this.utilisateurRepository.save(user);

		return res;
	}

	@Override
	public List<DefisLecture> getAllUserChallenges(String email) {
		Utilisateur user = new Utilisateur();
		user = this.utilisateurRepository.findByEmail(email).get();
		return user.getDefisLectures();
	}
	
	@Override
	public boolean deleteChallengeFromUser(int nbBook, String email) {
		boolean res ;
		Utilisateur user = new Utilisateur();
		user = this.utilisateurRepository.findByEmail(email).get();
		DefisLecture defis;
		defis = this.defisLecturesRepository.findByNbreTotalLivre(nbBook).get();
		res = user.getDefisLectures().remove(defis);
		this.utilisateurRepository.save(user);
		return res;
	}

	@Override
	public boolean saveDefis(DefisLecture defis) {
		if(this.defisLecturesRepository.save(defis)!=null) return true;
		else 
			return false;
	}

	@Override
	public boolean deleteDefis(DefisLecture defis) {
		 this.defisLecturesRepository.delete(defis);
		 return true;
	}

	@Override
	public Optional<DefisLecture> findById(int id) {
		return this.defisLecturesRepository.findById(id);
	}


	
	
}
