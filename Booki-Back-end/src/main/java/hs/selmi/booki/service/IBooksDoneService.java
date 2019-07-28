package hs.selmi.booki.service;

import java.util.List;

import hs.selmi.booki.domain.Livre;
import hs.selmi.booki.domain.UtiliLivreDone;
import hs.selmi.booki.domain.Utilisateur;

public interface IBooksDoneService {

	boolean addBookDoneToUser(Livre livre,Utilisateur utilisateur,int rate);
	List<UtiliLivreDone> getAlluserDoneBooks(String email);
	boolean removeBookDoneFromUser(Livre bookToRemove,Utilisateur user);
}
