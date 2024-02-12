let valMail = [];
let invalMail = [];
let upload = document.getElementById('upload');

upload.addEventListener('change', () => {
  let fr = new FileReader();

  fr.readAsText(upload.files[0]);

  fr.onload = function () {
    let a = fr.result.split(/\r?\n|\n/).map(e => {
      return e.split(',');
    });
    let valNo = 0;
    let invalNo = 0;

    a.forEach(e => {
      let em = String(e);

      if (em != "") {
        let m = e.map(e => {
          return `<td>${e}</td>`;
        });

        let newe = document.createElement("tr");
        newe.innerHTML = m;

        if (em.includes("@") && (em.charAt(em.length - 4) == '.' || em.charAt(em.length - 3) == '.')) {
          document.querySelector("table#val").appendChild(newe);
          valMail.push(em);
          valNo++;
        } else {
          document.querySelector("table#inval").appendChild(newe);
          invalMail.push(em);
          invalNo++;
        }
      }
    });

    document.querySelector("#valCount").innerHTML = valNo;
    document.querySelector("#invalCount").innerHTML = invalNo;
  };
});

/*-----------Posting Emails--------------*/

(function () {
  function sendEmail() {
    alert("Sending Mails...");
    for (var j = 0; j < valMail.length; j++) {
      // Replace these with your actual SMTP credentials and email details
      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "kavvinaykarthik@gmail.com",
        Password: "6DD0CF06CA6F692FD39A0B64C5CA69B5FCE7",
        To: valMail[j],
        From: document.getElementById("mailid").value,
        Subject: document.getElementById("subject").value,
        Body: document.getElementById("body").value
      }).then(
        message => {
          console.log(message);
          if (message === "OK") {
            alert("Mail sent successfully to " + valMail[j]);
          } else {
            alert("Error sending mail to " + valMail[j] + ": " + message);
          }
        }
      );
    }
  }
})();
