package project.controller.token;

import java.security.Key;

import javax.crypto.spec.SecretKeySpec;

public class TokenKey {
    private Key key;
    private static TokenKey instance;

    private TokenKey() {
        String secretKey = "glCUnUN56tgMocukiJBa9aGcQU8PkMymolNryWAiJmA07Ew2M3pUqjeXlt5YQwTpcDswV43wRvPBMth0KB9e2Ja0IftaEAOWEJ1UacMTvX7OsTewSCh2XCJn6ypN1CTq37tDDv9ZJaRk0Hk1a7k7Tb2RZZI22sFkxj7vq0FMuquQDu4LQcMu5BLdATCVe3sadProRd089wFMW4SxPf7DWF0hR1zrmaENMWaQXsVq3as92Hz470zfobXETU6CO2sq";
        byte[] keyBytes = secretKey.getBytes();
        this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public static TokenKey getInstance() {
        if (instance == null) {
            instance = new TokenKey();
        }
        return instance;
    }

    public Key getKey() {
        return this.key;
    }
}
