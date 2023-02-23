const form = document.getElementById("idform");
form.addEventListener("submit", function(event){
    event.preventDefault();
    if (form.campo3.value>0){
    let formudata = new FormData(form);  
    let objdata = formdataobj(formudata);
    datoacelda(objdata);
    alocalstorage(objdata);
    form.reset();
    }else{
        alert("El monto a ingresar debe ser mayor a 0");
    }
}
)
document.addEventListener("DOMContentLoaded", function(event){
    cat();
    let datatotal = JSON.parse(localStorage.getItem("data"))
    datatotal.forEach(x => {datoacelda(x)
        
    });
});

function genid(){
        let lastid = localStorage.getItem("lastid") || -1;
        let newid = JSON.parse(lastid)+1;
        localStorage.setItem("lastid", JSON.stringify(newid));
        return newid;
    }

    function formdataobj(formudata){
        let sino = formudata.get("sino");
        let campo2 = formudata.get("campo2");
        let campo3 = formudata.get("campo3");
        let campo4 = formudata.get("campo4");
        let campoid = genid();
        return{
            "sino": sino,
            "campo2": campo2,
            "campo3": campo3,
            "campo4": campo4,
            "campoid":campoid,
        }
    }

    function datoacelda(objdata){
    let tablitadata=document.getElementById("tablita");
    let nuevafila = tablitadata.insertRow(-1);

    nuevafila.setAttribute("data-campoid", objdata["campoid"]); //15

    let nuevacelda = nuevafila.insertCell(0);
    nuevacelda.textContent=objdata["sino"]//form.querySelector("#campo2").value

    nuevacelda = nuevafila.insertCell(1);
    nuevacelda.textContent=objdata["campo2"];

    nuevacelda = nuevafila.insertCell(2);
    nuevacelda.textContent=objdata["campo3"];

    nuevacelda = nuevafila.insertCell(3);
    nuevacelda.textContent=objdata["campo4"];

    let celdaborrar = nuevafila.insertCell(4);
    let botonborrar = document.createElement("button");
    botonborrar.textContent = "Eliminar";
    celdaborrar.appendChild(botonborrar);

    botonborrar.addEventListener("click", (event) => {
        let z = event.target.parentNode.parentNode;//15
        let trid = z.getAttribute("data-campoid");//15
        trid =parseInt(trid)
        z.remove();
        console.log("trid: " + trid);
        borrarlocalstorage(trid);
    })
}

// 

    function cat(){
        let todascat = ["Alquiler", "Comida", "Transporte"]
        for(let i=0; i<todascat.length;i++){
            insertarcat(todascat[i]);
        }
    }

    function insertarcat(nuevacat){
        const elemento = document.getElementById("campo4");
        let htmlcat = `<option>${nuevacat}</option>`;
        elemento.insertAdjacentHTML("beforeend", htmlcat);
    }


    //borrar el registro mediante su id
    function borrarlocalstorage(trid){
        //Obtengo todos los registros del localstorage en un objeto
        let registros = JSON.parse(localStorage.getItem("data"))
        console.log(registros);
        //Obtengo el indice/posición del registro que quiero eliminar
        let indexregistro = registros.findIndex(x => x.campoid === trid);
        //Elimino el elemento de esa posición
        console.log("indexregistro",indexregistro);
        registros.splice(indexregistro,1);
        //Lo convierto a JSON
        let newregistros = JSON.stringify(registros);
        //Guardo mi array de transacciones en formato JSON el localstorage
        localStorage.setItem("data", newregistros);
    }

    function alocalstorage(objdata){
        // let arregloobj = []; --> OJO SIEMPRE TIENE QUE HABER UN DATA --> || []
        let arregloobj = JSON.parse(localStorage.getItem("data")) || [];
        arregloobj.push(objdata);
        let objdataJason = JSON.stringify(arregloobj);
        localStorage.setItem("data", objdataJason);
    }