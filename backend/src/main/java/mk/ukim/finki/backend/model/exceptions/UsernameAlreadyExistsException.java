package mk.ukim.finki.backend.model.exceptions;

public class UsernameAlreadyExistsException extends RuntimeException{
    public UsernameAlreadyExistsException(String username) {
        super(String.format("Username %s already exists", username));
    }
}
