import React from 'react'


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }


    render(){
        return (
            <div class="tabs-basic">

                <ul>
                    <li><a class="tab-active" data-index="0" href="#">My Blogs</a>
                    </li>
                    <li><a data-index="1" href="#">Add Blog</a></li>
                    <li><a data-index="2" href="#">Update Profile</a></li>
                </ul>
                <div class="tabs-content-placeholder">

                    <div class="tab-content-active">
                        <p class="table-user">
                        <table cellspacing="0" id="records_table">
                            <tr>
                                <th>Blog Title</th>
                                <th width="230">Total Likes</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </table>
                        </p>

                    </div>
                    <div>
                        <form id="addblogform">

                            <p class="form-group required">
                                <label for="blogTitle" class='control-label'>Blog Title:</label>
                                <input type="text" class="form-control" name="blogtitle"
                                    id="blogtitle" placeholder="Enter Blog Title " />
                            </p>

                            <p class="form-group required">
                                <label for="blogText" class='control-label'>Blog Text:</label>
                                <textarea rows="4" cols="50" class="form-control"
                                    name="blogtext" id="blogtext" placeholder="Enter Blog Text"></textarea>
                            </p>

                            <p class="form-group">
                                <button id="addblog" type="submit" class="btn btn-success btn-lg">Submit</button>
                            </p>
                        </form>
				    </div>
                    <div>
					<form id="profileupdateform">
					<p class="form-group">
						<label for="firstname" class='control-label'>First Name:</label> <input type="text"
							class="form-control" name="firstname1" id="changefirstname" placeholder="Enter firstname" />
					</p>
					<p class="form-group">
						<label for="lastname" class='control-label'>Last Name:</label> <input type="text"
							class="form-control" name="lastname1" id="changelastname" placeholder="Enter lastname" />
					</p>

					<p class="form-group">
						<label for="email" class='control-label'>Email:</label> <input type="email"
							class="form-control" name="email1" id="changeemail" placeholder="Enter email" />
					</p>
					<p class="form-group">
						<label for="pwd" class='control-label'>Password:</label> <input type="password"
							class="form-control" name="password1" id="changepassword" placeholder="Enter password" />
					</p>
					<p class="form-group">
						<label for="pwd" class='control-label'>Confirm Password:</label> <input type="password"
							class="form-control" name="password2" id="changepassword2" placeholder="Confirm password" />
					</p>
					<p class="form-group">
						<button id="profileupdate" type="submit" class="btn btn-success btn-lg">Submit</button>
					</p>
				</form>
				</div>


                </div>    
            </div>
			
	

        )
    }

}

export default UserProfile