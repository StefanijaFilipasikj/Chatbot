package mk.ukim.finki.backend.model.exceptions;

public class CustomMessageException extends RuntimeException{
    public CustomMessageException(String message) {
        super(message);
    }
}
