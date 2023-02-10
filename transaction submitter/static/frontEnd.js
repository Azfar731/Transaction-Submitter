

$(document).ready(function(){
    $("#changeValue").on("submit", function(event){
        event.preventDefault();
        let value = $("#value-name").val();
        $.ajax({
            url: "/",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({newval: value}),
            success:function(res){
                alert(`${res.response}`);
            },
            error: function(xhr, status, error) {
                if (xhr.status === 400) {
                  alert("Only Integer values are accepted")
                } else {
                  console.log('Error: ' + error);
                }
            }
        })
        $('#value-name').val('');
    })

    $("#getValue").on("submit", function(event){
        event.preventDefault();
        let value = document.getElementById("h1 tag").innerHTML;
        $.ajax({
            url: "/data",
            method: "GET",
            contentType: "application/json",
            data: JSON.stringify({newval: value}),
            success:function(res){
                if(value == res.response){
                    alert("Value is unchanged");
                }
                else{
                $("h1").html(`${res.response}`);
                }                
            }
        })

    })

})
