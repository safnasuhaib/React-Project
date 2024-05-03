window.onload = function(e){
  var tbody=document.getElementById('tbody');
  fetch(`http://localhost:4200`)
  .then(res => res.json())
  .then(data =>{
    console.log(data)
    for(let i=0;i<data.items.length;i++){
      var tr=document.createElement("tr");
      var td1=document.createElement("td");
      var txt1=document.createTextNode(data.items[i]['SectionOrder']);
      td1.appendChild(txt1);

      var td2=document.createElement("td");
      var txt2=document.createTextNode(data.items[i]['SectionName']);
      td2.appendChild(txt2);

      var td3=document.createElement("td");
      var txt3=document.createTextNode(data.items[i]['Type']);
      td3.appendChild(txt3);

      var td4=document.createElement("td");
      var txt4=document.createTextNode(data.items[i]['MenuId']);
      td4.appendChild(txt4);

      var td5=document.createElement("td");
      var txt5=document.createTextNode(data.items[i]['Item']);
      td5.appendChild(txt5);

      var td6=document.createElement("td");
      var txt6=document.createTextNode(data.items[i]['Price']);
      td6.appendChild(txt6);

      
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tbody.appendChild(tr);
    }
  }).catch((e)=>console.log(e))
}

const addCSV=(e)=>{
  e.preventDefault()
  const input = document.getElementById('fileinput');
  console.log(input.files[0]);
  var formData = new FormData()
  formData.append('file', input.files[0])




  fetch('http://localhost:4200', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
  .then(data => {
    alert("CSV uploaded successfully");
    window.location.reload();
  })
  .catch((e)=>console.log(e))
}

document.getElementById('upload_form').addEventListener('submit',addCSV)