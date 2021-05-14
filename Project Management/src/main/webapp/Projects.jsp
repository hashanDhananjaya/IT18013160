<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/Project.js"></script>
</head>
<body>
<div class="container">
		<div class="row">
			<div class="col">


				<h1>Add your project details</h1>
				<form method='post' action='Projects.jsp' id='formItem' name='formItem'>
					Project Name: <input id='proj_Name' name='proj_Name' type='text' class='form-control col-md-3'><br> 
					Project Description: <input id='proj_Description' name='proj_Description' type='text' class='form-control col-md-3'><br> 
					Duration: <input id='proj_Duration' name='proj_Duration' type='number' class='form-control col-md-3'><br> 
					Budget: <input id='proj_Budget' name='proj_Budget' type='number' class='form-control col-md-3'><br> 
					<input id='btnSave' name='btnSave' type='button' value='Save' class='btn btn-primary'> 
					<input type='hidden' id='hidItemIDSave' name='hidItemIDSave' value=''>
				</form>

				<br>

				<div id='alertSuccess' name='alertSuccess' class='alert alert-success'></div>
				<div id='alertError' name='alertError' class='alert alert-danger'></div>

				<br>
				<div id="table" class="table table-striped">
				
				</div>
				
							
			</div>
		</div>
	</div>
	</body>
</html>