var firebaseConfig = {
      apiKey: "AIzaSyBgSElPCBvKDHuznwGuXmQ_8viPS7WcmBw",
      authDomain: "kwitter-5beeb.firebaseapp.com",
      databaseURL: "https://kwitter-5beeb-default-rtdb.firebaseio.com",
      projectId: "kwitter-5beeb",
      storageBucket: "kwitter-5beeb.appspot.com",
      messagingSenderId: "452638244693",
      appId: "1:452638244693:web:354aa531d70982187a39dc",
      measurementId: "G-HM6ZJEF297"
    };
    firebase.initializeApp(firebaseConfig);
user_name=localStorage.getItem("user_name");

room_name=localStorage.getItem("room_nmae");

function Send(){

msg=document.getElementById("msg").value;
console.log("msg-"+msg);
console.log (room_name);
firebase.database().ref(room_name).push({
     
      name:user_name,
      message:msg,
      like:0

});
document.getElementById("msg").value="";
}
function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="kwitter.html";

}





function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data );       
         name=message_data['name'];
         message=message_data['message'];
         like=message_data['like'];
         name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
        row=name_with_tag+message_with_tag+like_button+span_with_tag;
        document.getElementById("output").innerHTML+=row;
      } });  }); }
getData();

function updateLike (message_id){
console.log("like button"+message_id);
button_id=message_id;
like=document.getElementById("button_id").value;
updateLike=Number(like)+1;
firebase.database().ref(room_name).child(message_id).update({
      like:updateLike
}
);


}

































































































