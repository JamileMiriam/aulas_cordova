

var app = {

    selectedContact : "asdf",
    
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), true);
        document.addEventListener('resume', this.onResume.bind(this), true);        
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
       // alert(navigator.contacts);
        document.getElementById("bntSelContato").addEventListener("click", this.selecionaContato); 
        document.getElementById("bntShowContact").addEventListener("click", this.alertSelectedContact);
    },
    onResume :function(resumeEvent) {
        alert("onResume :function(resumeEvent) {...");
        if(resumeEvent.pendingResult) {
            if(resumeEvent.pendingResult.pluginStatus === "OK") {
                var contact = navigator.contacts.create(resumeEvent.pendingResult.result);
                this.successCallback(contact);
            } else {                
                this.failCallback(resumeEvent.pendingResult.result);
            }
        }
    },
    successCallback : function(contact){
        this.selectedContact = contact;
        alert(JSON.stringify(contact));
    },
    failCallback : function(err){
        alert(err);
    },
    alertSelectedContact: function(){
        alert(JSON.stringify(app.selectedContact));
    },
    
    selecionaContato: function(){
        navigator.contacts.pickContact(function(contact){
           // alert('The following contact has been selected:' + JSON.stringify(contact));
            //alert("Contact:"+contact);
            app.selectedContact = "contact...";
        },function(err){
            //alert('Error: ' + err);
            //alert("err:"+err);
            app.selectedContact = "err...";
        });
    }

};

app.initialize();