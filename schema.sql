create table blog(
    blogId int NOT NULL AUTO_INCREMENT,
    blogTitle varchar(255),
    blogAuthor varchar(255),
    blogAuthorId int,
    blogCreation timestamp,
    PRIMARY KEY (blogId),
    FOREIGN KEY (blogAuthorId) REFERENCES user(userId)
);