async function collectUserData() {
  let fullName = document.getElementById("fullName").value;
  let condominio = document.getElementById("condominio").value;
  let ap = document.getElementById("ap").value;
  let hospede = document.getElementById("hospede").value;
  let doc = document.getElementById("doc").value;
  let carro = document.getElementById("carro").value;
  let placa = document.getElementById("placa").value;
  let checkin = document.getElementById("checkin").value;
  let checkout = document.getElementById("checkout").value;
  let obs = document.getElementById("obs").value;
  let email = document.getElementById("email").value;

  if (carro === "") {
    carro = "SEM DADOS";
    placa = "SEM DADOS";
  }

  const farmatadata = () => {
    let newDate = new Date();
    let validate = `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    let datCad = validate.replace("", "");
    return datCad;
  };

//   function tratString(srt) {
//     let trat1 = srt[0].toUpperCase();
//     let trat2 = srt.substring(1);
//     let result = trat1 + trat2;
//     return result;
//   }

  function tratData(srt) {
    const ano = srt.substring(0, 4);
    const mes = srt.substring(5, 7);
    const dia = srt.substring(8, 10);
    const hora = srt.substring(11);
    let result = dia + "/" + mes + "/" + ano + " " + hora;

    return result;
  }

  let dados = JSON.stringify({
    values: [
      [
        condominio.toUpperCase(),
        ap,
        tratData(checkin),
        tratData(checkout),
        hospede.toUpperCase(),
        doc,
        carro.toUpperCase(),
        placa.toUpperCase(),
        fullName.toUpperCase(),
        email,
        farmatadata(),
        obs.toUpperCase(),
      ],
    ],
  });

  const info = await fetch("http://localhost:3002/setdados", {
    method: "POST",
    redirect: "follow",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },

    body: dados,
  })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

  alert(`Cadastro de ${hospede} registrado!`);
  console.log(info);

  document.getElementById("userDataForm").reset();
  // return response.json()
}
