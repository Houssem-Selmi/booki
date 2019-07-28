package hs.selmi.booki.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class UtiliLivreDoneID implements Serializable {

	  public UtiliLivreDoneID() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name = "done_isbn_id")
	    private String isbn;
	 
	    @Column(name = "done_id")
	    private int id;
	 
	 
	    public UtiliLivreDoneID(
	        String isbn, 
	        int id) {
	        this.isbn = isbn;
	        this.id = id;
	    }
	 
	    //Getters omitted for brevity
	 
	    public String getIsbn() {
			return isbn;
		}

		public void setIsbn(String isbn) {
			this.isbn = isbn;
		}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		@Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	 
	        if (o == null || getClass() != o.getClass()) 
	            return false;
	 
	        UtiliLivreDoneID that = (UtiliLivreDoneID) o;
	        return Objects.equals(isbn, that.isbn) && 
	               Objects.equals(id, that.id);
	    }
	 
	    @Override
	    public int hashCode() {
	        return Objects.hash(isbn, id);
	    }
	
}
