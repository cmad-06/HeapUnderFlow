package com.learning.cmad.utils;

import java.security.MessageDigest;

public class EncryptorDecryptor {


	public static String encryptData(String data) {

		StringBuffer sb = null;
		try{
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			digest.update(data.getBytes());
			byte byteData[] = digest.digest();
			//convert bytes to hex chars
			sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
			}
		}catch(Exception e){
			e.printStackTrace();
		}

		return sb.toString();
	}



}
