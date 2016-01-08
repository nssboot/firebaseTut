    window.userInfo = {
    eMail : "",
    firstName : "",
    lastName : "",
    userExists: "False" 
};// end of userInfo

  alert("just outside Ready function");

$(document).ready(function(){
        var loginOption, loginInput, userExists=0;
        var fbRefUsers;
        
        var rootRef = new Firebase('https://sweltering-inferno-4811.firebaseio.com');
        $("#loginOption").on("focusout",function(){  
            loginOption = $("#loginOption").val();
          });

        alert("in the Ready function");

        var loginInput = document.getElementById("user_username"); 
        var loginPassword = document.getElementById("user_password");  
        //alert("in the cleanLogin2 function  ");        
        alert("you submitted " + loginInput.value);
        validateEmail(loginInput.value);
        //return false;             
       

            function validateEmail(email) {
                    alert("entered validation  ");
                    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    if (filter.test(email)) {
                      console.log("yes an email")
                      return true;

                  } else {
                      //console.log("not a email");
                      $("#validationmessage").html("Invalid User Name or E Mail ID. Please re-Enter");
                      secondPass(loginInput.value);                      
                      return false;
                 } //end of else
            } //end of validateEmail

                    
            function secondPass(email) {
                    alert("entered secondPass  ");                    
                    loginInput = $("#user_username").val();
                    loginPassword = $("#user_password").val();
                    alert("in the second pass, loginInput is " + loginInput);
                    alert("in the second pass, loginPassword is " + loginPassword);
                    //validateEmail(loginInput);
                    //if (validateEmail(loginInput)===false){
                     // $("#validationmessage").html("Invalid E-mail. Please enter the e-mail correctly").css("color","red");
                    //} else{                      
                      alert("in the second pass, loginInput is fine " + loginInput);
                    //  $("#validationmessage").html("");
                      checkIfUserExists(loginInput);
                    } //end of secondPass
             //}
                          
             function registerUser(loginInput) {
    
                        $("#cleanLogin2").hide();
                        $("#newUserRegister").show();
                        $("#eMail").val(loginInput);
                        $("#register").on("click",function(e){
                          e.preventDefault();
                          userInfo.firstName = $("#firstName").val();
                          userInfo.lastName = $("#lastName").val();
                          userInfo.eMail = $("#eMail").val();
                          fbRefUsers.child(userInfo.firstName).set({
                            eMail : userInfo.eMail,
                            firstName : userInfo.firstName,
                            lastName : userInfo.lastName
                          });

                          alert("In the Heart of Register User now  ");

                          $("#userInputForm").hide();
                          $("#SuccessfulLogin").show();
                          $("#validationMessage").html("Congratulations " +  userInfo.email  +   ", your account has been successfully created.").css("color","black")
                           .append("Click 'Start Search' to start your search").css("color","black");   
                        });
                      } //end of registerUser 

                    $("#startSearch").on("click",function(){
                      $("#cleanLogin2Row").hide();
                      $(".mainContainer").show();
                      //$("#showSavedList").show();
                      $("#welcomeUser").html("Welcome "+userInfo.firstName+","+userInfo.lastName);
                     
                    }); //end of start-search

                  
      function checkIfUserExists (eMail) {        
                        var userList;
                        alert("entered checkIfUserExists here...  ");
                        fbRefUsers = rootRef.child("users");
                        alert("fbRefUsers is  " + fbRefUsers);

                        fbRefUsers.orderByChild("eMail").equalTo(eMail).once("child_added", function(snapshot) { //child_added vs value
                        fbRefUsers.orderByChild("eMail").on("child_added", function(snapshot) {
                        var userList = snapshot.val();
                        if (snapshot.val() !== null) {                      
                          userInfo.eMail = userList.eMail;
                          $("#userInputForm").hide();
                          $("#SuccessfulLogin").show();
                          console.log("first Name:"+userInfo.firstName); 
                          $("#validationmessage").html("Welcome Back, "+userInfo.firstName+". Click 'Start Search' to start your search").css("color","black");
                        } //end of if statement

                      }); // end of first snapshot

                    }); // end of second snapshot

                  }

                  fbRefUsers.orderByChild("eMail").equalTo(eMail).once("value", function(snapshot) { //child_added vs value
                    if (snapshot.val() === null) {

                      alert("in the Heart of last funtion");
                      registerUser(loginInput); 
                    }
                  }); // end of snapshot*/
  
}); //close the function here