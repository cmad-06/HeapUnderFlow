package com.learning.cmad.utils;

import org.mongodb.morphia.Datastore;

public class TestMongoConnection {

	public static void main(String[] args) {

		Datastore ds = Databasehandler.getMongoDatastore();
		System.out.println(ds);
	}

}
