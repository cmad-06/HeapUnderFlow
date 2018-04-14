package com.learning.cmad.utils;

import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTTokenHelper {

	
	public static String createJWT(String id, String issuer, String subject, long ttlMillis) {

		//The JWT signature algorithm we will be using to sign the token
		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

		long nowMillis = System.currentTimeMillis();
		Date now = new Date(nowMillis);

		//We will sign our JWT with our ApiKey secret
		byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary("secret");
		Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

		//Let's set the JWT Claims
		JwtBuilder builder = Jwts.builder().setId(id)
				.setIssuedAt(now)
				.setSubject(subject)
				.setIssuer(issuer)
				.signWith(signatureAlgorithm, signingKey);

		//if it has been specified, let's add the expiration
		if (ttlMillis >= 0) {
			long expMillis = nowMillis + ttlMillis;
			Date exp = new Date(expMillis);
			builder.setExpiration(exp);
		}

		//Builds the JWT and serializes it to a compact, URL-safe string
		System.out.println(builder);
		return builder.compact();
	}
	
//-------------------------------------------------------------------------------------------------------------------	
	
	//Sample method to validate and read the JWT
	public static void parseJWT(String jwt) {
	//This line will throw an exception if it is not a signed JWS (as expected)
	Claims claims = Jwts.parser()
	   .setSigningKey(DatatypeConverter.parseBase64Binary("secret"))
	   .parseClaimsJws(jwt).getBody();
	System.out.println("ID: " + claims.getId());
	System.out.println("Subject: " + claims.getSubject());
	System.out.println("Issuer: " + claims.getIssuer());
	System.out.println("Expiration: " + claims.getExpiration());
	}
	
//-------------------------------------------------------------------------------------------------------------------
	
}
