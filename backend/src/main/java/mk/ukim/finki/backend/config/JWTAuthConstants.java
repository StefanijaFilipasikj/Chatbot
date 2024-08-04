package mk.ukim.finki.backend.config;

public class JWTAuthConstants {
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String SECRET = "s2dr23g23f12f";
    public static final String HEADER_STRING = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
}
