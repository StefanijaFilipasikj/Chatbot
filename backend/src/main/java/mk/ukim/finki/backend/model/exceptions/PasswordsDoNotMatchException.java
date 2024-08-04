package mk.ukim.finki.backend.model.exceptions;

public class PasswordsDoNotMatchException extends RuntimeException{
    public PasswordsDoNotMatchException(String message) {
        super(message);
    }
}
