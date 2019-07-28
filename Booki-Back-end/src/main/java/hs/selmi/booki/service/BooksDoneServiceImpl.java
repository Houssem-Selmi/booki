package hs.selmi.booki.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hs.selmi.booki.domain.Livre;
import hs.selmi.booki.domain.UtiliLivreDone;
import hs.selmi.booki.domain.Utilisateur;
import hs.selmi.booki.repository.IUtilisateursRepository;

@Service
public class BooksDoneServiceImpl implements IBooksDoneService {

	@Autowired
	IUtilisateursRepository utilisateurRepository;
	
	
	@Override
	public boolean addBookDoneToUser(Livre livre, Utilisateur utilisateur,int rate) {
		Utilisateur user;
		 user =  this.utilisateurRepository.findByEmail(utilisateur.getEmail()).get();
		 UtiliLivreDone livresDone;
		 livresDone = new UtiliLivreDone(livre, user,rate);
		 if(user!=null) {
				if(user.getUserLivresDone().add(livresDone)) {
					this.utilisateurRepository.save(user);
					return true;
				}
				}
				return false;
	}


	@Override
	public List<UtiliLivreDone> getAlluserDoneBooks(String email) {
		Utilisateur user;
		 user =  this.utilisateurRepository.findByEmail(email).get();
		 List<UtiliLivreDone> liste = new ArrayList<>();
		 if(user!=null) {
			liste = user.getUserLivresDone();
//			for(UtiliLivreDone item : liste){
//				livreDone.add(item.getLivre());
//			}
					}
		return liste;
	}


	@Override
	public boolean removeBookDoneFromUser(Livre bookToRemove, Utilisateur user) {
		if(user!=null) {
			UtiliLivreDone livreDone = new UtiliLivreDone(bookToRemove, user, 0);
			if(user.getUserLivresDone().remove(livreDone)) {
				this.utilisateurRepository.save(user);
				return true;
			}
			}
			return false;
	}
	
	
}
