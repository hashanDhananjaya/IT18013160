/**
 * 
 */

$(document).ready(function() {
    loadTable();
});

$(document).on("click", "#btnSave", function (event) {
    // Clear alerts---------------------
    $("#alertSuccess").text("");
    $("#alertSuccess").hide();
    $("#alertError").text("");
    $("#alertError").hide();
    // Form validation-------------------
    //var status = validateItemForm();
	var status = true;
    if (status != true) {
        $("#alertError").text(status);
        $("#alertError").show();
        return;
    }
    // If valid------------------------
    var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
    var url = ($("#hidItemIDSave").val() == "") ? "http://localhost:8080/GadgetBadget/rest/projects" : "http://localhost:8080/GadgetBadget/rest/projects/"+$("#hidItemIDSave").val();
    $.ajax(
        {
            url: url,
            type: type,
            data: $("#formItem").serialize(),            
            dataType: "json",
            complete: function (response, status) {
                onItemSaveComplete(response.responseText, status);
            }
        });
});

function loadTable() {
	$.ajax({
        url: "http://localhost:8080/GadgetBadget/rest/projects",
		dataType: 'json',
        success: function (data) {
			let table = "<table>";
			table += "<tr> <th> Project ID </th> <th> Project Name </th> <th> Project Description </th> <th> Project Duration </th>  <th> Project Budget </th><th> Update </th> <th> Delete </th></tr>";
            $.each(data,function(i,message){			   
			   let tr = "<tr>";
			   tr += "<td><input id='hidItemIDUpdate' name='hidItemIDUpdate' type='hidden' value='" + message.proj_Id + "'>"+ message.proj_Id +"</td>";
			   tr += "<td>"+ message.proj_Name +"</td>";
			   tr += "<td>"+ message.proj_Description +"</td>";
			   tr += "<td>"+ message.proj_Duration +"</td>";
			   tr += "<td>"+ message.proj_Budget +"</td>";
			   tr += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-secondary' data-itemid='" + message.proj_Id + "'></td>";
			   tr += "<td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-itemid='" + message.proj_Id + "'></td>";
			   tr += "<tr>";
			   table += tr;			   
            });
						
			table += "</table>";
			
			document.getElementById("table").innerHTML = table;
        }
    });
}

function onItemSaveComplete(response, status) {
    if (status == "success") {
		$("#alertSuccess").text("Successfully saved.");
        $("#alertSuccess").show();   
        loadTable();  
    } else if (status == "error") {
        $("#alertError").text("Error while saving.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while saving..");
        $("#alertError").show();
    }
    $("#hidItemIDSave").val("");
    $("#formItem")[0].reset();
}

// CLIENT-MODEL================================================================
function validateItemForm() {
    if ($("#proj_Name").val().trim() == "") {
        return "Insert project name.";
    }
    if ($("#proj_Description").val().trim() == "") {
        return "Insert project description.";
    }
    if ($("#proj_Duration").val().trim() == "") {
        return "Insert project duration.";
    }
    // is numerical value
    var tmpDuration = $("#proj_Duration").val().trim();
    if (!$.isNumeric(tmpDuration)) {
        return "Insert a numerical value for duration.";
    }
    if ($("#proj_Budget").val().trim() == "") {
        return "Insert project budget.";
    }
    // is numerical value
    var tmpbudget = $("#proj_Budget").val().trim();
    if (!$.isNumeric(tmpbudget)) {
        return "Insert a numerical value for Budget.";
    }
    // convert to decimal price
    $("#proj_Budget").val(parseFloat(tmpbudget).toFixed(2));
    // DESCRIPTION------------------------
    
    return true;
}

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function (event) {
    $("#hidItemIDSave").val($(this).data("itemid"));    
    $("#proj_Name").val($(this).closest("tr").find('td:eq(1)').text());
    $("#proj_Description").val($(this).closest("tr").find('td:eq(2)').text());
    $("#proj_Duration").val($(this).closest("tr").find('td:eq(3)').text());
    $("#proj_Budget").val($(this).closest("tr").find('td:eq(4)').text());
});

$(document).on("click", ".btnRemove", function (event) {

    $.ajax(
        {
            url: "http://localhost:8080/GadgetBadget/rest/projects/"+$(this).data("itemid"),
            type: "DELETE",
            dataType: "text",
            complete: function (response, status) {
                onItemDeleteComplete(response.responseText, status);
            }
        });
});

function onItemDeleteComplete(response, status) {
    if (status == "success") {
    	$("#alertSuccess").text("Successfully deleted.");
        $("#alertSuccess").show();
        loadTable();
        /*var resultSet = JSON.parse(response);
        if (resultSet.status.trim() == "success") {
            $("#alertSuccess").text("Successfully deleted.");
            $("#alertSuccess").show();
            $("#divItemsGrid").html(resultSet.data);
        } else if (resultSet.status.trim() == "error") {
            $("#alertError").text(resultSet.data);
            $("#alertError").show();
        }*/
    } else if (status == "error") {
        $("#alertError").text("Error while deleting.");
        $("#alertError").show();
    } else {
        $("#alertError").text("Unknown error while deleting..");
        $("#alertError").show();
    }
}