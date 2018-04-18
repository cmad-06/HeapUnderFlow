package com.learning.cmad.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;

public class Databasehandler {

	public static String DB_SERVER_IP = null;
	public static String DB_SERVER_PORT = null;
	public static String DB_SERVER_DATABASE = null;
	public static String DB_SERVER_USERNAME = null;
	public static String DB_SERVER_PASSWORD = null;
	public static Datastore datastore;
	
	
	public static void init(){
		   
		Properties prop = new Properties();
		InputStream input = null;

		try {

			input = new FileInputStream("/var/lib/tomcat8/webapps/ROOT/conf/db_config.properties");
			
			// load a properties file
			prop.load(input);

			DB_SERVER_IP = prop.getProperty("DB_SERVER_IP");
			DB_SERVER_PORT = prop.getProperty("DB_SERVER_PORT");
			DB_SERVER_DATABASE = prop.getProperty("DB_SERVER_DATABASE");
			DB_SERVER_USERNAME = prop.getProperty("DB_SERVER_USERNAME");
			DB_SERVER_PASSWORD = prop.getProperty("DB_SERVER_PASSWORD");
			
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
	}
	
//----------------------------------------------------------------------------------------
	
	public static Datastore getMongoDatastore(){
		
		Databasehandler.init();		
		MongoClient mongoClient = new MongoClient(DB_SERVER_IP+":"+DB_SERVER_PORT);
		Morphia morphia = new Morphia();
		if(datastore == null)
			datastore = morphia.createDatastore(mongoClient, DB_SERVER_DATABASE);
		return datastore;
		
	}
}
